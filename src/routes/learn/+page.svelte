<script>
    let lang = ""
</script>

<div id="language-select">
    <h2>Select Language:</h2>
    <input type="radio" id="german" name="lang" on:click={()=>{lang = "de"}}>
    <label for="german">German</label>
</div>

{#if lang != ""}
<a href="learn/{lang}" class="redirect">Proceed</a>
{/if}