import {createRoot} from 'react-dom/client'
import App from './App.tsx'
import 'bootstrap/dist/css/bootstrap.min.css';
import 'react-toastify/dist/ReactToastify.css';
import {BrowserRouter} from "react-router-dom";
import {ToastContainer} from "react-toastify";

createRoot(document.getElementById('root')!).render(

        <BrowserRouter>
            <ToastContainer />
            <App/>
        </BrowserRouter>
)
