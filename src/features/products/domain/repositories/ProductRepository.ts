import { Repository } from "@/common/domain/repositories/interfaces/Repository";
import { ProductModel } from "../models/ProductModel";

export type ProductId = {
    id: string;
};

export type CreateProductsProps = {
    id: string;
    name: string;
    price: number;
    quantity: number;
    createdAt: Date;
    updateAt: Date;
};

export interface ProductRepository extends Repository<ProductModel, CreateProductsProps> {
    findByName(name: string): Promise<ProductModel>;

    findAllByIds(ids: ProductId[]): Promise<ProductModel[]>;

    conflictingName(name: string): Promise<void>;
}
