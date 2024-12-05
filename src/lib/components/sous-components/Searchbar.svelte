<script>
  import { touteslesmusiques } from '$lib/music_stores';
  import { resultatRecherche } from '$lib/stores';
  
  let searchQuery = '';

  // Mise à jour du store de résultats quand la recherche change
  $: {
    const query = searchQuery.toLowerCase();
    if (query) {
      const filtered = $touteslesmusiques.filter(track => {
        return track.title.toLowerCase().includes(query) || 
               track.artist.toLowerCase().includes(query);
      });
      resultatRecherche.set(filtered);
    } else {
      resultatRecherche.set(null);
    }
  }
</script>

<div class="inputBox_container">
  <svg class="search_icon" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 48 48">
    <path d="M46.599 46.599a4.498 4.498 0 0 1-6.363 0l-7.941-7.941C29.028 40.749 25.167 42 21 42 9.402 42 0 32.598 0 21S9.402 0 21 0s21 9.402 21 21c0 4.167-1.251 8.028-3.342 11.295l7.941 7.941a4.498 4.498 0 0 1 0 6.363zM21 6C12.717 6 6 12.714 6 21s6.717 15 15 15c8.286 0 15-6.714 15-15S29.286 6 21 6z">
    </path>
  </svg>
  <input 
    class="inputBox" 
    type="text" 
    bind:value={searchQuery}
    placeholder="Que souhaitez-vous écouter ou regarder ?"
  >
</div>

<style>
  .inputBox_container {
    display: flex;
    align-items: center;
    flex-direction: row;
    width: 400px;
    height: 47px;
    background-color: #2a2c30;
    border-radius: 1.2em;
    overflow: hidden;
    margin-bottom: 20px;
  }

  .search_icon {
    height: 1em;
    padding: 0 0.5em 0 0.8em;
    fill: #abb2bf;
  }

  .inputBox {
    background-color: transparent;
    color: #ffffff;
    outline: none;
    width: 100%;
    border: 0;
    padding: 0.5em 1.5em 0.5em 0;
    font-size: 1em;
  }

  ::placeholder {
    color: #abb2bf;
  }
</style>