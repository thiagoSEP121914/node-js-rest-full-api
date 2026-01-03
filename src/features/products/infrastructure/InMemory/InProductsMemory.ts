import { InMemoryRepository } from "@/common/domain/repositories/in-memory/InMemoryRepository";
import { ProductId, ProductRepository } from "../../domain/repositories/ProductRepository";
import { ProductModel } from "../../domain/models/ProductModel";

export class InMemoryProductsRepository
    extends InMemoryRepository<ProductModel>
    implements ProductRepository
{
    protected applyFilter(items: ProductModel[], filter: string | null): Promise<ProductModel[]> {
        throw new Error("Method not implemented.");
    }
    findByName(name: string): Promise<ProductModel> {
        throw new Error("Method not implemented.");
    }
    findAllByIds(ids: ProductId[]): Promise<ProductModel[]> {
        throw new Error("Method not implemented.");
    }
    conflictingName(name: string): Promise<void> {
        throw new Error("Method not implemented.");
    }
}
