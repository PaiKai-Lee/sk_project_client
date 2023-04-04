import transactionService from '$lib/services/transaction';
import type { PageLoad } from './$types';
export const load: PageLoad = async () => {
	const [result, err] = await transactionService.getAllRecords({page:1,limit:25});
	if (!result || err) return {};
	const organizeRecords = transactionService.organizeRecords(result);
	return { transactionRecords: organizeRecords };
};
