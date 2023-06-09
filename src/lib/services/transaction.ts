import { fetchBackend, dateFormatter } from '../utils';

interface Record {
  id: number;
  orderId: string;
  save: number;
  cost: number;
  remark: string;
  user: {
    name: string;
  };
  order: {
    createdAt: string;
  };
}

interface GetRecordsParams {
  page?: number;
  limit?: number | string;
  order?: string;
  user?: string;
}

class Transaction {
  async getRecords(params: GetRecordsParams) {
    return fetchBackend('get', '/api/transaction', { params });
  }

  organizeRecords(data: Record[]) {
    return data.map((record) => {
      const { id, orderId, save, cost, remark, user, order } = record;
      const td = new Date(order.createdAt).getTime();
      return {
        id,
        orderId,
        save,
        cost,
        remark,
        userName: user.name,
        createdAt: dateFormatter.format(td)
      };
    });
  }
}

const transactionService = new Transaction();

export default transactionService;
