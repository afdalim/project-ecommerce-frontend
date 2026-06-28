<template>


<CustomerLayout>


<div class="max-w-6xl mx-auto">






<!-- HEADER -->


<div
class="
text-center
mb-14
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

Secure Checkout Experience

</p>



</div>









<div
class="
grid
grid-cols-2
gap-12
"
>






<!-- SHIPPING FORM -->


<div

class="
bg-white/70
backdrop-blur-xl
rounded-[40px]
shadow-2xl
border
border-white
p-10
"

>




<p
class="
tracking-[8px]
text-pink-400
font-bold
mb-4
"
>

DELIVERY

</p>




<h2
class="
text-4xl
font-bold
mb-10
"
>

Shipping Details

</h2>







<label
class="font-semibold"
>

Address

</label>




<input

v-model="form.address"

placeholder="Your address"

class="
mt-2
mb-6
w-full
bg-white/80
rounded-2xl
p-5
outline-none
border
focus:ring-2
focus:ring-pink-300
"

/>








<label
class="font-semibold"
>

City

</label>





<input

v-model="form.city"

placeholder="Your city"

class="
mt-2
mb-6
w-full
bg-white/80
rounded-2xl
p-5
outline-none
border
focus:ring-2
focus:ring-pink-300
"

/>









<label
class="font-semibold"
>

Country

</label>




<input

v-model="form.country"

placeholder="Country"

class="
mt-2
mb-10
w-full
bg-white/80
rounded-2xl
p-5
outline-none
border
focus:ring-2
focus:ring-pink-300
"

/>








<button

@click="createOrder"

class="
w-full
bg-gray-900
text-white
py-5
rounded-full
font-bold
shadow-xl
hover:bg-pink-500
hover:scale-105
transition
"

>

Continue To Payment

</button>





</div>










<!-- RIGHT CARD -->


<div

class="
relative
overflow-hidden
bg-white/60
backdrop-blur-xl
rounded-[40px]
shadow-2xl
border
border-white
p-12
"

>





<div
class="
absolute
w-80
h-80
bg-pink-300/30
rounded-full
blur-3xl
-right-20
-bottom-20
"
></div>







<div
class="relative"
>


<div
class="
w-32
h-32
bg-white
rounded-full
shadow-xl
flex
items-center
justify-center
font-serif
text-7xl
mb-10
"
>

C

</div>





<h2
class="
text-4xl
font-bold
"
>

Coral Daisy Order

</h2>





<p
class="
text-gray-500
leading-relaxed
mt-6
"
>

Please make sure your delivery information is correct before continuing your payment.

</p>








<div
class="
mt-10
space-y-5
"
>





<div
class="
bg-white/70
rounded-3xl
p-5
shadow
"
>

✓ Secure Payment

</div>





<div
class="
bg-white/70
rounded-3xl
p-5
shadow
"
>

✓ Premium Packaging

</div>





<div
class="
bg-white/70
rounded-3xl
p-5
shadow
"
>

✓ Coral Daisy Collection

</div>






</div>




</div>




</div>







</div>






</div>



</CustomerLayout>


</template>











<script setup>
import { reactive } from "vue";
import { useRouter } from "vue-router";
import api from "../api/axios";
import CustomerLayout from "../components/CustomerLayout.vue";

const router = useRouter();

const form = reactive({
    address: "",
    city: "",
    country: "Indonesia"
});

async function createOrder() {

    if (!form.address || !form.city || !form.country) {
        alert("Lengkapi alamat pengiriman terlebih dahulu");
        return;
    }

    try {

        // Membuat Order
        const response = await api.post("/orders", {

            shipping_address: {
                address: form.address,
                city: form.city,
                country: form.country
            },

            billing_address: {
                address: form.address,
                city: form.city,
                country: form.country
            },

            shipping_method: "regular"

        });

        console.log("ORDER RESPONSE :", response);

        const orderId =
            response.data.data?.id ||
            response.data.order?.id ||
            response.data.id;

        console.log("ORDER ID :", orderId);

        console.log("AKAN REQUEST PAYMENT");

        const payment = await api.post("/payments/create", {
    order_id: orderId
});

console.log("PAYMENT RESPONSE :", payment);

window.snap.pay(payment.data.snap_token, {

    onSuccess: function(result) {
        router.push('/orders');
    },

    onPending: function(result) {
        router.push('/orders');
    },

    onError: function(result) {
        router.push('/orders');
    },

    onClose: function() {
        router.push('/orders');
    }

});

        console.log("PAYMENT RESPONSE :", payment);

        window.snap.pay(response.data.snap_token, {

    onSuccess: function(result) {

        router.push('/orders')

    },

    onPending: function(result) {

        router.push('/orders')

    },

    onError: function(result) {

        router.push('/orders')

    },

    onClose: function() {

        router.push('/orders')

    }

})


    } catch(error){

    console.log(
        "FULL ERROR :",
        error
    );

    console.log(
        "RESPONSE :",
        error.response
    );

    console.log(
        JSON.stringify(
            error.response?.data,
            null,
            2
        )
    );

    alert("Checkout gagal");

}

}
</script>