<template>


<div
class="
min-h-screen
relative
overflow-hidden
flex
items-center
justify-center
bg-gradient-to-br
from-pink-50
via-white
to-pink-100
"
>




<!-- 3D EFFECT -->


<div
class="
absolute
w-96
h-96
bg-pink-300/30
rounded-full
blur-3xl
-top-20
-left-20
"
></div>



<div
class="
absolute
w-80
h-80
bg-rose-300/40
rounded-full
blur-3xl
-bottom-20
-right-20
"
></div>















<!-- CARD -->


<div
class="
relative
z-10
bg-white/70
backdrop-blur-xl
w-[430px]
p-12
rounded-[40px]
shadow-2xl
border
border-white
"
>






<!-- LOGO -->


<!-- LOGO -->


<div class="text-center mb-10">



<div
class="
relative
mx-auto
w-36
h-36
flex
items-center
justify-center
mb-4
"
>



<!-- CIRCLE 3D -->


<div
class="
absolute
inset-0
bg-white/80
rounded-full
shadow-2xl
blur-[1px]
"
></div>



<div
class="
absolute
w-28
h-28
bg-pink-100/70
rounded-full
blur-xl
"
></div>






<!-- LOGO C -->


<h1
class="
relative
z-10
font-serif
text-8xl
text-gray-900
drop-shadow-xl
"
>

C

</h1>




</div>






<h2
class="
tracking-[12px]
font-bold
text-gray-700
"
>

CORALDAISY

</h2>




<p
class="
text-gray-400
mt-4
"
>

Premium Bag Collection

</p>




</div>








<form @submit.prevent="handleLogin">





<label class="font-semibold text-gray-600">

Email

</label>




<input

v-model="form.email"

class="
w-full
bg-gray-100
rounded-2xl
p-5
mt-2
mb-6
outline-none
focus:ring-2
focus:ring-pink-300
"

placeholder="Enter your email"

/>








<label class="font-semibold text-gray-600">

Password

</label>




<input

v-model="form.password"

type="password"

class="
w-full
bg-gray-100
rounded-2xl
p-5
mt-2
mb-8
outline-none
focus:ring-2
focus:ring-pink-300
"

placeholder="Enter password"

/>








<button

class="
w-full
bg-gradient-to-r
from-pink-400
to-pink-600
text-white
font-bold
py-5
rounded-2xl
shadow-xl
hover:scale-105
transition
"

>

LOGIN

</button>






</form>









<p class="text-center mt-8 text-gray-500">


Belum punya akun?


<span

@click="router.push('/register')"

class="
text-pink-500
font-bold
cursor-pointer
"

>

Daftar sekarang

</span>


</p>









<p
class="
text-red-500
text-center
mt-5
"
>

{{ message }}

</p>





</div>



</div>


</template>









<script setup>


import {

reactive,

ref

} from "vue";



import {

useAuthStore

} from "../stores/auth";



import {

useRouter

} from "vue-router";








const auth =
useAuthStore();



const router =
useRouter();



const message =
ref("");






const form =
reactive({


email:"",


password:""


});










async function handleLogin(){



try{



await auth.login(form);





if(
auth.user.role === "admin"
){



message.value =
"Gunakan halaman admin";



auth.logout();



return;



}






router.push(

router.currentRoute.value.query.redirect

||

"/products"

);






}catch(error){



message.value =
"Login gagal";



console.log(error);



}



}


</script>