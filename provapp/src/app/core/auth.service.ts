import { Injectable, inject } from '@angular/core';
import Keycloak from 'keycloak-js';

@Injectable({ providedIn: 'root' })
export class AuthService {
  private keycloak = inject(Keycloak);

  login(): void {
    this.keycloak.login({ redirectUri: window.location.origin });
  }

  logout(): void {
    this.keycloak.logout({
      redirectUri: window.location.origin,
    });
  }

  // True se l'utente ha completato il login
  isLoggedIn(): boolean {
    return !!this.keycloak.authenticated;
  }

  getUsername(): string {
    return this.keycloak.tokenParsed?.['preferred_username'] ?? '';
  }

  // Restituisce il token JWT
  // Ci servirà per chiamate API autenticate/autorizzate
  getToken(): string | undefined {
    return this.keycloak.token;
  }
}