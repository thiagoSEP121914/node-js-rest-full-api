import { SearchInput, SearchOutPut } from "@/common/domain/repositories/interfaces/Repository";
import { ProductModel } from "@/features/products/domain/models/ProductModel";
import {
    CreateProductsProps,
    ProductId,
    ProductRepository,
} from "@/features/products/domain/repositories/ProductRepository";
import { DataSource, Repository } from "typeorm";
import { Product } from "../entities/Product";
import { NotFoundError } from "@/common/domain/errors/NotFoundError";

export class ProductTypeOrmRepository implements ProductRepository {
    private sortableFields: string[] = ["name", "createdAt"];
    private productRepository: Repository<Product>;

    constructor(dataSource: DataSource) {
        this.productRepository = dataSource.getRepository(Product);
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
    findAll(params: SearchInput): Promise<SearchOutPut<ProductModel>> {
        throw new Error("Method not implemented.");
    }

    findById(id: string): Promise<ProductModel> {
        return this._get(id);
    }

    create(data: CreateProductsProps): ProductModel {
        return this.productRepository.create(data);
    }

    async insert(model: ProductModel): Promise<ProductModel> {
        return await this.productRepository.save(model);
    }

    update(model: ProductModel): Promise<ProductModel> {
        throw new Error("Method not implemented.");
    }

    delete(id: string): Promise<void> {
        throw new Error("Method not implemented.");
    }

    private async _get(id: string): Promise<ProductModel> {
        const product = await this.productRepository.findOneBy({ id });

        if (!product) {
            throw new NotFoundError(`Product not found usind id FAKE-ID ${id}`);
        }

        return product;
    }
}
