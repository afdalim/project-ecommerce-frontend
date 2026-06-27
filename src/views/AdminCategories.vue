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

CATEGORY CENTER

</p>



<h1
class="
text-5xl
font-bold
text-gray-800
mt-3
"
>

Manage Categories

</h1>



<p class="text-gray-400 mt-3">

Organize Coral Daisy product collections

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
mb-10
"
>



<h2
class="
text-3xl
font-bold
mb-8
"
>

Add Category

</h2>





<input

v-model="form.name"

placeholder="Category Name"

class="
border
rounded-2xl
p-5
w-full
mb-5
"

/>






<textarea

v-model="form.description"

placeholder="Category Description"

class="
border
rounded-2xl
p-5
w-full
h-32
mb-6
"

></textarea>







<button

@click="createCategory"

class="
bg-gray-900
text-white
px-10
py-4
rounded-full
hover:bg-pink-500
transition
"

>

Create Category

</button>




</div>










<!-- CATEGORY LIST -->


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

Category List

</h2>








<div class="space-y-5">



<div

v-for="category in categories"

:key="category.id"

class="
bg-gray-50
rounded-3xl
p-6
flex
justify-between
items-center
hover:bg-pink-50
transition
"

>






<div>


<h3
class="
text-2xl
font-bold
"
>

{{ category.name }}

</h3>



<p
class="
text-gray-400
mt-2
"
>

{{ category.description }}

</p>


</div>








<div
class="
flex
gap-3
"
>



<button

@click="editCategory(category)"

class="
bg-gray-900
text-white
px-7
py-3
rounded-full
hover:bg-blue-500
transition
"

>

Edit

</button>







<button

@click="deleteCategory(category.id)"

class="
bg-red-500
text-white
px-7
py-3
rounded-full
hover:bg-red-600
transition
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
shadow-2xl
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

Edit Category

</h2>






<input

v-model="editForm.name"

class="
border
rounded-2xl
p-5
w-full
mb-5
"

/>







<textarea

v-model="editForm.description"

class="
border
rounded-2xl
p-5
w-full
h-32
"

></textarea>









<div
class="
flex
justify-end
gap-4
mt-8
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

@click="updateCategory"

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





const categories =
ref([]);



const editing =
ref(false);




const form =
reactive({

name:"",

description:""

});





const editForm =
reactive({

id:null,

name:"",

description:""

});








async function getCategories(){


const response =
await api.get(
"/admin/categories"
);



categories.value =
response.data.data;


}







async function createCategory(){


await api.post(
"/admin/categories",
form
);



form.name =
"";


form.description =
"";



getCategories();


}








function editCategory(category){


editing.value =
true;


editForm.id =
category.id;


editForm.name =
category.name;


editForm.description =
category.description;


}








async function updateCategory(){



await api.put(
`/admin/categories/${editForm.id}`,
editForm
);



editing.value =
false;



getCategories();



}









async function deleteCategory(id){



if(!confirm("Hapus kategori?")){
return;
}



await api.delete(
`/admin/categories/${id}`
);



getCategories();


}







onMounted(()=>{


getCategories();


});


</script>