export const ssr = false;
import { fetchBackend } from '$lib/utils';
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = async () => {
	console.log('root layout');
	const [result, err] = await fetchBackend('get', '/api/check');
	if (!result || err) return { user: { isAuth: false } };
	const { accessToken, restResult } = result;
	return { user: { ...restResult, isAuth: true } };
};
