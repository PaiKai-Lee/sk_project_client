import userService from '$lib/services/user';

export const load: PageLoad = async () => {
	const [result, err] = await userService.getAllUser({ fields: 'points', order: 'points,desc' });
	if (!result || err) return {};
	return { records: result };
};
