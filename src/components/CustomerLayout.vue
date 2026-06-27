<template>


<div
class="min-h-screen bg-gradient-to-br from-white via-pink-50 to-rose-100"
>



<!-- NAVBAR -->


<nav

class="
bg-white/60
backdrop-blur-xl
shadow-sm
px-16
py-5
flex
justify-between
items-center
sticky
top-0
z-50
border-b
border-white
"

>






<!-- LOGO -->


<div

@click="router.push('/products')"

class="
cursor-pointer
flex
items-center
gap-4
"

>


<div
class="
w-14
h-14
rounded-full
bg-white
shadow-xl
flex
items-center
justify-center
text-4xl
font-serif
text-gray-900
"
>

C

</div>




<div>


<h1

class="
tracking-[8px]
font-bold
text-gray-800
text-xl
"

>

CORALDAISY

</h1>



<p
class="text-xs tracking-[4px] text-pink-400"
>

BAG COLLECTION

</p>


</div>



</div>









<!-- MENU -->


<div
class="
flex
items-center
gap-3
bg-white/50
backdrop-blur-xl
px-5
py-3
rounded-full
shadow-lg
border
border-white/70
"
>




<button

@click="router.push('/products')"

class="
px-5
py-2
rounded-full
hover:bg-pink-100
hover:text-pink-500
transition
"

>

Collection

</button>






<template v-if="auth.user">



<button

@click="router.push('/cart')"

class="
px-5
py-2
rounded-full
hover:bg-pink-100
hover:text-pink-500
transition
"

>

Bag

</button>





<button

@click="router.push('/orders')"

class="
px-5
py-2
rounded-full
hover:bg-pink-100
hover:text-pink-500
transition
"

>

Orders

</button>


<button

@click="router.push('/returns')"

class="hover:text-pink-500 transition"

>

Returns

</button>


<button

@click="router.push('/profile')"

class="
px-5
py-2
rounded-full
hover:bg-pink-100
hover:text-pink-500
transition
"

>

Account

</button>








<button

@click="logout"

class="
ml-3
px-6
py-2
rounded-full
bg-gray-900
text-white
shadow-lg
hover:scale-105
transition
"

>

Logout

</button>




</template>









<template v-else>




<button

@click="router.push('/login')"

class="
px-5
py-2
rounded-full
hover:bg-pink-100
transition
"

>

Login

</button>





<button

@click="router.push('/register')"

class="
px-6
py-2
rounded-full
bg-gray-900
text-white
shadow-lg
hover:scale-105
transition
"

>

Join

</button>




</template>





</div>
</nav>










<!-- CONTENT -->


<main class="p-10">


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






function logout(){



auth.logout();



router.push(
"/login"
);



}



</script>