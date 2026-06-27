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

RETURN CENTER

</p>



<h1
class="
text-5xl
font-bold
text-gray-800
mt-3
"
>

Return Management

</h1>



<p class="text-gray-400 mt-3">

Review and manage customer return requests

</p>


</div>










<!-- EMPTY -->


<div

v-if="returns.length === 0"

class="
bg-white
rounded-[40px]
shadow-xl
p-16
text-center
"
>


<h2 class="text-3xl font-bold">

No Return Requests

</h2>


<p class="text-gray-400 mt-3">

All customer returns will appear here

</p>


</div>










<!-- RETURNS -->


<div class="space-y-8">



<div

v-for="item in returns"

:key="item.id"

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

RETURN NUMBER

</p>



<h2
class="
text-3xl
font-bold
mt-3
"
>

{{ item.return_number }}

</h2>




<p class="text-gray-400 mt-5">

Customer

</p>



<h3 class="text-xl font-bold">

{{ item.user?.name ?? "Customer" }}

</h3>



</div>








<span

class="
px-6
py-3
rounded-full
font-bold
h-fit
"

:class="{
'bg-yellow-100 text-yellow-600': item.status === 'requested',
'bg-green-100 text-green-600': item.status === 'approved' || item.status === 'completed',
'bg-red-100 text-red-600': item.status === 'rejected'
}"

>

{{ item.status }}

</span>






</div>










<!-- DETAIL -->


<div
class="
mt-8
bg-gray-50
rounded-3xl
p-6
"
>



<p class="text-gray-400">

Reason

</p>



<h3
class="
font-bold
text-xl
mt-2
"
>

{{ item.reason }}

</h3>




<p class="text-gray-400 mt-6">

Description

</p>



<p>

{{ item.description ?? "No description" }}

</p>

<!-- EVIDENCE IMAGE -->


<div

v-if="item.image_url"

class="
mt-8
"

>


<p class="text-gray-400 mb-3">

Evidence Image

</p>



<img

:src="BASE_URL + item.image_url"



class="
w-72
h-72
object-cover
rounded-3xl
shadow-xl
border
"

/>



</div>






<div

v-else

class="
mt-8
text-gray-400
italic
"

>

No evidence image uploaded

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

v-if="item.status === 'requested'"

@click="approveReturn(item.id)"

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

Approve ✓

</button>








<button

v-if="item.status === 'requested'"

@click="rejectReturn(item.id)"

class="
bg-red-500
text-white
px-8
py-4
rounded-full
hover:bg-red-600
transition
"

>

Reject ✕

</button>









<button

v-if="item.status === 'approved'"

@click="completeReturn(item.id)"

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

Complete Return

</button>









<p

v-if="item.status === 'completed'"

class="
text-green-500
font-bold
"

>

Return Completed ✓

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


import {
    useRouter
} from "vue-router";


import api from "../api/axios";
import AdminLayout from "../components/AdminLayout.vue";


const router = useRouter();


const returns = ref([]);

const BASE_URL =
import.meta.env.VITE_API_URL.replace('/api','');

async function getReturns(){


try{


const response =
await api.get(
"/admin/returns"
);



console.log(
response.data
);



returns.value =
response.data.data
??
response.data;



}catch(error){


console.log(error);


}



}



async function approveReturn(id){

    try{

        await api.put(
            `/admin/returns/${id}/approve`
        );

        alert("Return approved");

        getReturns();

    }catch(error){

        console.log(error);

        alert(
            error.response?.data?.message ??
            "Failed to approve return"
        );

    }

}



async function rejectReturn(id){


    try{

        await api.put(
            `/admin/returns/${id}/approve`
        );

        alert("Return approved");

        getReturns();

    }catch(error){

        console.log(error);

        alert(
            error.response?.data?.message ??
            "Failed to approve return"
        );

    }


}



async function completeReturn(id){


    try{

        await api.put(
            `/admin/returns/${id}/approve`
        );

        alert("Return approved");

        getReturns();

    }catch(error){

        console.log(error);

        alert(
            error.response?.data?.message ??
            "Failed to approve return"
        );

    }


}



onMounted(()=>{


    getReturns();


});


</script>