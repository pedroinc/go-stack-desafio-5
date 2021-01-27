import Transaction from '../models/Transaction';

interface Balance {
  income: number;
  outcome: number;
  total: number;
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
    const income = this.transactions
                            .filter(item => item.type === 'income')
                            .map(item => item.value)
                            .reduce((acc, current) => acc + current);

    const outcome = this.transactions
                            .filter(item => item.type === 'outcome')
                            .map(item => item.value)
                            .reduce((acc, current) => acc - current);

    return {
      income: income,
      outcome: outcome,
      total: income - outcome
    }
  }

  public create({ title, value, type }: Transaction): Transaction {
    const newTransaction = new Transaction({title, value, type});
    this.transactions.push(newTransaction);
    return newTransaction;
  }
}

export default TransactionsRepository;
