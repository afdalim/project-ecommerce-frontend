<template>


<CustomerLayout>


<div class="max-w-4xl mx-auto">


<h1 class="text-4xl font-bold mb-8">

Detail Pesanan 📋

</h1>




<div
v-if="order"
class="bg-white rounded-3xl shadow-lg p-8"
>


<h2 class="text-2xl font-bold">

{{ order.order_number }}

</h2>



<p class="mt-5">

Status:

<span class="font-bold text-pink-500">

{{ order.status }}

</span>

</p>



<p>

Payment:

<span class="font-bold">

{{ order.payment_status }}

</span>


</p>





<hr class="my-6">





<h2 class="text-xl font-bold mb-5">

Produk Dibeli

</h2>





<div

v-for="item in order.items"

:key="item.id"

class="flex justify-between border-b py-4"

>



<div>


<p class="font-bold">

{{ item.product.name }}

</p>


<p class="text-gray-500">

Qty:
{{ item.quantity }}

</p>


</div>




<p class="font-bold">

{{ formatRupiah(item.price) }}

</p>



</div>







<div class="mt-8 bg-gray-50 rounded-2xl p-6 space-y-4">


<h2 class="text-xl font-bold mb-5">

Ringkasan Pembayaran

</h2>



<div class="flex justify-between">

<span>
Subtotal Produk
</span>

<b>
{{ formatRupiah(order.total_amount) }}
</b>

</div>





<div class="flex justify-between">

<span>
Pajak (10%)
</span>

<b>
{{ formatRupiah(order.tax_amount) }}
</b>

</div>





<div class="flex justify-between">

<span>
Ongkos Kirim
</span>

<b>
{{ formatRupiah(order.shipping_cost) }}
</b>

</div>





<hr>





<div class="flex justify-between text-2xl font-bold text-pink-500">


<span>

Total Pembayaran

</span>


<span>

{{ formatRupiah(order.final_amount) }}

</span>


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

useRoute

} from "vue-router";



import api from "../api/axios";


import CustomerLayout from "../components/CustomerLayout.vue";




const route =
useRoute();



const order =
ref(null);




async function getDetail(){


const response =
await api.get(
"/orders/" + route.params.id
);


console.log(
"DETAIL ORDER:",
response.data
);


order.value =
response.data;


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
.format(value);


}


onMounted(()=>{


getDetail();


});


</script>