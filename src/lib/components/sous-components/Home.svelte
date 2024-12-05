<script>
import  { clicAccueil, clicLibrairie } from '$lib/stores';


function actionAccueil(){
      $clicAccueil=true;
      $clicLibrairie=false;
  }


</script>  


<button class="button" on:click={actionAccueil}>
    <svg viewBox="0 0 576 512" class="home-icon">
      <path d="M280.4 148.3L96 300.1V464c0 8.8 7.2 16 16 16l112-.3c8.8 0 16-7.2 16-16v-96c0-17.7 14.3-32 32-32h64c17.7 0 32 14.3 32 32v96c0 8.8 7.2 16 16 16l112 .3c8.8 0 16-7.2 16-16V300L295.6 148.3c-12-9.7-29.2-9.7-41.2 0zM571.6 251.5l-61.4-49.2V56c0-13.3-10.7-24-24-24h-56c-13.3 0-24 10.7-24 24v51.7L318.6 43.5c-18-14.4-43.2-14.4-61.2 0L4.4 251.5c-10.4 8.3-12.1 23.6-3.7 33.9l21.4 26.6c8.3 10.4 23.6 12.1 33.9 3.7L288 82.1l231.9 183.6c10.4 8.3 25.6 6.7 33.9-3.7l21.4-26.6c8.3-10.4 6.7-25.6-3.6-33.9z"></path>
    </svg>
  </button>
  
  <style>

  .button {
    width: 48px;
    height: 48px;
    background-color: #121212; 
    border: none;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    cursor: pointer;
    transition: background-color 0.3s ease;
  }
  

  .home-icon {
    width: 24px; 
    height: 24px;
  }
  
  .home-icon path {
    fill: white; 
    transition: fill 0.3s ease;
  }
  
  /* Effet hover */
  .button:hover {
    background-color: #1db954;
  }
  
  .button:hover .home-icon path {
    fill: black; 
  }
  </style>
  