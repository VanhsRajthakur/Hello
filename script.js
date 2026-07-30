/* ==========================================
   VARIABLES
========================================== */

const pages = document.querySelectorAll(".page");

const pins = document.querySelectorAll(".pin");

const unlockBtn = document.getElementById("unlockBtn");

const startBtn = document.getElementById("startBtn");

const error = document.getElementById("error");

const loadingPage = document.getElementById("loadingPage");

const welcomePage = document.getElementById("welcomePage");

const lockScreen = document.getElementById("lockScreen");

const giftPage = document.getElementById("giftPage");

const bgMusic = document.getElementById("bgMusic");

const musicBtn = document.getElementById("musicBtn");

const preloader = document.getElementById("preloader");

const secretPopup = document.getElementById("secretPopup");

const lovePopup = document.getElementById("lovePopup");

const heartRain = document.getElementById("heartRain");

const hiddenMessage = document.getElementById("hiddenLoveMessage");


/* ==========================================
   PASSWORD
========================================== */

const PASSWORD = "3333";


/* ==========================================
   INPUT AUTO NEXT
========================================== */

pins.forEach((input,index)=>{

input.addEventListener("input",()=>{

if(input.value.length===1 && index<pins.length-1){

pins[index+1].focus();

}

});

});


/* ==========================================
   BACKSPACE
========================================== */

pins.forEach((input,index)=>{

input.addEventListener("keydown",(e)=>{

if(e.key==="Backspace" && input.value==="" && index>0){

pins[index-1].focus();

}

});

});


/* ==========================================
   GET PASSWORD
========================================== */

function getPassword(){

let value="";

pins.forEach(pin=>{

value+=pin.value;

});

return value;

}


/* ==========================================
   CLEAR INPUTS
========================================== */

function clearPins(){

pins.forEach(pin=>{

pin.value="";

});

pins[0].focus();

}


/* ==========================================
   BACKGROUND MUSIC VOLUME PER SECTION
========================================== */

const BG_VOLUME_MAP={

letterPage:0.25,

galleryPage:0.10,

videoPage:0,

musicPage:0,

specialPage:0.30

};

function setBgVolume(pageId){

if(!bgMusic) return;

const vol=(pageId in BG_VOLUME_MAP)?BG_VOLUME_MAP[pageId]:0.5;

bgMusic.volume=vol;

}

function handleAudioForPage(pageId){

if(pageId==="musicPage"){

if(bgMusic){

bgMusic.pause();

}

playSong();

}else{

stopSong();

if(bgMusic){

setBgVolume(pageId);

if(musicPlaying){

bgMusic.play().catch(()=>{});

}

}

}

}


/* ==========================================
   SHOW PAGE
========================================== */

function showPage(id){

pages.forEach(page=>{

page.classList.remove("active");

});

document.getElementById(id).classList.add("active");

handleAudioForPage(id);

}


/* ==========================================
   CHECK PASSWORD
========================================== */

function checkPassword(){

let pass=getPassword();

if(pass===PASSWORD){

error.innerHTML="❤️ Correct Password";

const footer=document.querySelector(".footer");

if(footer){

footer.style.display="none";

}

setTimeout(()=>{

showPage("loadingPage");

setTimeout(()=>{

showPage("welcomePage");

},2500);

},800);

}else{

error.innerHTML="❌ Wrong Password";

lockScreen.classList.add("shake");

setTimeout(()=>{

lockScreen.classList.remove("shake");

},500);

clearPins();

}

}


/* ==========================================
   BUTTON
========================================== */

unlockBtn.addEventListener("click",checkPassword);


/* ==========================================
   ENTER KEY
========================================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Enter"){

if(lockScreen.classList.contains("active")){

checkPassword();

}

}

});


/* ==========================================
   START BUTTON
========================================== */

startBtn.addEventListener("click",()=>{

showPage("giftPage");

});


/* ==========================================
   PRELOADER
========================================== */

window.addEventListener("load",()=>{

setTimeout(()=>{

preloader.style.opacity="0";

setTimeout(()=>{

preloader.style.display="none";

},600);

},1200);

});

/* ==========================================
   OPEN ANY PAGE
========================================== */

function openGift(pageId){

pages.forEach(page=>{

page.classList.remove("active");

});

const page=document.getElementById(pageId);

if(page){

page.classList.add("active");

handleAudioForPage(pageId);

window.scrollTo({

top:0,

behavior:"smooth"

});

}

}


/* ==========================================
   BACK TO GIFT PAGE
========================================== */

function backHome(){

pages.forEach(page=>{

page.classList.remove("active");

});

giftPage.classList.add("active");

handleAudioForPage("giftPage");

window.scrollTo({

top:0,

behavior:"smooth"

});

}


