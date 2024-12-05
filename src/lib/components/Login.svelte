<script>
    import {login} from '$lib/stores';
    import {estCo} from '$lib/stores'; 
    import { Facebook, Mail, Apple } from 'lucide-svelte'; //=pour les logos fb etc 
    

   const retour= function handleBack() {
        $login = false;
    }

   function setEstCo(){
        $estCo= true;
    }

    function acc(){
        setEstCo();
        $login=false;
    }

</script>

<div class="login-container">
    <div class="logo" >
        <button type=button on:click={retour} aria-label="Retourner à l'accueil">
        <svg viewBox="0 0 16 16" height="40" width="40" fill="currentColor">
            <path d="M8 0a8 8 0 100 16A8 8 0 008 0zm3.669 11.538a.498.498 0 01-.686.165c-1.879-1.147-4.243-1.407-7.028-.77a.499.499 0 01-.222-.973c3.048-.696 5.662-.397 7.77.892a.5.5 0 01.166.686zm.979-2.178a.624.624 0 01-.858.205c-2.15-1.321-5.428-1.704-7.972-.932a.625.625 0 01-.362-1.194c2.905-.881 6.517-.454 8.986 1.063a.624.624 0 01.206.858zm.084-2.268C10.154 5.56 5.9 5.419 3.438 6.166a.748.748 0 11-.434-1.432c2.825-.857 7.523-.692 10.492 1.07a.747.747 0 11-.764 1.288z"/>
        </svg>
    </button>
    </div>

    <h1>J'ai un compte Spotify</h1>

    <div class="social-buttons">
        <button class="social-button">
            <Mail class="w-5 h-5" />
            <span>Continuer avec Google</span>
          </button>
          
          <button class="social-button">
            <Facebook class="w-5 h-5 text-blue-600" />
            <span>Continuer avec Facebook</span>
          </button>
          
          <button class="social-button">
            <Apple class="w-5 h-5" />
            <span>Continuer avec Apple</span>
          </button>
    </div>

    <div class="divider">ou</div>

    <form>
        <div class="form-group">
            <label for="email">Adresse e-mail ou nom d'utilisateur</label>
            <input 
                type="email" 
                id="email"
                placeholder="Adresse e-mail ou nom d'utilisateur"
            />
        </div>

        <div class="form-group">
            <label for="password">Mot de passe</label>
            <input 
                type="password" 
                id="password"
                placeholder="Mot de passe"
            />
        </div>

        <a href="#" class="forgot-password">Mot de passe oublié ?</a>

        <div class="login-button-container">
            <button type="submit" class="login-button" on:click={acc}>Se Connecter</button>
        </div>
    </form>

    <div class="signup-link">
        Vous n'avez pas de compte ? <a href="#">S'inscrire à Spotify</a>
    </div>
</div>

<style>
    .login-container {
        width: 550px;
        margin: 0 auto;
        padding: 2rem;
        background-color: #121212;
        color: white;
        border-radius: 1rem;
    }

    .logo {
        display: flex;
        justify-content: center;
        align-items: center;
        margin-bottom: 2rem;
        color: white;
    }

    h1 {
        text-align: center;
        font-size: 1rem;
        font-weight: bold;
        margin-bottom: 2rem;
    }

    .social-buttons {
        display: flex;
        flex-direction: column;
        gap: 0.75rem;
        margin-bottom: 1rem;
    }

    .social-button {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 0.5rem;
        width: 100%;
        padding: 0.5rem;
        border-radius: 500px;
        border: 1px solid #727272;
        background: transparent;
        color: white;
        font-weight: 600;
        cursor: pointer;
        transition: border-color 0.2s;
    }

    .social-button img {
        width: 20px;
        height: 20px;
    }

    .social-button:hover {
        border-color: white;
    }

    .divider {
        text-align: center;
        margin: 0.5rem 0;
        position: relative;
    }

    .divider::before,
    .divider::after {
        content: "";
        position: absolute;
        top: 50%;
        width: 45%;
        height: 1px;
        background-color: #727272;
    }

    .divider::before {
        left: 0;
    }

    .divider::after {
        right: 0;
    }

    .form-group {
        margin-bottom: 0.5rem;
    }

    label {
        display: block;
        margin-bottom: 0.5rem;
        font-size: 0.875rem;
    }

    input {
        width: 100%;
        padding: 0.75rem;
        border-radius: 4px;
        border: 1px solid #727272;
        background-color: #212121;
        color: white;
    }

    input:focus {
        outline: none;
        border-color: #1db954;
    }

    .forgot-password {
        display: block;
        text-align: center;
        color: white;
        text-decoration: underline;
        margin: 1rem 0;
    }

    .login-button-container {
        display: flex;
        justify-content: center;
    }

    .login-button {
        width: 50%;
        padding: 0.5rem;
        border-radius: 500px;
        border: none;
        background-color: #1db954;
        color: black;
        font-weight: bold;
        cursor: pointer;
        margin: 0.5rem 0;
    }

    .login-button:hover {
        transform: scale(1.04);
    }

    .signup-link {
        text-align: center;
        margin-top: 1rem;
    }

    .signup-link a {
        color: white;
        text-decoration: underline;
    }

    :global(body) {
        background-color: black;
        min-height: 100vh;
        display: grid;
        place-items: center;
        margin: 0;
        padding: 1rem;
    }
</style>