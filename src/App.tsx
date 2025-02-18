import './App.css'
import Header from "./component/Header/Header.tsx";
import {Route, Routes} from "react-router-dom";
import Home from "./containers/Home/Home";
import FoodEdit from "./containers/FoodEdit/FoodEdit.tsx";


const App = () => {

    return (
        <Header>
            <Routes>
                <Route path="/" element={<Home/>}/>
                <Route path="/meals" element={<Home/>}/>
                <Route path="/meals/new" element={<FoodEdit/>}/>
                <Route path="/meals/:idMeal/edit" element={<FoodEdit/>}/>
                <Route path="*" element={<h1>Not found</h1>}/>
            </Routes>
        </Header>
    );
};

export default App