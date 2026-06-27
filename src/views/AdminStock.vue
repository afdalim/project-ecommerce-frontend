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

INVENTORY CENTER

</p>



<h1
class="
text-5xl
font-bold
text-gray-800
mt-3
"
>

Stock Management

</h1>



<p class="text-gray-400 mt-3">

Monitor Coral Daisy product availability

</p>


</div>









<!-- EMPTY -->


<div

v-if="stocks.length === 0"

class="
bg-white
rounded-[40px]
shadow-xl
p-16
text-center
"
>


<h2 class="text-3xl font-bold">

No Stock Data

</h2>



<p class="text-gray-400 mt-3">

Product inventory will appear here

</p>


</div>










<!-- STOCK LIST -->


<div
class="
bg-white/80
rounded-[40px]
shadow-xl
p-10
"
>



<div class="space-y-6">





<div

v-for="stock in stocks"

:key="stock.id"

class="
bg-gray-50
rounded-3xl
p-8
flex
justify-between
items-center
hover:bg-pink-50
transition
"

>







<!-- PRODUCT -->


<div>



<p
class="
tracking-[5px]
text-pink-400
font-bold
text-sm
"
>

PRODUCT

</p>



<h2
class="
text-2xl
font-bold
mt-2
"
>

{{ stock.product?.name }}

</h2>



</div>









<!-- STOCK DETAIL -->


<div
class="
flex
gap-8
items-center
"
>





<div class="text-center">


<p class="text-gray-400">

Quantity

</p>


<h3 class="text-2xl font-bold">

{{ stock.quantity }}

</h3>


</div>






<div class="text-center">


<p class="text-gray-400">

Available

</p>


<h3
class="
text-2xl
font-bold
text-green-500
"
>

{{ stock.available }}

</h3>


</div>







<div class="text-center">


<p class="text-gray-400">

Reserved

</p>



<h3
class="
text-2xl
font-bold
text-yellow-500
"
>

{{ stock.reserved_quantity }}

</h3>


</div>









<button

@click="editStock(stock)"

class="
bg-gray-900
text-white
px-8
py-4
rounded-full
hover:bg-pink-500
transition
"

>

Update

</button>






</div>







</div>






</div>



</div>











<!-- UPDATE MODAL -->


<div

v-if="editing"

class="
fixed
inset-0
bg-black/50
flex
items-center
justify-center
"

>




<div
class="
bg-white
rounded-[40px]
shadow-2xl
p-10
w-[500px]
"
>





<h2
class="
text-3xl
font-bold
mb-8
"
>

Update Stock

</h2>







<label class="font-bold">

Quantity

</label>





<input

v-model="editForm.quantity"

class="
border
rounded-2xl
p-5
w-full
mt-3
mb-8
"

/>









<div
class="
flex
justify-end
gap-4
"
>





<button

@click="editing=false"

class="
border
px-8
py-3
rounded-full
"

>

Cancel

</button>






<button

@click="updateStock"

class="
bg-pink-500
text-white
px-8
py-3
rounded-full
"

>

Save

</button>





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


import {
    useRouter
} from "vue-router";


import api from "../api/axios";
import AdminLayout from "../components/AdminLayout.vue";

const router = useRouter();


const stocks = ref([]);
const editing = ref(false);


const editForm = ref({

    id:null,

    quantity:0

});


async function getStock(){


    const response =
        await api.get("/admin/stock");


    stocks.value =
        response.data.data;


}

async function updateStock(){


    await api.put(
        `/admin/stock/${editForm.value.id}`,
        editForm.value
    );


    editing.value = false;


    const response =
        await api.get("/admin/stock");


    stocks.value =
        response.data.data;


}



function editStock(stock){


    editing.value = true;


   editForm.value = {

 id:stock.id,

 quantity:stock.quantity

};


}

onMounted(()=>{

    getStock();

});


</script>