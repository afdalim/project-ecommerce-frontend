<template>


<AdminLayout>


<div>






<!-- TITLE -->


<div class="mb-10">


<p
class="
tracking-[8px]
text-pink-400
font-bold
"
>

PRODUCT CENTER

</p>



<h1
class="
text-5xl
font-bold
text-gray-800
mt-3
"
>

Manage Collection

</h1>



<p class="text-gray-400 mt-3">

Create and organize Coral Daisy products

</p>


</div>









<!-- CREATE -->


<div
class="
bg-white/80
backdrop-blur
rounded-[40px]
shadow-xl
p-10
mb-12
"
>


<h2
class="
text-3xl
font-bold
mb-8
"
>

Add New Product

</h2>




<div
class="
grid
grid-cols-2
gap-5
"
>



<input
v-model="createForm.name"
placeholder="Product Name"
class="border rounded-2xl p-4"
/>



<input
v-model="createForm.price"
placeholder="Price"
class="border rounded-2xl p-4"
/>




<select
v-model="createForm.category_id"
class="border rounded-2xl p-4"
>


<option disabled value="">

Select Category

</option>



<option

v-for="category in categories"

:key="category.id"

:value="category.id"

>

{{ category.name }}

</option>



</select>





<input
v-model="createForm.brand"
placeholder="Brand"
class="border rounded-2xl p-4"
/>



<input
v-model="createForm.quantity"
placeholder="Stock"
class="border rounded-2xl p-4"
/>



<textarea
v-model="createForm.description"
placeholder="Description"
class="
border
rounded-2xl
p-4
col-span-2
h-32
"
></textarea>




</div>








<label
class="
mt-6
border-2
border-dashed
border-pink-300
rounded-3xl
p-10
flex
flex-col
items-center
cursor-pointer
hover:bg-pink-50
"
>


<div class="text-5xl">

📷

</div>



<p class="mt-3 text-gray-500">

Upload Product Image

</p>



<input

type="file"

accept="image/*"

@change="handleCreateImage"

hidden

>


</label>




<p
v-if="createImageName"
class="
text-center
text-pink-500
mt-3
"
>

{{ createImageName }}

</p>





<button

@click="createProduct"

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

Create Product

</button>



</div>










<!-- PRODUCTS LIST -->


<div
class="
bg-white/80
rounded-[40px]
shadow-xl
p-10
"
>



<h2
class="
text-3xl
font-bold
mb-8
"
>

Product List

</h2>








<div class="space-y-5">



<div

v-for="product in products"

:key="product.id"

class="
flex
items-center
justify-between
bg-gray-50
rounded-3xl
p-5
hover:bg-pink-50
transition
"

>




<div class="flex items-center gap-6">




<img
    :src="imagePath(product.image_url)"
    class="
        w-32
        h-32
        object-cover
        rounded-xl
    "
>





<div>


<h3
class="
text-xl
font-bold
"
>

{{ product.name }}

</h3>



<p class="text-gray-400">

{{ product.brand }}

</p>



<p
class="
text-pink-500
font-bold
mt-2
"
>

{{ formatRupiah(product.price) }}

</p>



</div>




</div>









<div class="flex gap-3">



<button

@click="editProduct(product)"

class="
bg-gray-900
text-white
px-6
py-3
rounded-full
"

>

Edit

</button>




<button

@click="deleteProduct(product.id)"

class="
bg-red-500
text-white
px-6
py-3
rounded-full
"

>

Delete

</button>




</div>






</div>



</div>




</div>









<!-- EDIT MODAL -->


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
p-10
w-[500px]
shadow-2xl
"
>


<h2 class="text-3xl font-bold mb-8">

Edit Product

</h2>




<input
v-model="editForm.name"
class="border p-4 rounded-2xl mb-4 w-full"
/>


<input
v-model="editForm.price"
class="border p-4 rounded-2xl mb-4 w-full"
/>


<input
v-model="editForm.brand"
class="border p-4 rounded-2xl mb-5 w-full"
/>






<label
class="
border-2
border-dashed
border-pink-300
rounded-3xl
p-8
flex
justify-center
cursor-pointer
"
>


Change Image


<input

type="file"

accept="image/*"

@change="handleEditImage"

hidden

>


</label>



<p
v-if="editImageName"
class="text-center text-pink-500 mt-3"
>

{{ editImageName }}

</p>






<div class="flex justify-end gap-4 mt-8">



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

@click="updateProduct"

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
reactive,
onMounted
} from "vue";


import api from "../api/axios";


import AdminLayout from "../components/AdminLayout.vue";





const products =
ref([]);


const categories =
ref([]);


const editing =
ref(false);





const createImage =
ref(null);


const createImageName =
ref("");



const editImage =
ref(null);

const editImageName =
ref("");





const createForm =
reactive({


name:"",

description:"",

price:"",

category_id:"",

brand:"",

quantity:""


});







const editForm =
reactive({


id:null,

name:"",

price:"",

brand:"",

image_url:""


});









async function getProducts(){


const response =
await api.get(
"/admin/products"
);



products.value =
response.data.data;


}



function imagePath(path){

    if(!path){
        return '/placeholder.png'
    }

    const filename =
        path.split('/').pop()

    return `https://project-ecommerce-backend-production.up.railway.app/product-image/${filename}`

}






async function getCategories(){


const response =
await api.get(
"/categories"
);



categories.value =
response.data.data
??
response.data;


}











function handleCreateImage(e){


if(
!e.target.files.length
){

return;

}



createImage.value =
e.target.files[0];


createImageName.value =
createImage.value.name;


}











function handleEditImage(e){


if(
!e.target.files.length
){

return;

}



editImage.value =
e.target.files[0];


editImageName.value =
editImage.value.name;


}









async function createProduct(){



try{



const data =
new FormData();





for(
let key in createForm
){


data.append(

key,


key === "price"

?

createForm[key]
.toString()
.replaceAll(".","")

:

createForm[key]


);


}







if(
createImage.value
){


data.append(
"image",
createImage.value
);


}









await api.post(
"/admin/products",
data
);








alert(
"Produk berhasil dibuat 🔥"
);







createForm.name = "";
createForm.description = "";
createForm.price = "";
createForm.category_id = "";
createForm.brand = "";
createForm.quantity = "";



createImage.value =
null;



createImageName.value =
"";






getProducts();




}catch(error){



alert(
JSON.stringify(
error.response?.data?.errors
??
"Gagal tambah produk"
)
);



}



}









function editProduct(product){



editing.value =
true;



editImage.value =
null;

editImageName.value =
"";



editForm.id =
product.id;



editForm.name =
product.name;



editForm.price =
product.price;



editForm.brand =
product.brand;



editForm.image_url =
product.image_url;


}









async function updateProduct(){



try{



const data =
new FormData();







data.append(
"name",
editForm.name
);



data.append(
"price",
editForm.price
);



data.append(
"brand",
editForm.brand
);







if(
editImage.value
){



data.append(
"image",
editImage.value
);



}








await api.post(

`/admin/products-update/${editForm.id}`,

data

);







alert(
"Produk berhasil diupdate 🔥"
);




editing.value =
false;



editImage.value =
null;




getProducts();





}catch(error){


console.log(
    error.response
);


console.log(
    error.response?.data
);


alert(
    JSON.stringify(
        error.response?.data
    )
);


}




}











async function deleteProduct(id){



if(
!confirm("Hapus produk?")
){

return;

}





await api.delete(
`/admin/products/${id}`
);




getProducts();


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
.format(
value ?? 0
);



}










onMounted(()=>{


getProducts();


getCategories();


});


</script>