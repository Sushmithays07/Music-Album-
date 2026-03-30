document.addEventListener("DOMContentLoaded", function () {

const audio = document.getElementById("song");
const playBtn = document.getElementById("playBtn");
const nextBtn = document.getElementById("nextBtn");
const prevBtn = document.getElementById("prevBtn");
const progress = document.getElementById("progress");
const title = document.getElementById("songTitle");
const album = document.getElementById("album");
const lyricsContainer = document.querySelector(".lyrics-container");
const currentLine = document.getElementById("currentLine");
const albumNameText = document.getElementById("albumName");

const params = new URLSearchParams(window.location.search);
const albumKey = params.get("album") || "hiNanna";

const albums = {

HiNanna:[

{
name:"Gaaju Bomma 💕",
file:"images/audio/Gajjubomma.mp3",
image:"images/Gaaju.png",
lyrics:[
{time:1,text:"Itu raave naa gaajubomma.."},
{time:6,text:"nene nanna amma.."},
{time:10,text:"yeda neeku uyyala komma.."},
{time:14,text:"ninnupe cheyye prema.."}
]
},

{
name:"Oo Chedhu Nijam 🎶",
file:"images/audio/chedunijam.mp3",
image:"images/chedhunijam.png",
lyrics:[
{time:10,text:"Swapnaalanni kalla munde karigenilaa.."},
{time:15,text:"Ayinaa edho Aasha Needhigaa.."},
{time:20,text:"evaindho Ee prema putte Okkasaariga.."}
]
}

],

melodies:[

{
name:"Melody Song 1",
file:"melody1.mp3",
image:"images/melody1.png",
lyrics:[
{time:2,text:"Melody lyric line 1"},
{time:7,text:"Melody lyric line 2"},
{time:12,text:"Melody lyric line 3"}
]
}

],

sad:[

{
name:"Sad Song 1",
file:"sad1.mp3",
image:"sad1.png",
lyrics:[
{time:3,text:"Sad lyric line 1"},
{time:8,text:"Sad lyric line 2"},
{time:13,text:"Sad lyric line 3"}
]
}

],

soul:[

{
name:"Soul Song 1",
file:"soul1.mp3",
image:"soul1.png",
lyrics:[
{time:4,text:"Soul lyric line 1"},
{time:9,text:"Soul lyric line 2"},
{time:14,text:"Soul lyric line 3"}
]
}

],

beats:[

{
name:"Beat Song 1",
file:"beat1.mp3",
image:"beat1.png",
lyrics:[
{time:1,text:"Beat lyric line 1"},
{time:6,text:"Beat lyric line 2"},
{time:11,text:"Beat lyric line 3"}
]
}

],

motivation:[

{
name:"Motivation Song 1",
file:"motivation1.mp3",
image:"motivation1.png",
lyrics:[
{time:5,text:"Motivation lyric line 1"},
{time:10,text:"Motivation lyric line 2"},
{time:15,text:"Motivation lyric line 3"}
]
}

],
 
devotional:[

{
name:"Devotional Song 1",
file:"devotional1.mp3",
image:"devotional1.png",
lyrics:[
{time:2,text:"Devotional lyric line 1"},
{time:7,text:"Devotional lyric line 2"},
{time:12,text:"Devotional lyric line 3"}
]
},

{
name:"Devotional Song 2",
file:"devotional2.mp3",
image:"devotional2.png",
lyrics:[
{time:4,text:"Devotional lyric line 1"},
{time:9,text:"Devotional lyric line 2"},
{time:14,text:"Devotional lyric line 3"}
]
}

],
friendship:[

{
name:"Friendship Song 1",
file:"friendship1.mp3",
image:"friendship1.png",
lyrics:[
{time:3,text:"Friendship lyric line 1"},
{time:8,text:"Friendship lyric line 2"},
{time:13,text:"Friendship lyric line 3"}
]
},

{
name:"Friendship Song 2",
file:"friendship2.mp3",
image:"friendship2.png",
lyrics:[
{time:5,text:"Friendship lyric line 1"},
{time:10,text:"Friendship lyric line 2"},
{time:15,text:"Friendship lyric line 3"}
]
}

],
family:[

{
name:"Family Song 1",
file:"family1.mp3",
image:"family1.png",
lyrics:[
{time:4,text:"Family lyric line 1"},
{time:9,text:"Family lyric line 2"},
{time:14,text:"Family lyric line 3"}
]
},

{
name:"Family Song 2",
file:"family2.mp3",
image:"family2.png",
lyrics:[
{time:6,text:"Family lyric line 1"},
{time:11,text:"Family lyric line 2"},
{time:16,text:"Family lyric line 3"}
]
}

]

};

const songs = albums[albumKey];
albumNameText.textContent = albumKey;

let songIndex = 0;

function loadSong(index){

const song = songs[index];

audio.src = song.file;
title.textContent = song.name;
album.src = song.image;

lyricsContainer.innerHTML="";
currentLine.textContent="Press Play 🎵";
progress.value=0;

song.lyrics.forEach(line=>{

const p=document.createElement("p");
p.textContent=line.text;
p.dataset.time=line.time;

lyricsContainer.appendChild(p);

});

}

playBtn.addEventListener("click",()=>{

if(audio.paused){
audio.play();
playBtn.textContent="❚❚";
}else{
audio.pause();
playBtn.textContent="▶";
}

});

nextBtn.addEventListener("click",()=>{
songIndex=(songIndex+1)%songs.length;
loadSong(songIndex);
audio.play();
});

prevBtn.addEventListener("click",()=>{
songIndex=(songIndex-1+songs.length)%songs.length;
loadSong(songIndex);
audio.play();
});

audio.addEventListener("timeupdate",()=>{

if(!audio.duration)return;

progress.value=(audio.currentTime/audio.duration)*100;

const lines=lyricsContainer.querySelectorAll("p");

lines.forEach((line,index)=>{

const start=parseFloat(line.dataset.time);
const nextLine=lines[index+1];
const end=nextLine?parseFloat(nextLine.dataset.time):audio.duration;

if(audio.currentTime>=start && audio.currentTime<end){

line.classList.add("active");
currentLine.textContent=line.textContent;

}else{

line.classList.remove("active");

}

});

});

progress.addEventListener("input",()=>{

if(!audio.duration)return;

audio.currentTime=(progress.value/100)*audio.duration;

});

loadSong(songIndex);
addRecent(song.name);

});

