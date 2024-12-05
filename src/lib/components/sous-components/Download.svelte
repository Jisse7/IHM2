<a href="#" class="Btn" download="Votre_Application_Spotify.zip">

  
    <svg
      class="svgIcon"
      viewBox="0 0 384 512"
      height="1em"
      xmlns="http://www.w3.org/2000/svg"
    >
      <path
        d="M169.4 470.6c12.5 12.5 32.8 12.5 45.3 0l160-160c12.5-12.5 12.5-32.8 0-45.3s-32.8-12.5-45.3 0L224 370.8 224 64c0-17.7-14.3-32-32-32s-32 14.3-32 32l0 306.7L54.6 265.4c-12.5-12.5-32.8-12.5-45.3 0s-12.5 32.8 0 45.3l160 160z"
      ></path>
    </svg>
   
    <span class="tooltip">Application</span>
  </a>


<style>
.Btn {
  width: 50px;
  height: 50px;
  border: none;
  border-radius: 50%;
  background-color: rgb(44, 44, 44);
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  cursor: pointer;
  position: relative;
  transition-duration: 0.3s;
  box-shadow: 2px 2px 10px rgba(0, 0, 0, 0.11);
}

.svgIcon {
  fill: #1db954;
}


.tooltip {
  position: absolute;
  right: -80px;
  opacity: 0;
  background-color: rgb(12, 12, 12);
  color: white;
  padding: 5px 10px;
  border-radius: 5px;
  display: flex;
  align-items: center;
  justify-content: center;
  transition-duration: 0.2s;
  pointer-events: none;
  letter-spacing: 0.5px;
}

.tooltip::before {
  position: absolute;
  content: "";
  width: 10px;
  height: 10px;
  background-color: rgb(12, 12, 12);
  background-size: 1000%;
  background-position: center;
  transform: rotate(45deg);
  left: -5%;
  transition-duration: 0.3s;
}

.Btn:hover .tooltip {
  opacity: 1;
  transition-duration: 0.3s;
}

.Btn:hover {
  background-color: #1db954;
  transition-duration: 0.3s;
}



.Btn:hover .svgIcon {
  fill: black;
  animation: slide-in-top 0.6s cubic-bezier(0.25, 0.46, 0.45, 0.94) both;
}

@keyframes slide-in-top {
  0% {
    transform: translateY(-10px);
    opacity: 0;
  }

  100% {
    transform: translateY(0px);
    opacity: 1;
  }
}

</style>