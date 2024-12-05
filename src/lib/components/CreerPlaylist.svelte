<script>
    import { addPlaylist } from '$lib/playlists';
    import { creerPlaylist } from '$lib/stores';
  
    let newPlaylistName = '';
  
    function handleCreatePlaylist() {
      if (newPlaylistName.trim()) {
        addPlaylist({
          name: newPlaylistName,
          tracks: []
        });
        newPlaylistName = '';
        $creerPlaylist = false;
      }
    }
  </script>
  
  <div class="spotify-playlists">
    <strong><h2>Créer une playlist</h2></strong>
  
    <div class="list">
      <div class="item">
        <div class="playlist-create-icon">
          <span class="fa fa-music"></span>
        </div>
  
        <div class="playlist-form">
          <input
            type="text"
            placeholder="Nom de la nouvelle playlist"
            bind:value={newPlaylistName}
            class="playlist-input"
          />
  
          <div class="button-group">
            <button class="btn-cancel" on:click={() => $creerPlaylist = false}>
              <span class="fa fa-times"></span> Annuler
            </button>
            <button 
              class="btn-create" 
              on:click={handleCreatePlaylist}
              disabled={!newPlaylistName.trim()}
            >
              <span class="fa fa-plus"></span> Créer
            </button>
          </div>
        </div>
      </div>
    </div>
  </div>
  
  <style>
    .spotify-playlists {
      padding: 20px 40px;
      position: fixed;
      top: 50%;
      left: 50%;
      transform: translate(-50%, -50%);
      background-color: #181818;
      border-radius: 8px;
      min-width: 400px;
      z-index: 9999;
    }
  
    .spotify-playlists h2 {
      color: #ffffff;
      font-size: 22px;
      margin-bottom: 20px;
      text-align: center;
    }
  
    .list {
      display: flex;
      justify-content: center;
    }
  
    .item {
      position: relative;
      padding: 20px;
      background-color: #252525;
      border-radius: 6px;
      width: 100%;
    }
  
    .playlist-create-icon {
      text-align: center;
      margin-bottom: 20px;
    }
  
    .playlist-create-icon .fa {
      font-size: 48px;
      color: #1db954;
    }
  
    .playlist-form {
      display: flex;
      flex-direction: column;
      gap: 20px;
    }
  
    .playlist-input {
      width: 100%;
      padding: 12px 15px;
      background-color: #3E3E3E;
      border: none;
      border-radius: 4px;
      color: white;
      font-size: 14px;
    }
  
    .playlist-input:focus {
      outline: 2px solid #1DB954;
    }
  
    .playlist-input::placeholder {
      color: #989898;
    }
  
    .button-group {
      display: flex;
      justify-content: center;
      gap: 15px;
    }
  
    .button-group button {
      padding: 10px 20px;
      border: none;
      border-radius: 20px;
      cursor: pointer;
      font-size: 14px;
      font-weight: 600;
      display: flex;
      align-items: center;
      gap: 8px;
    }
  
    .btn-cancel {
      background-color: transparent;
      color: white;
      border: 1px solid #989898;
    }
  
    .btn-cancel:hover {
      border-color: white;
      transform: scale(1.02);
    }
  
    .btn-create {
      background-color: #1db954;
      color: white;
    }
  
    .btn-create:hover {
      background-color: #1ed760;
      transform: scale(1.02);
    }
  
    .btn-create:disabled {
      background-color: #1db95480;
      cursor: not-allowed;
      transform: none;
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