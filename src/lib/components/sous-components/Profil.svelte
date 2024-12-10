<script>
  import {login} from '$lib/stores';  
  import {estCo} from '$lib/stores';  

  let showDropdown = false;

  $: console.log("estCo:", $estCo, "login:", $login);

  function handleClick() {
    $login = true;
  }

  function toggleDropdown() {
    showDropdown = !showDropdown;
  }

  function handleLogout() {
    console.log('Déconnexion...');
    $estCo = false;
    $login = false;
    showDropdown = false;
  }

  function handleClickOutside(event) {
    if (profileContainer && !profileContainer.contains(event.target)) {
      showDropdown = false;
    }
  }

  let profileContainer;
</script>

<svelte:window on:click={handleClickOutside}/>

{#if $estCo}
<div class="profile-container" bind:this={profileContainer}>
  <button class="button" on:click={toggleDropdown}>
    <span class="text-light">X</span>
  
  </button>

  {#if showDropdown}
    <div class="dropdown" on:click>
      <div class="dropdown-item">
        <a href="#profile" on:click={handleLogout}>Profil</a>
      </div>
      <div class="dropdown-item">
        <button type="button" class="logout-button" on:click={handleLogout}>
          Se déconnecter
        </button>
      </div>
    </div>
  {/if}
</div>

{:else}
<a href="#" class="log_in" on:click|preventDefault={handleClick}>Se connecter</a>
{/if}

  <style>
  .logout-button {
    width: 100%;
    text-align: left;
  }

.profile-container {
    position: relative;
    display: inline-block;
  }

  .dropdown {
    position: absolute;
    top: 60px;
    right: 0;
    background-color: rgb(44, 44, 44);
    border-radius: 8px;
    width: 200px;
    box-shadow: 0 4px 8px rgba(0, 0, 0, 0.2);
    z-index: 1000;
  }

  .dropdown-item {
    padding: 12px 16px;
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
  }

  .dropdown-item:last-child {
    border-bottom: none;
  }

  .dropdown-item a,
  .dropdown-item button {
    color: white;
    text-decoration: none;
    background: none;
    border: none;
    width: 100%;
    text-align: left;
    font-size: 14px;
    cursor: pointer;
    padding: 0;
  }

  .dropdown-item:hover {
    background-color: rgba(255, 255, 255, 0.1);
  }

  .dropdown-item a:hover,
  .dropdown-item button:hover {
    color: #1db954;
  }

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
  