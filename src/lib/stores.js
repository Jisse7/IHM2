// Pour la gestion des composants dans +page.svelte principalement


import { writable } from 'svelte/store';


export const currentSongStore = writable(false);
export const clicLibrairie = writable(false);
export const clicAccueil = writable(false);
export const clicSearch = writable(false);
export const clicFavoris = writable(false);
export const creerPlaylist = writable(false);
export const lectureFavoris = writable(false);

export const changerMusique=writable();

// resultat de la recherche 

export const resultatRecherche = writable();


export const login = writable(false);
export const estCo = writable(false);