<template>


<CustomerLayout>


<div
class="
max-w-xl
mx-auto
bg-white
rounded-3xl
shadow-xl
p-10
"
>


<h1
class="
text-4xl
font-bold
mb-8
"
>

Request Return ↩

</h1>





<label class="font-bold">

Reason

</label>



<select

v-model="reason"

class="
border
w-full
p-3
rounded-xl
mt-2
mb-5
"

>


<option value="defective">

Produk Rusak

</option>


<option value="not_as_described">

Tidak Sesuai Deskripsi

</option>


<option value="wrong_item">

Barang Salah

</option>


<option value="changed_mind">

Berubah Pikiran

</option>


<option value="other">

Lainnya

</option>


</select>







<label class="font-bold">

Description

</label>



<textarea

v-model="description"

class="
border
w-full
h-32
p-3
rounded-xl
mt-2
mb-5
"

placeholder="Jelaskan masalah produk..."

></textarea>









<label class="font-bold">

Upload Bukti Foto

</label>



<label
class="
border-2
border-dashed
border-pink-300
rounded-2xl
p-8
mt-3
mb-8
flex
flex-col
items-center
justify-center
cursor-pointer
hover:bg-pink-50
transition
"
>


<span class="text-5xl">

📷

</span>


<p class="mt-3 text-gray-500">

Upload Evidence Image

</p>


<p

v-if="imageName"

class="
text-pink-500
font-bold
mt-2
"

>

{{ imageName }}

</p>


<input

type="file"

accept="image/*"

@change="handleImage"

class="hidden"

/>


</label>







<button

@click="submitReturn"

class="
bg-pink-500
text-white
w-full
py-3
rounded-xl
hover:bg-pink-600
"

>

Submit Return

</button>




</div>



</CustomerLayout>



</template>








<script setup>


import {

ref

} from "vue";



import {

useRoute,

useRouter

} from "vue-router";



import api from "../api/axios";


import CustomerLayout from "../components/CustomerLayout.vue";






const route =
useRoute();


const router =
useRouter();






const reason =
ref("defective");



const description =
ref("");



const image =
ref(null);

const imageName =
ref("");







function handleImage(e){


if(
!e.target.files.length
){

return;

}


image.value =
e.target.files[0];


imageName.value =
image.value.name;


}









async function submitReturn(){



if(description.value.length < 10){


alert(
"Deskripsi minimal 10 karakter"
);


return;


}




try{



const data =
new FormData();




data.append(
"order_id",
route.params.id
);



data.append(
"reason",
reason.value
);



data.append(
"description",
description.value
);




if(image.value){


data.append(
"image",
image.value
);


}





await api.post(
"/returns",
data
);





alert(
"Return berhasil diajukan 🌸"
);




router.push(
"/returns"
);





}catch(error){


console.log(
error.response
);



alert(
"Gagal membuat return"
);



}




}



</script>