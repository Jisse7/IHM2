// pour le composant playlist

import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const audioPlayer = writable();
export const status = writable('default');
export const isPlaying = writable(false);
export const index = writable(0);

export const thisNextTrack=writable();

export const chansonSwap=writable();

export const currentPlaylist=writable();

// pour l'init avec 2 playlists et qq chansons
export const playlists = writable([
  {
    id: 1,
    name: 'Hardstyle',
    tracks: [
      {
        title: 'Greedy',
        artist: 'Hardstyle',
        file: 'https://jisse7.github.io/tracks.io/asset/Greedy.mp3',
        src: 'https://i.scdn.co/image/ab67616d00001e0290dacec4517abd4b1eb0d88f'
      },
      {
        title: 'Valse Di Fantastica',
        artist: 'Yoko Shimomura',
        file: 'https://jisse7.github.io/tracks.io/asset/ff15.mp3',
        src: 'https://th.bing.com/th/id/OIP.7f5s6SSQLckKztTmTy6uqgHaGd?rs=1&pid=ImgDetMain'
      }
    ]
  },
  {
    id: 2,
    name: 'Classique',
    tracks: [
      {
        title: 'Valse Di Fantastica',
        artist: 'Yoko Shimomura',
        file: 'https://jisse7.github.io/tracks.io/asset/ff15.mp3',
        src: 'https://th.bing.com/th/id/OIP.7f5s6SSQLckKztTmTy6uqgHaGd?rs=1&pid=ImgDetMain'
      }
    ]
  }
]);

/**
 * Ajoute une nouvelle playlist
 * @param {Object} playlist - La playlist à ajouter
 * @param {string} playlist.name - Le nom de la playlist
 * @param {Array} [playlist.tracks=[]] - Les morceaux dans la playlist (optionnel)
 */
export function addPlaylist(playlist) {
  playlists.update((current) => [
    ...current,
    {
      id: Date.now(), // Génère un ID unique basé sur la date actuelle
      name: playlist.name,
      tracks: playlist.tracks || []
    }
  ]);
}

/**
 * Supprime une playlist par son ID
 * @param {number} playlistId - L'ID de la playlist à supprimer
 */
export function removePlaylist(playlistId) {
  playlists.update((current) => current.filter((playlist) => playlist.id !== playlistId));
}

/**
 * Ajoute un morceau à une playlist spécifique
 * @param {number} playlistId - L'ID de la playlist
 * @param {Object} track - Le morceau à ajouter
 * @param {string} track.title - Le titre du morceau
 * @param {string} track.artist - L'artiste du morceau
 * @param {string} track.file - L'URL du fichier audio
 * @param {string} track.src - L'URL de l'image associée
 */
export function addTrackToPlaylist(playlistId, track) {
  playlists.update((current) =>
    current.map((playlist) =>
      playlist.id === playlistId
        ? { ...playlist, tracks: [...playlist.tracks, track] }
        : playlist
    )
  );
}

/**
 * Supprime un morceau d'une playlist spécifique
 * @param {number} playlistId - L'ID de la playlist
 * @param {string} trackTitle - Le titre du morceau à supprimer
 */
export function removeTrackFromPlaylist(playlistId, trackTitle) {
  playlists.update((current) =>
    current.map((playlist) =>
      playlist.id === playlistId
        ? {
            ...playlist,
            tracks: playlist.tracks.filter((track) => track.title !== trackTitle)
          }
        : playlist
    )
  );
}

export function getPlaylistByName(playlistName) {
  const allPlaylists = get(playlists);
  console.log("getPlaylistByName appelé avec:", playlistName);
  console.log("Toutes les playlists:", allPlaylists);
  
  if (!playlistName) {
      console.warn("Nom de playlist non défini");
      return [];
  }
  
  const foundPlaylist = allPlaylists.find(p => p.name === playlistName);
  console.log("Playlist trouvée:", foundPlaylist);
  
  if (!foundPlaylist) {
      console.warn("Playlist non trouvée:", playlistName);
      return [];
  }
  
  return foundPlaylist.tracks;
}