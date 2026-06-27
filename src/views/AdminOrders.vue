<template>


<AdminLayout>


<div class="max-w-6xl mx-auto">






<!-- HEADER -->


<div class="mb-12">


<p
class="
tracking-[8px]
text-pink-400
font-bold
"
>

ORDER CENTER

</p>



<h1
class="
text-5xl
font-bold
text-gray-800
mt-3
"
>

Manage Orders

</h1>




<p class="text-gray-400 mt-3">

Monitor and process customer purchases

</p>


</div>









<!-- EMPTY -->


<div

v-if="orders.length === 0"

class="
bg-white
rounded-[40px]
shadow-xl
p-16
text-center
"

>


<h2 class="text-3xl font-bold">

No Orders

</h2>



<p class="text-gray-400 mt-3">

Customer orders will appear here

</p>


</div>










<!-- ORDERS -->


<div class="space-y-8">



<div

v-for="order in orders"

:key="order.id"

class="
bg-white/80
backdrop-blur
rounded-[40px]
shadow-xl
p-10
hover:-translate-y-2
transition
"

>







<!-- TOP -->


<div
class="
flex
justify-between
items-start
"
>




<div>



<p
class="
tracking-[5px]
text-pink-400
font-bold
text-sm
"
>

ORDER NUMBER

</p>




<h2
class="
text-3xl
font-bold
mt-3
"
>

{{ order.order_number }}

</h2>





<p class="text-gray-400 mt-5">

Customer

</p>



<h3 class="font-bold text-xl">

{{ order.user?.name ?? "Customer" }}

</h3>



</div>








<div class="text-right">


<p class="text-gray-400">

Total Revenue

</p>



<h2
class="
text-3xl
font-bold
text-pink-500
mt-2
"
>

{{ formatRupiah(order.final_amount) }}

</h2>



</div>




</div>











<!-- INFO -->


<div
class="
grid
grid-cols-2
gap-5
mt-8
"
>



<div
class="
bg-gray-50
rounded-3xl
p-6
"
>


<p class="text-gray-400">

Payment Status

</p>



<span
class="
inline-block
mt-3
px-5
py-2
rounded-full
font-bold
bg-green-100
text-green-600
"
>


{{ order.payment_status }}


</span>



</div>









<div
class="
bg-gray-50
rounded-3xl
p-6
"
>


<p class="text-gray-400">

Order Status

</p>




<span
class="
inline-block
mt-3
px-5
py-2
rounded-full
font-bold
bg-pink-100
text-pink-600
"
>

{{ order.status }}

</span>



</div>




</div>









<!-- ACTION -->


<div
class="
flex
gap-5
mt-8
"
>





<button

v-if="order.status === 'processing'"

@click="updateStatus(order.id,'shipped')"

class="
bg-gray-900
text-white
px-8
py-4
rounded-full
hover:bg-blue-500
transition
"

>

Ship Order 📦

</button>








<button

v-if="order.status === 'shipped'"

@click="updateStatus(order.id,'delivered')"

class="
bg-green-500
text-white
px-8
py-4
rounded-full
hover:bg-green-600
transition
"

>

Complete Delivery ✓

</button>









<p

v-if="order.status === 'delivered'"

class="
text-green-500
font-bold
"

>

Order Completed ✓

</p>





</div>






</div>



</div>






</div>


</AdminLayout>


</template>








<script setup>


import {

ref,

onMounted

} from "vue";



import api from "../api/axios";


import AdminLayout from "../components/AdminLayout.vue";





const orders =
ref([]);





async function getOrders(){



const response =
await api.get("/admin/orders");



orders.value =
response.data;



}






async function updateStatus(id,status){



try{


await api.put(
`/admin/orders/${id}/status`,
{

status: status

}
);



alert(
"Status berhasil diubah 🔥"
);



getOrders();




}catch(error){


console.log(error);


}



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


getOrders();


});


</script>