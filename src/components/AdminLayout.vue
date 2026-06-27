<template>


<div
class="
flex
min-h-screen
bg-gradient-to-br
from-pink-50
via-white
to-pink-100
"
>





<!-- SIDEBAR -->


<aside
class="
w-80
bg-white/80
backdrop-blur-xl
border-r
border-white
shadow-2xl
p-8
flex
flex-col
justify-between
"
>





<div>



<!-- LOGO -->


<div
class="
text-center
mb-14
"
>


<div
class="
w-24
h-24
mx-auto
rounded-full
bg-gray-900
text-white
font-serif
text-6xl
flex
items-center
justify-center
shadow-xl
"
>

C

</div>



<h1
class="
mt-5
font-bold
tracking-[8px]
text-gray-800
"
>

CORAL

</h1>



<p
class="
text-pink-400
font-bold
tracking-widest
"
>

ADMIN

</p>



</div>









<!-- MENU -->


<div class="space-y-4">





<button

v-for="menu in menus"

:key="menu.name"

@click="router.push(menu.path)"

class="
w-full
flex
items-center
gap-4
text-left
px-6
py-4
rounded-2xl
font-semibold
text-gray-600
hover:bg-gray-900
hover:text-white
hover:translate-x-2
transition
"

>


<span class="text-xl">

{{ menu.icon }}

</span>


{{ menu.name }}



</button>






</div>




</div>









<!-- BOTTOM -->


<div>



<div
class="
bg-pink-50
rounded-3xl
p-5
mb-6
text-center
"
>


<p
class="
text-gray-400
text-sm
"
>

Logged as

</p>



<h3
class="
font-bold
"
>

Administrator

</h3>


</div>







<button

@click="logout"

class="
w-full
bg-red-500
text-white
py-4
rounded-full
font-bold
hover:bg-red-600
transition
"

>

Logout

</button>




</div>






</aside>











<!-- CONTENT -->


<main
class="
flex-1
p-12
overflow-auto
"
>



<div
class="
mb-10
"
>


<h1
class="
text-4xl
font-bold
text-gray-800
"
>

Admin Dashboard

</h1>


<p
class="
text-gray-400
mt-2
"
>

Manage Coral Daisy ecommerce system

</p>


</div>




<slot />




</main>







</div>


</template>









<script setup>


import {

useRouter

} from "vue-router";



import {

useAuthStore

} from "../stores/auth";







const router =
useRouter();




const auth =
useAuthStore();







const menus =
[


{

name:"Dashboard",

path:"/admin/dashboard",



},



{

name:"Products",

path:"/admin/products",



},



{

name:"Categories",

path:"/admin/categories",



},




{

name:"Stock",

path:"/admin/stock",



},




{

name:"Orders",

path:"/admin/orders",


},




{

name:"Returns",

path:"/admin/returns",


}



];











function logout(){



auth.logout();




router.push(
"/admin/login"
);



}



</script>