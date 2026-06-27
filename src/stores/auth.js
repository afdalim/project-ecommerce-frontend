import { defineStore } from "pinia";
import api from "../api/axios";


export const useAuthStore = defineStore("auth", {


state: () => ({


    user:
    JSON.parse(localStorage.getItem("customer_user"))
    ||
    JSON.parse(localStorage.getItem("admin_user"))
    ||
    null,


    token:
    localStorage.getItem("customer_token")
    ||
    localStorage.getItem("admin_token")
    ||
    null,


}),





actions:{



async login(data){


const response =
await api.post(
"/auth/login",
data
);



this.token =
response.data.token;



this.user =
response.data.user;





// ADMIN LOGIN

if(
this.user.role === "admin"
){


localStorage.setItem(
"admin_token",
this.token
);



localStorage.setItem(
"admin_user",
JSON.stringify(this.user)
);


}




// CUSTOMER LOGIN

else{


localStorage.setItem(
"customer_token",
this.token
);



localStorage.setItem(
"customer_user",
JSON.stringify(this.user)
);


}




return response;



},







logout(){



if(
this.user?.role === "admin"
){


localStorage.removeItem(
"admin_token"
);


localStorage.removeItem(
"admin_user"
);


}




else{


localStorage.removeItem(
"customer_token"
);


localStorage.removeItem(
"customer_user"
);


}




this.user =
null;



this.token =
null;



}





}



});