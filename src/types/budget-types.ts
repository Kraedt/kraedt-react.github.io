
export type ViewMode = 'None' | 'Transactions';

export interface BudgetItem {
  id: string;
  label: string;
  plannedAmount: number;
  transactionSum: number;
}

export interface Category {
  id: string;
  title: string;
  icon: string;
  budgetItems: BudgetItem[];
  reserved: boolean;
}

export interface Budget {
  _id: string;
  categories: Category[];
}