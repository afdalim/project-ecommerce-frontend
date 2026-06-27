<template>


<AdminLayout>





<!-- WELCOME CARD -->


<div
class="
relative
overflow-hidden
bg-gray-900
rounded-[40px]
shadow-2xl
p-10
mb-10
text-white
"
>


<div
class="
absolute
w-80
h-80
bg-pink-500/30
rounded-full
blur-3xl
-right-20
-top-20
"
></div>



<div class="relative">


<p
class="
tracking-[8px]
text-pink-300
font-bold
"
>

CORAL DAISY

</p>




<h1
class="
text-5xl
font-bold
mt-4
"
>

Welcome Back,

<span class="text-pink-300">

{{ auth.user?.name }}

</span>

</h1>




<p class="mt-5 text-gray-300">

Monitor your ecommerce activity and performance

</p>



</div>


</div>









<!-- STATS -->


<div
class="
grid
grid-cols-4
gap-8
mb-10
"
>




<div

v-for="card in cards"

:key="card.title"

class="
bg-white/80
backdrop-blur
rounded-[35px]
shadow-xl
p-8
hover:-translate-y-2
transition
"

>



<div
class="
text-4xl
mb-6
"
>

{{ card.icon }}

</div>



<p
class="
text-gray-400
font-semibold
"
>

{{ card.title }}

</p>



<h2
class="
text-3xl
font-bold
mt-3
"
>

{{ card.value }}

</h2>



</div>



</div>









<!-- RECENT ORDERS -->


<div
class="
bg-white/80
rounded-[40px]
shadow-xl
p-10
"
>



<div
class="
flex
justify-between
items-center
mb-8
"
>


<div>


<h2
class="
text-3xl
font-bold
"
>

Recent Orders

</h2>



<p class="text-gray-400 mt-2">

Latest customer transactions

</p>


</div>


</div>







<div
class="
space-y-5
"
>




<div

v-for="order in orders"

:key="order.id"

class="
bg-gray-50
rounded-3xl
p-6
flex
justify-between
items-center
hover:bg-pink-50
transition
"

>





<div>


<p
class="
font-bold
text-lg
"
>

{{ order.order_number }}

</p>



<p
class="
text-gray-400
text-sm
mt-1
"
>

Customer Order

</p>



</div>






<span
class="
px-5
py-2
rounded-full
bg-yellow-100
text-yellow-600
font-bold
"
>


{{ order.status }}


</span>






</div>








<p

v-if="orders.length === 0"

class="
text-center
text-gray-400
py-10
"

>

No recent orders

</p>







</div>



</div>





</AdminLayout>


</template>











<script setup>


import {

ref,

computed,

onMounted

} from "vue";



import {

useAuthStore

} from "../stores/auth";



import api from "../api/axios";



import AdminLayout from "../components/AdminLayout.vue";







const auth =
useAuthStore();





const stats =
ref({});





const orders =
ref([]);










const cards =
computed(()=>[


{

title:"Total Orders",

icon:"🛒",

value:
stats.value.total_orders ?? 0

},




{

title:"Revenue",

icon:"💰",

value:
formatRupiah(
stats.value.total_revenue
)

},




{

title:"Customers",

icon:"👥",

value:
stats.value.total_customers ?? 0

},




{

title:"Products",

icon:"👜",

value:
stats.value.total_products ?? 0

}



]);









async function getDashboard(){




const response =
await api.get(
"/admin/dashboard"
);




stats.value =
response.data.stats;





orders.value =
response.data.recent_orders;





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


getDashboard();


});



</script>