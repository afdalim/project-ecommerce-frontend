<template>


<div
class="
min-h-screen
relative
overflow-hidden
bg-gradient-to-br
from-pink-50
via-white
to-pink-100
"
>





<!-- BACKGROUND EFFECT -->


<div
class="
absolute
w-[500px]
h-[500px]
bg-pink-300/30
rounded-full
blur-3xl
-right-40
-top-20
glow
"
></div>



<div
class="
absolute
w-[400px]
h-[400px]
bg-rose-200/50
rounded-full
blur-3xl
-left-32
-bottom-20
"
></div>









<!-- NAVBAR -->


<nav
class="
relative
z-10
px-20
py-8
flex
justify-between
items-center
"
>


<div
class="
flex
items-center
gap-4
"
>



<div
class="
w-14
h-14
rounded-full
bg-white
shadow-xl
flex
items-center
justify-center
"
>


<h1
class="
font-serif
text-4xl
"
>

C

</h1>


</div>



<h2
class="
tracking-[8px]
font-bold
"
>

CORALDAISY

</h2>



</div>










</nav>









<!-- HERO -->


<section
class="
relative
z-10
px-20
grid
grid-cols-2
items-center
min-h-[75vh]
"
>





<!-- TEXT -->


<div class="fade-up">



<p
class="
tracking-[10px]
text-pink-400
font-bold
mb-5
"
>

NEW COLLECTION

</p>





<h1
class="
text-8xl
font-bold
leading-tight
text-gray-900
"
>


Luxury

<br>


<span
class="
text-pink-500
"
>

Fashion Bag

</span>



</h1>






<p
class="
text-gray-500
text-xl
mt-8
max-w-lg
"
>

Discover premium handbags crafted with elegance,
beauty and modern lifestyle.

</p>







<div
class="
flex
gap-5
mt-12
"
>



<button

@click="router.push('/login')"

class="
bg-pink-500
text-white
px-10
py-5
rounded-full
shadow-xl
hover:scale-105
transition
"

>

Sign In

</button>










</div>





</div>









<!-- IMAGE AREA -->


<div
class="
relative
flex
justify-center
items-center
"
>





<div
class="
absolute
w-96
h-96
bg-white/80
rounded-full
shadow-2xl
"
></div>





<div

@mousemove="moveBag"

@mouseleave="resetBag"

class="
relative
z-20
perspective
"
>


<img

:src="bagImage"

:style="bagStyle"

class="
w-[520px]
drop-shadow-2xl
float-animation
transition-transform
duration-300
"

/>


</div>

<div
class="
absolute
z-30
top-20
right-20
bg-white/70
backdrop-blur-xl
rounded-3xl
shadow-xl
p-6
float-animation
"
>


<p class="text-3xl">

✨

</p>


<h3 class="font-bold">

New Arrival

</h3>


<p class="text-gray-400">

2026 Collection

</p>



</div>








<div
class="
absolute
z-30
bottom-10
left-20
bg-white/70
backdrop-blur
rounded-3xl
shadow-xl
p-6
"
>



<h3 class="font-bold">

Premium Quality

</h3>


<p class="text-gray-400">

Coral Daisy

</p>



</div>





</div>





</section>





</div>


<!-- DISCOVER -->


<div

@click="scrollDiscover"

class="
absolute
bottom-8
left-1/2
-translate-x-1/2
text-center
animate-bounce
cursor-pointer
"
>


<p
class="
tracking-[6px]
text-gray-400
text-sm
"
>

DISCOVER

</p>


<p class="text-3xl">

⌄

</p>


</div>


<!-- ABOUT -->


<section

ref="discoverSection"

class="
relative
z-10
px-20
py-24
bg-white/50
backdrop-blur
"
>


<div
class="
text-center
"
>


<h1
class="
font-serif
text-8xl
"
>

C

</h1>


<h2
class="
tracking-[12px]
font-bold
text-4xl
mt-5
"
>

CORALDAISY

</h2>



<p
class="
text-gray-500
max-w-2xl
mx-auto
mt-8
text-lg
"
>

A premium handbag ecommerce experience designed
for elegance, confidence, and modern lifestyle.

</p>




<div
class="
grid
grid-cols-3
gap-10
mt-16
"
>


<div
class="
bg-white
rounded-3xl
shadow-xl
p-10
"
>

<h3 class="font-bold text-xl">

Premium Design

</h3>

<p class="text-gray-400 mt-3">

Beautiful collections crafted with detail.

</p>

</div>




<div
class="
bg-white
rounded-3xl
shadow-xl
p-10
"
>

<h3 class="font-bold text-xl">

Secure Shopping

</h3>

<p class="text-gray-400 mt-3">

Simple checkout and payment experience.

</p>

</div>





<div
class="
bg-white
rounded-3xl
shadow-xl
p-10
"
>

<h3 class="font-bold text-xl">

Easy Return

</h3>

<p class="text-gray-400 mt-3">

Customer satisfaction comes first.

</p>

</div>



</div>



</div>


</section>


</template>







<script setup>


import {

ref

} from "vue";



import {

useRouter

} from "vue-router";



import bagImage from "../assets/images/coral-bag.png";




const router =
useRouter();




const bagStyle =
ref({

transform:
"rotateX(0deg) rotateY(0deg)"

});







function moveBag(e){


const x =
(e.offsetX / e.target.clientWidth - 0.5)
* 30;



const y =
(e.offsetY / e.target.clientHeight - 0.5)
* -30;




bagStyle.value = {


transform:
`
rotateX(${y}deg)
rotateY(${x}deg)
`


};



}







function resetBag(){


bagStyle.value = {


transform:
"rotateX(0deg) rotateY(0deg)"


};


}



</script>



<style scoped>


.float-animation{

animation:
float 4s ease-in-out infinite;

}



@keyframes float{


0%{

transform:
translateY(0px)
rotate(-5deg);

}



50%{

transform:
translateY(-30px)
rotate(5deg);

}



100%{

transform:
translateY(0px)
rotate(-5deg);

}


}





.slow-spin{

animation:
spin3d 15s linear infinite;

}




@keyframes spin3d{


from{

transform:
rotate(0deg);

}



to{

transform:
rotate(360deg);

}


}







.fade-up{

animation:
fadeUp 1s ease forwards;

}





@keyframes fadeUp{


0%{

opacity:0;

transform:
translateY(50px);

}


100%{

opacity:1;

transform:
translateY(0);

}


}






.glow{

animation:
glowMove 5s ease infinite;

}




@keyframes glowMove{


0%{

transform:
translate(0,0);

}


50%{

transform:
translate(40px,-30px);

}


100%{

transform:
translate(0,0);

}


}


.perspective{

perspective:
1000px;

}

</style>