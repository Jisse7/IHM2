<script>
  import '@fortawesome/fontawesome-free/css/all.css';
  import {clicLibrairie, clicAccueil, clicFavoris, creerPlaylist } from '$lib/stores';

  function actionLibrairie(){
    $clicLibrairie = true;
    $clicFavoris = false;
    $clicAccueil = false;
    $creerPlaylist = false;
  }

  function actionAccueil(){
    $clicAccueil = true;
    $clicFavoris = false;
    $clicLibrairie = false;
    $creerPlaylist = false;
  }

  function actionFavoris(){
    $clicFavoris = true;
    $clicAccueil = false;
    $clicLibrairie = false;
    $creerPlaylist = false;
  }

  function actionCreerPlaylist(){
    $creerPlaylist = true;
    $clicFavoris = false;
    $clicAccueil = false;
    $clicLibrairie = false;
  }
</script>

<div class="sidebar">
  <div class="logo">
    <a href="#" on:click={actionAccueil}>
      <img
        src="https://encrypted-tbn0.gstatic.com/images?q=tbn:ANd9GcSd4jbXkWaYRcqw7zkFheo1YSlmlUSaEZyQFw&s"
        alt="Logo"
      />
    </a>
  </div>

  <div class="navigation">
    <ul>
      <li>
        <a href="#" on:click={actionAccueil}>
          <i class="fa fa-home"></i>
          <span>Accueil</span>
        </a>
      </li>
      <li>
        <a href="#" on:click={actionLibrairie}>
          <i class="fa fa-book"></i>
          <span>Votre librairie</span>
        </a>
      </li>
    </ul>
  </div>

  <div class="navigation">
    <ul>
      <li>
        <a href="#" on:click={actionCreerPlaylist}>
          <i class="fa fa-plus-square"></i>
          <span>Créer une playlist</span>
        </a>
      </li>
      <li>
        <a href="#" on:click={actionFavoris}>
          <i class="fa fa-heart"></i>
          <span>Vos favoris</span>
        </a>
      </li>
    </ul>
  </div>

  <div class="policies">
    <ul>
      <li><a href="#">Cookies</a></li>
      <li><a href="#">Privacy</a></li>
    </ul>
  </div>
</div>

<style>
  .sidebar {
    position: fixed;
    left: 0;
    top: 0;
    bottom: 0;
    width: 14%;
    background-color: #000000;
    padding: 0px;
  }

  .sidebar .logo img {
    margin-top:32%;
    margin-left:42%;
    margin-bottom: 20%;
    width: 50px;
  }

  .sidebar .navigation ul {
    margin-left: 17%;
    list-style: none;
    margin-top: 20px;
  }

  .sidebar .navigation ul li {
    padding: 10px 0px;
  }

  .sidebar .navigation ul li a {
    color: #b3b3b3;
    text-decoration: none;
    font-weight: bold;
    font-size: 13px;
    display: flex;
    align-items: center;
  }

  .sidebar .navigation ul li a:hover {
    color: #ffffff;
  }

  .sidebar .navigation ul li i {
    font-size: 20px;
    margin-right: 10px;
  }

  .sidebar .policies {
    margin-left: 29%;
    position: absolute;
    bottom: 100px;
  }

  .sidebar .policies ul {
    list-style: none;
  }

  .sidebar .policies ul li {
    padding-bottom: 5px;
  }

  .sidebar .policies ul li a {
    color: #b3b3b3;
    font-weight: 500;
    text-decoration: none;
    font-size: 10px;
  }

  .sidebar .policies ul li a:hover {
    text-decoration: underline;
  }
</style>