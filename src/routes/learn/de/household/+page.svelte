<script>
import { onMount } from 'svelte';
import { collection, query, getFirestore, where, getDocs } from "firebase/firestore";

let db;
onMount(async () => {
    const app = (await ( import("../../../firebase"))).app
    db = getFirestore(app);
})

async function grabDoc(){
    // const ran = Math.random() * 10 + 1;
    const ran = 0;
    const lang = collection(db, "de");
    const q = query(lang, where("id", "==", ran))
    const querySnapshot = await getDocs(q);
    querySnapshot.forEach((doc) => {
        console.log(doc.id, " => ", doc.data());
    });
}
</script>

<button on:click={()=>{console.log(grabDoc())}}>click me</button>