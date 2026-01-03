import { NotFoundError } from "../../../../src/common/domain/errors/NotFoundError";
import { InMemoryProductsRepository } from "../../../../src/features/products/infrastructure/InMemory/InMemoryProductsRepository";
import { ProductsDataBuilder } from "./helpers/ProductsDataBuilder";

describe("InMemoryProductsRepository unit tests", () => {
    let sut: InMemoryProductsRepository;

    beforeEach(() => {
        sut = new InMemoryProductsRepository();
    });

    describe("findByName", () => {
        it("should throw error when product not found", async () => {
            await expect(sut.findByName("fake_name")).rejects.toThrow(
                new NotFoundError("Product not found using name fake_name"),
            );

            await expect(sut.findByName("fake_name")).rejects.toBeInstanceOf(NotFoundError);
        });

        it("should find a product by name", async () => {
            const data = ProductsDataBuilder({ name: "Curso nodejs" });
            sut.items.push(data);
            const result = await sut.findByName("Curso nodejs");
            expect(result).toStrictEqual(data);
        });
    });
    describe("conflictingName", () => {
        const data = ProductsDataBuilder({ name: "Curso nodejs" });
        it("Should throw error when product not found", async () => {
            await expect(() =>
                sut

                    .findByName("fake_name")
                    .rejects.toThrow(new NotFoundError("Product not found using name fake_name")),
            );
        });
    });
});
