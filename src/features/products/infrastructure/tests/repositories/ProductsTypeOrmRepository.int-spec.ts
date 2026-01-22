import { NotFoundError } from "@/common/domain/errors/NotFoundError";
import { ProductTypeOrmRepository } from "../../typeorm/repositories/ProductsTypeOrmRepositorie";
import { testDataSource } from "@/common/infrastructure/typeorm/testing/DataSource";
import { randomUUID } from "node:crypto";
import { ProductsDataBuilder } from "../helpers/ProductsDataBuilder";
import { Product } from "../../typeorm/entities/Product";

describe("ProductsTypeOrmRepository integration tests", () => {
    let productRepository: ProductTypeOrmRepository;

    beforeAll(async () => {
        await testDataSource.initialize();
    });

    afterAll(async () => {
        await testDataSource.destroy();
    });

    beforeEach(async () => {
        await testDataSource.manager.query("DELETE FROM Products");
        productRepository = new ProductTypeOrmRepository(testDataSource);
    });

    describe("findById", () => {
        it("should generate an error when the product is not found", async () => {
            const id = randomUUID();
            await expect(productRepository.findById(id)).rejects.toThrow(
                new NotFoundError(`Product not found usind id FAKE-ID ${id}`),
            );
        });

        it("should finds aproduict by id", async () => {
            const data = ProductsDataBuilder({});
            const product = await testDataSource.manager.create(Product, data);
            await productRepository.insert(product);

            const result = await productRepository.findById(product.id);
            expect(result.id).toEqual(product.id);
        });
    });
});
