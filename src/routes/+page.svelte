<script>
  //LE MAIN


    import Navbar from "$lib/components/Navbar.svelte";
    import Sidebar from "$lib/components/Sidebar.svelte";
    import PlayListsList from "$lib/components/PlaylistsList.svelte";

 
    import Favoris from "$lib/components/Favoris.svelte";
    import Login from "$lib/components/Login.svelte";
    import ResultatRecherche from "$lib/components/ResultatRecherche.svelte";
    import CreerPlaylist  from "$lib/components/CreerPlaylist.svelte";

    import Player from "$lib/components/Player.svelte"



    import UserPlaylists from "$lib/components/UserPlaylists.svelte";
    

    import {clicLibrairie,clicAccueil,clicFavoris,resultatRecherche,creerPlaylist,lectureFavoris } from '$lib/stores';
    import {login} from '$lib/stores';
    import {estCo} from '$lib/stores';



    
</script>


{#if $login}
<div class="d-flex justify-content-center " style="width:100%;">
    <Login />
</div>
   
{:else if estCo}

<div  style="height:100%; width:100%; ">

<Sidebar/>
<Navbar/>

<div class="maincontenue" >
<!-- <Player/> -->
 {#if $clicLibrairie}

<UserPlaylists/>

 <!-- <Librairie/> -->
 
 {/if}

<!-- <Player/> -->
 <!-- <Librairie/> -->


 {#if $resultatRecherche}
  <ResultatRecherche/>
{/if}

 {#if $clicAccueil}
 <PlayListsList/>
 
 {/if}

 {#if $creerPlaylist}
  <CreerPlaylist />
{/if}

 {#if $clicFavoris}
 
 <Favoris/>
 
 {/if}

</div>

</div>

 
{/if}

<style>
    .maincontenue {
      margin: 1%;
      position: fixed;
      left: 13%;
      top: 13%;
      height: 84%;
      width: 85%;
      /* background-color: red; */
      overflow-y: auto;
      overflow-x: auto; 

      /* background-color: #333; */
      border-radius: 8px;

      padding-right: 10px; /* Pour ajouter un espace pour la barre de défilement */
    }
  
    /* Stylisation de la barre de défilement */
    .maincontenue::-webkit-scrollbar {
      width: 12px; /* Largeur de la barre de défilement */
    }
  
    .maincontenue::-webkit-scrollbar-track {
      background-color: #333; /* Couleur du fond de la piste de la barre de défilement */
      border-radius: 10px; /* Arrondir les bords de la piste */
    }
  
    .maincontenue::-webkit-scrollbar-thumb {
      background-color: #888; /* Couleur du curseur de la barre de défilement */
      border-radius: 10px; /* Arrondir les bords du curseur */
      border: 3px solid #333; /* Ajout d'une bordure autour du curseur */
    }
  
    .maincontenue::-webkit-scrollbar-thumb:hover {
      background-color: #555; /* Changer la couleur du curseur quand il est survolé */
    }

  </style>
  