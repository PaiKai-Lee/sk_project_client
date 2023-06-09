import { fetchBackend } from '../utils';

class User {
  async getAllUsers(params?: {
    fields?: string;
    page?: number;
    limit?: number;
    order?: string;
    hideDelete?: boolean;
  }) {
    return await fetchBackend('get', '/api/user', { params });
  }

  async getAllUsersPoints() {
    return await fetchBackend('get', '/api/user/points');
  }

  async changePassword(data: { password: string; confirmPassword: string }) {
    return await fetchBackend('patch', '/api/me/password', { data });
  }

  async getAllPartners() {
    return await fetchBackend('get', '/api/user/partners');
  }
}

const userService = new User();

export default userService;
