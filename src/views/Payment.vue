<template>


<CustomerLayout>


<div
class="
max-w-5xl
mx-auto
"
>





<!-- HEADER -->


<div
class="
text-center
mb-12
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
"
>

CORALDAISY

</h2>



<p
class="
text-gray-400
mt-4
"
>

Secure Payment Gateway

</p>



</div>







<div
class="
bg-white/70
backdrop-blur-xl
rounded-[45px]
shadow-2xl
border
border-white
p-12
"
>





<!-- TOP -->


<div
class="
flex
justify-between
items-center
mb-12
"
>



<div>


<p
class="
tracking-[8px]
text-pink-400
font-bold
"
>

CHECKOUT

</p>



<h1
class="
text-5xl
font-bold
mt-3
"
>

Payment

</h1>


</div>






<button

@click="cancelPayment"

class="
bg-white
shadow
px-8
py-4
rounded-full
hover:bg-gray-900
hover:text-white
transition
"

>

← Back

</button>




</div>









<!-- PILIH PAYMENT -->


<div

v-if="!paymentCreated"

>





<h2
class="
text-2xl
font-bold
mb-8
"
>

Choose Payment Method

</h2>







<div
class="
grid
grid-cols-3
gap-6
"
>



<label

v-for="method in methods"

:key="method"

class="
bg-white
rounded-3xl
shadow
p-8
cursor-pointer
border
hover:border-pink-400
transition
text-center
"

>



<input

type="radio"

v-model="paymentMethod"

:value="method"

class="mb-5"


/>




<h3
class="
font-bold
text-lg
"
>

{{ method }}

</h3>



</label>




</div>









<!-- BANK -->


<div

v-if="paymentMethod === 'Bank Transfer'"

class="mt-10"

>



<h3
class="
font-bold
mb-5
"
>

Select Bank

</h3>




<div
class="
grid
grid-cols-4
gap-4
"
>


<label

v-for="bank in banks"

:key="bank"

class="
bg-white
rounded-2xl
p-5
shadow
cursor-pointer
text-center
"

>



<input

type="radio"

v-model="detailMethod"

:value="bank"

/>


<p class="mt-3">

{{ bank }}

</p>



</label>



</div>



</div>









<!-- EWALLET -->


<div

v-if="paymentMethod === 'E-Wallet'"

class="mt-10"

>



<h3
class="
font-bold
mb-5
"
>

Select Wallet

</h3>




<div
class="
grid
grid-cols-3
gap-4
"
>



<label

v-for="wallet in wallets"

:key="wallet"

class="
bg-white
rounded-2xl
shadow
p-5
text-center
cursor-pointer
"

>


<input

type="radio"

v-model="detailMethod"

:value="wallet"

/>


<p class="mt-3">

{{ wallet }}

</p>


</label>




</div>



</div>










<button

@click="pay"

class="
mt-12
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

Create Payment

</button>




</div>










<!-- PAYMENT CREATED -->


<div

v-if="paymentCreated"

class="
text-center
bg-white/80
rounded-[35px]
shadow-xl
p-12
"

>






<div

v-if="paymentMethod === 'QRIS'"

>



<div
class="
text-9xl
"
>

▦

</div>



<h2
class="
text-3xl
font-bold
mt-6
"
>

Scan QRIS

</h2>




<p
class="
mt-5
text-gray-500
"
>

{{ paymentCode }}

</p>



</div>









<div v-else>



<p
class="
text-gray-400
"
>

Payment Code

</p>




<h1
class="
text-5xl
font-bold
text-pink-500
mt-5
"
>

{{ paymentCode }}

</h1>




<p
class="
mt-5
font-bold
"
>

{{ detailMethod }}

</p>



</div>








<!-- TIMER -->


<div
class="
mt-12
"
>



<p class="text-gray-400">

Complete payment within

</p>




<h1
class="
text-6xl
font-bold
text-gray-800
mt-3
"
>

{{ minute }}:{{ second }}

</h1>





<p

v-if="expired"

class="
text-red-500
font-bold
mt-5
"

>

Payment Expired

</p>



</div>









<button

v-if="!expired"

@click="payNow"

class="
mt-10
bg-green-500
text-white
w-full
py-5
rounded-full
font-bold
hover:bg-green-600
"

>

I Have Paid

</button>






<button

@click="resetPayment"

class="
mt-5
border
border-pink-400
text-pink-500
w-full
py-5
rounded-full
hover:bg-pink-50
"

>

Change Payment Method

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



import {
useRoute,
useRouter
} from "vue-router";



import CustomerLayout from "../components/CustomerLayout.vue";
import api from "../api/axios";


const route =
useRoute();
const router =
useRouter();
const loading = 
ref(false);


function loadMidtransScript(){

    if(document.getElementById("midtrans-script")){

        return;

    }

    const script =
    document.createElement("script");

    script.id =
    "midtrans-script";

    script.src =
    "https://app.sandbox.midtrans.com/snap/snap.js";

    script.setAttribute(

        "data-client-key",

        import.meta.env.VITE_MIDTRANS_CLIENT_KEY

    );

    document.body.appendChild(script);

}






function pay(){



if(!paymentMethod.value){


alert(
"Pilih metode pembayaran dulu"
);


return;


}




if(
paymentMethod.value !== "QRIS"
&&
!detailMethod.value
){


alert(
"Pilih detail pembayaran dulu"
);


return;


}





if(paymentMethod.value === "QRIS"){



paymentCode.value =
"QR-CORAL-DAISY-" +
route.params.id;



}else{



paymentCode.value =
"VA-" +
Math.floor(
1000000000 +
Math.random()*9000000000
);



}





paymentCreated.value =
true;



expired.value =
false;



startTimer();



}








function startTimer(){



let total =
300;



timer =
setInterval(()=>{



if(total <= 0){



clearInterval(timer);



minute.value =
0;



second.value =
"00";



expired.value =
true;



return;



}





total--;




minute.value =
Math.floor(total / 60);



second.value =
String(total % 60)
.padStart(2,"0");




},1000);



}









function resetPayment(){



clearInterval(timer);



paymentCreated.value =
false;



paymentMethod.value =
"";



detailMethod.value =
"";



paymentCode.value =
"";



expired.value =
false;



minute.value =
5;



second.value =
"00";



}


function cancelPayment(){


if(timer){

clearInterval(timer);

}



const confirmBack =
confirm(
"Batalkan pembayaran sekarang? Order akan tersimpan sebagai belum dibayar."
);



if(!confirmBack){

return;

}



router.push(
"/orders"
);


}


async function payNow() {

    try {

        loading.value = true;

        const response = await api.post(
            "/payments/create",
            {
                order_id: route.params.id
            }
        );

        const snapToken =
            response.data.snap_token;

        window.snap.pay(
            snapToken,
            {

                onSuccess(result) {

                    alert(
                        "Pembayaran berhasil 🎉"
                    );

                    console.log(result);

                    router.push(
                        "/orders"
                    );

                },

                onPending(result) {

                    alert(
                        "Pembayaran menunggu penyelesaian."
                    );

                    console.log(result);

                },

                onError(result) {

                    alert(
                        "Pembayaran gagal."
                    );

                    console.log(result);

                },

                onClose() {

                    console.log(
                        "Popup Midtrans ditutup."
                    );

                }

            }
        );

    } catch (error) {

        console.log(error);

        alert(
            error.response?.data?.message
            ??
            "Gagal membuat transaksi"
        );

    } finally {

        loading.value = false;

    }

}

onMounted(() => {

    loadMidtransScript();

});

</script>