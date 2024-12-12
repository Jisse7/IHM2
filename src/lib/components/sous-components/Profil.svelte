<script>
  import {login, clicProfil} from '$lib/stores';  
  import {estCo} from '$lib/stores';  
  import {clicLibrairie, clicAccueil, clicFavoris, creerPlaylist } from '$lib/stores';


  function handleClick() {
      $login = true;
  }

  function toggleProfile() {
    $clicProfil = !$clicProfil;
  }

  function logSetFalse(){
    $login = false;
  }

  function actionProfil(){
    $clicLibrairie = false;
    $clicFavoris = false;
    $clicAccueil = false;
    $creerPlaylist = false;
    $clicProfil=true;
  }
</script>

{#if $estCo}
<button class="button" on:click={actionProfil}>
<span class="text-light" >X</span>
  <span class="tooltip">Profil</span>
</button>



{:else}
<a href="#" class="log_in" on:click={handleClick}>Se connecter</a>
{/if}

<style>
.log_in {
    display: inline-block;
    background-color: #ffffff;
    color: #000000;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: 2px solid #000000;
    border-radius: 50px;
    text-align: center;
    cursor: pointer;
}
  
.log_in:hover {
    background-color: #000000;
    color: #ffffff;
}

.button {
    width: 50px;
    height: 50px;
    position: relative;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: rgb(44, 44, 44);
    border-radius: 50%;
    cursor: pointer;
    transition-duration: 0.3s;
    box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.13);
    border: none;
}
  
.text-light {
    color: white;
    font-size: 16px;
    font-weight: bold;
    transition: color 0.3s ease;
}
  
.tooltip {
    position: absolute;
    bottom: -30px;
    left: 50%;
    transform: translateX(-50%);
    opacity: 0;
    background-color: rgb(12, 12, 12);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
}
  
.tooltip::before {
    content: "";
    position: absolute;
    top: -5px;
    left: 50%;
    transform: translateX(-50%) rotate(45deg);
    width: 10px;
    height: 10px;
    background-color: rgb(12, 12, 12);
}
  
.button:hover {
    background-color: rgb(56, 56, 56);
}
  
.button:hover .text-light {
    color: #1db954;
}
  
.button:hover .tooltip {
    opacity: 1;
    transform: translateX(-50%) translateY(-5px);
}
</style>