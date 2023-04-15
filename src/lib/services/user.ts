import { fetchBackend } from '../utils';

class User {
	async getAllUsers(params?: {
		fields?: string;
		page?: number;
		limit?: number;
		order?: string;
	}) {
		return await fetchBackend('get', '/api/user', { params });
	}

	async getAllUsersPoints(){
		return await fetchBackend('get','/api/user/points')
	}
}

const userService = new User();

export default userService;
