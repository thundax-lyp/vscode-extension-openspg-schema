import * as http from "http";
import { ResourceSupplier } from "./resource-supplier";

export class FetchSchemaApiSupplier implements ResourceSupplier {
    private readonly supplier: () => Promise<string>;

    constructor(supplier: () => Promise<string>) {
        this.supplier = supplier;
    }

    async isSupport(req: http.IncomingMessage) {
        const requestUrl = new URL(req.url ?? "/", "http://127.0.0.1");
        return requestUrl.pathname === "/openspg/api/schema/fetch" && req.method === "POST";
    }

    async getResource() {
        return {
            getContentType: async () => "application/json; charset=utf-8",
            getCacheControl: async () => "no-store",
            getContent: async () => this.supplier()
        };
    }
}
