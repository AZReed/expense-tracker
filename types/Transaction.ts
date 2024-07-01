export interface Transaction {
  id: string;
  text: string;
  amount: number;
  userId: string;
  createdAt: Date;
  updatedAt: Date;
}

// TransactionResponse returns a promise of Transaction and error if any
export interface TransactionResponse {
  transactions?: Transaction[];
  error?: string;
}
