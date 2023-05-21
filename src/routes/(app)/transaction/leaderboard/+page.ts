import userService from '$lib/services/user';

export const load: PageLoad = async () => {
  const [result, err] = await userService.getAllUsersPoints();
  if (!result || err) return {};
  return { records: result };
};
