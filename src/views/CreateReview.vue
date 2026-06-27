<template>


<CustomerLayout>


<div
class="
max-w-4xl
mx-auto
"
>





<!-- BRAND -->


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



<p
class="
text-gray-400
mt-4
"
>

Share Your Experience

</p>


</div>








<!-- REVIEW CARD -->


<div
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





<div
class="
text-center
mb-10
"
>


<h1
class="
text-5xl
font-bold
"
>

Product Review

</h1>



<p
class="
text-gray-400
mt-4
"
>

Tell us about your Coral Daisy experience

</p>



</div>









<!-- STAR -->


<div
class="
text-center
mb-12
"
>


<p
class="
font-bold
mb-5
text-xl
"
>

Your Rating

</p>




<div
class="
flex
justify-center
gap-4
text-5xl
"
>


<button

v-for="star in 5"

:key="star"

@click="rating = star"

class="
hover:scale-125
transition
"

>


<span

v-if="star <= rating"

>

⭐

</span>



<span

v-else

class="opacity-30"

>

⭐

</span>



</button>




</div>


</div>









<!-- COMMENT -->


<div>


<label
class="
font-bold
text-xl
"
>

Your Review

</label>




<textarea

v-model="comment"

placeholder="Write your experience with this product..."

class="
mt-5
w-full
h-40
bg-white
rounded-3xl
border
p-6
outline-none
focus:ring-2
focus:ring-pink-300
"

></textarea>




</div>









<!-- BUTTON -->


<button

@click="submitReview"

class="
mt-10
w-full
bg-gray-900
text-white
py-5
rounded-full
font-bold
hover:bg-pink-500
hover:scale-105
transition
"

>

Submit Review ⭐

</button>







<button

@click="router.push('/orders')"

class="
mt-5
w-full
border
py-5
rounded-full
hover:bg-gray-100
transition
"

>

Back To Orders

</button>







</div>






</div>



</CustomerLayout>


</template>











<script setup>


import {

ref

} from "vue";



import {

useRoute,

useRouter

} from "vue-router";



import api from "../api/axios";



import CustomerLayout from "../components/CustomerLayout.vue";







const route =
useRoute();




const router =
useRouter();






const rating =
ref(5);




const comment =
ref("");










async function submitReview(){





if(comment.value.length < 5){



alert(
"Komentar minimal 5 karakter"
);



return;



}







try{




await api.post(

`/products/${route.params.id}/reviews`,

{



rating:
rating.value,



comment:
comment.value



}

);







alert(
"Review berhasil dikirim ⭐"
);







router.push(
"/products/" + route.params.id
);








}catch(error){




console.log(
"ERROR REVIEW:",
error.response?.data
);





alert(
"Gagal memberi review"
);




}




}




</script>