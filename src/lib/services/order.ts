import { fetchBackend } from '../utils';

interface OrderData {
	id: number;
	cost: number;
	save: number;
	remark: string;
}

class Order {
	async createOrder(orderData: OrderData[]) {
		return fetchBackend('post', '/api/order', {
			data: {
				data: orderData
			}
		});
	}
}

const orderService = new Order();

export default orderService;
