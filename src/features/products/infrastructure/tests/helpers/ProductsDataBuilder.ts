import { randomUUID } from "node:crypto";
import { ProductModel } from "../../../domain/models/ProductModel";
import { faker } from "@faker-js/faker";

export const ProductsDataBuilder = (props: Partial<ProductModel> = {}): ProductModel => ({
    id: props.id ?? randomUUID(),
    name: props.name ?? faker.commerce.productName(),
    price:
        props.price ??
        Number(
            faker.commerce.price({
                min: 100,
                max: 200,
                dec: 2,
            }),
        ),
    quantity: props.quantity ?? 10,
    createdAt: props.createdAt ?? new Date(),
    updateAt: props.updateAt ?? new Date(),
});
