<template>
<CustomerLayout>

<div class="min-h-screen flex items-center justify-center">

    <div
    class="
    bg-white/70
    backdrop-blur-xl
    rounded-[45px]
    shadow-2xl
    border
    border-white
    p-16
    text-center
    max-w-xl
    w-full
    ">

        <h1
        class="
        font-serif
        text-8xl
        text-gray-800
        ">
            C
        </h1>

        <h2
        class="
        tracking-[12px]
        font-bold
        text-3xl
        ">
            CORALDAISY
        </h2>

        <p
        class="
        text-gray-400
        mt-4
        ">
            Redirecting to secure payment...
        </p>

        <div
        class="
        mt-10
        animate-pulse
        text-pink-500
        font-bold
        text-xl
        ">
            Opening Midtrans Payment Gateway
        </div>

        <button
        @click="router.push('/orders')"
        class="
        mt-10
        bg-gray-900
        text-white
        px-8
        py-4
        rounded-full
        hover:bg-pink-500
        transition
        ">
            Back to Orders
        </button>

    </div>

</div>

</CustomerLayout>
</template>

<script setup>

import {
    onMounted
} from "vue";

import {
    useRoute,
    useRouter
} from "vue-router";

import CustomerLayout
from "../components/CustomerLayout.vue";

import api
from "../api/axios";

const route =
useRoute();

const router =
useRouter();

function loadMidtransScript(){

    if(window.snap){
        return Promise.resolve();
    }

    return new Promise((resolve)=>{

        const script =
        document.createElement("script");

        script.src =
        "https://app.sandbox.midtrans.com/snap/snap.js";

        script.setAttribute(
            "data-client-key",
            import.meta.env.VITE_MIDTRANS_CLIENT_KEY
        );

        script.onload = resolve;

        document.body.appendChild(script);

    });

}

async function createPayment(){

    try{

        await loadMidtransScript();

        const response =
        await api.post(
            "/payments/create",
            {
                order_id:
                route.params.id
            }
        );

        window.snap.pay(
            response.data.snap_token,
            {

                onSuccess(){
                    router.push(
                        "/orders"
                    );
                },

                onPending(){
                    router.push(
                        "/orders"
                    );
                },

                onError(){
                    router.push(
                        "/orders"
                    );
                },

                onClose(){
                    router.push(
                        "/orders"
                    );
                }

            }
        );

    }
    catch(error){

        console.log(error);

        alert(
            error.response?.data?.message
            ??
            "Failed to create payment"
        );

        router.push(
            "/orders"
        );

    }

}

onMounted(()=>{

    createPayment();

});

</script>