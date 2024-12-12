<script>
  import { login } from '$lib/stores';  
  import { estCo } from '$lib/stores';  

  let showOffcanvas = false;

  $: console.log("estCo:", $estCo, "login:", $login);

  function handleClick() {
    $login = true;
  }

  function toggleOffcanvas() {
    showOffcanvas = !showOffcanvas;
  }

  function handleLogout() {
    console.log('Déconnexion...');
    $estCo = false;
    $login = false;
    showOffcanvas = false;
  }

  function handleClickOutside(event) {
    if (event.target.classList.contains('offcanvas-backdrop')) {
      showOffcanvas = false;
    }
  }
</script>

<svelte:head>
  <link href="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/css/bootstrap.min.css" rel="stylesheet">
  <script src="https://cdn.jsdelivr.net/npm/bootstrap@5.3.0/dist/js/bootstrap.bundle.min.js"></script>
</svelte:head>

{#if $estCo}
  <div class="profile-container">
    <button class="profile-button" on:click={toggleOffcanvas}>
      <span class="profile-text">X</span>
    </button>
  </div>

  {#if showOffcanvas}
    <div class="offcanvas-backdrop" on:click={handleClickOutside}></div>
    <div class="offcanvas offcanvas-end show" tabindex="-1">
      <div class="offcanvas-header">
        <h5 class="offcanvas-title">Profil</h5>
        <button type="button" class="btn-close btn-close-white" on:click={toggleOffcanvas}></button>
      </div>
      <div class="offcanvas-body">
        <div class="profile-menu">
          <a href="#profile" class="menu-item">
            <i class="bi bi-person"></i>
            Profil
          </a>
          <button type="button" class="menu-item logout-button" on:click={handleLogout}>
            <i class="bi bi-box-arrow-right"></i>
            Se déconnecter
          </button>
        </div>
      </div>
    </div>
  {/if}
{:else}
  <a href="#" class="log_in" on:click|preventDefault={handleClick}>Se connecter</a>
{/if}

<style>
  :global(.offcanvas) {
    background-color: #121212;
    color: white;
    width: 330px !important;
  }

  :global(.offcanvas-backdrop) {
    background-color: rgba(0, 0, 0, 0.7);
  }

  :global(.offcanvas-header) {
    border-bottom: 1px solid rgba(255, 255, 255, 0.1);
    padding: 1rem 1.5rem;
  }

  :global(.offcanvas-title) {
    color: white;
    font-size: 1.5rem;
    font-weight: 700;
  }

  .profile-menu {
    display: flex;
    flex-direction: column;
    gap: 0.5rem;
  }

  .menu-item {
    display: flex;
    align-items: center;
    gap: 1rem;
    padding: 0.75rem 1rem;
    color: #b3b3b3;
    text-decoration: none;
    border: none;
    background: none;
    width: 100%;
    text-align: left;
    font-size: 0.9rem;
    border-radius: 4px;
    transition: all 0.2s;
  }

  .menu-item:hover {
    color: white;
    background-color: rgba(255, 255, 255, 0.1);
  }

  .profile-button {
    width: 50px;
    height: 50px;
    display: flex;
    align-items: center;
    justify-content: center;
    background-color: #282828;
    border-radius: 50%;
    cursor: pointer;
    border: none;
    transition: all 0.3s;
  }

  .profile-button:hover {
    background-color: #3e3e3e;
  }

  .profile-text {
    color: white;
    font-size: 16px;
    font-weight: bold;
  }

  .log_in {
    display: inline-block;
    background-color: white;
    color: black;
    text-decoration: none;
    font-size: 16px;
    font-weight: bold;
    padding: 10px 20px;
    border: 2px solid black;
    border-radius: 50px;
    text-align: center;
    cursor: pointer;
  }

  .log_in:hover {
    background-color: black;
    color: white;
  }
</style>