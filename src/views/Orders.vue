<template>


<CustomerLayout>


<div class="max-w-6xl mx-auto">






<!-- HEADER -->


<div class="text-center mb-14">


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

Your Order Collection

</p>


</div>









<!-- EMPTY -->


<div

v-if="orders.length === 0"

class="
bg-white/70
rounded-[35px]
shadow-xl
p-16
text-center
"

>


<h2 class="text-3xl font-bold">

No Orders Yet

</h2>


<p class="text-gray-400 mt-3">

Your Coral Daisy journey starts here

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











<!-- ORDER LIST -->


<div class="space-y-8">


<div

v-for="order in orders"

:key="order.id"

class="
bg-white/70
backdrop-blur-xl
rounded-[35px]
shadow-xl
border
border-white
p-10
hover:-translate-y-2
transition
"

>

<div class="flex justify-between">



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



<h2 class="text-3xl font-bold mt-3">

{{ order.order_number }}

</h2>




<p class="text-gray-400 mt-6">

Total Payment

</p>



<p
class="
text-pink-500
font-bold
text-4xl
"
>

{{ formatRupiah(order.final_amount) }}

</p>




</div>







<span

v-if="order.payment_status === 'completed'"

class="
bg-green-100
text-green-600
px-6
py-3
rounded-full
font-bold
h-fit
"

>

✓ Paid

</span>





<span

v-else

class="
bg-yellow-100
text-yellow-600
px-6
py-3
rounded-full
font-bold
h-fit
"

>

Waiting Payment

</span>




</div>











<!-- STATUS -->


<div
class="
mt-8
bg-white
rounded-3xl
p-6
shadow
"
>


<p>

Order Status :

<b>

{{ order.status }}

</b>

</p>



<p class="mt-3">

Payment :

<b>

{{ order.payment_status }}

</b>


</p>



</div>









<!-- BUTTON -->


<div
class="
flex
gap-5
mt-8
items-center
"
>




<button

@click="router.push('/orders/'+order.id)"

class="
bg-gray-900
text-white
px-8
py-3
rounded-full
"

>

Detail

</button>






<button
v-if="
order.payment_status == 'pending'
"
@click="payAgain(order.id)"
class="
bg-pink-500
text-white
px-6
py-3
rounded-full
font-bold
hover:bg-pink-600
hover:scale-105
transition
duration-200
cursor-pointer
shadow-lg
"
>
Bayar Sekarang
</button>








<button

v-if="
order.payment_status === 'completed'
&&
order.status === 'delivered'
"

@click="router.push('/review/' + order.items[0].product_id)"

class="
bg-yellow-400
text-white
px-8
py-3
rounded-full
"

>

Review ⭐

</button>









<button

v-if="
order.payment_status === 'completed'
&&
order.status === 'delivered'
&&
!order.return_request
&&
!order.return
"

@click="router.push('/return/' + order.id)"

class="
bg-red-500
text-white
px-8
py-3
rounded-full
"

>

Return

</button>

<p

v-if="
order.return_request
||
order.return
"

class="
text-gray-400
font-bold
"

>

Return Submitted ✓

</p>

<p

v-if="order.return-request"

class="
text-gray-400
font-bold
"

>

Return Submitted ✓

</p>



<p

v-if="
order.payment_status === 'completed'
&&
order.status === 'processing'
"

class="text-gray-400"

>

Your bag is being prepared ✨

</p>





</div>




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

useRouter

} from "vue-router";



import api from "../api/axios";



import CustomerLayout from "../components/CustomerLayout.vue";







const router =
useRouter();




const orders =
ref([]);




const payAgain = async(orderId)=>{

    const response =
    await api.post(
        '/payments/create',
        {
            order_id:orderId
        }
    )

    window.snap.pay(
        response.data.snap_token
    )
}








async function getOrders(){



const response =
await api.get(
"/orders"
);



orders.value =
response.data.data;



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