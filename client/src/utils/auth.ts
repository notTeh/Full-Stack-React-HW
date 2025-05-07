import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // TODO: return the decoded token
    const token = this.getToken();
    return token ? jwtDecode<JwtPayload>(token) : null; // Decode the token if it exists
  }

  loggedIn() {
    // TODO: return a value that indicates if the user is logged in
    const token = this.getToken();
  return !!token && !this.isTokenExpired(token); // Check if token exists and is not expired
}
  
  isTokenExpired(token: string) {
    // TODO: return a value that indicates if the token is expired
    try {
      const decoded = jwtDecode<JwtPayload>(token);
      if (!decoded.exp) return true; // If no expiration time, consider it expired
      return decoded.exp * 1000 < Date.now(); // Compare expiration time with current time
    } catch (err) {
      return true; // If decoding fails, consider the token expired
    }
  }

  getToken(): string {
    // TODO: return the token
    return localStorage.getItem('id_token') || ''; // Get the token from localStorage
  }

  login(idToken: string) {
    // TODO: set the token to localStorage
    // TODO: redirect to the home page
    localStorage.setItem('id_token', idToken); // Save the token to localStorage
    window.location.assign('/'); // Redirect to the home page
  }

  logout() {
    // TODO: remove the token from localStorage
    // TODO: redirect to the login page
    localStorage.removeItem('id_token'); // Remove the token from localStorage
    window.location.assign('/login'); // Redirect to the login page
  }
}

export default new AuthService();
