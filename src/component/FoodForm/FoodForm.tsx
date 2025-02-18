import { useState, useEffect } from 'react';
import Spinner from "../UI/Spinner/Spinner.tsx";


const defaultForm = {
    type: '',
    meal_date: '',
    description: '',
    calories: 0,
};

const FoodForm = ({ submitForm, isEdit, meal = defaultForm, isLoading = false }) => {
    const [form, setForm] = useState(meal);

    useEffect(() => {
        setForm(meal);
    }, [meal]);

    const handleSubmit = (e) => {
        e.preventDefault();
        const data = { ...form };
        data.calories = Number(data.calories);
        submitForm(data);
    };

    const handleChange = (e) => {
        const { name, value } = e.target;
        setForm({ ...form, [name]: value });
    };

    return (
        <div className="container">
            <form onSubmit={handleSubmit} className="w-50 mx-auto">
                <div className="mb-3">
                    <label htmlFor="type" className="form-label">
                        Тип еды:
                    </label>
                    <select
                        className="form-select"
                        name="type"
                        value={form.type}
                        onChange={handleChange}
                        required
                    >
                        <option value="" disabled>Выберите тип</option>
                        <option value="Breakfast">Завтрак</option>
                        <option value="Snack">Перекус</option>
                        <option value="Lunch">Обед</option>
                        <option value="Dinner">Ужин</option>
                    </select>
                </div>
                <div className="mb-3">
                    <label htmlFor="description" className="form-label">
                        Описание:
                    </label>
                    <textarea
                        className="form-control"
                        name="description"
                        value={form.description}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="mb-3">
                    <label htmlFor="calories" className="form-label">
                        Калории:
                    </label>
                    <input
                        className="form-control"
                        type="number"
                        name="calories"
                        value={form.calories}
                        onChange={handleChange}
                        required
                    />
                </div>
                <div className="text-center mt-3">
                    <button
                        className="btn btn-primary"
                        type="submit"
                        disabled={isLoading}
                    >
                        {isEdit ? 'Изменить' : 'Сохранить'}
                        {isLoading && <Spinner />}
                    </button>
                </div>
            </form>
        </div>
    );
};

export default FoodForm;