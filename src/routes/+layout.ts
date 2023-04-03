export const ssr = false;
import { fetchBackend } from '$lib/utils';
import type { LayoutLoad } from './$types';
export const load: LayoutLoad = async () => {
	console.log('layout ts')
	const [result, err] = await fetchBackend('get', '/api/check');
	if (err) return {};
	return { user: result };
};
