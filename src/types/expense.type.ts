export interface IExpense {
    id: number;
    title: string;
    type: "income" | "expense";
    category: string;
    nominal: number;
    date: string;
}