<script>
  import SpotifyPlaylist from "$lib/components/SpotifyPlaylist.svelte";
  import SpotifyPlaylistAnime from "$lib/components/SpotifyPlaylistAnime.svelte";
  import SpotifyPlaylistElectro from "$lib/components/SpotifyPlaylistElectro.svelte";
  import SpotifyPlaylistFr from "./SpotifyPlaylistFr.svelte";
  
  import {thisNextTrack, chansonSwap, currentPlaylist} from '$lib/store2';
  import Player2 from '$lib/components/Player2.svelte';

  // Réinitialiser le player quand la playlist change
  $: if ($currentPlaylist) {
    $chansonSwap = false;
    setTimeout(() => {
      $chansonSwap = true;
    }, 50);
  }
</script>
  
<SpotifyPlaylistFr />
<SpotifyPlaylistElectro />
<SpotifyPlaylistAnime />
<SpotifyPlaylist />
  
{#if $chansonSwap }
  <Player2/>
{/if}