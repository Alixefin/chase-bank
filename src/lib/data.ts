
export type User = {
  id: string;
  firstName: string;
  lastName: string;
  email: string;
};

export type Account = {
  id: string;
  userId: string;
  name: "Checking" | "Savings" | "Credit Card";
  balance: number;
};

export type Transaction = {
  id: string;
  accountId: string;
  date: string;
  description: string;
  amount: number;
  type: "Deposit" | "Withdrawal" | "Payment" | "Purchase";
};

export const mockUser: User = {
  id: '1',
  firstName: 'David',
  lastName: 'Jones',
  email: 'davidjones09020@gmail.com',
};

export let mockAccounts: Account[] = [
  { id: 'acc-1', userId: '1', name: 'Checking', balance: 5800000 },
  { id: 'acc-2', userId: '1', name: 'Savings', balance: 10000000 },
  { id: 'acc-3', userId: '1', name: 'Credit Card', balance: -2500 },
];

export const mockTransactions: Transaction[] = [
  // All transactions are now deposits or payments into the account
  { id: 'txn-2', accountId: 'acc-1', date: new Date('2025-06-24T14:00:00Z').toISOString(), description: 'Paycheck Deposit', amount: 2500.00, type: 'Deposit' },
  { id: 'txn-16', accountId: 'acc-1', date: new Date('2025-06-20T14:00:00Z').toISOString(), description: 'Client Payment', amount: 1500.00, type: 'Deposit' },
  { id: 'txn-17', accountId: 'acc-1', date: new Date('2025-06-15T14:00:00Z').toISOString(), description: 'Freelance Gig Payment', amount: 750.00, type: 'Deposit' },
  { id: 'txn-18', accountId: 'acc-1', date: new Date('2025-06-10T14:00:00Z').toISOString(), description: 'Stock Dividend', amount: 120.00, type: 'Deposit' },
  { id: 'txn-19', accountId: 'acc-1', date: new Date('2025-06-05T14:00:00Z').toISOString(), description: 'Project Advance', amount: 3000.00, type: 'Deposit' },
  
  // Savings Account Transactions
  { id: 'txn-7', accountId: 'acc-2', date: new Date('2025-06-10T10:00:00Z').toISOString(), description: 'Monthly Transfer', amount: 500.00, type: 'Deposit' },
  { id: 'txn-8', accountId: 'acc-2', date: new Date('2025-06-05T10:00:00Z').toISOString(), description: 'Interest Earned', amount: 12.50, type: 'Deposit' },
  { id: 'txn-9', accountId: 'acc-2', date: new Date('2025-05-12T10:00:00Z').toISOString(), description: 'Initial Deposit', amount: 10000.00, type: 'Deposit' },
];

export const updateBalance = (accountId: string, newBalance: number) => {
    mockAccounts = mockAccounts.map(acc => 
        acc.id === accountId ? { ...acc, balance: newBalance } : acc
    );
};
