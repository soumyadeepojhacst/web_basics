export type Category = "Food" | "Travel" | "Shopping" | "Bills" | "Gaming" | "Other";

export interface Transaction {
    id : string,
    description : string,
    amount : number,
    category : Category,
    date : string
}