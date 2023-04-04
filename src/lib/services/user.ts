import { fetchBackend } from '../utils';

class User {
	async getAllUser(params?: {
		fields?: string;
		page?: number;
		limit?: number;
		order?: string;
	}) {
		return await fetchBackend('get', '/api/user', { params });
	}
}

const userService = new User();

export default userService;
