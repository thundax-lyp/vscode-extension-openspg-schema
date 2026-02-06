import * as vscode from "vscode";
import * as http from "http";
import { KGSchema } from "../kg";
import {
    FetchResourceSupplier,
    FetchSchemaApiSupplier,
    FetchThemeApiSupplier,
    ResourceSupplier
} from "./resouce-supplier";

const PREVIEW_PATH = "/openspg/";

export class PreviewServer {
    private server: http.Server | undefined;
    private port: number | undefined;

    private readonly extensionUri: vscode.Uri;
    private readonly resourceContents: Record<string, [string, string]>;

    private readonly resourceSuppliers: ResourceSupplier[] = [];

    private currentSchema?: KGSchema;

    constructor(extensionUri: vscode.Uri) {
        this.extensionUri = extensionUri;
        this.resourceContents = {};
        this.resourceSuppliers.push(
            new FetchSchemaApiSupplier(() => this.generateSchema()),
            new FetchThemeApiSupplier(),
            new FetchResourceSupplier(extensionUri)
        );
    }

    async getPreviewUrl(): Promise<string> {
        const port = await this.ensureStarted();
        return `http://localhost:${port}${PREVIEW_PATH}`;
    }

    async updateContent(kgSchema: KGSchema): Promise<void> {
        await this.ensureStarted();
        this.currentSchema = kgSchema;
    }

    private async ensureStarted(): Promise<number> {
        if (this.port !== undefined) {
            return this.port;
        }

        await new Promise<void>((resolve) => {
            this.server = http.createServer((req, res) => {
                void this.handleRequest(req, res);
            });

            this.server.listen(0, "0.0.0.0", () => {
                const address = this.server?.address();
                if (address && typeof address !== "string") {
                    this.port = address.port;
                }
                resolve();
            });
        });

        if (this.port === undefined) {
            throw new Error("Failed to start preview server.");
        }

        return this.port;
    }

    private async handleRequest(req: http.IncomingMessage, res: http.ServerResponse) {
        if (!req.url) {
            res.writeHead(400);
            res.end();
            return;
        }

        for (const resourceSupplier of this.resourceSuppliers) {
            if (await resourceSupplier.isSupport(req)) {
                const resource = await resourceSupplier.getResource(req);
                if (resource) {
                    res.writeHead(200, {
                        "Content-Type": await resource.getContentType(),
                        "Cache-Control": await resource.getCacheControl()
                    });
                    res.end(await resource.getContent());
                    return;
                }
            }
        }
        res.writeHead(404);
        res.end();
    }

    private async generateSchema() {
        if (this.currentSchema) {
            const replacer = (key: string, value: any) => {
                if (key === "range") {
                    return undefined;
                } else if (key === "children" && value && Array.isArray(value) && value.length === 0) {
                    return undefined;
                }
                return value;
            };

            return JSON.stringify(
                {
                    code: 0,
                    message: "Success",
                    data: this.currentSchema
                },
                replacer
            );
        } else {
            return JSON.stringify({ code: -1, message: "Error" });
        }
    }
}
