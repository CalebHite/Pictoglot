<script>
import { onMount } from 'svelte';
import { collection, query, getFirestore, where, getDocs } from "firebase/firestore";
import { tweened } from 'svelte/motion';

let db;
onMount(async () => {
    const app = (await ( import("../../../firebase"))).app
    db = getFirestore(app);
})

let currentPrompt = "";
let currentGuess = "";
let currentAns = "";
let score = 0;
let res = "";
let start = false;
let timeStart = false;

let original = 15; // TYPE NUMBER OF SECONDS HERE
let timer = tweened(original)
$: if(start == true && timeStart  == false){
    setInterval(() => {
    if ($timer > 0) $timer--;
    }, 1000);
    timeStart = true;
}
$: minutes = Math.floor($timer / 60);
$: seconds = Math.floor($timer - minutes * 60)

async function grabDoc(){
    const ran = Math.round(Math.random() * 10);
    const lang = collection(db, "de");
    const q = query(lang, where("id", "==", ran))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        currentPrompt = doc.data().prompt;
        currentAns = doc.data().answer;
    });
}
</script>

<h1>{seconds}s Remaining!</h1>
<progress value={$timer/original}></progress>

<button on:click={()=>{
    start = true;
    grabDoc();
}}>
Begin
</button>
{#if currentPrompt}
<h1>Score: {score}</h1>
<img src={currentPrompt} alt="Prompt">
<br>
<input type="Text" bind:value="{currentGuess}">
<button on:click={()=>{
    if(currentGuess == currentAns){
        score++;
        res = "Correct!"
    }
    else{
        score--;
        res = "False! it is "+currentAns
    }
    currentGuess = ""
    grabDoc();
}}>Submit Guess</button>
{#if res != ""}
<h2>{res}</h2>
{/if}
{/if}
<style>
    img{
        width:30%;
    }
</style>