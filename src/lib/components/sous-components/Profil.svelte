<script>
  import {login} from '$lib/stores';  
  import {estCo} from '$lib/stores';  

  function handleClick() {
      $login = true;
  }

  function logSetFalse(){
    $login=false;
  }
</script>

{#if $estCo}
<button class="button" on:click={handleClick}>
  <span class="text-light">JC</span>
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
    background-color: #000000; /* fond noir au survol */
    color: #ffffff; /* texte blanc au survol */
  }



  /* Style du bouton */
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
  
  /* Texte "JC" */
  .text-light {
    color: white; 
    font-size: 16px;
    font-weight: bold;
    transition: color 0.3s ease;
  }
  
  /* Style du tooltip caché par défaut */
  .tooltip {
    position: absolute;
    bottom: -30px; /* Place le tooltip sous le bouton */
    left: 50%;
    transform: translateX(-50%);
    opacity: 0; /* Invisible par défaut */
    background-color: rgb(12, 12, 12);
    color: white;
    padding: 5px 10px;
    border-radius: 5px;
    font-size: 12px;
    transition: opacity 0.3s ease, transform 0.3s ease;
    pointer-events: none;
  }
  
  /* la flèche sous le tooltip */
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
  
  /* Effet au survol */
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
  