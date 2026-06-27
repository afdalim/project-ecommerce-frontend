<template>


<CustomerLayout>


<div
class="
max-w-4xl
mx-auto
"
>



<!-- HEADER -->


<div
class="
text-center
mb-12
"
>


<h1
class="
font-serif
text-8xl
text-gray-800
"
>

C

</h1>


<h2
class="
tracking-[12px]
font-bold
text-3xl
"
>

CORALDAISY

</h2>


<p class="text-gray-400 mt-4">

My Account

</p>


</div>







<div

v-if="user"

class="
bg-white/70
backdrop-blur-xl
rounded-[45px]
shadow-2xl
border
border-white
p-12
"

>






<!-- VIEW MODE -->


<div

v-if="!isEditing"

>



<div
class="
text-center
mb-10
"
>


<div
class="
w-32
h-32
mx-auto
rounded-full
bg-pink-100
flex
items-center
justify-center
font-serif
text-7xl
shadow
"
>

C

</div>



<h1
class="
text-4xl
font-bold
mt-6
"
>

{{ user.name }}

</h1>



<p class="text-gray-400 mt-2">

{{ user.email }}

</p>


</div>








<div
class="
grid
grid-cols-2
gap-6
"
>



<div class="bg-white rounded-3xl p-6 shadow">

<p class="text-gray-400">
Phone
</p>

<h3 class="font-bold mt-2">

{{ user.phone ?? "-" }}

</h3>

</div>





<div class="bg-white rounded-3xl p-6 shadow">

<p class="text-gray-400">
Gender
</p>

<h3 class="font-bold mt-2">

{{ user.gender ?? "-" }}

</h3>

</div>






<div class="bg-white rounded-3xl p-6 shadow">

<p class="text-gray-400">
Birth Date
</p>

<h3 class="font-bold mt-2">

{{ user.birth_date ?? "-" }}

</h3>

</div>






<div class="bg-white rounded-3xl p-6 shadow">

<p class="text-gray-400">
Bio
</p>

<h3 class="font-bold mt-2">

{{ user.bio ?? "-" }}

</h3>

</div>



</div>









<button

@click="startEdit"

class="
mt-10
w-full
bg-gray-900
text-white
py-5
rounded-full
hover:bg-pink-500
transition
"

>

Edit Profile

</button>







<button

@click="logout"

class="
mt-5
w-full
bg-red-500
text-white
py-5
rounded-full
"

>

Logout

</button>



</div>









<!-- EDIT MODE -->


<div v-else>




<h2
class="
text-4xl
font-bold
mb-10
"
>

Edit Profile

</h2>






<input

v-model="editUser.name"

class="input-profile"

placeholder="Name"

/>



<input

v-model="editUser.phone"

class="input-profile"

placeholder="Phone"

/>






<select

v-model="editUser.gender"

class="input-profile"

>

<option value="">

Select Gender

</option>


<option value="male">

Male

</option>


<option value="female">

Female

</option>


</select>






<input

type="date"

v-model="editUser.birth_date"

class="input-profile"

/>







<textarea

v-model="editUser.bio"

class="
input-profile
h-32
"

placeholder="Bio"

></textarea>








<button

@click="updateProfile"

class="
mt-8
w-full
bg-pink-500
text-white
py-5
rounded-full
"

>

Save Changes

</button>






<button

@click="isEditing=false"

class="
mt-5
w-full
border
py-5
rounded-full
"

>

Cancel

</button>






</div>






</div>




</div>


</CustomerLayout>


</template>




<script setup>


import {

ref,

reactive,

onMounted

} from "vue";



import {

useRouter

} from "vue-router";



import CustomerLayout from "../components/CustomerLayout.vue";



import api from "../api/axios";



import {

useAuthStore

} from "../stores/auth";








const router =
useRouter();




const auth =
useAuthStore();






const user =
ref(null);





const isEditing =
ref(false);





const editUser =
reactive({


name:"",


phone:"",


gender:"",


birth_date:"",


bio:""


});









async function getProfile(){



try{



const response =
await api.get(
"/auth/me"
);




user.value =
response.data.user
??
response.data;




}catch(error){



console.log(
error
);



}



}










function startEdit(){



isEditing.value =
true;





editUser.name =
user.value.name;



editUser.phone =
user.value.phone;



editUser.gender =
user.value.gender;



editUser.birth_date =
user.value.birth_date;



editUser.bio =
user.value.bio;




}











async function updateProfile(){




try{




const response =
await api.put(
"/auth/profile",
{



name:
editUser.name,



phone:
editUser.phone,



gender:
editUser.gender,



birth_date:
editUser.birth_date,



bio:
editUser.bio



}
);






user.value =
response.data.user;





auth.user =
response.data.user;






isEditing.value =
false;





alert(
"Profile updated successfully 🌸"
);






}catch(error){



console.log(
error.response?.data
);




alert(
"Failed update profile"
);



}




}











function logout(){



auth.logout();




router.push(
"/login"
);



}










onMounted(()=>{



getProfile();



});



</script>



<style scoped>


.input-profile{

width:100%;
background:white;
border:1px solid #e5e7eb;
border-radius:16px;
padding:20px;
margin-bottom:20px;
outline:none;


}



.input-profile:focus{

border-color:#f9a8d4;
box-shadow:0 0 0 2px #fbcfe8;


}


</style>