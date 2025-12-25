import { randomUUID } from "node:crypto";
import { NotFoundError } from "../../errors/NotFoundError";
import { Repository, SearchInput, SearchOutPut } from "../interfaces/Repository";

export type ModelProps = {
    id?: string;
    [key: string]: unknown;
};

export type ObjProps = {
    [key: string]: unknown;
};

export abstract class InMemoryRepository<Model extends ModelProps> implements Repository<
    Model,
    ObjProps
> {
    items: Model[] = [];
    sortableFields: string[] = [];

    async findAll(params: SearchInput): Promise<SearchOutPut<Model>> {
        const page = params.page || 1;
        const per_page = params.per_page || 10;
        const sort = params.sort_by || null;
        const sort_dir = params.sort_dir || null;
        const filter = params.filter || null;

        const filteredItems = await this.applyFilter(this.items, filter);
        const sortedItems = await this.applySort(filteredItems, sort, sort_dir);
        const paginatedItems = await this.applyPaginate(sortedItems, page, per_page);

        return {
            items: paginatedItems,
            total: filteredItems.length,
            current_page: page,
            per_page,
            sort,
            sort_dir,
            filter,
        };
    }

    findById(id: string): Promise<Model> {
        return this.get(id);
    }

    create(data: ObjProps) {
        const model = {
            id: randomUUID(),
            created_at: new Date(),
            update_at: new Date(),
            ...data,
        };

        return model as unknown as Model;
    }

    async insert(model: Model): Promise<Model> {
        this.items.push(model);
        return model;
    }

    async update(model: Model): Promise<Model> {
        if (!model.id) {
            throw new NotFoundError(`Model not found using ID: ${model.id}`);
        }

        await this.get(model.id);
        const index = this.items.findIndex((item) => item.id === model.id);
        this.items[index] = model;
        return model;
    }

    async delete(id: string): Promise<void> {
        await this.get(id);
        this.items = this.items.filter((item) => item.id !== id);
    }

    protected async applySort(
        items: Model[],
        sort: string | null,
        sort_dir: string | null,
    ): Promise<Model[]> {
        if (!sort || !this.sortableFields.includes(sort)) {
            return items;
        }

        return [...items].sort((a, b) => {
            const aValue = a[sort] as number;
            const bValue = b[sort] as number;

            if (aValue < bValue) {
                return sort_dir === "asc" ? -1 : 1;
            }

            if (aValue > bValue) {
                return sort_dir === "asc" ? 1 : -1;
            }
            return 0;
        });
    }

    protected async applyPaginate(
        items: Model[],
        page: number,
        per_page: number,
    ): Promise<Model[]> {
        const start = (page - 1) * per_page;
        const limit = start + per_page;
        return items.slice(start, limit);
    }

    protected async get(id: string): Promise<Model> {
        const model = this.items.find((item) => item.id === id);

        if (!model) {
            throw new NotFoundError(`Model not found using ID: ${id}`);
        }

        return model;
    }

    protected abstract applyFilter(items: Model[], filter: string | null): Promise<Model[]>;
}
