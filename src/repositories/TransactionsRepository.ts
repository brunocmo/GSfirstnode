import Transaction from '../models/Transaction';
import transactionRouter from '../routes/transaction.routes';

interface Balance {
  income: number;
  outcome: number;
  total: number;
}

interface CreateTransaction {
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
    return this.transactions;
  }

  public getBalance(): Balance {
    const balance = this.transactions.reduce(
      (acc: Balance, trans: Transaction) => {
        switch (trans.type) {
          case 'income':
            acc.income += trans.value;
            acc.total += trans.value;
            break;
          case 'outcome':
            acc.outcome += trans.value;
            acc.total -= trans.value;
            break;
          default:
            break;
        }
        return acc;
      },
      {
        income: 0,
        outcome: 0,
        total: 0,
      },
    );

    return balance;
  }

  public create({ title, value, type }: CreateTransaction): Transaction {
    const transaction = new Transaction({ title, value, type });

    this.transactions.push(transaction);

    return transaction;
  }
}

export default TransactionsRepository;
