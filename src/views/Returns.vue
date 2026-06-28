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

Return Collection

</p>


</div>







<!-- EMPTY -->


<div

v-if="returns.length === 0"

class="
bg-white/70
rounded-[35px]
shadow-xl
p-16
text-center
"

>


<h2 class="text-3xl font-bold">

No Return Request

</h2>


<p class="text-gray-400 mt-3">

Your return history will appear here

</p>


</div>









<!-- RETURN LIST -->
<div class="space-y-8">

    <div
        v-for="item in returns"
        :key="item.id"
        class="
        bg-white/70
        backdrop-blur-xl
        rounded-[35px]
        shadow-xl
        border
        border-white
        p-10
        "
    >

        <div class="flex justify-between">

            <div>
                <p
                    class="
                    tracking-[5px]
                    text-pink-400
                    font-bold
                    "
                >
                    RETURN REQUEST
                </p>

                <h2
                    class="
                    text-3xl
                    font-bold
                    mt-3
                    "
                >
                    Order #{{ item.order_id }}
                </h2>
            </div>

            <span
                :class="statusClass(item.status)"
                class="
                px-6
                py-3
                rounded-full
                font-bold
                h-fit
                "
            >
                {{ item.status }}
            </span>

        </div>

        <div
            class="
            mt-8
            bg-white
            rounded-3xl
            p-6
            shadow
            "
        >

            <p class="text-gray-400">
                Reason
            </p>

            <h3 class="font-bold mt-2">
                {{ item.reason }}
            </h3>

            <p class="text-gray-400 mt-6">
                Description
            </p>

            <p class="mt-2">
                {{ item.description }}
            </p>

            <div
                v-if="item.images && item.images.length"
                class="mt-8"
            >

                <p class="text-gray-400 mb-3">
                    Evidence Image
                </p>

                <div class="flex gap-4 flex-wrap">

                    <img
                        v-for="image in item.images"
                        :key="image"
                        :src="returnImagePath(image)"
                        class="
                        w-32
                        h-32
                        object-cover
                        rounded-xl
                        border
                        "
                    />

                </div>

            </div>

            <div
                class="
                mt-8
                bg-pink-50
                rounded-3xl
                p-6
                "
            >

                <p class="text-gray-400">
                    Refund Amount
                </p>

                <h2
                    class="
                    text-3xl
                    font-bold
                    text-pink-500
                    mt-2
                    "
                >
                    {{ formatRupiah(item.refund_amount) }}
                </h2>

                <p class="text-gray-400 mt-5">
                    Refund Status
                </p>

                <span
                    class="
                    inline-block
                    mt-2
                    px-5
                    py-2
                    rounded-full
                    font-bold
                    bg-green-100
                    text-green-600
                    "
                >
                    {{ item.refund_status }}
                </span>

            </div>

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

const BASE_URL =
import.meta.env.VITE_API_URL.replace('/api', '');

import api from "../api/axios";


import CustomerLayout from "../components/CustomerLayout.vue";







const returns =
ref([]);










async function getReturns(){



try{



const response =
await api.get(
"/returns"
);



returns.value =
response.data.data
??
response.data;




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

function returnImagePath(path){

    if(!path){
        return '';
    }

    const filename =
        path.split('/').pop();

    return `https://project-ecommerce-backend-production.up.railway.app/return-image/${filename}`;
}


function statusClass(status){



if(status === "approved"){


return "bg-green-100 text-green-600";


}




if(status === "rejected"){


return "bg-red-100 text-red-600";


}




return "bg-yellow-100 text-yellow-600";



}










onMounted(()=>{


getReturns();


});



</script>