<script>
  import { touteslesmusiques, fr } from '$lib/music_stores';
  import { playlists, addTrackToPlaylist, addPlaylist } from '$lib/playlists';
  import { favoris, toggleFavori } from '$lib/store_favoris';
  import {thisNextTrack, chansonSwap, currentPlaylist} from '$lib/store2'

  
  let selectedPlaylistId = null;
  let newPlaylistName = '';
  let selectedTrack = null;
  let isModalVisible = false;
  let previousTrackIndex = null;

  function playThisNextTrack(thisTrackIndex) {
    if (previousTrackIndex !== thisTrackIndex) {
        $chansonSwap = false;
        $currentPlaylist = 'fr'; 
        $thisNextTrack = thisTrackIndex;
        previousTrackIndex = thisTrackIndex;

        console.log($currentPlaylist, thisTrackIndex, $chansonSwap)
        setTimeout(() => {
            $chansonSwap = true;
            console.log($currentPlaylist, thisTrackIndex, $chansonSwap)
        }, 50);
        console.log($currentPlaylist, thisTrackIndex, $chansonSwap)
    }
}

  // Fonction pour trouver les playlists contenant un morceau
  function getPlaylistsForTrack(track) {
    return $playlists
      .filter(playlist => 
        playlist.tracks.some(t => t.title === track.title)
      )
      .map(playlist => playlist.name);
  }

  function openModal(track) {
    selectedTrack = track;
    isModalVisible = true;
  }

  function closeModal() {
    isModalVisible = false;
    selectedPlaylistId = null;
    newPlaylistName = '';
    selectedTrack = null;
  }

  function handleAddToPlaylist() {
    if (selectedPlaylistId === 'new') {
      // Créer une nouvelle playlist
      if (newPlaylistName.trim()) {
        addPlaylist({ 
          name: newPlaylistName, 
          tracks: selectedTrack ? [selectedTrack] : [] 
        });
      }
    } else if (selectedPlaylistId && selectedTrack) {
      // Ajouter à une playlist existante
      addTrackToPlaylist(Number(selectedPlaylistId), selectedTrack);
    }
    
    // Fermer la modal
    closeModal();
  }

  // Gestion des touches du clavier
  function handleKeydown(event) {
    if (event.key === 'Escape') {
      closeModal();
    }
  }
</script>

<svelte:window on:keydown={handleKeydown}/>

