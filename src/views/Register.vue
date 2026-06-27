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
w-96
h-96
bg-rose-300/30
rounded-full
blur-3xl
-bottom-20
-right-20
"
></div>





<div
class="
relative
z-10
bg-white/70
backdrop-blur-xl
w-[450px]
p-12
rounded-[40px]
shadow-2xl
border
border-white
"
>


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


<div
class="
absolute
inset-0
bg-white/80
rounded-full
shadow-2xl
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



<h1
class="
relative
z-10
font-serif
text-8xl
"
>

C

</h1>


</div>



<h2
class="
tracking-[12px]
font-bold
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

Create Your Account

</p>


</div>






<form @submit.prevent="handleRegister">


<label class="font-semibold text-gray-600">

Name

</label>


<input

v-model="form.name"

class="
w-full
bg-gray-100
rounded-2xl
p-5
mt-2
mb-5
outline-none
focus:ring-2
focus:ring-pink-300
"

placeholder="Your name"

required

/>



<label class="font-semibold text-gray-600">

Email

</label>


<input

v-model="form.email"

type="email"

class="
w-full
bg-gray-100
rounded-2xl
p-5
mt-2
mb-5
outline-none
focus:ring-2
focus:ring-pink-300
"

placeholder="Your email"

required

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
mb-5
outline-none
focus:ring-2
focus:ring-pink-300
"

placeholder="Minimal 8 karakter"

required

/>



<label class="font-semibold text-gray-600">

Confirm Password

</label>


<input

v-model="form.password_confirmation"

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

placeholder="Repeat password"

required

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

REGISTER

</button>


</form>





<p
class="
text-center
mt-8
text-gray-500
"
>

Sudah punya akun?

<span

@click="router.push('/login')"

class="
text-pink-500
font-bold
cursor-pointer
"

>

Login sekarang

</span>

</p>




<p
v-if="message"

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
}
from "vue";

import {
useRouter
}
from "vue-router";

import api from "../api/axios";



const router =
useRouter();


const message =
ref("");



const form =
reactive({

name:"",

email:"",

password:"",

password_confirmation:""

});




async function handleRegister(){

message.value = "";

if(
form.password.length < 8
){

message.value =
"Password minimal 8 karakter";

return;

}


if(
form.password !==
form.password_confirmation
){

message.value =
"Password tidak sama";

return;

}


try{


await api.post(
"/auth/register",
form
);


alert(
"Akun CoralDaisy berhasil dibuat 🌸"
);


router.push(
"/login"
);


}catch(error){


message.value =

error.response?.data?.message

||

"Register gagal";


}


}

</script>