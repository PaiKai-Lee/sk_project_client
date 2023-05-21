export const ssr = false;
import authService from '$lib/services/auth';
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = async () => {
  console.log('root layout');
  const [result, err] = await authService.authCheck();
  if (!result || err) return { user: { isAuth: false } };
  const { accessToken, ...restResult } = result;
  return { user: { ...restResult, isAuth: true } };
};
