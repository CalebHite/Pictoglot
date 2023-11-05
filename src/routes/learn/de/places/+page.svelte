<script>
    import { onMount } from 'svelte';
    import { collection, query, getFirestore, where, getDocs } from "firebase/firestore";
    import { tweened } from 'svelte/motion';
    import Page from '../../../+page.svelte';
    
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
    let gameEnd = false;
    
    let original = 45; // TYPE NUMBER OF SECONDS HERE
    let timer = tweened(original)
    $: if(start == true && timeStart  == false){
        setInterval(() => {
        if ($timer > 0) $timer--;
        }, 1000);
        timeStart = true;
    }
    $: minutes = Math.floor($timer / 60);
    $: seconds = Math.floor($timer - minutes * 60)
    
    $: if(seconds == 0){
        gameEnd = true;
    }
    
    async function grabDoc(){
        const ran = Math.round(Math.random() * 10);
        const lang = collection(db, "places");
        const q = query(lang, where("id", "==", ran))
        const querySnapshot = await getDocs(q);
        querySnapshot.forEach((doc) => {
            currentPrompt = doc.data().prompt;
            currentAns = doc.data().answer; 
        });
    }
    
    </script>
    <body>
    {#if !gameEnd}
    {#if currentPrompt}
    <h1 class="score">Score: {score}</h1>
    <h1>{seconds}s Remaining!</h1>
    <progress value={$timer/original}></progress>
    <br>
    {/if}
    
    {#if !currentPrompt}
    <button class="begin" on:click={()=>{
        start = true;
        grabDoc();
    }}>
    Begin
    </button>
    {/if}
    
    {#if currentPrompt}
    <img src={currentPrompt} alt="Prompt">
    <br>
    <input type="Text" bind:value="{currentGuess}">
    <button class="submit" on:click={()=>{
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
    {:else}
        <h1>Game Over</h1>
        <p>Final Score: {score}</p>
    {/if}
    </body>
    <style>
        @import url('https://fonts.googleapis.com/css2?family=Inter&family=Lora:wght@400;700&display=swap');
    
        body{
            background: #C3ACD0;
            text-align: center;
        }
    
        *{
            margin: 0;
        }
        h1{
            font-family: 'Lora', serif;
            font-size: 2.5rem;
        }
        h2, p{
            font-family: 'Inter', sans-serif;
            font-size: 2rem;
            font-weight: 300;
        }
    
        progress{
            width: 30%;
            accent-color: #7743DB;
            padding-top: 2%;
            margin-bottom: 2%;
        }
    
        .score{
            position: absolute;
            left: 1%;
        }
    
        .begin{
            background: #FFFBF5;
            width: 20%;
            border-radius: 1rem;
            padding: 0.5% 0 1% 0;
            border: .25rem solid black;
            color: black;
            font-size: 5rem;
            font-family: 'Lora', serif;
            font-weight: 700;
            margin-top: 10%;
        }
        .begin:hover{
            background-color: #F7EFE5;
        }
    
        img{
            width:30%;
            border: 3.5px black solid;
            margin-bottom: .25%;
        }
        input{
            width: 23%;
            padding: .3%;
            border: 3px black solid;
            background: #FFFBF5;
        }
        .submit{
            margin: 0;
            padding: .3%;
            border: 3px black solid;
            background: #F7EFE5;
            font-family: 'Inter', sans-serif;
        }
    </style>    