import { fetchBackend } from '../utils';

interface CreateUser {
	name: string;
	email: string;
	role: string;
	department: string;
}

interface UpdateUser extends Omit<CreateUser, 'email'> {
	isDelete: boolean;
}

class Admin {
	createUser(data: CreateUser) {
		return fetchBackend('post', '/api/admin/user', { data });
	}

	editUser(id:number, data: UpdateUser) {
		return fetchBackend('patch', `/api/admin/user/${id}/info`, { data });
	}

	async resetPassword() {}

	async removeUser() {}
}

const adminService = new Admin();

export default adminService;
