<script>
      import { onMount, onDestroy } from 'svelte';
    import { audioPlayer, status, isPlaying, index, favoris, thisNextTrack } from '$lib/store_favoris.js';
  
    let audio;
    let playlist;
    let currentTime = 0;
    let duration = 0;
    let volume = 1;
    let progressBarHover = false;
    let currentIndex;
    
    favoris.subscribe(value => playlist = value);
    index.subscribe(value => currentIndex = value);
    
    onMount(() => {
      audio = new Audio();
      audioPlayer.set(audio);
      
      if (playlist && playlist.length > 0) {
        // Charge la piste
        loadTrack($thisNextTrack);
        // Met à jour l'index
        index.set($thisNextTrack);
        // Commence la lecture automatiquement
        audio.play()
          .then(() => {
            isPlaying.set(true);
            status.set('playing');
          })
          .catch(error => {
            console.error('Erreur lors de la lecture automatique:', error);
            status.set('error');
          });
      }
  
      // Mise à jour du temps et de la durée
      audio.addEventListener('timeupdate', () => {
        currentTime = audio.currentTime;
      });
  
      audio.addEventListener('loadedmetadata', () => {
        duration = audio.duration;
      });
  
      audio.addEventListener('ended', () => {
        playNext();
      });
    });
    
    onDestroy(() => {
      if (audio) {
        audio.pause();
        audio.removeEventListener('timeupdate', null);
        audio.removeEventListener('loadedmetadata', null);
        audio.removeEventListener('ended', null);
      }
    });
    
    function loadTrack(trackIndex) {
      if (playlist[trackIndex]) {
        audio.src = playlist[trackIndex].file;
        index.set(trackIndex);
        status.set('loading');
      }
    }
  
    function togglePlay() {
      if (audio.paused) {
        audio.play();
        isPlaying.set(true);
        status.set('playing');
      } else {
        audio.pause();
        isPlaying.set(false);
        status.set('paused');
      }
    }
  
    function playNext() {
      let nextIndex = currentIndex + 1;
      if (nextIndex >= playlist.length) nextIndex = 0;
      loadTrack(nextIndex);
      audio.play();
      isPlaying.set(true);
    }
  
    function playPrevious() {
      let prevIndex = currentIndex - 1;
      if (prevIndex < 0) prevIndex = playlist.length - 1;
      loadTrack(prevIndex);
      audio.play();
      isPlaying.set(true);
    }
  
    function formatTime(seconds) {
      const minutes = Math.floor(seconds / 60);
      const remainingSeconds = Math.floor(seconds % 60);
      return `${minutes}:${remainingSeconds.toString().padStart(2, '0')}`;
    }
  
    function handleProgressClick(event) {
      const bounds = event.currentTarget.getBoundingClientRect();
      const percent = (event.clientX - bounds.left) / bounds.width;
      audio.currentTime = percent * duration;
    }
  
    function handleVolumeChange(event) {
      volume = event.target.value;
      audio.volume = volume;
    }
  </script>
  
  <div class="player">
    {#if playlist && playlist[currentIndex]}
      <div class="now-playing">
        <img 
          src={playlist[currentIndex].src} 
          alt={playlist[currentIndex].title}
          class="cover"
        />
        <div class="track-info">
          <span class="title">{playlist[currentIndex].title}</span>
          <span class="artist">{playlist[currentIndex].artist}</span>
        </div>
      </div>
  
      <div class="main-controls">
        <div class="control-buttons">
          <button class="control-btn shuffle">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M13.151.922a.75.75 0 10-1.06 1.06L13.109 3H11.16a3.75 3.75 0 00-2.873 1.34l-6.173 7.356A2.25 2.25 0 01.39 12.5H0V14h.391a3.75 3.75 0 002.873-1.34l6.173-7.356a2.25 2.25 0 011.724-.804h1.947l-1.017 1.018a.75.75 0 001.06 1.06L15.98 3.75 13.15.922zM.391 3.5H0V2h.391c1.109 0 2.16.49 2.873 1.34L4.89 5.277l-.979 1.167-1.796-2.14A2.25 2.25 0 00.39 3.5z"/>
              <path d="M7.5 10.723l.98-1.167.957 1.14a2.25 2.25 0 001.724.804h1.947l-1.017-1.018a.75.75 0 111.06-1.06l2.829 2.828-2.829 2.828a.75.75 0 11-1.06-1.06L13.109 13H11.16a3.75 3.75 0 01-2.873-1.34l-.787-.938z"/>
            </svg>
          </button>
          <button class="control-btn" on:click={playPrevious}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M3.3 1a.7.7 0 01.7.7v5.15l9.95-5.744a.7.7 0 011.05.606v12.575a.7.7 0 01-1.05.607L4 9.149V14.3a.7.7 0 01-.7.7H1.7a.7.7 0 01-.7-.7V1.7a.7.7 0 01.7-.7h1.6z"/>
            </svg>
          </button>
          <button class="control-btn play-pause" on:click={togglePlay}>
            {#if $isPlaying}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M5.7 3a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7H5.7zm10 0a.7.7 0 00-.7.7v16.6a.7.7 0 00.7.7h2.6a.7.7 0 00.7-.7V3.7a.7.7 0 00-.7-.7h-2.6z"/>
              </svg>
            {:else}
              <svg width="24" height="24" viewBox="0 0 24 24" fill="currentColor">
                <path d="M7.05 3.606l13.49 7.788a.7.7 0 010 1.212L7.05 20.394A.7.7 0 016 19.788V4.212a.7.7 0 011.05-.606z"/>
              </svg>
            {/if}
          </button>
          <button class="control-btn" on:click={playNext}>
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M12.7 1a.7.7 0 00-.7.7v5.15L2.05 1.107A.7.7 0 001 1.712v12.575a.7.7 0 001.05.607L12 9.149V14.3a.7.7 0 00.7.7h1.6a.7.7 0 00.7-.7V1.7a.7.7 0 00-.7-.7h-1.6z"/>
            </svg>
          </button>
          <button class="control-btn repeat">
            <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
              <path d="M0 4.75A3.75 3.75 0 013.75 1h8.5A3.75 3.75 0 0116 4.75v5a3.75 3.75 0 01-3.75 3.75H9.81l1.018 1.018a.75.75 0 11-1.06 1.06L6.939 12.75l2.829-2.828a.75.75 0 111.06 1.06L9.811 12h2.439a2.25 2.25 0 002.25-2.25v-5a2.25 2.25 0 00-2.25-2.25h-8.5A2.25 2.25 0 001.5 4.75v5A2.25 2.25 0 003.75 12H5v1.5H3.75A3.75 3.75 0 010 9.75v-5z"/>
            </svg>
          </button>
        </div>
  
        <div class="progress-container">
          <span class="time">{formatTime(currentTime)}</span>
          <div 
            class="progress-bar" 
            on:click={handleProgressClick}
            on:mouseenter={() => progressBarHover = true}
            on:mouseleave={() => progressBarHover = false}
          >
            <div 
              class="progress-fill"
              style="width: {(currentTime / duration) * 100}%"
            ></div>
          </div>
          <span class="time">{formatTime(duration)}</span>
        </div>
      </div>
  
      <div class="volume-control">
        <svg width="16" height="16" viewBox="0 0 16 16" fill="currentColor">
          <path d="M9.741.85a.75.75 0 01.375.65v13a.75.75 0 01-1.125.65l-6.925-4a3.642 3.642 0 01-1.33-4.967 3.639 3.639 0 011.33-1.332l6.925-4a.75.75 0 01.75 0zm-6.924 5.3a2.139 2.139 0 000 3.7l5.8 3.35V2.8l-5.8 3.35zm8.683 4.29V5.56a2.75 2.75 0 010 4.88z"/>
        </svg>
        <input 
          type="range" 
          min="0" 
          max="1" 
          step="0.1"
          class="volume-slider"
          value={volume}
          on:input={handleVolumeChange}
        />
      </div>
    {:else}
      <p>Aucune piste disponible</p>
    {/if}
  </div>
  
  <style>
    .player {
      background: #181818;
      color: #fff;
      padding: 1rem;
      border-radius: 8px;
      display: grid;
      grid-template-columns: 30% 40% 30%;
      align-items: center;
      gap: 1rem;
      max-width: 100%;
      position: fixed;
      bottom: 0;
      left: 0;
      right: 0;
      z-index : 1000;
    }
  
    .now-playing {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .cover {
      width: 56px;
      height: 56px;
      object-fit: cover;
      border-radius: 4px;
    }
  
    .track-info {
      display: flex;
      flex-direction: column;
    }
  
    .title {
      color: #fff;
      font-size: 0.875rem;
      font-weight: 500;
    }
  
    .artist {
      color: #b3b3b3;
      font-size: 0.75rem;
    }
  
    .main-controls {
      display: flex;
      flex-direction: column;
      align-items: center;
      gap: 0.5rem;
    }
  
    .control-buttons {
      display: flex;
      align-items: center;
      gap: 1rem;
    }
  
    .control-btn {
      background: none;
      border: none;
      color: #b3b3b3;
      cursor: pointer;
      padding: 0.5rem;
      border-radius: 50%;
      display: flex;
      align-items: center;
      justify-content: center;
      transition: color 0.2s;
    }
  
    .control-btn:hover {
      color: #fff;
    }
  
    .play-pause {
      background: #fff;
      color: #000;
      width: 32px;
      height: 32px;
    }
  
    .play-pause:hover {
      transform: scale(1.1);
      color: #000;
    }
  
    .progress-container {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      width: 100%;
      max-width: 400px;
    }
  
    .time {
      color: #b3b3b3;
      font-size: 0.6875rem;
      min-width: 40px;
    }
  
    .progress-bar {
      flex: 1;
      height: 4px;
      background: #4d4d4d;
      border-radius: 2px;
      cursor: pointer;
      position: relative;
    }
  
    .progress-bar:hover .progress-fill {
      background: #1db954;
    }
  
    .progress-fill {
      height: 100%;
      background: #fff;
      border-radius: 2px;
      transition: width 0.1s linear;
    }
  
    .volume-control {
      display: flex;
      align-items: center;
      gap: 0.5rem;
      justify-content: flex-end;
      padding-right: 1rem;
    }
  
    .volume-slider {
      -webkit-appearance: none;
      width: 93px;
      height: 4px;
      border-radius: 2px;
      background: #4d4d4d;
      outline: none;
      cursor: pointer;
    }
  
    .volume-slider::-webkit-slider-thumb {
      -webkit-appearance: none;
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
    }
  
    .volume-slider::-moz-range-thumb {
      width: 12px;
      height: 12px;
      border-radius: 50%;
      background: #fff;
      cursor: pointer;
      border: none;
    }
  
    .volume-slider:hover::-webkit-slider-thumb {
      background: #1db954;
    }
  
    .volume-slider:hover::-moz-range-thumb {
      background: #1db954;
    }
  </style>