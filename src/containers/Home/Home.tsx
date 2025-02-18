import { useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { NavLink } from "react-router-dom";
import { Pencil, Trash } from "react-bootstrap-icons";
import Loader from "../../component/UI/Loader/Loader.tsx";
import { toast } from "react-toastify";
import { useDispatch, useSelector } from "react-redux";
import {AppDispatch, RootState} from "../../component/app/store.ts";
import {addMeals} from "../slices/mealSlices.ts";

const today = new Date();

const Home = () => {
    const dishes = useSelector((state: RootState) => state.meals.meals);
    const [loading, setLoading] = useState(false);
    const [totalCal, setTotalCal] = useState(0);
    const [deleteLoading, setDeleteLoading] = useState(false);
    const dispatch = useDispatch<AppDispatch>();

    const fetchData = () => {
        setLoading(true);
        axiosApi.get("meals.json").then(function(response) {
            if (response.data) {
                const meals = Object.keys(response.data).map(function(key) {
                    return { ...response.data[key], id: key };
                });

                meals.sort(function(a, b) {
                    return new Date(b.meal_date).getTime() - new Date(a.meal_date).getTime();
                });

                const todayMeals = meals.filter(function(meal) {
                    return new Date(meal.meal_date).toDateString() === today.toDateString();
                });

                let totalCalories = 0;
                todayMeals.forEach(function(meal) {
                    totalCalories += meal.calories;
                });
                setTotalCal(totalCalories);

                dispatch(addMeals(meals));
            }
        }).catch(function(error) {
            console.log("Ошибка при загрузке данных:", error);
        }).finally(function() {
            setLoading(false);
        });
    };

    const deleteNote = (id)=> {
        setDeleteLoading(true);
        axiosApi.delete(`meals/${id}.json`).then(()=> {
            fetchData(); 
            toast.success("Блюдо удалено!");
        }).catch(function(error) {
            console.log("Ошибка при удалении:", error);
        }).finally(function() {
            setDeleteLoading(false);
        });
    };

    useEffect(function() {
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-between align-items-center mb-4">
                <p>
                    <strong>Общее количество калорий:</strong> {loading ? <Loader /> : totalCal + " ккал"}
                </p>
                <NavLink to="/meals/new" className="btn btn-primary">
                    Добавить новое блюдо
                </NavLink>
            </div>

            <div>
                {loading ? (
                    <Loader />
                ) : (
                    dishes.map(function(meal) {
                        return (
                            <div
                                key={meal.id}
                                className={`card mb-4 p-3 w-75 mx-auto ${
                                    new Date(meal.meal_date).toDateString() === today.toDateString()
                                        ? "bg-primary-subtle"
                                        : ""
                                }`}
                            >
                                <div className="row justify-content-between align-items-center">
                                    <div className="col">
                                        <div>
                                            <strong>{meal.meal_date}</strong>
                                        </div>
                                        <hr />
                                        <p className="opacity-50">
                                            <small>{meal.type}</small>
                                        </p>
                                        <p>{meal.description}</p>
                                    </div>
                                    <div className="col">
                                        <strong>{meal.calories} ккал</strong>
                                    </div>
                                    <div className="col d-flex gap-2">
                                        <button
                                            className="btn"
                                            onClick={function() { deleteNote(meal.id); }}
                                            disabled={deleteLoading}
                                        >
                                            <Trash />
                                        </button>
                                        <NavLink to={`meals/${meal.id}/edit`} className="btn">
                                            <Pencil />
                                        </NavLink>
                                    </div>
                                </div>
                            </div>
                        );
                    })
                )}
            </div>
        </div>
    );
};

export default Home;