/* ==========================================
   NEXT PAGE
========================================== */

function nextPage(current,next){

document.getElementById(current).classList.remove("active");

document.getElementById(next).classList.add("active");

window.scrollTo({

top:0,

behavior:"smooth"

});

}


/* ==========================================
   PREVIOUS PAGE
========================================== */

function previousPage(current,previous){

document.getElementById(current).classList.remove("active");

document.getElementById(previous).classList.add("active");

window.scrollTo({

top:0,

behavior:"smooth"

});

}


/* ==========================================
   GIFT CLICK EFFECT
========================================== */

const gifts=document.querySelectorAll(".gift");

gifts.forEach(gift=>{

gift.addEventListener("click",()=>{

gift.style.transform="scale(.90)";

setTimeout(()=>{

gift.style.transform="";

},180);

});

});


/* ==========================================
   LETTER ANIMATION
========================================== */

const letter=document.querySelector(".letterCard");

if(letter){

letter.addEventListener("mouseenter",()=>{

letter.style.transform="scale(1.02)";

});

letter.addEventListener("mouseleave",()=>{

letter.style.transform="scale(1)";

});

}


/* ==========================================
   GALLERY IMAGE EFFECT
========================================== */

const images=document.querySelectorAll(".galleryGrid img");

images.forEach(img=>{

img.addEventListener("click",()=>{

img.style.transform="scale(1.12)";

setTimeout(()=>{

img.style.transform="";

},350);

});

});


/* ==========================================
   OUR SONG (local audio file, plays at 100%)
========================================== */

const ourSong=document.getElementById("ourSong");

const playSongBtn=document.getElementById("playSongBtn");

const songStatus=document.getElementById("songStatus");

let songPlaying=false;

function playSong(){

if(!ourSong) return;

ourSong.volume=1;

ourSong.play().catch(()=>{});

songPlaying=true;

if(playSongBtn) playSongBtn.innerHTML="⏸ Pause";

if(songStatus) songStatus.innerHTML="🎶 Playing Our Song...";

}

function pauseSong(){

if(!ourSong) return;

ourSong.pause();

songPlaying=false;

if(playSongBtn) playSongBtn.innerHTML="▶ Play";

if(songStatus) songStatus.innerHTML="Paused";

}

function stopSong(){

if(!ourSong) return;

ourSong.pause();

ourSong.currentTime=0;

songPlaying=false;

if(playSongBtn) playSongBtn.innerHTML="⏸ Pause";

if(songStatus) songStatus.innerHTML="🎶 Playing Our Song...";

}

if(playSongBtn){

playSongBtn.addEventListener("click",()=>{

if(songPlaying){

pauseSong();

}else{

playSong();

}

});

}


/* ==========================================
   VIDEO AUTO PLAY WHEN OPEN
========================================== */

const video=document.querySelector("video");

function playVideo(){

if(video){

video.play().catch(()=>{});

}

}

function pauseVideo(){

if(video){

video.pause();

}

}


/* ==========================================
   PAGE CHANGE VIDEO CONTROL
========================================== */

document.querySelectorAll(".gift").forEach(card=>{

card.addEventListener("click",()=>{

pauseVideo();

pauseSong();

});

});


/* ==========================================
   START VIDEO WHEN VIDEO PAGE OPENS
========================================== */

const observer=new MutationObserver(()=>{

const page=document.getElementById("videoPage");

if(page.classList.contains("active")){

playVideo();

}else{

pauseVideo();

}

});

observer.observe(document.body,{

attributes:true,

subtree:true,

attributeFilter:["class"]

});

/* ==========================================
   BACKGROUND MUSIC
========================================== */

let musicPlaying = false;

if(musicBtn){

musicBtn.addEventListener("click",toggleMusic);

}

function toggleMusic(){

if(!bgMusic) return;

if(musicPlaying){

bgMusic.pause();

musicBtn.innerHTML="🎵";

musicPlaying=false;

}else{

bgMusic.play().catch(()=>{});

musicBtn.innerHTML="🔊";

musicPlaying=true;

}

}


/* ==========================================
   LOVE POPUP
========================================== */

function showPopup(){

if(!lovePopup) return;

lovePopup.style.display="flex";

}

function closePopup(){

if(!lovePopup) return;

lovePopup.style.display="none";

}


/* ==========================================
   SECRET POPUP
========================================== */

const secretHeart=document.getElementById("secretHeart");

if(secretHeart){

secretHeart.addEventListener("click",()=>{

if(secretPopup){

secretPopup.style.display="flex";

}

});

}

function closeSecret(){

if(secretPopup){

secretPopup.style.display="none";

}

}


/* ==========================================
   HIDDEN LOVE MESSAGE
========================================== */

