<template>


<CustomerLayout>


<div v-if="product">






<!-- PRODUCT DETAIL -->


<div

class="
grid
grid-cols-2
gap-14
bg-white/60
backdrop-blur-xl
rounded-[45px]
shadow-2xl
border
border-white
overflow-hidden
p-10
"

>





<!-- IMAGE -->


<div

class="
relative
rounded-[35px]
overflow-hidden
bg-pink-50
shadow-xl
group
"

>



<img

v-if="product.image_url"

:src="imagePath(product.image_url)"

class="
w-full
h-[600px]
object-cover
group-hover:scale-110
transition
duration-700
"

/>




<div

v-else

class="
h-[600px]
flex
items-center
justify-center
text-9xl
font-serif
"

>

C

</div>






<div

class="
absolute
top-8
left-8
bg-white/80
backdrop-blur
px-6
py-3
rounded-full
shadow
tracking-[5px]
text-sm
"

>

CORALDAISY

</div>




</div>












<!-- INFO -->


<div

class="
flex
flex-col
justify-center
"

>



<p

class="
tracking-[10px]
text-pink-400
font-bold
mb-5
"

>

NEW COLLECTION

</p>






<h1

class="
text-6xl
font-bold
text-gray-800
leading-tight
"

>


{{ product.name }}


</h1>







<p

class="
text-gray-400
uppercase
tracking-wide
mt-5
"

>

{{ product.brand }}

</p>









<p

class="
text-pink-500
text-5xl
font-bold
mt-10
"

>


{{ formatRupiah(product.price) }}


</p>








<div

class="
mt-10
bg-white/70
rounded-3xl
p-7
shadow
text-gray-600
leading-relaxed
"

>



<h3

class="
font-bold
text-gray-800
mb-3
"

>

Product Details

</h3>




{{ product.description }}



</div>









<button


@click="addCart"


class="
mt-12
bg-gray-900
text-white
py-5
rounded-full
font-bold
text-lg
shadow-xl
hover:bg-pink-500
hover:scale-105
transition
duration-300
"

>


Add To Bag


</button>







</div>



</div>












<!-- REVIEWS -->


<div

class="
mt-16
"

>



<h2

class="
text-4xl
font-bold
mb-8
text-gray-800
"

>


Customer Stories ⭐


</h2>







<div

v-for="review in reviews"

:key="review.id"


class="
bg-white/70
backdrop-blur-xl
rounded-3xl
shadow-lg
p-7
mb-5
border
border-white
"

>




<p class="text-yellow-500 text-xl">


{{ "⭐".repeat(review.rating) }}


</p>






<p

class="
font-bold
mt-3
"

>


{{ review.user?.name }}


</p>






<p

class="
text-gray-500
mt-3
"

>


{{ review.comment }}


</p>





</div>








<div

v-if="reviews.length === 0"

class="
bg-white/60
rounded-3xl
p-8
text-gray-400
text-center
"

>


No reviews yet


</div>





</div>






</div>



</CustomerLayout>


</template>









<script setup>


import {

ref,

onMounted

} from "vue";



import {

useRoute,

useRouter

} from "vue-router";



import CustomerLayout from "../components/CustomerLayout.vue";


import api from "../api/axios";



import {

useAuthStore

} from "../stores/auth";







const route =
useRoute();



const router =
useRouter();



const auth =
useAuthStore();





const product =
ref(null);



const reviews =
ref([]);








function imagePath(path){

    if(!path){
        return '/placeholder.png'
    }

    const filename =
        path.split('/').pop()

    return `https://project-ecommerce-backend-production.up.railway.app/product-image/${filename}`

}











async function getProduct(){



const response =
await api.get(
`/products/${route.params.id}`
);




product.value =
response.data.data
??
response.data;



}










async function getReviews(){



const response =
await api.get(
`/products/${route.params.id}/reviews`
);




reviews.value =
response.data.data
??
response.data;



}










async function addCart(){



if(!auth.user){



alert(
"Silakan login terlebih dahulu"
);




router.push({

path:"/login",


query:{

redirect:
route.fullPath

}


});




return;


}








await api.post(
"/cart/add",
{


product_id:
route.params.id,


quantity:
1


}
);






alert(
"Product added to your bag 👜"
);



}









function formatRupiah(value){



return new Intl.NumberFormat(

"id-ID",

{

style:"currency",

currency:"IDR",

minimumFractionDigits:0

}

)

.format(value ?? 0);



}








onMounted(()=>{


getProduct();


getReviews();



});



</script>