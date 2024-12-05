// pour l'accueil

import { writable } from 'svelte/store';
import { get } from 'svelte/store';

export const audioPlayer = writable();
export const status = writable('default');
export const isPlaying = writable(false);
export const index = writable(0);

export const thisNextTrack=writable();

export const chansonSwap=writable();

export const currentPlaylist=writable();

// Initialiser avec deux chansons


export const touteslesmusiques = writable([
  {
    title: 'Akuma no ko',
    artist: 'SNK',
    file: 'https://jisse7.github.io/tracks.io/asset/akuma.mp3',
    src :"https://th.bing.com/th/id/OIP.kaFF8fZYYW6QCQXV0TDRiAAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    title: 'Away',
    artist: 'FF16',
    file: 'https://jisse7.github.io/tracks.io/asset/away.mp3',
    src:'https://i.scdn.co/image/ab67616d00001e02a17f8d2466b7570a5ae18b85'
  },
  {
    title: 'Bling bang bang born',
    artist: 'Mashle',
    file: 'https://jisse7.github.io/tracks.io/asset/mashle.mp3',
    src:'https://th.bing.com/th/id/OIP.KOHGpbpjpzkwGfTKisb4KwHaHa?w=213&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    title: 'Douten',
    artist: 'Naruto',
    file: 'https://jisse7.github.io/tracks.io/asset/douten.mp3',
    src:'https://i1.sndcdn.com/artworks-000660133573-cac9xd-t500x500.jpg'
  },
  {
    title: 'Final Fantasy',
    artist: 'FF',
    file: 'https://jisse7.github.io/tracks.io/asset/ff.mp3',
    src:'https://i.scdn.co/image/ab67616d0000b273f0fdf0241ef1365f82f99bf3'
  },
  {
    title: 'Greedy',
    artist: 'Hardstyle',
    file: 'https://jisse7.github.io/tracks.io/asset/Greedy.mp3',
    src:'https://i.scdn.co/image/ab67616d00001e0290dacec4517abd4b1eb0d88f'
  },
  {
    title: 'Kameleon',
    artist: 'Culture Club',
    file: 'https://jisse7.github.io/tracks.io/asset/kameleon.mp3',
    src: 'https://th.bing.com/th/id/OIP.IKOMpSz1g7QeJwhrxoaMSgHaIS?w=148&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    title: 'Love Story',
    artist: 'Remix',
    file: 'https://jisse7.github.io/tracks.io/asset/lovestory.mp3',
    src:'https://i1.sndcdn.com/artworks-MWeqgEgk7IPSw0Pb-JRUIag-t240x240.jpg'
  },
  {
    title: 'Ma meilleure ennemie',
    artist: 'Stromae & Pomme',
    file: 'https://jisse7.github.io/tracks.io/asset/mameilleurennemie.mp3',
    src:  'https://i.scdn.co/image/ab67616d0000b2732aab4ea84f431ad7d92fecbb'
  },
  {
    title: 'Monsieur Sainte Nitouche',
    artist: 'Inna',
    file: 'https://jisse7.github.io/tracks.io/asset/frenchcancan.mp3',
    src:'https://th.bing.com/th/id/OIP.EXLnVOFXrRbf7tvzfRgLmQHaHa?rs=1&pid=ImgDetMain'
  },
  {
    title: 'My war',
    artist: 'SNK',
    file: 'https://jisse7.github.io/tracks.io/asset/mywar.mp3',
    src:'https://i1.sndcdn.com/artworks-x2meGFMoye1wYSpO-bpbGXA-t500x500.jpg'
  },
  {
    title: 'Next to you',
    artist: 'Parasyte',
    file: 'https://jisse7.github.io/tracks.io/asset/nexttoyou.mp3',
    src:'https://th.bing.com/th/id/OIP.ol53TR-X5Z_sTYhMmj4ZiQAAAA?rs=1&pid=ImgDetMain'
  },
  {
    title: 'Passionate Duelist',
    artist: 'Yu-Gi-Oh',
    file: 'https://jisse7.github.io/tracks.io/asset/passionate.mp3',
    src: 'https://th.bing.com/th/id/OIP.I0lBF-Djfo5OUUY6CIcYjwHaHa?w=163&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    title: 'Sweet but Psycho',
    artist: 'Ava Max',
    file: 'https://jisse7.github.io/tracks.io/asset/sweet.mp3',
    src:'https://th.bing.com/th/id/OIP.UOMWzEUY8RlqTy47L6aViQHaHa?w=208&h=208&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    title: 'The salt water scourge',
    artist: 'Riot',
    file: 'https://jisse7.github.io/tracks.io/asset/gp.mp3',
    src:' https://cdnb.artstation.com/p/assets/images/images/028/150/851/large/david-durna-gangplank1.jpg?1593623146'
  },
  {
    title: 'Valse Di Fantastica',
    artist: 'Yoko Shimomura',
    file: 'https://jisse7.github.io/tracks.io/asset/ff15.mp3',
    src:'https://th.bing.com/th/id/OIP.7f5s6SSQLckKztTmTy6uqgHaGd?rs=1&pid=ImgDetMain'
  },
  {
    title: 'You say run',
    artist: 'MHA',
    file: 'https://jisse7.github.io/tracks.io/asset/yousayrun.mp3',
    src:'https://th.bing.com/th/id/OIP.lrzNhfumIg3FfuS0KcSACgHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  }
]);

export const anime = writable([
  {
    title: 'Akuma no ko',
    artist: 'SNK',
    file: 'https://jisse7.github.io/tracks.io/asset/akuma.mp3',
    src :"https://th.bing.com/th/id/OIP.kaFF8fZYYW6QCQXV0TDRiAAAAA?w=209&h=209&c=7&r=0&o=5&dpr=1.3&pid=1.7",
  },
  {
    title: 'Bling bang bang born',
    artist: 'Mashle',
    file: 'https://jisse7.github.io/tracks.io/asset/mashle.mp3',
    src:'https://th.bing.com/th/id/OIP.KOHGpbpjpzkwGfTKisb4KwHaHa?w=213&h=213&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    title: 'Douten',
    artist: 'Naruto',
    file: 'https://jisse7.github.io/tracks.io/asset/douten.mp3',
    src:'https://i1.sndcdn.com/artworks-000660133573-cac9xd-t500x500.jpg'
  },
  {
    title: 'My war',
    artist: 'SNK',
    file: 'https://jisse7.github.io/tracks.io/asset/mywar.mp3',
    src:'https://i1.sndcdn.com/artworks-x2meGFMoye1wYSpO-bpbGXA-t500x500.jpg'
  },
  {
    title: 'Next to you',
    artist: 'Parasyte',
    file: 'https://jisse7.github.io/tracks.io/asset/nexttoyou.mp3',
    src:'https://th.bing.com/th/id/OIP.ol53TR-X5Z_sTYhMmj4ZiQAAAA?rs=1&pid=ImgDetMain'
  },
  {
    title: 'Passionate Duelist',
    artist: 'Yu-Gi-Oh',
    file: 'https://jisse7.github.io/tracks.io/asset/passionate.mp3',
    src: 'https://th.bing.com/th/id/OIP.I0lBF-Djfo5OUUY6CIcYjwHaHa?w=163&h=180&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  },
  {
    title: 'You say run',
    artist: 'MHA',
    file: 'https://jisse7.github.io/tracks.io/asset/yousayrun.mp3',
    src:'https://th.bing.com/th/id/OIP.lrzNhfumIg3FfuS0KcSACgHaHa?w=182&h=182&c=7&r=0&o=5&dpr=1.3&pid=1.7'
  }

]);

export const fr = writable([
  {
    title: 'Ma meilleure ennemie',
    artist: 'Stromae & Pomme',
    file: 'https://jisse7.github.io/tracks.io/asset/mameilleurennemie.mp3',
    src:  'https://i.scdn.co/image/ab67616d0000b2732aab4ea84f431ad7d92fecbb'
  },
  {
    title: 'Monsieur Sainte Nitouche',
    artist: 'Inna',
    file: 'https://jisse7.github.io/tracks.io/asset/frenchcancan.mp3',
    src:'https://th.bing.com/th/id/OIP.EXLnVOFXrRbf7tvzfRgLmQHaHa?rs=1&pid=ImgDetMain'
  }
]);

export const electro = writable([

  {
    title: 'Greedy',
    artist: 'Hardstyle',
    file: 'https://jisse7.github.io/tracks.io/asset/Greedy.mp3',
    src:'https://i.scdn.co/image/ab67616d00001e0290dacec4517abd4b1eb0d88f'
  },
  {
    title: 'Love Story',
    artist: 'Remix',
    file: 'https://jisse7.github.io/tracks.io/asset/lovestory.mp3',
    src:'https://i1.sndcdn.com/artworks-MWeqgEgk7IPSw0Pb-JRUIag-t240x240.jpg'
  }
]);

/**
 * Ajoute ou retire une musique des favoris selon son titre
 * @param {Object} musique - La musique à ajouter ou retirer
 * @param {string} musique.title - Le titre de la musique
 * @param {string} musique.artist - L'artiste de la musique
 * @param {string} musique.file - L'URL du fichier audio
 */
export function toggleFavori(musique) {
  // @ts-ignore
  favoris.update((current) => {
    // Vérifie si le favori existe déjà
    const existe = current.find((item) => item.title === musique.title);

    if (existe) {
      // Si existe, on le retire
      return current.filter((item) => item.title !== musique.title);
    } else {
      // Sinon, on l'ajoute
      return [...current, musique];
    }
  });
}

export const addTrack = track => {
	favoris.update(v => [...v, track])
};

export function getPlaylistByName(playlistName) {
    switch(playlistName) {
      case 'fr':
        return get(fr);
      case 'anime':
        return get(anime);
      case 'electro':
        return get(electro);
      default:
        return get(touteslesmusiques);
    }
  }