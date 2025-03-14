import { useEffect, useState } from "react";
import axiosApi from "../../axiosApi.ts";
import { NavLink } from "react-router-dom";
import Loader from "../../component/UI/Loader/Loader.tsx";
import {toast} from "react-toastify";

const today = new Date();

const Home = () => {
    const [meals, setMeals] = useState<IFood[]>([]);
    const [loading, setLoading] = useState(false);
    const [totalCal, setTotalCal] = useState(0);

    const fetchData = async () => {
        setLoading(true);
        try{
            const response = await axiosApi("meals.json");
            if(response.data){
                const MealsObjects = Object.keys(response.data).map((key) => {
                    return {...response.data[key], id: key};
                });

                let totalCalories = 0;
                MealsObjects.forEach((meal) => {
                    totalCalories += meal.calories;
                });
                setTotalCal(totalCalories);
                setMeals(MealsObjects);

            }
        }catch(e){
            console.log(e)
        }finally {
            setLoading(false);
        }
    };

    const deleteItem = async (id: string)=> {
        try{
            setLoading(true);
            await axiosApi.delete(`meals/${id}.json`);
            await fetchData();
            toast.success("Dish deleted successfully.");
        }catch(e){
            console.log("Error deleting meals.", e);
        }finally {
           setLoading(false);
        }
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
                    meals.map((meal)=> {
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
                                        >
                                           Delete Meal
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