/* ===== FAVORITE SYSTEM ===== */

/*function addFavorite(song){

let user = localStorage.getItem("user");

if(!user){
alert("Please login first");
return;
}

let key = user + "_favorites";

let fav = JSON.parse(localStorage.getItem(key)) || [];

if(!fav.includes(song)){
fav.push(song);
localStorage.setItem(key, JSON.stringify(fav));
}

alert(song + " added to favorites ❤️");

}*/

function addFavorite(song){

if(!song || song === "undefined"){
alert("Song not loaded yet");
return;
}

let user = localStorage.getItem("user");

if(!user){
alert("Please login first");
return;
}

let album = new URLSearchParams(window.location.search).get("album");

let key = user + "_favorites";

let fav = JSON.parse(localStorage.getItem(key)) || [];

let favItem = {song:song, album:album};

let exists = fav.some(item => item.song === song);

if(!exists){
fav.push(favItem);
localStorage.setItem(key, JSON.stringify(fav));
}

alert(song + " added to favorites ❤️");

}

/* LOAD FAVORITES ON HOME PAGE */

/*function loadFavorites(){

let user = localStorage.getItem("user");

if(!user) return;

let key = user + "_favorites";

let fav = JSON.parse(localStorage.getItem(key)) || [];

let container = document.getElementById("favoriteList");

if(!container) return;

container.innerHTML="";

fav.forEach(song=>{

let div=document.createElement("div");
div.innerText="❤️ "+song;

container.appendChild(div);

});

}*/
function loadFavorites(){

let user = localStorage.getItem("user");

if(!user) return;

let key = user + "_favorites";

let fav = JSON.parse(localStorage.getItem(key)) || [];

let container = document.getElementById("favoriteList");

container.innerHTML="";

fav.forEach((item,index)=>{

let div=document.createElement("div");
div.className="fav-item";

let song=document.createElement("span");
song.innerText="❤️ "+item.song;
song.style.cursor="pointer";

/* OPEN SONG WHEN CLICKED */

song.onclick=function(){
window.location.href="album.html?album="+item.album;
};

/* REMOVE BUTTON */

let remove=document.createElement("span");
remove.innerText=" ❌";
remove.style.cursor="pointer";

remove.onclick=function(e){
e.stopPropagation();
removeFavorite(index);
};

div.appendChild(song);
div.appendChild(remove);

container.appendChild(div);

});

}
//

function removeFavorite(index){

let user = localStorage.getItem("user");

let key = user + "_favorites";

let fav = JSON.parse(localStorage.getItem(key)) || [];

fav.splice(index,1);

localStorage.setItem(key,JSON.stringify(fav));

loadFavorites();

}
function addRecent(song){

if(!song || song === "null") return;

let recent = JSON.parse(localStorage.getItem("recentSongs")) || [];

recent = recent.filter(s => s !== song);

recent.unshift(song);

if(recent.length > 5){
recent.pop();
}

localStorage.setItem("recentSongs", JSON.stringify(recent));

}
