import axios from "axios";

const api = axios.create({
    baseURL: import.meta.env.VITE_API_URL,

    headers:{
        Accept:"application/json"
    }
});

api.interceptors.request.use((config)=>{

    let token = null;

    if(window.location.pathname.startsWith("/admin")){
        token = localStorage.getItem("admin_token");
    } else {
        token = localStorage.getItem("customer_token");
    }

    if(token){
        config.headers.Authorization = `Bearer ${token}`;
    }

    return config;
});

api.interceptors.response.use(

    response => response,

    error => {

        if(error.response?.status === 401){

            if(window.location.pathname.startsWith("/admin")){

                localStorage.removeItem("admin_token");
                localStorage.removeItem("admin_user");

                window.location.href = "/admin/login";

            } else {

                localStorage.removeItem("customer_token");
                localStorage.removeItem("customer_user");

                window.location.href = "/login";
            }
        }

        return Promise.reject(error);
    }
);

export default api;