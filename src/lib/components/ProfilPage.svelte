<script>
    import { clicProfil, estCo, email, nom, prenom, bio } from '$lib/stores';
    
    // fake données
    let userData = {
      nom: $nom || "Volé",
      prenom: $prenom || "Compte",
      bio: $bio || "Ad Augusta Per Angusta",
    };
  
    let currentPassword = "";
    let newPassword = "";
    let confirmPassword = "";
    let passwordError = "";
    let successMessage = "";
  
    function updateProfile() {
      //pr mettre à jour les stores avec les nouvelles valeurs
      $nom = userData.nom;
      $prenom = userData.prenom;
      $bio = userData.bio;
      
      successMessage = "Profil mis à jour avec succès!";
      setTimeout(() => successMessage = "", 3000);
    }
  
    function changePassword() {
      if (newPassword !== confirmPassword) {
        passwordError = "Les mots de passe ne correspondent pas";
        return;
      }
      if (newPassword.length < 8) {
        passwordError = "Le mot de passe doit contenir au moins 8 caractères";
        return;
      }
      
      passwordError = "";
      successMessage = "Mot de passe modifié avec succès!";
      currentPassword = "";
      newPassword = "";
      confirmPassword = "";
      setTimeout(() => successMessage = "", 3000);
    }
  
    function logout() {
      $estCo = false;
      $clicProfil = false;
      // pour réinit les données utilisateur
      $email = "";
      $nom = "";
      $prenom = "";
      $bio = "";
    }
  </script>
  
  <div class="profile-container">
    <div class="profile-content">
      <div class="profile-section">
        <h4>Informations personnelles</h4>
        <div class="form-group">
          <label for="email">Email</label>
          <input type="email" id="email" value={$email} disabled />
        </div>
        <div class="form-group">
          <label for="prenom">Prénom</label>
          <input type="text" id="prenom" bind:value={userData.prenom} />
        </div>
        <div class="form-group">
          <label for="nom">Nom</label>
          <input type="text" id="nom" bind:value={userData.nom} />
        </div>
        <div class="form-group">
          <label for="bio">Bio</label>
          <textarea id="bio" bind:value={userData.bio}></textarea>
        </div>
        <button class="update-button" on:click={updateProfile}>Mettre à jour le profil</button>
      </div>
  
      <div class="profile-section">
        <h4>Changer le mot de passe</h4>
        <div class="form-group">
          <label for="current-password">Mot de passe actuel</label>
          <input type="password" id="current-password" bind:value={currentPassword} />
        </div>
        <div class="form-group">
          <label for="new-password">Nouveau mot de passe</label>
          <input type="password" id="new-password" bind:value={newPassword} />
        </div>
        <div class="form-group">
          <label for="confirm-password">Confirmer le mot de passe</label>
          <input type="password" id="confirm-password" bind:value={confirmPassword} />
        </div>
        {#if passwordError}
          <p class="error-message">{passwordError}</p>
        {/if}
        <button class="update-button" on:click={changePassword}>Changer le mot de passe</button>
      </div>
  
      {#if successMessage}
        <div class="success-message">
          {successMessage}
        </div>
      {/if}
  
      <div class="profile-section">
        <button class="logout-button" on:click={logout}>
          Se déconnecter
        </button>
      </div>
    </div>
  </div>
  
  <style>
    .profile-container {
      background-color: #282828;
      border-radius: 8px;
      width: 80%;
      max-width: 550px;
      margin: 0 auto;
      color: white;
      padding: 20px;
    }
  
    .profile-content {
      padding: 20px;
    }
  
    .profile-section {
      margin-bottom: 2%;
    }
  
    .form-group {
      margin-bottom: 15px;
    }
  
    label {
      display: block;
      margin-bottom: 5px;
      color: #b3b3b3;
    }
  
    input, textarea {
      width: 100%;
      padding: 10px;
      background-color: #404040;
      border: 1px solid #404040;
      border-radius: 4px;
      color: white;
      margin-top: 5px;
    }
  
    textarea {
      min-height: 100px;
      resize: vertical;
    }
  
    .update-button {
      background-color: #1db954;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: bold;
      margin-top: 10px;
      
    }
  
    .update-button:hover {
      background-color: #1ed760;
    }
  
    .logout-button {
      background-color: #ff4444;
      color: white;
      border: none;
      padding: 10px 20px;
      border-radius: 20px;
      cursor: pointer;
      font-weight: bold;
      width: 100%;
      margin-top: 20px;
    }
  
    .logout-button:hover {
      background-color: #ff6666;
    }
  
    .error-message {
      color: #ff4444;
      margin-top: 5px;
      font-size: 14px;
    }
  
    .success-message {
      background-color: #1db954;
      color: white;
      padding: 10px;
      border-radius: 4px;
      text-align: center;
      margin-top: 10px;
    }
  
    h3 {
      color: white;
      margin-bottom: 15px;
    }
  </style>