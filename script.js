//initialisation
var idFilm=0;
var priceSelected=0;
var nbSelected=0;
var filmTitles=['','avengers','JOKER','Toy Story','The Lion King'];//films titres
var filmPrice=[0,10,12,8,9];//films titres
var filmIframes=['', 'https://www.youtube.com/embed/-NfKTtTozWg?si=BAIw70PXRFkkmUmZ', 'https://www.youtube.com/embed/rgrWXTz_8eU?si=gUwHLI5foekSnxtf', 'https://www.youtube.com/embed/v-PjgYDrg70?si=umvoMqQy4iIv2vLa', 'https://www.youtube.com/embed/lFzVJEksoDY?si=utjlzM4ZCrKwpt1y'];//films src from youtube

var filmStars=[[],[],[],[],[] ];//films stars
filmStars[0]=['','','',''];
filmStars[1]=['Robert Downey Jr.','Chris Evans','Mark Ruffalo','Scarlett Johansson'];
filmStars[2]=['Joaquin Phoenix','Robert De Niro','Zazie Beetz','Frances Conroy'];
filmStars[3]=['Tom Hanks','Tim Allen','Erik von Detten','Joan Cusack'];
filmStars[4]=['James Earl Jones','Beyonce','Donald Glover','Chiwetel Ejiofor'];

var imgStars=[[],[],[],[],[] ];//films img stars
imgStars[0]=['','','',''];
imgStars[1]=['Robert','Chris','Mark','Scarlett'];
imgStars[2]=['Joaquin','Robert','Zazie','Frances'];
imgStars[3]=['Tom','Tim','Erik','Joan'];
imgStars[4]=['James','Beyonce','Donald','Chiwetel'];

//plan de salle pour chaque film
var filmChairs=[[],[],[],[],[] ];
createMatrix(filmChairs[0]);
createMatrix(filmChairs[1]);
createMatrix(filmChairs[2]);
createMatrix(filmChairs[3]);
createMatrix(filmChairs[4]);


//functions
function createMatrix(arr){//initialisation de plan de salle 
for (let id = 0; id < 48; id++) {
arr[id]=0;
}
return arr; 
}

function SelectFilm (){
idFilm=parseInt(document.getElementById("films").value);
priceSelected=0;
nbSelected=0;
// updateScreen;
updateMarquee();
updateTrailer();
updateChairs();
updatePrice();
}

function updateMarquee (){
var marquee=document.getElementById("marquee");
var Str='';
if(idFilm==0){
Str='Choose your movie, then click Star name for more details';
}else{
for (let id = 0; id < 4; id++) {
Str=Str + '<span class="spanStar" onclick="clickMarque(' + id + ',)">' + filmStars[idFilm][id] + '</span>  &  ';
//Str=Str + '<span class="spanStar" onclick="clickMarque(' + id + ',)">' + ActivefilmStars[id] + '</span>  &  ';
}
Str = Str.substring(0,Str.length - 3);
}
marquee.innerHTML=Str;
}

function updateTrailer (){
var trailer = document.getElementById("trailer");
trailer.src=filmIframes[idFilm];//ActivefilmIframe;//"https://www.youtube.com/embed/-NfKTtTozWg?si=BAIw70PXRFkkmUmZ" ;
}

function updateChairs(){
for (let id = 0; id < filmChairs[idFilm].length; id++) {
var chair = document.getElementById("chair" + id);
if(idFilm==0){
chair.style.display='none';
}else{
chair.style.display='block';
if(chair.classList.contains("lbc")){
chair.classList.remove("lbc");
}else if(chair.classList.contains("alreadyChosen")){
chair.classList.remove("alreadyChosen");
}else if(filmChairs[idFilm][id]==2){
chair.classList.add("alreadyChosen");
}
}
}
}

function clickMarque(id){
var starImage= "img/" + idFilm + "/" + imgStars[idFilm][id] + ".jpg";
var starImg=document.getElementById("starImg");
starImg.src=starImage;
var starName=document.getElementById("starName");
starName.innerText=filmStars[idFilm][id];//ActivefilmStars[id];

document.getElementById("card").style.display='';
}

function closeCard(){
document.getElementById("card").style.display='none';
}

function ClickChair(id){
var chair = document.getElementById("chair" + id);
if(chair.classList.contains("lbc")){
chair.classList.remove("lbc");
filmChairs[idFilm][id]=0;
nbSelected=nbSelected-1;
}else{
chair.classList.add("lbc"); 
filmChairs[idFilm][id]=1;
nbSelected=nbSelected+1;
}
updatePrice();
}

function updatePrice(){
var price = filmPrice[idFilm];
priceSelected=nbSelected*price;
document.getElementById("nbSelected").innerText=nbSelected;
document.getElementById("priceSelected").innerText=priceSelected;
}

function AccomplishBooking(){
if(idFilm>0){
for (let id = 0; id < filmChairs[idFilm].length; id++) {
if(filmChairs[idFilm][id]==1){
filmChairs[idFilm][id]=2;
}
}
alert('Thank you for booking..');
document.getElementById("films").value = 0;
SelectFilm();
}
}