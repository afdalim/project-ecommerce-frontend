import { createRouter, createWebHistory } from "vue-router";


import Landing from "../views/Landing.vue";

import Login from "../views/Login.vue";
import Register from "../views/Register.vue";


import Products from "../views/Products.vue";
import ProductDetail from "../views/ProductDetail.vue";

import Cart from "../views/Cart.vue";
import Checkout from "../views/Checkout.vue";
import Payment from "../views/Payment.vue";

import Orders from "../views/Orders.vue";
import OrderDetail from "../views/OrderDetail.vue";

import CreateReview from "../views/CreateReview.vue";
import Profile from "../views/Profile.vue";
import Returns from "../views/Returns.vue";



import AdminLogin from "../views/AdminLogin.vue";
import AdminDashboard from "../views/AdminDashboard.vue";
import AdminProducts from "../views/AdminProducts.vue";
import AdminCategories from "../views/AdminCategories.vue";
import AdminStock from "../views/AdminStock.vue";
import AdminOrders from "../views/AdminOrders.vue";
import AdminReturns from "../views/AdminReturns.vue";



import { useAuthStore } from "../stores/auth";
import ReturnForm from "../views/ReturnForm.vue";






const routes = [

{
    path:"/return/:id",
    component:ReturnForm
},

// LANDING

{
    path:"/",
    component:Landing
},








// CUSTOMER AUTH

{
    path:"/login",
    component:Login
},


{
    path:"/register",
    component:Register
},








// CUSTOMER


{
    path:"/products",
    component:Products
},


{
    path:"/products/:id",
    component:ProductDetail
},



{
    path:"/cart",
    component:Cart
},



{
    path:"/checkout",
    component:Checkout
},



{
    path:"/payment/:id",
    component:Payment
},



{
    path:"/orders",
    component:Orders
},



{
    path:"/orders/:id",
    component:OrderDetail
},



{
    path:"/review/:id",
    component:CreateReview
},



{
    path:"/profile",
    component:Profile
},



{
    path:"/returns",
    component:Returns
},









// ADMIN AUTH

{
    path:"/admin/login",
    component:AdminLogin
},








// ADMIN


{
    path:"/admin/dashboard",
    component:AdminDashboard
},



{
    path:"/admin/products",
    component:AdminProducts
},



{
    path:"/admin/categories",
    component:AdminCategories
},



{
    path:"/admin/stock",
    component:AdminStock
},



{
    path:"/admin/orders",
    component:AdminOrders
},



{
    path:"/admin/returns",
    component:AdminReturns
}




];









const router =
createRouter({

    history:createWebHistory(),

    routes

});










router.beforeEach((to,from,next)=>{



const auth =
useAuthStore();




const token =

to.path.startsWith("/admin")

?

localStorage.getItem("admin_token")

:

localStorage.getItem("customer_token");





// HALAMAN BEBAS TANPA LOGIN

const publicPages = [

    "/",

    "/login",

    "/register",

    "/admin/login"

];








// BELUM LOGIN MASUK HALAMAN PRIVATE


if(

!publicPages.includes(to.path)

&&

!token

){



return next("/login");



}









// ADMIN GUARD


if(

to.path.startsWith("/admin")

&&

to.path !== "/admin/login"

&&

auth.user?.role !== "admin"

){



return next("/products");



}









// ADMIN JANGAN MASUK CUSTOMER


if(

auth.user?.role === "admin"

&&

(

to.path === "/products"

||

to.path === "/cart"

||

to.path === "/orders"

)

){



return next("/admin/dashboard");



}








next();



});








export default router;