<script>
  import Home from "$lib/components/sous-components/Home.svelte";
  import Searchbar from "$lib/components/sous-components/Searchbar.svelte";
  import Notification from "$lib/components/sous-components/Notification.svelte";
  import Profil from "$lib/components/sous-components/Profil.svelte";
  import Download from "$lib/components/sous-components/Download.svelte";
  import BoutonPrenium from "$lib/components/sous-components/BoutonPrenium.svelte";
</script>

<div class="topbar">
  <div class="navbar row">
    <!-- Barre de recherche -->
    <div class="col-1"></div>
    <div class="col-1  d-flex justify-content-evenly align-items-center">
      <span class="me-5">
        <Home/>
      </span>
      <span class="me-1">
        <Searchbar />
      </span>
      
    </div>

   
    <div class="col-2"></div>

 
    <div class="col-5 d-flex justify-content-evenly align-items-center">
      <span class="me-1">
        <BoutonPrenium />
      </span>
      <span class="me-1">
        <Download />
      </span>
      <span class="me-1">
        <Notification />
      </span>
      <span>
        <Profil />
      </span>
    </div>
  </div>
</div>

<style>
  .topbar {
    position: fixed;
    left: 13%;
    top: 0;
    width: 90%;
    height: 13%;
    display: flex;
    justify-content: space-between;
    padding: 2px 30px; /* Marge en pixels */
  }

  .topbar .navbar {
    width: 100%;
    /* background-color: red; pour debug */
    display: flex;
    align-items: center;
  }

  .topbar .navbar ul {
    list-style: none;
    display: flex;
    padding: 0;
    margin: 0;
  }

  .topbar .navbar ul li {
    margin: 0 10px; 
    width: auto;
  }
</style>
