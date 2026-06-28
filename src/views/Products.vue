<template>

<CustomerLayout>

<div>



<!-- HERO -->


<div
class="
relative
mb-16
rounded-[45px]
overflow-hidden
bg-white/60
backdrop-blur-xl
shadow-2xl
border
border-white
p-16
"
>


<div
class="
absolute
w-96
h-96
bg-pink-300/30
rounded-full
blur-3xl
-right-20
-top-20
"
></div>


<div
class="relative flex justify-between items-center">


<div>


<p
class="
tracking-[12px]
text-pink-400
font-bold
mb-5
"
>

CORALDAISY COLLECTION

</p>



<h1
class="
text-7xl
font-bold
text-gray-800
leading-tight
"
>

Luxury

<br>

<span class="text-pink-500">

Handbags

</span>


</h1>



<p
class="
text-gray-500
text-lg
mt-6
max-w-xl
"
>

Discover elegant bags designed for your everyday confidence.

</p>


</div>





<div
class="
hidden
md:flex
w-64
h-64
rounded-full
bg-white/70
shadow-2xl
justify-center
items-center
"
>


<div class="text-center">


<h1
class="
font-serif
text-9xl
"
>

C

</h1>


<p class="tracking-[10px] font-bold">

CORAL

</p>


</div>


</div>


</div>


</div>







<!-- SEARCH -->


<input

v-model="search"

@input="getProducts"

placeholder="Search your favorite bag..."

class="
w-full
mb-16
bg-white/70
shadow-xl
rounded-full
px-8
py-5
outline-none
focus:ring-2
focus:ring-pink-300
"

/>









<!-- FEATURED -->


<div
v-if="recommended.length"
class="mb-20"
>


<h2
class="
text-4xl
font-bold
mb-8
"
>

✨ Featured Collection

</h2>



<div
class="
grid
grid-cols-4
gap-10
"
>



<div

v-for="item in recommended"

:key="item.id"

@click="router.push(`/products/${item.id}`)"


class="
group
bg-white/70
rounded-[35px]
overflow-hidden
shadow-xl
cursor-pointer
hover:-translate-y-3
transition
duration-500
"

>



<div
class="
h-64
overflow-hidden
bg-pink-50
"
>


<img

v-if="item.image_url"

:src="imagePath(item.image_url)"

class="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-700
"

/>


<div
v-else
class="
h-full
flex
items-center
justify-center
text-7xl
font-serif
"
>

C

</div>


</div>





<div class="p-6">


<p
class="
tracking-[5px]
text-xs
text-pink-400
font-bold
"
>

CORALDAISY

</p>


<h3
class="
font-bold
text-xl
mt-3
"
>

{{ item.name }}

</h3>


<p
class="
text-pink-500
font-bold
text-2xl
mt-4
"
>

{{ formatRupiah(item.price) }}

</p>


</div>


</div>


</div>


</div>








<!-- PRODUCTS -->


<div
class="
grid
grid-cols-4
gap-10
"
>


<div

v-for="product in products"

:key="product.id"

@click="router.push(`/products/${product.id}`)"

class="
group
bg-white/70
backdrop-blur
rounded-[35px]
shadow-xl
border
border-white
overflow-hidden
cursor-pointer
hover:-translate-y-3
transition
duration-500
"

>




<div
class="
relative
h-72
bg-pink-50
overflow-hidden
"
>



<img

v-if="product.image_url"

:src="imagePath(product.image_url)"

class="
w-full
h-full
object-cover
group-hover:scale-110
transition
duration-700
"

/>



<div
v-else
class="
h-full
flex
items-center
justify-center
text-8xl
font-serif
"
>

C

</div>





<span

v-if="product.stock?.available > 0"

class="
absolute
top-5
right-5
bg-white/80
px-5
py-2
rounded-full
shadow
"

>

Available

</span>


</div>






<div class="p-7">


<p
class="
tracking-[6px]
text-xs
text-pink-400
font-bold
"
>

CORALDAISY

</p>



<h2
class="
text-2xl
font-bold
mt-3
"
>

{{ product.name }}

</h2>



<p
class="
text-gray-400
mt-2
uppercase
"
>

{{ product.brand }}

</p>



<p
class="
text-pink-500
text-3xl
font-bold
mt-5
"
>

{{ formatRupiah(product.price) }}

</p>





<button

v-if="product.stock?.available > 0"

@click.stop="addCart(product)"

class="
mt-7
w-full
bg-gray-900
text-white
py-4
rounded-full
hover:bg-pink-500
transition
"

>

Add To Bag

</button>





<button

v-else

disabled

class="
mt-7
w-full
bg-gray-300
text-white
py-4
rounded-full
"

>

Sold Out

</button>



</div>


</div>


</div>





<p

v-if="!loading && products.length === 0"

class="text-center text-gray-400 mt-10"

>

No products found

</p>




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


import {
useAuthStore
} from "../stores/auth";


import api from "../api/axios";


import CustomerLayout from "../components/CustomerLayout.vue";


const BASE_URL =
import.meta.env.VITE_API_URL.replace('/api','');

function imagePath(path){
    if(!path){
        return '';
    }

    return BASE_URL + path;
}




const router =
useRouter();



const auth =
useAuthStore();





const products =
ref([]);



const recommended =
ref([]);



const loading =
ref(true);



const search =
ref("");









function imagePath(path){


return "http://127.0.0.1:8000" + path;


}










async function getProducts(){



loading.value =
true;



try{



const response =
await api.get(
"/products",
{

params:{


search:
search.value


}


}
);





products.value =
response.data.data
??
response.data;




}catch(error){



console.log(
error
);



}



loading.value =
false;



}











async function getRecommended(){



try{



const response =
await api.get(
"/products/featured"
);




recommended.value =
response.data.data
??
response.data;




}catch(error){



console.log(
error
);



}



}









async function addCart(product){



if(
!auth.user
){



alert(
"Silakan login terlebih dahulu"
);




router.push(
"/login"
);



return;



}








try{



await api.post(
"/cart/add",
{


product_id:
product.id,


quantity:
1


}
);






alert(
"Produk berhasil masuk bag 👜"
);






}catch(error){



alert(

error.response?.data?.message

??

"Gagal menambahkan produk"


);



}




}









function formatRupiah(value){



return new Intl.NumberFormat(

"id-ID",

{


style:
"currency",


currency:
"IDR",


minimumFractionDigits:
0


}


)

.format(

value ?? 0

);



}










onMounted(()=>{



if(

auth.user

&&

auth.user.role === "admin"

){



router.push(
"/admin/dashboard"
);



return;



}







getProducts();



getRecommended();




});



</script>