function showHiddenMessage(){

if(hiddenMessage){

hiddenMessage.style.display="block";

}

}

function hideHiddenMessage(){

if(hiddenMessage){

hiddenMessage.style.display="none";

}

}


/* ==========================================
   SHOW FINAL PAGE
========================================== */

function showFinal(){

showPage("finalPage");

startHeartRain();

setTimeout(()=>{

showPopup();

},1500);

}


/* ==========================================
   HEART RAIN
========================================== */

function startHeartRain(){

if(!heartRain) return;

heartRain.style.display="block";

}

function stopHeartRain(){

if(!heartRain) return;

heartRain.style.display="none";

}


/* ==========================================
   CLOSE POPUP BY CLICKING OUTSIDE
========================================== */

window.addEventListener("click",(e)=>{

if(e.target===lovePopup){

closePopup();

}

if(e.target===secretPopup){

closeSecret();

}

});


/* ==========================================
   ESC KEY SUPPORT
========================================== */

document.addEventListener("keydown",(e)=>{

if(e.key==="Escape"){

closePopup();

closeSecret();

}

});


/* ==========================================
   AUTO START MUSIC
========================================== */

document.addEventListener("click",()=>{

if(bgMusic && !musicPlaying){

bgMusic.play().then(()=>{

musicPlaying=true;

musicBtn.innerHTML="🔊";

}).catch(()=>{});

}

},{once:true});

/* ==========================================
   FLOATING HEARTS
========================================== */

const heartsContainer = document.querySelector(".hearts");

function createHeart(){

if(!heartsContainer) return;

const heart=document.createElement("span");

const icons=["❤️","💖","💕","💘","💝"];

heart.innerHTML=icons[Math.floor(Math.random()*icons.length)];

heart.style.left=Math.random()*100+"%";

heart.style.fontSize=(18+Math.random()*22)+"px";

heart.style.animationDuration=(6+Math.random()*6)+"s";

heartsContainer.appendChild(heart);

setTimeout(()=>{

heart.remove();

},12000);

}

setInterval(createHeart,600);


/* ==========================================
   CLICK EFFECT
========================================== */

document.addEventListener("click",(e)=>{

const effect=document.createElement("div");

effect.innerHTML="❤️";

effect.style.position="fixed";

effect.style.left=e.clientX+"px";

effect.style.top=e.clientY+"px";

effect.style.fontSize="24px";

effect.style.pointerEvents="none";

effect.style.zIndex="99999";

effect.style.transition="all .8s ease";

document.body.appendChild(effect);

setTimeout(()=>{

effect.style.transform="translateY(-80px) scale(2)";

effect.style.opacity="0";

},10);

setTimeout(()=>{

effect.remove();

},900);

});


/* ==========================================
   CONFETTI EFFECT
========================================== */

function startConfetti(){

for(let i=0;i<40;i++){

const confetti=document.createElement("div");

confetti.innerHTML=["🎉","🎊","💖","❤️","🌸"][Math.floor(Math.random()*5)];

confetti.style.position="fixed";

confetti.style.left=Math.random()*100+"%";

confetti.style.top="-50px";

confetti.style.fontSize=(18+Math.random()*18)+"px";

confetti.style.transition="transform 6s linear";

confetti.style.zIndex="9999";

document.body.appendChild(confetti);

setTimeout(()=>{

confetti.style.transform=`translateY(${window.innerHeight+200}px) rotate(720deg)`;

},50);

setTimeout(()=>{

confetti.remove();

},6500);

}

}


/* ==========================================
   FINAL CELEBRATION
========================================== */

function celebrate(){

startHeartRain();

startConfetti();

showPopup();

}


/* ==========================================
   RANDOM BACKGROUND GLOW (removed)
   This used to apply a filter to <body>, which breaks
   position:fixed for all children (heart button, music
   button, popups, preloader). Removed to keep those fixed
   correctly in their corners.
========================================== */


/* ==========================================
   SECRET HEART ANIMATION
========================================== */

if(secretHeart){

setInterval(()=>{

secretHeart.style.transform="scale(1.15)";

setTimeout(()=>{

secretHeart.style.transform="scale(1)";

},400);

},2500);

}

/* ==========================================
   RESTART WEBSITE
========================================== */

function restartWebsite(){

stopHeartRain();

closePopup();

closeSecret();

clearPins();

pages.forEach(page=>{

page.classList.remove("active");

});

lockScreen.classList.add("active");

window.scrollTo({

top:0,

behavior:"smooth"

});

if(bgMusic){

bgMusic.pause();

bgMusic.currentTime=0;

musicPlaying=false;

}

if(musicBtn){

musicBtn.innerHTML="🎵";

}

const footer=document.querySelector(".footer");

if(footer){

footer.style.display="";

}

}


