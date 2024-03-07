import { Injectable } from '@angular/core';
import { Router } from '@angular/router';

@Injectable({
    providedIn: 'root'
})
export class AuthService {
    private loggedInUser: string | null = null;

    constructor(private router: Router) {
        this.loggedInUser = sessionStorage.getItem('username');
    }


    setLoggedInUser(username: string): void {
        this.loggedInUser = username;
        sessionStorage.setItem('username', username);

    }

    getLoggedInUser(): string | null {
        return this.loggedInUser !== null ? this.loggedInUser : sessionStorage.getItem('username');
    }

    setUserRole(role: string): void {
        sessionStorage.setItem('userRole', role);
    }
    getUserRole(): string | null {
        return sessionStorage.getItem('userRole');
    }

    isLoggedIn(): boolean {
        return this.getLoggedInUser() !== null;
    }

    logout(): void {
        this.loggedInUser = null;
        sessionStorage.clear();
        this.router.navigate(['/login']);

    }

    decodeToken(): any {
        const token = localStorage.getItem('token');
        if (!token) return null;

        const tokenPayload = token.split('.')[1];
        const decodedPayload = window.atob(tokenPayload);
        return JSON.parse(decodedPayload);
    }

    getUserRoles(): string[] {
        const decodedToken = this.decodeToken();
        return decodedToken ? decodedToken.roles : [];
    }

}
