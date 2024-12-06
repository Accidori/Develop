import { JwtPayload, jwtDecode } from 'jwt-decode';

class AuthService {
  getProfile() {
    // return the decoded token
    const token = this.getToken();
    if (token) {
      try {
        return jwtDecode<JwtPayload>(token);
      } catch (error) {
        console.log('Error decoding token', error);
      }
    }
    return null;
  }


  loggedIn() {
    // return a value that indicates if the user is logged in
    const token = this.getToken();
    return !!token && !this.isTokenExpired(token);
  }
  
  isTokenExpired(token: string) {
    // return a value that indicates if the token is expired
    if (!token) {
      return true;
    }

    try{
      const decoded = jwtDecode<JwtPayload>(token);
      return  decoded.exp ? decoded.exp * 1000 < Date.now(): false; 
    }catch (error){
      console.log('Error decoding token', error);
      return true;
    }
  }

  getToken(): string {
    // return the token
    return localStorage.getItem('token') || ''; 
  }



  login(idToken: string) {
    // set the token to localStorage
    localStorage.setItem('token', idToken);

    // redirect to the home page
    window.location.href = '/kanban-board';

  }

  logout() {
    // remove the token from localStorage
    localStorage.removeItem('token');

    // redirect to the login page
    window.location.href = '/login';
  }
}

export default new AuthService();
