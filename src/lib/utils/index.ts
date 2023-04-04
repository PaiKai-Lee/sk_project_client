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
