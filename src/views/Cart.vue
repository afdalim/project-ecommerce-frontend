<template>


<CustomerLayout>


<div>




<!-- HEADER -->


<div
class="
mb-12
text-center
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
text-gray-800
"
>

CORALDAISY

</h2>



<p
class="
text-gray-400
mt-4
tracking-wide
"
>

Your Shopping Bag Collection

</p>


</div>








<!-- EMPTY -->


<div

v-if="cart.items.length === 0"

class="
bg-white/70
rounded-[35px]
shadow-xl
p-16
text-center
"

>


<h2
class="text-3xl font-bold"
>

Your Bag is Empty

</h2>


<p
class="text-gray-400 mt-3"
>

Discover your favorite Coral Daisy collection

</p>



<button

@click="router.push('/products')"

class="
mt-8
bg-gray-900
text-white
px-10
py-4
rounded-full
hover:bg-pink-500
transition
"

>

Shop Collection

</button>



</div>









<div

v-else

class="
grid
grid-cols-3
gap-10
"

>





<!-- ITEMS -->


<div
class="
col-span-2
space-y-6
"
>





<div

v-for="item in cart.items"

:key="item.id"


class="
bg-white/70
backdrop-blur-xl
rounded-[35px]
shadow-xl
p-6
flex
items-center
gap-8
border
border-white
"

>






<!-- IMAGE -->


<div
class="
w-40
h-40
rounded-3xl
overflow-hidden
bg-pink-50
"
>



<img

v-if="item.product.image_url"

:src="imagePath(item.product.image_url)"

class="
w-full
h-full
object-cover
"

/>




<div

v-else

class="
w-full
h-full
flex
items-center
justify-center
font-serif
text-6xl
"

>

C

</div>



</div>









<!-- INFO -->


<div
class="flex-1"
>


<p
class="
tracking-[5px]
text-xs
font-bold
text-pink-400
"
>

CORALDAISY

</p>




<h2
class="
text-3xl
font-bold
mt-2
"
>

{{ item.product.name }}

</h2>





<p
class="
text-pink-500
font-bold
text-2xl
mt-3
"
>

{{ formatRupiah(item.product.price) }}

</p>







<!-- QTY -->


<div
class="
flex
items-center
gap-5
mt-6
"
>



<button

@click="updateQuantity(item,item.quantity-1)"

class="
w-10
h-10
rounded-full
bg-gray-100
hover:bg-gray-200
"

>

-

</button>





<span
class="
font-bold
text-xl
"
>

{{ item.quantity }}

</span>





<button

@click="updateQuantity(item,item.quantity+1)"

class="
w-10
h-10
rounded-full
bg-pink-100
text-pink-500
hover:bg-pink-200
"

>

+

</button>




</div>



</div>








<!-- REMOVE -->


<button

@click="removeItem(item.id)"

class="
px-6
py-3
rounded-full
bg-red-50
text-red-400
hover:bg-red-500
hover:text-white
transition
"

>

Remove

</button>





</div>


</div>










<!-- SUMMARY -->


<div

class="
bg-white/70
backdrop-blur-xl
rounded-[35px]
shadow-2xl
border
border-white
p-10
h-fit
sticky
top-32
"

>



<h2
class="
text-3xl
font-bold
mb-8
"
>

Order Summary

</h2>






<div
class="
flex
justify-between
mb-5
text-gray-500
"
>


<span>

Items

</span>


<span>

{{ cart.total_items }}

</span>



</div>






<div
class="
flex
justify-between
items-center
border-t
pt-6
"
>


<span
class="font-bold"
>

Total

</span>


<span
class="
text-pink-500
font-bold
text-3xl
"
>

{{ formatRupiah(cart.total_price) }}

</span>


</div>








<button

@click="router.push('/checkout')"

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

Checkout

</button>




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


import api from "../api/axios";


import {
useRouter
} from "vue-router";


import CustomerLayout from "../components/CustomerLayout.vue";







const router =
useRouter();



const cart =
ref({

items:[]

});







function imagePath(path){


return "http://127.0.0.1:8000" + path;


}









async function getCart(){



const response =
await api.get(
"/cart"
);




cart.value =
response.data;



}










async function updateQuantity(item,quantity){



if(quantity <= 0){


removeItem(item.id);


return;


}




await api.put(

`/cart/items/${item.id}`,

{

quantity

}

);




getCart();



}









async function removeItem(id){



await api.delete(

`/cart/items/${id}`

);



getCart();



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


getCart();


});



</script>