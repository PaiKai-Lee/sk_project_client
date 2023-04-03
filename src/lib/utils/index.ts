import { browser } from '$app/environment';
import axios, { AxiosError, type AxiosResponse } from 'axios';

const axiosInstance = axios.create({
	baseURL: 'http://localhost:3000',
	withCredentials: true,
	timeout: 5000,
	headers: {
		Authorization: browser && `Bearer ${localStorage.getItem('accessToken')}`
	}
});

export async function fetchBackend(
	method: 'post' | 'get' | 'patch' | 'put' | 'delete',
	path: string,
	data?: any
): Promise<[any, AxiosResponse | null]> {
	try {
		const result = await axiosInstance({
			method,
			data,
			url: path
		});
		return [result.data, null];
	} catch (error) {
		const err = error as AxiosError;
		console.error(err.message);
		return [null, err.response || null];
	}
}
