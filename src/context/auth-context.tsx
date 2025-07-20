
"use client";

import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { useRouter } from 'next/navigation';
import type { User, Account, Transaction } from '@/lib/data';
import { mockUser, mockAccounts, mockTransactions } from '@/lib/data';

interface AuthContextType {
  user: User | null;
  accounts: Account[];
  transactions: Transaction[];
  login: (username: string, password?: string) => boolean;
  logout: () => void;
  addTransaction: (newTransaction: Omit<Transaction, 'id' | 'date'>) => void;
  transferFunds: (fromAccountId: string, toAccountId: string, amount: number) => void;
}

const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider = ({ children }: { children: React.ReactNode }) => {
  const [user, setUser] = useState<User | null>(null);
  const [accounts, setAccounts] = useState<Account[]>(mockAccounts);
  const [transactions, setTransactions] = useState<Transaction[]>(mockTransactions);
  const router = useRouter();

  useEffect(() => {
    // Check for a persisted session on initial load
    const loggedInUser = localStorage.getItem('secureBankUser');
    if (loggedInUser) {
      setUser(JSON.parse(loggedInUser));
    }
  }, []);

  const login = (username: string, password?: string): boolean => {
    const validUsername = 'davidjones09020';
    const validPassword = 'Password123!';

    // For registration flow, or if password is not provided, we might have different logic
    if (password === undefined) {
      const userToLogin = { ...mockUser, email: `${username.toLowerCase()}@example.com` };
      localStorage.setItem('secureBankUser', JSON.stringify(userToLogin));
      setUser(userToLogin);
      router.push('/dashboard');
      return true;
    }
    
    if (username.toLowerCase() === validUsername && password === validPassword) {
      const userToLogin = { ...mockUser, email: `${username.toLowerCase()}@example.com` };
      localStorage.setItem('secureBankUser', JSON.stringify(userToLogin));
      setUser(userToLogin);
      router.push('/dashboard');
      return true;
    }

    return false;
  };

  const logout = () => {
    localStorage.removeItem('secureBankUser');
    setUser(null);
    router.push('/login');
  };

  const addTransaction = useCallback((newTransaction: Omit<Transaction, 'id' | 'date'>) => {
    setTransactions(prev => [
      ...prev,
      {
        ...newTransaction,
        id: `txn-${Date.now()}`,
        date: new Date().toISOString(),
      },
    ]);
  }, []);

  const transferFunds = useCallback((fromAccountId: string, toAccountId: string, amount: number) => {
    setAccounts(prevAccounts => {
      const newAccounts = prevAccounts.map(acc => {
        if (acc.id === fromAccountId) {
          return { ...acc, balance: acc.balance - amount };
        }
        if (acc.id === toAccountId) {
          return { ...acc, balance: acc.balance + amount };
        }
        return acc;
      });
      return newAccounts;
    });

    addTransaction({
      accountId: fromAccountId,
      description: `Transfer to ${accounts.find(a => a.id === toAccountId)?.name}`,
      amount: -amount,
      type: 'Withdrawal',
    });
    addTransaction({
      accountId: toAccountId,
      description: `Transfer from ${accounts.find(a => a.id === fromAccountId)?.name}`,
      amount: amount,
      type: 'Deposit',
    });

  }, [addTransaction, accounts]);

  return (
    <AuthContext.Provider value={{ user, accounts, transactions, login, logout, addTransaction, transferFunds }}>
      {children}
    </AuthContext.Provider>
  );
};

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};