/* ==========================================
   AUTO FOCUS FIRST PIN
========================================== */

window.addEventListener("load",()=>{

if(pins.length){

pins[0].focus();

}

});


/* ==========================================
   DISABLE RIGHT CLICK
========================================== */

document.addEventListener("contextmenu",(e)=>{

e.preventDefault();

});


/* ==========================================
   DISABLE IMAGE DRAG
========================================== */

document.querySelectorAll("img").forEach(img=>{

img.draggable=false;

});


/* ==========================================
   DOUBLE CLICK EFFECT
========================================== */

document.addEventListener("dblclick",()=>{

startConfetti();

});


/* ==========================================
   PAGE VISIBILITY
========================================== */

document.addEventListener("visibilitychange",()=>{

if(document.hidden){

if(bgMusic){

bgMusic.pause();

}

}else{

if(bgMusic && musicPlaying){

bgMusic.play().catch(()=>{});

}

}

});


/* ==========================================
   WINDOW RESIZE
========================================== */

window.addEventListener("resize",()=>{

window.scrollTo({

top:0

});

});


/* ==========================================
   SECRET MESSAGE
========================================== */

let clickCount=0;

document.body.addEventListener("click",()=>{

clickCount++;

if(clickCount===20){

showHiddenMessage();

clickCount=0;

}

});


/* ==========================================
   MOBILE TOUCH EFFECT
========================================== */

document.addEventListener("touchstart",()=>{

document.body.style.opacity=".98";

});

document.addEventListener("touchend",()=>{

document.body.style.opacity="1";

});


/* ==========================================
   WELCOME ANIMATION
========================================== */

function welcomeAnimation(){

const card=document.querySelector(".welcomeCard");

if(!card) return;

card.style.transform="scale(.8)";

card.style.opacity="0";

setTimeout(()=>{

card.style.transition=".6s";

card.style.transform="scale(1)";

card.style.opacity="1";

},100);

}


/* ==========================================
   CALL WELCOME ANIMATION
========================================== */

if(startBtn){

startBtn.addEventListener("click",()=>{

welcomeAnimation();

});

}

/* ==========================================
   FINAL INITIALIZATION
========================================== */

document.addEventListener("DOMContentLoaded",()=>{

if(pins.length){

pins[0].focus();

}

createHeart();

welcomeAnimation();

});


/* ==========================================
   AUTO HEART CREATOR
========================================== */

setInterval(()=>{

createHeart();

},1800);


/* ==========================================
   FINAL STARTUP EFFECT
========================================== */

setTimeout(()=>{

document.body.style.opacity="1";

},300);


/* ==========================================
   BUTTON RIPPLE EFFECT
========================================== */

document.querySelectorAll("button").forEach(btn=>{

btn.addEventListener("click",function(e){

const ripple=document.createElement("span");

const rect=this.getBoundingClientRect();

const size=Math.max(rect.width,rect.height);

ripple.style.width=size+"px";

ripple.style.height=size+"px";

ripple.style.position="absolute";

ripple.style.borderRadius="50%";

ripple.style.left=(e.clientX-rect.left-size/2)+"px";

ripple.style.top=(e.clientY-rect.top-size/2)+"px";

ripple.style.background="rgba(255,255,255,.5)";

ripple.style.transform="scale(0)";

ripple.style.transition=".6s";

ripple.style.pointerEvents="none";

const computedPosition=getComputedStyle(this).position;

if(computedPosition==="static"){

this.style.position="relative";

}

this.style.overflow="hidden";

this.appendChild(ripple);

setTimeout(()=>{

ripple.style.transform="scale(4)";

ripple.style.opacity="0";

},20);

setTimeout(()=>{

ripple.remove();

},650);

});

});


/* ==========================================
   KEEP HEART RAIN CLEAN
========================================== */

setInterval(()=>{

if(heartRain && heartRain.style.display==="block"){

const spans=heartRain.querySelectorAll("span");

if(spans.length>50){

spans.forEach((item,index)=>{

if(index<20){

item.remove();

}

});

}

}

},5000);


/* ==========================================
   AUTO STOP HEART RAIN
========================================== */

function autoStopHearts(){

setTimeout(()=>{

stopHeartRain();

},10000);

}


/* ==========================================
   UPDATE SHOW FINAL
========================================== */

const oldShowFinal = showFinal;

showFinal = function(){

oldShowFinal();

startConfetti();

autoStopHearts();

};


/* ==========================================
   FINISH MESSAGE
========================================== */

console.log("❤️ Website Loaded Successfully ❤️");
console.log("Made With Love For Preeti ❤️");

/* ==========================================
   END OF SCRIPT
========================================== */