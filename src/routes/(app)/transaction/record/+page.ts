import transactionService from '$lib/services/transaction';
import type { PageLoad } from './$types';
export const load: PageLoad = async () => {
	const [result, err] = await transactionService.getRecords({ page: 1, limit: 25 });
	if (!result || err) return {};
	const { data, count } = result;
	const organizeRecords = transactionService.organizeRecords(data);
	return { count, page: 1, limit: '25', transactionRecords: organizeRecords };
};
