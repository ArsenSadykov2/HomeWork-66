import axiosApi from "../../axiosApi.ts";
import {useNavigate, useParams} from "react-router-dom";
import {useState, useEffect} from "react";
import {toast} from "react-toastify";
import FoodForm from "../../component/FoodForm/FoodForm.tsx";


const MealSet = () => {
    const [mealData, setMealData] = useState<IFoodForm>();
    const [loadingState, setLoadingState] = useState(false);
    const navigate = useNavigate();

    const {idMeal} = useParams();

    console.log(idMeal)

    const loadMealData = async () => {
        setLoadingState(true);
        try {
            const response = await axiosApi(`meals/${idMeal}.json`);
            if (response.data) {
                setMealData(response.data);
            }
        } catch (e) {
            console.log(e);
        } finally {
            setLoadingState(false);
        }
    };

    useEffect(() => {
        if (idMeal) {
            loadMealData();
        }
    }, [idMeal]);

    const saveMeal = async (meal: IFoodForm) => {
        setLoadingState(true);
        if (idMeal) {
            try {
                await axiosApi.put(`meals/${idMeal}.json`, meal);
                toast.success('Блюдо успешно отредактировано');
            } catch (e) {
                console.log(e);
            } finally {
                setLoadingState(false);
            }
        } else {
            try {
                await axiosApi.post('meals.json', meal);
                toast.success('Блюдо успешно добавлено');
                navigate('/');
            } catch (e) {
                console.log(e);
            } finally {
                setLoadingState(false);
            }
        }
    };

    return (
        <div className="container">
            <h4>{idMeal ? 'Редактировать блюдо' : 'Добавить новое блюдо'}</h4>
            <FoodForm
                submitForm={saveMeal}
                isEdit={!!idMeal}
                meal={mealData}
                isLoading={loadingState}
            />
        </div>
    );
};

export default MealSet;
