import { Router } from 'express';

import TransactionsRepository from '../repositories/TransactionsRepository';
import CreateTransactionService from '../services/CreateTransactionService';

import Transaction from '../models/Transaction';

const transactionRepository = new TransactionsRepository();
const transactionRouter = Router();


transactionRouter.get('/', (request, response) => {
  try {
    const transactions = {
      "transactions": transactionRepository.all(),
      "balance": transactionRepository.getBalance()
    };

    response.json(transactions);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

transactionRouter.post('/', (request, response) => {
  try {
    const { title, value, type } = request.body;
    const createTransaction = new CreateTransactionService(transactionRepository);
    const transaction = createTransaction.execute({ title, value, type });
    return response.json(transaction);
  } catch (err) {
    return response.status(400).json({ error: err.message });
  }
});

export default transactionRouter;
