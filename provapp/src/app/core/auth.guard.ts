import { inject } from '@angular/core';
import {
  CanActivateFn,
  ActivatedRouteSnapshot,
  RouterStateSnapshot,
} from '@angular/router';
import Keycloak from 'keycloak-js';

// Angular lo esegue automaticamente prima di
// attivare qualsiasi rotta che ha canActivate: [authGuard]
// Lo vedremo dopo nell'app.routes.ts
export const authGuard: CanActivateFn = (
  _route: ActivatedRouteSnapshot,
  state: RouterStateSnapshot
) => {
  const keycloak = inject(Keycloak);

  // Se autenticato, carica il componente
  if (keycloak.authenticated) return true;

  // Altrimenti manda al login
  keycloak.login({
    redirectUri: window.location.origin + state.url,
  });
  return false;
};