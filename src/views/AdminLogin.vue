<template>


<div
class="
min-h-screen
bg-gradient-to-br
from-gray-950
via-gray-900
to-pink-950
flex
items-center
justify-center
relative
overflow-hidden
"
>





<!-- BACKGROUND EFFECT -->


<div
class="
absolute
w-96
h-96
bg-pink-500/20
rounded-full
blur-3xl
-top-20
-right-20
"
></div>



<div
class="
absolute
w-80
h-80
bg-white/10
rounded-full
blur-3xl
-bottom-20
-left-20
"
></div>








<!-- LOGIN CARD -->


<div
class="
relative
z-10
w-[450px]
bg-white/10
backdrop-blur-xl
border
border-white/20
rounded-[40px]
shadow-2xl
p-12
"
>





<!-- BRAND -->


<div
class="
text-center
mb-12
"
>


<div
class="
mx-auto
w-28
h-28
rounded-full
bg-white
flex
items-center
justify-center
shadow-xl
"
>


<h1
class="
font-serif
text-7xl
text-gray-900
"
>

C

</h1>



</div>






<h2
class="
mt-6
tracking-[10px]
text-white
font-bold
text-2xl
"
>

CORAL

</h2>



<p
class="
text-pink-300
font-bold
tracking-widest
"
>

ADMIN CENTER

</p>




</div>









<form
@submit.prevent="handleLogin"
>





<label
class="
text-white
font-semibold
"
>

Email

</label>



<input

v-model="form.email"

placeholder="Admin email"

class="
mt-3
mb-6
w-full
bg-white/20
border
border-white/30
text-white
placeholder-gray-300
rounded-2xl
p-5
outline-none
focus:ring-2
focus:ring-pink-400
"

/>









<label
class="
text-white
font-semibold
"
>

Password

</label>





<input

v-model="form.password"

type="password"

placeholder="Password"

class="
mt-3
mb-8
w-full
bg-white/20
border
border-white/30
text-white
placeholder-gray-300
rounded-2xl
p-5
outline-none
focus:ring-2
focus:ring-pink-400
"

/>









<button

class="
w-full
bg-white
text-gray-900
font-bold
py-5
rounded-full
hover:bg-pink-500
hover:text-white
hover:scale-105
transition
"

>

Access Dashboard

</button>






</form>









<p
class="
text-center
text-gray-300
mt-8
text-sm
"
>

Authorized Staff Only

</p>







<p
class="
text-red-300
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
auth.user.role !== "admin"
){



message.value =
"Akun bukan admin";




auth.logout();




return;



}







router.push(
"/admin/dashboard"
);








}catch(error){




message.value =
"Login admin gagal";




}




}



</script>