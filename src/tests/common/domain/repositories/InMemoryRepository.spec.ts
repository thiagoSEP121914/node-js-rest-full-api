import { InMemoryRepository } from "@/common/domain/repositories/in-memory/InMemoryRepository";
import { randomUUID } from "node:crypto";

type StubModelProps = {
    id: string;
    name: string;
    price: string;
    created_at: Date;
    update_at: Date;
};
// Tipo para os campos que você vai passar ao criar um modelo
type StubProps = Omit<StubModelProps, "id" | "created_at" | "update_at">;

class StubInMemoryRepository extends InMemoryRepository<StubModelProps> {
    constructor() {
        super();
        this.sortableFields = ["name"];
    }

    protected async applyFilter(
        items: StubModelProps[],
        filter: string | null,
    ): Promise<StubModelProps[]> {
        if (!filter) {
            return items;
        }
        return items.filter((item) =>
            item.name.toLocaleLowerCase().includes(filter.toLocaleLowerCase()),
        );
    }
}
describe("InMemoryRepository unit tests", () => {
    let sut: StubInMemoryRepository;
    let model: StubModelProps;
    let props: StubProps;
    let created_at: Date;
    let update_at: Date;

    beforeEach(() => {
        sut = new StubInMemoryRepository();
        created_at = new Date();
        update_at = new Date();

        props = {
            name: "test",
            price: "10",
        };

        model = {
            id: randomUUID(),
            created_at,
            update_at,
            ...props,
        };
    });

    it("should insert a model", async () => {
        const inserted = await sut.insert(model);
        expect(inserted).toEqual(model);
        expect(sut.items).toHaveLength(1);
    });

    it("should find a model by id", async () => {
        await sut.insert(model);
        const found = await sut.findById(model.id);
        expect(found).toEqual(model);
    });

    it("should throw NotFoundError when id does not exist", async () => {
        await expect(sut.findById("non-existent-id")).rejects.toThrow();
    });

    it("should update a model", async () => {
        await sut.insert(model);
        const updatedModel = { ...model, name: "updated test" };
        const updated = await sut.update(updatedModel);
        expect(updated.name).toBe("updated test");
        expect(sut.items[0].name).toBe("updated test");
    });

    it("should delete a model", async () => {
        await sut.insert(model);
        await sut.delete(model.id);
        expect(sut.items).toHaveLength(0);
        await expect(sut.findById(model.id)).rejects.toThrow();
    });

    it("should filter models", async () => {
        const modelB = {
            id: randomUUID(),
            created_at,
            update_at,
            name: "another",
            price: "20",
        };
        await sut.insert(model);
        await sut.insert(modelB);

        const result = await sut.findAll({ filter: "another" });
        expect(result.items).toHaveLength(1);
        expect(result.items[0].name).toBe("another");
    });

    it("should sort models ascending", async () => {
        const modelB = {
            id: randomUUID(),
            created_at,
            update_at,
            name: "bbb",
            price: "20",
        };
        await sut.insert(modelB);
        await sut.insert(model);

        const result = await sut.findAll({ sort_by: "name", sort_dir: "asc" });
        expect(result.items[0].name <= result.items[1].name).toBe(true);
    });

    it("should paginate models", async () => {
        for (let i = 0; i < 15; i++) {
            await sut.insert({
                id: randomUUID(),
                created_at,
                update_at,
                name: `Product ${i}`,
                price: `${i}`,
            });
        }

        const result = await sut.findAll({ page: 2, per_page: 10 });
        expect(result.items).toHaveLength(5);
        expect(result.current_page).toBe(2);
        expect(result.per_page).toBe(10);
        expect(result.total).toBe(15);
    });
});
