import axios from "axios";

const axiosAPI = axios.create({
  baseURL: 'https://arsen-js27-default-rtdb.europe-west1.firebasedatabase.app/',
})

export default axiosAPI;