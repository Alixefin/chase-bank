export type User = {
  id: string;
  name: string;
  email: string;
};

export type Account = {
  id: string;
  userId: string;
  name: "Checking" | "Savings" | "Credit Card" | "Loan" | "Investment";
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
  name: 'David Jevaun Jones',
  email: 'davidjones09020@gmail.com',
};

export let mockAccounts: Account[] = [
  { id: 'acc-1', userId: '1', name: 'Checking', balance: 5800000 },
  { id: 'acc-2', userId: '1', name: 'Savings', balance: 10000000 },
  { id: 'acc-3', userId: '1', name: 'Credit Card', balance: -2500.88 },
];

export const mockTransactions: Transaction[] = [
  // Checking Account Transactions
  { id: 'txn-1', accountId: 'acc-1', date: new Date('2025-06-25T10:00:00Z').toISOString(), description: 'Grocery Store', amount: -75.50, type: 'Purchase' },
  { id: 'txn-2', accountId: 'acc-1', date: new Date('2025-06-24T14:00:00Z').toISOString(), description: 'Paycheck Deposit', amount: 2500.00, type: 'Deposit' },
  { id: 'txn-3', accountId: 'acc-1', date: new Date('2025-06-23T11:00:00Z').toISOString(), description: 'Gas Station', amount: -45.00, type: 'Purchase' },
  { id: 'txn-4', accountId: 'acc-1', date: new Date('2025-06-21T18:30:00Z').toISOString(), description: 'Online Shopping', amount: -210.20, type: 'Purchase' },
  { id: 'txn-5', accountId: 'acc-1', date: new Date('2025-06-19T12:00:00Z').toISOString(), description: 'Restaurant', amount: -60.00, type: 'Purchase' },
  { id: 'txn-6', accountId: 'acc-1', date: new Date('2025-06-16T09:00:00Z').toISOString(), description: 'ATM Withdrawal', amount: -100.00, type: 'Withdrawal' },
  { id: 'txn-11', accountId: 'acc-1', date: new Date('2025-05-25T10:00:00Z').toISOString(), description: 'Old Utility Bill', amount: -120.00, type: 'Payment' },


  // Savings Account Transactions
  { id: 'txn-7', accountId: 'acc-2', date: new Date('2025-06-10T10:00:00Z').toISOString(), description: 'Monthly Transfer', amount: 500.00, type: 'Deposit' },
  { id: 'txn-8', accountId: 'acc-2', date: new Date('2025-06-05T10:00:00Z').toISOString(), description: 'Interest Earned', amount: 12.50, type: 'Deposit' },
  { id: 'txn-9', accountId: 'acc-2', date: new Date('2025-05-12T10:00:00Z').toISOString(), description: 'Initial Deposit', amount: 10000.00, type: 'Deposit' },
  { id: 'txn-10', accountId: 'acc-2', date: new Date('2025-05-07T10:00:00Z').toISOString(), description: 'Transfer to Checking', amount: -500.00, type: 'Withdrawal' },
  
  // Credit Card Transactions
  { id: 'txn-12', accountId: 'acc-3', date: new Date('2025-06-24T19:00:00Z').toISOString(), description: 'Amazon.com', amount: -89.99, type: 'Purchase' },
  { id: 'txn-13', accountId: 'acc-3', date: new Date('2025-06-22T08:30:00Z').toISOString(), description: 'Starbucks', amount: -5.75, type: 'Purchase' },
  { id: 'txn-14', accountId: 'acc-3', date: new Date('2025-06-21T17:00:00Z').toISOString(), description: 'Payment Received - Thank You', amount: 500.00, type: 'Payment' },
  { id: 'txn-15', accountId: 'acc-3', date: new Date('2025-06-16T20:00:00Z').toISOString(), description: 'Netflix', amount: -15.99, type: 'Purchase' },
];

export const updateBalance = (accountId: string, newBalance: number) => {
    mockAccounts = mockAccounts.map(acc => 
        acc.id === accountId ? { ...acc, balance: newBalance } : acc
    );
};
