import userService from '$lib/services/user';
import type { PageLoad } from './$types';

// @ts-ignore
export const load: PageLoad = async () => {
  const [result, err] = await userService.getAllUsers({ fields: 'avatar,department' });
  if (!result || err) return {};
  return { users: result };
};
