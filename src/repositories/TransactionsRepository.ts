import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransactionDTO {
  title: string;
  value: number;
  type: 'income' | 'outcome';
}

class TransactionsRepository {
  private transactions: Transaction[];

  constructor() {
    this.transactions = [];
  }

  public all(): Transaction[] {
    return this.transactions
  }

  public getBalance(): Balance {

    const income = this.transactions ? this.transactions
                            .filter(item => item.type === 'income')
                            .map(item => item.value)
                            .reduce((acc, current) => current + acc, 0) : 0;

    const outcome = this.transactions ? this.transactions
                            .filter(item => item.type === 'outcome')
                            .map(item => item.value)
                            .reduce((acc, current) => current - acc, 0) : 0;

    return {
      income: income,
      outcome: outcome,
      total: income - outcome
    }
  }

  public create({ title, value, type }: CreateTransactionDTO): Transaction {
    const newTransaction = new Transaction({title, value, type});
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