{#if isModalVisible}
<div class="fenetre">
  <div class="fenetre-header">
    <h2>Ajouter à une playlist</h2>
    <button class="fenetre-close" on:click={closeModal}>
      <i class="fa fa-times"></i>
    </button>
  </div>
 
  <div class="fenetre-content">
    <div class="search-box">
      <i class="fa fa-search"></i>
      <select class="playlist-select" bind:value={selectedPlaylistId}>
        <option value="" disabled selected>Trouver une playlist</option>
        {#each $playlists as playlist}
          <option value={playlist.id}>{playlist.name}</option>
        {/each}
        <option value="new">Créer une nouvelle playlist</option>
      </select>
    </div>

    {#if selectedPlaylistId === 'new'}
      <div class="new-playlist-container">
        <input
          type="text"
          class="new-playlist-input"
          placeholder="Nom de la nouvelle playlist"
          bind:value={newPlaylistName}
        />
      </div>
    {/if}
  </div>

  <div class="fenetre-footer">
    <button class="btn-cancel" on:click={closeModal}>Annuler</button>
    <button class="btn-add" on:click={handleAddToPlaylist}>
      <i class="fa fa-plus"></i>
      Ajouter
    </button>
  </div>
</div>
{/if}

<div class="spotify-playlists">
  <strong><h2>Francophone</h2></strong>

  <div class="list">
    {#each $fr as musique,index}
      <div class="item">
        <!-- Cœur pour ajouter/retirer des favoris -->
        <div class="favorite" on:click={() => toggleFavori(musique)}>
          <span class="fa fa-heart" 
            class:favorite={$favoris.some(f => f.title === musique.title)}></span>
        </div>

        <img src={musique.src} alt={musique.title} />

        <!-- Bouton Play -->
        <div class="play">
          <!-- Correction ici : Ajout de l'index comme paramètre -->
          <span on:click|preventDefault={() => playThisNextTrack(index)}>
            <span class="fa fa-play"></span>
          </span>
        </div>

        <h4>{musique.title}</h4>
        <p>{musique.artist}</p>

        <!-- Affichage des playlists -->
        <div class="playlist-info">
          {#if getPlaylistsForTrack(musique).length > 0}
            <p class="playlist-tags">
              {#each getPlaylistsForTrack(musique) as playlistName}
                <span class="playlist-tag">{playlistName}</span>
              {/each}
            </p>
          {/if}
        </div>

        <!-- Bouton pour ajouter à une playlist -->
        <div class="add-to-playlist" on:click={() => openModal(musique)}>
          <span class="fa fa-plus-circle"></span>
        </div>
      </div>
    {/each}
  </div>
</div>

<style>
  .spotify-playlists {
    padding: 20px 40px;
  }

  .spotify-playlists h2 {
    color: #ffffff;
    font-size: 22px;
    margin-bottom: 20px;
  }

  .spotify-playlists .list {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-behavior: smooth;
  }

  .spotify-playlists .list::-webkit-scrollbar {
    height: 8px;
  }

  .spotify-playlists .list::-webkit-scrollbar-track {
    background-color: #333;
    border-radius: 10px;
  }

  .spotify-playlists .list::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  .spotify-playlists .list .item {
    position: relative;
    min-width: 180px;
    width: 160px;
    padding: 15px;
    background-color: #181818;
    border-radius: 6px;
    cursor: pointer;
    transition: all ease 0.4s;
  }

  .spotify-playlists .list .item:hover {
    background-color: #252525;
  }

  .spotify-playlists .list .item img {
    width: 100%;
    max-height: 9.5rem;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  .spotify-playlists .list .item .play {
  position: absolute;
  right: 1rem;
  top: 11rem; /* Correction : place correctement le bouton dans l'élément */
  padding: 18px;
  background-color: #1db954;
  border-radius: 100%;
  opacity: 0; /* Rendu invisible au départ */
  transition: all ease 0.4s;
}

.spotify-playlists .list .item:hover .play {
  opacity: 1; /* Visible au survol */
  transform: translateY(-5px); /* Ajout d'un petit effet */
}

.spotify-playlists .list .item:hover .play .fa {
  opacity: 1;
}


  .spotify-playlists .list .item h4 {
    color: #ffffff;
    font-size: 14px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .spotify-playlists .list .item p {
    color: #989898;
    font-size: 12px;
    line-height: 20px;
    font-weight: 600;
  }

  .spotify-playlists .list .item .favorite {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  .spotify-playlists .list .item .favorite .fa {
    font-size: 20px;
    color: #ccc;
    transition: all 0.3s;
  }

  .spotify-playlists .list .item .favorite .fa.favorite {
    color: #1db954;
  }

  .spotify-playlists hr {
    margin: 70px 0px 0px;
    border-color: #636363;
  }

  .playlist-info {
    margin-top: 10px;
  }

  .playlist-tags {
    display: flex;
    flex-wrap: wrap;
    gap: 5px;
  }

  .playlist-tag {
    background-color: #1db954;
    color: white;
    font-size: 10px;
    padding: 2px 5px;
    border-radius: 3px;
  }

  .add-to-playlist {
    position: absolute;
    right: 10px;
    bottom: 10px;
    cursor: pointer;
  }

  .add-to-playlist .fa {
    font-size: 20px;
    color: #ccc;
    transition: all 0.3s;
  }

  .add-to-playlist .fa:hover {
    color: #1db954;
  }

  .fenetre {
    width: 480px;
    background-color: #282828;
    border-radius: 8px;
    box-shadow: 0 8px 24px rgba(0, 0, 0, 0.5);
    position: fixed;
    top: 50%;
    left: 50%;
    transform: translate(-50%, -50%);
    z-index: 9999;
    color: white;
  }

  .fenetre-header {
    padding: 24px 32px;
    border-bottom: 1px solid #404040;
    display: flex;
    justify-content: space-between;
    align-items: center;
  }

  .fenetre-header h2 {
    font-size: 24px;
    font-weight: 700;
    margin: 0;
  }

  .fenetre-close {
    background: transparent;
    border: none;
    color: #b3b3b3;
    font-size: 24px;
    cursor: pointer;
    padding: 8px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.2s;
  }

  .fenetre-close:hover {
    color: white;
    transform: scale(1.1);
  }

  .fenetre-content {
    padding: 24px 32px;
  }

  .search-box {
    position: relative;
    margin-bottom: 16px;
  }

  .search-box i {
    position: absolute;
    left: 12px;
    top: 50%;
    transform: translateY(-50%);
    color: #b3b3b3;
  }

  .playlist-select {
    width: 100%;
    padding: 14px 16px 14px 40px;
    background-color: #3E3E3E;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 14px;
    appearance: none;
    cursor: pointer;
  }

  .playlist-select:focus {
    outline: none;
    background-color: #404040;
  }

  .new-playlist-container {
    margin-top: 16px;
  }

  .new-playlist-input {
    width: 100%;
    padding: 14px 16px;
    background-color: #3E3E3E;
    border: none;
    border-radius: 4px;
    color: white;
    font-size: 14px;
  }

  .new-playlist-input:focus {
    outline: 2px solid #1DB954;
    background-color: #404040;
  }

  .new-playlist-input::placeholder {
    color: #b3b3b3;
  }

  .fenetre-footer {
    padding: 24px 32px;
    border-top: 1px solid #404040;
    display: flex;
    justify-content: flex-end;
    gap: 16px;
  }

  .fenetre-footer button {
    padding: 8px 32px;
    border: none;
    border-radius: 20px;
    font-size: 14px;
    font-weight: 600;
    cursor: pointer;
    display: flex;
    align-items: center;
    gap: 8px;
    transition: transform 0.2s;
  }

  .btn-cancel {
    background-color: transparent;
    color: #b3b3b3;
    border: 1px solid #b3b3b3;
  }

  .btn-cancel:hover {
    color: white;
    border-color: white;
    transform: scale(1.04);
  }

  .btn-add {
    background-color: #1DB954;
    color: white;
  }

  .btn-add:hover {
    background-color: #1ed760;
    transform: scale(1.04);
  }

  /* Overlay de fond */
  :global(body::after) {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.7);
    z-index: 9998;
  }


</style>