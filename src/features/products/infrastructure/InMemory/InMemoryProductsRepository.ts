import { InMemoryRepository } from "@/common/domain/repositories/in-memory/InMemoryRepository";
import { ProductId, ProductRepository } from "../../domain/repositories/ProductRepository";
import { ProductModel } from "../../domain/models/ProductModel";
import { NotFoundError } from "@/common/domain/errors/NotFoundError";
import { ConflictError } from "@/common/domain/errors/ConflictError";

export class InMemoryProductsRepository
    extends InMemoryRepository<ProductModel>
    implements ProductRepository
{
    sortableFields: string[] = ["name", "createdAt"]; // 👈 CORRIGIDO

    async findByName(name: string): Promise<ProductModel> {
        const product = this.items.find((item) => item.name === name);
        if (!product) {
            throw new NotFoundError(`Product not found using name ${name}`);
        }
        return product;
    }

    async findAllByIds(ids: ProductId[]): Promise<ProductModel[]> {
        const existingProducts = [];
        for (const productId of ids) {
            const product = this.items.find((item) => item.id === productId?.id);
            if (product) {
                existingProducts.push(product);
            }
        }
        return existingProducts;
    }

    async conflictingName(name: string): Promise<void> {
        const product = this.items.find((item) => item.name === name); // 👈 MUDOU de filter para find
        if (product) {
            // 👈 AGORA funciona corretamente
            throw new ConflictError("Name already used on another product"); // 👈 MENSAGEM CORRIGIDA
        }
    }

    protected async applyFilter(
        items: ProductModel[],
        filter: string | null,
    ): Promise<ProductModel[]> {
        if (!filter) {
            return items;
        }
        return items.filter((item) => item.name.toLowerCase().includes(filter.toLowerCase()));
    }

    protected async applySort(
        items: ProductModel[],
        sort: string | null,
        sort_dir: string | null,
    ): Promise<ProductModel[]> {
        return super.applySort(items, sort ?? "createdAt", sort_dir ?? "desc"); // 👈 CORRIGIDO
    }
}
