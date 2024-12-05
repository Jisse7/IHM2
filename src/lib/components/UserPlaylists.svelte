<script>
  import { get } from 'svelte/store';
  import { playlists, removeTrackFromPlaylist, addTrackToPlaylist, addPlaylist } from '$lib/playlists';
  import { favoris, toggleFavori } from '$lib/store_favoris';
   import {thisNextTrack, chansonSwap, currentPlaylist} from '$lib/playlists';

   import Player3 from './Player3.svelte';

   let selectedPlaylistId = null;
  let newPlaylistName = '';
  let selectedTrack = null;
  let isModalVisible = false;
  let previousTrackIndex = null;

  async function playThisNextTrack(track, playlistName) {
    console.log("Track:", track);
    console.log("Playlist name:", playlistName);
    
    const allPlaylists = get(playlists);
    const foundPlaylist = allPlaylists.find(p => p.name === playlistName);
    
    if (foundPlaylist) {
        const trackIndex = foundPlaylist.tracks.findIndex(t => t.title === track.title);
        console.log("Track index:", trackIndex);
        
        if (trackIndex !== -1) {
            $chansonSwap = false;  // Désactive d'abord
            await new Promise(resolve => setTimeout(resolve, 50));
            
            $currentPlaylist = playlistName;
            $thisNextTrack = trackIndex;
            
            await new Promise(resolve => setTimeout(resolve, 50));
            $chansonSwap = true;  // Réactive ensuite
        }
    }
}


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
      if (newPlaylistName.trim()) {
        addPlaylist({ 
          name: newPlaylistName, 
          tracks: selectedTrack ? [selectedTrack] : [] 
        });
      }
    } else if (selectedPlaylistId && selectedTrack) {
      addTrackToPlaylist(Number(selectedPlaylistId), selectedTrack);
    }
    closeModal();
  }

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

<div class="playlist-container">
  <strong><h2>Vos playlists</h2></strong>

  <div class="playlist-list">
    {#each $playlists as playlist (playlist.id)}
      <div class="playlist-item">
        <h3>{playlist.name}</h3>

        <div class="track-list">
          {#each playlist.tracks as track (track.title)}
            <div class="track-item">
              <div class="favorite" on:click={() => toggleFavori(track)}>
                <span class="fa fa-heart" class:favorite={$favoris.some(f => f.title === track.title)}></span>
              </div>

              <img src={track.src} alt={track.title} />

              <div class="play">
                <span on:click|preventDefault={() => {
                  console.log("Lecture de:", track.title, "dans la playlist:", playlist.name);
                  playThisNextTrack(track, playlist.name);
                }}>
                  <span class="fa fa-play"></span>
                </span>
              </div>

              <h4>{track.title}</h4>
              <p>{track.artist}</p>

              <div class="track-actions">
                <!-- Bouton pour supprimer de la playlist -->
                <div class="remove-track" on:click={() => removeTrackFromPlaylist(playlist.id, track.title)}>
                  <span class="fa fa-trash"></span>
                </div>

                <!-- Bouton pour ajouter à une autre playlist -->
                <div class="add-to-playlist" on:click={() => openModal(track)}>
                  <span class="fa fa-plus-circle"></span>
                </div>
              </div>
            </div>
          {/each}
        </div>
      </div>
    {/each}
  </div>
</div>

{#if $chansonSwap && $currentPlaylist && ($thisNextTrack !== undefined)}
    <Player3 />
{/if}
<style>
  .playlist-container {
    padding: 20px 40px;
  }

  .playlist-container h2 {
    color: #ffffff;
    font-size: 22px;
    margin-bottom: 20px;
  }

  .playlist-list {
    display: flex;
    flex-direction: column;
    gap: 20px;
  }

  .playlist-item {
    background-color: #181818;
    border-radius: 6px;
    padding: 20px;
    color: #ffffff;
  }

  .playlist-item h3 {
    font-size: 18px;
    margin-bottom: 15px;
  }

  .track-list {
    display: flex;
    gap: 20px;
    overflow-x: auto;
    scroll-behavior: smooth;
  }

  .track-list::-webkit-scrollbar {
    height: 8px;
  }

  .track-list::-webkit-scrollbar-track {
    background-color: #333;
    border-radius: 10px;
  }

  .track-list::-webkit-scrollbar-thumb {
    background-color: #888;
    border-radius: 10px;
  }

  .track-item {
    position: relative;
    min-width: 180px;
    width: 180px;
    padding: 15px;
    background-color: #252525;
    border-radius: 6px;
    cursor: pointer;
    transition: all ease 0.4s;
  }

  .track-item:hover {
    background-color: #333;
  }

  .track-item img {
    width: 100%;
    min-height: 9.5rem;
    max-height: 9.5rem;
    border-radius: 6px;
    margin-bottom: 10px;
  }

  .track-item .play {
    position: absolute;
    right: 1rem;
    top: 11rem;
    padding: 18px;
    background-color: #1db954;
    border-radius: 100%;
    opacity: 0;
    transition: all ease 0.4s;
  }

  .track-item:hover .play {
    opacity: 1;
    transform: translateY(-5px);
  }

  .track-item h4 {
    color: #ffffff;
    font-size: 14px;
    margin-bottom: 10px;
    white-space: nowrap;
    overflow: hidden;
    text-overflow: ellipsis;
  }

  .track-item p {
    color: #989898;
    font-size: 12px;
    line-height: 20px;
    font-weight: 600;
  }

  .track-item .favorite {
    position: absolute;
    right: 10px;
    top: 10px;
    cursor: pointer;
  }

  .track-item .favorite .fa {
    font-size: 20px;
    color: #ccc;
    transition: all 0.3s;
  }

  .track-item .favorite .fa.favorite {
    color: #1db954;
  }

  .track-actions {
    display: flex;
    justify-content: space-between;
    align-items: center;
    margin-top: 10px;
  }

  .remove-track .fa,
  .add-to-playlist .fa {
    font-size: 18px;
    color: #ccc;
    transition: all 0.3s;
  }

  .remove-track .fa:hover {
    color: #ff0000;
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


  :global(body::after) {
    content: '';
    position: fixed;
    top: 0;
    left: 0;
    right: 0;
    bottom: 0;
    background: rgba(0, 0, 0, 0.5);
    z-index: 9998;
    display: none;
  }

  :global(body.modal-open::after) {
    display: block;
  }
</style>