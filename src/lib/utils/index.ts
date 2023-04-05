import { browser } from '$app/environment';
import axios, { AxiosError, type AxiosResponse } from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
	timeout: 5000
});

type Config = {
	data?: any;
	params?: object;
};

export async function fetchBackend(
	method: 'post' | 'get' | 'patch' | 'put' | 'delete',
	path: string,
	config?: Config
): Promise<[any, AxiosResponse | null]> {
	let requestConfig: any = {
		method,
		url: path,
		headers: {
			Authorization: browser && `Bearer ${localStorage.getItem('accessToken')}`
		}
	};
	if (config?.data) requestConfig.data = config.data;
	if (config?.params) requestConfig.params = config.params;
	try {
		const result = await axiosInstance(requestConfig);
		return [result.data, null];
	} catch (error) {
		const err = error as AxiosError;
		console.error(err.message);
		return [null, err.response || null];
	}
}

export const dateFormatter = new Intl.DateTimeFormat('zh-TW', {
	year: 'numeric',
	month: '2-digit',
	day: '2-digit',
	hour: '2-digit',
	minute: '2-digit',
	second: '2-digit',
	hourCycle: 'h23'
});

export const arrayRange = (start: number, stop: number, step = 1) =>
	Array.from({ length: (stop - start) / step + 1 }, (value, index) => start + index * step);
