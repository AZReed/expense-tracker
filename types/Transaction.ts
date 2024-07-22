interface Category {
  id: string;
  name: string;
  createdAt: Date;
  updatedAt: Date;
}

export interface Transaction {
  id: string;
  text: string;
  amount: number;
  userId: string;
  category: Category | null;
  createdAt: Date;
  updatedAt: Date;
}

export interface TransactionResponse {
  data?: {
    list: Transaction[];
    totalCount: number;
    currentPage: number;
    nextPage: boolean;
    previousPage: boolean;
  };
  error?: string;
}

export interface TransactionFilters {
  page?: string;
}
