import axios from "axios";

 const instance = axios.create({
    baseURL: "https://burgerappudemy.firebaseio.com/"
});

 export default instance;