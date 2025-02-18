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
        axiosApi.get("meals.json").then((response)=> {
            if (response.data) {
                const meals = Object.keys(response.data).map((key)=> {
                    return { ...response.data[key], id: key };
                });

                meals.sort((a, b)=> {
                    return new Date(b.meal_date).getTime() - new Date(a.meal_date).getTime();
                });

                const todayMeals = meals.filter((meal)=> {
                    return new Date(meal.meal_date).toDateString() === today.toDateString();
                });

                let totalCalories = 0;
                todayMeals.forEach((meal)=> {
                    totalCalories += meal.calories;
                });
                setTotalCal(totalCalories);

                dispatch(addMeals(meals));
            }
        }).catch((error)=> {
            console.log("Ошибка при загрузке данных:", error);
        }).finally(() =>{
            setLoading(false);
        });
    };

    const deleteItem = (id: string)=> {
        setDeleteLoading(true);
        axiosApi.delete(`meals/${id}.json`).then(()=> {
            fetchData();
            toast.success("Блюдо удалено!");
        }).catch((error)=> {
            console.log("Ошибка при удалении:", error);
        }).finally(()=> {
            setDeleteLoading(false);
        });
    };

    useEffect(()=> {
        fetchData();
    }, []);

    return (
        <div className="container">
            <div className="row justify-content-between align-items-center mb-4">
                <p>
                    Общее количество калорий: {loading ? <Loader /> : totalCal + " ккал"}
                </p>
                <NavLink to="/meals/new" className="btn btn-primary">
                    Добавить новое блюдо
                </NavLink>
            </div>

            <div>
                {loading ? (
                    <Loader />
                ) : (
                    dishes.map((meal)=> {
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
                                            {meal.meal_date}
                                        </div>
                                        <hr />
                                        <p className="opacity-50">
                                            {meal.type}
                                        </p>
                                        <p>{meal.description}</p>
                                    </div>
                                    <div className="col">
                                       {meal.calories} ккал
                                    </div>
                                    <div className="col d-flex gap-2">
                                        <button
                                            className="btn"
                                            onClick={()=> { deleteItem(meal.id); }}
                                            disabled={deleteLoading}
                                        >
                                           X
                                        </button>
                                        <NavLink to={`meals/${meal.id}/edit`} className="btn">
                                          Edit
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
