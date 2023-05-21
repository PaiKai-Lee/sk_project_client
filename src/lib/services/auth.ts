import { fetchBackend } from '../utils';

interface LoginParams {
  email: string;
  password: string;
}

class Auth {
  async login({ email, password }: LoginParams) {
    return await fetchBackend('post', '/api/login', {
      data: {
        email,
        password
      }
    });
  }

  logout() {
    localStorage.removeItem('accessToken');
  }

  async authCheck() {
    return await fetchBackend('get', '/api/check');
  }
}

const authService = new Auth();

export default authService;
