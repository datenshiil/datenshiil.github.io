// Build a light, looping feather fall. The elements are decorative and never intercept clicks.
const featherLayer=document.getElementById("featherLayer");
if(featherLayer && !window.matchMedia("(prefers-reduced-motion: reduce)").matches){
 const featherCount=10;
 for(let i=0;i<featherCount;i++){
   const feather=document.createElement("img");
   feather.src="assets/feather.png";
   feather.alt="";
   feather.className="falling-feather";
   feather.style.setProperty("--x",(Math.random()*100)+"vw");
   feather.style.setProperty("--size",(Math.random()*13+13)+"px");
   feather.style.setProperty("--duration",(Math.random()*12+20)+"s");
   feather.style.setProperty("--delay",(-Math.random()*32)+"s");
   feather.style.setProperty("--drift",(Math.random()*90-45)+"px");
   feather.style.setProperty("--start-rotation",(Math.random()*100-50)+"deg");
   feather.style.setProperty("--opacity",(Math.random()*.28+.28).toFixed(2));
   featherLayer.appendChild(feather);
 }
}

const gate=document.getElementById("gate");
const site=document.getElementById("site");
const enterButton=document.getElementById("enterButton");
const audio=document.getElementById("audio");
const enterSound = new Audio("assets/enter-sound.mp3");
enterSound.preload = "auto";
enterSound.volume = 0.7;

audio.preload = "auto";
const playButton=document.getElementById("playButton");
const musicHint=document.getElementById("musicHint");
const volumeSlider=document.getElementById("volumeSlider");
const volumeValue=document.getElementById("volumeValue");
let hasTrack=true, fadeFrame=null, targetVolume=0.60;
audio.volume=targetVolume;
audio.addEventListener("error",()=>{hasTrack=false;musicHint.textContent="Audio file unavailable. Check assets/music.mp3.";});
volumeSlider.addEventListener("input",()=>{targetVolume=Number(volumeSlider.value)/100;volumeValue.textContent=volumeSlider.value+"%";audio.volume=targetVolume;});
enterButton.addEventListener("click",async()=>{
 enterSound.currentTime = 0;
 enterSound.play().catch(()=>{});
 gate.classList.add("fade");
 window.setTimeout(()=>{gate.classList.add("hidden");site.classList.remove("hidden");site.classList.add("entered");window.scrollTo(0,0);},650);
 if(hasTrack){try{
   audio.volume=Math.min(.10,targetVolume);await audio.play();
   const start=performance.now(),duration=2500,initial=Math.min(.10,targetVolume);
   const ramp=now=>{const p=Math.min((now-start)/duration,1);audio.volume=initial+(targetVolume-initial)*p;if(p<1)fadeFrame=requestAnimationFrame(ramp);else audio.volume=targetVolume;};
   fadeFrame=requestAnimationFrame(ramp);playButton.textContent="Ⅱ";musicHint.textContent="Now playing.";
 }catch(_){musicHint.textContent="Couldn't play audio. Check assets/music.mp3.";}}
});
playButton.addEventListener("click",async()=>{if(!hasTrack)return;if(audio.paused){try{await audio.play();playButton.textContent="Ⅱ";musicHint.textContent="Now playing.";}catch(_){musicHint.textContent="Couldn't play audio.";}}else{audio.pause();playButton.textContent="▶";musicHint.textContent="Paused.";}});
document.getElementById("backTop").addEventListener("click",e=>{e.preventDefault();window.scrollTo({top:0,behavior:"smooth"});});
