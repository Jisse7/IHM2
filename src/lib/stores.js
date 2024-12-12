// Pour la gestion des composants dans +page.svelte principalement : le store de base 


import { writable } from 'svelte/store';

export const email = writable();
export const nom = writable();
export const prenom = writable();
export const bio = writable();


export const currentSongStore = writable(false);
export const clicLibrairie = writable(false);
export const clicAccueil = writable(false);
export const clicSearch = writable(false);
export const clicFavoris = writable(false);
export const creerPlaylist = writable(false);
export const lectureFavoris = writable(false);

export const changerMusique=writable();

export const volume=writable();

export const clicProfil = writable(false);

// resultat de la recherche 

export const resultatRecherche = writable();


export const login = writable(false);
export const estCo = writable(false);