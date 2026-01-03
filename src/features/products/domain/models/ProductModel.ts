export interface ProductModel {
    id: string;
    name: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updateAt: Date;
    [key: string]: unknown;
}
