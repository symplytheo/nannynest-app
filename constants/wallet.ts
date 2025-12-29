// Wallet-related constants and mock data

export type Transaction = {
  id: string;
  type: string;
  status: string;
  amount: number;
  date: string;
  isWithdrawal: boolean;
};

export type Earning = {
  id: string;
  type: string;
  status: string;
  amount: number;
  date: string;
};

export type BankAccount = {
  id: string;
  accountName: string;
  accountNumber: string;
  bankName: string;
};

// Mock wallet balance data
export const MOCK_WALLET_BALANCE = 574505.45;
export const MOCK_MONTHLY_EARNINGS = 248909.89;

// Mock transactions data
export const MOCK_TRANSACTIONS: Transaction[] = [
  {
    id: "1",
    type: "Withdrawal",
    status: "Processed",
    amount: 456780.85,
    date: "14 Jul, 2025",
    isWithdrawal: true,
  },
  {
    id: "2",
    type: "Withdrawal",
    status: "Processed",
    amount: 456780.85,
    date: "14 Jul, 2025",
    isWithdrawal: true,
  },
  {
    id: "3",
    type: "Withdrawal",
    status: "Processed",
    amount: 456780.85,
    date: "14 Jul, 2025",
    isWithdrawal: true,
  },
  {
    id: "4",
    type: "Withdrawal",
    status: "Processed",
    amount: 456780.85,
    date: "14 Jul, 2025",
    isWithdrawal: true,
  },
  {
    id: "5",
    type: "Withdrawal",
    status: "Processed",
    amount: 456780.85,
    date: "14 Jul, 2025",
    isWithdrawal: true,
  },
  {
    id: "6",
    type: "Withdrawal",
    status: "Processed",
    amount: 456780.85,
    date: "14 Jul, 2025",
    isWithdrawal: true,
  },
  {
    id: "7",
    type: "Withdrawal",
    status: "Processed",
    amount: 456780.85,
    date: "14 Jul, 2025",
    isWithdrawal: true,
  },
];

// Mock earnings data
export const MOCK_EARNINGS: Earning[] = [
  { id: "1", type: "Job Payment", status: "Processed", amount: 45780.84, date: "14 Jul, 2025" },
  { id: "2", type: "Job Payment", status: "Processed", amount: 56980.86, date: "14 Jul, 2025" },
  { id: "3", type: "Job Payment", status: "Processed", amount: 6780.82, date: "14 Jul, 2025" },
  { id: "4", type: "Job Payment", status: "Processed", amount: 4580.45, date: "14 Jul, 2025" },
  { id: "5", type: "Job Payment", status: "Processed", amount: 456780.85, date: "14 Jul, 2025" },
  { id: "6", type: "Job Payment", status: "Processed", amount: 46784.85, date: "14 Jul, 2025" },
  { id: "7", type: "Job Payment", status: "Processed", amount: 6480.05, date: "14 Jul, 2025" },
  { id: "8", type: "Job Payment", status: "Processed", amount: 450.05, date: "14 Jul, 2025" },
];

// Mock bank accounts data
export const MOCK_BANK_ACCOUNTS: BankAccount[] = [
  {
    id: "1",
    accountName: "MATTHEW OLAOLUWA",
    accountNumber: "9984028494943",
    bankName: "First Bank PLC",
  },
  {
    id: "2",
    accountName: "MATTHEW OLAOLUWA",
    accountNumber: "9984028494943",
    bankName: "First Bank PLC",
  },
];

// Mock transaction details
export const MOCK_TRANSACTION_DETAILS = {
  amount: 556780.85,
  bank: "Wema Bank",
  recipientName: "Matthew Olaoluwa",
  recipientAccount: "095784758",
  createdOn: "24 Jul, 2025",
  processedOn: "24 Jul, 2025",
  status: "Processed",
  reference: "WYE63TEGF64G3",
  fee: 50,
};
