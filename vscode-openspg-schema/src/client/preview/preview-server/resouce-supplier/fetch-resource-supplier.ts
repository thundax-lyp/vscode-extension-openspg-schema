import * as vscode from "vscode";
import * as http from "http";
import * as path from "path";
import { ResourceSupplier } from "./resource-supplier";

const MIME_TYPES: Record<string, string> = {
    ".html": "text/html; charset=utf-8",
    ".js": "text/javascript",
    ".css": "text/css",
    ".svg": "image/svg+xml",
    ".json": "application/json; charset=utf-8"
};

const lookupMimeType = (resourceName: string) => {
    const extname = path.extname(resourceName).toLowerCase();
    if (extname in MIME_TYPES) {
        return MIME_TYPES[extname];
    }
    return "application/octet-stream";
};

export class FetchResourceSupplier implements ResourceSupplier {
    private readonly extensionUri: vscode.Uri;
    private readonly contents: Record<string, [string, string]> = {};

    constructor(extensionUri: vscode.Uri) {
        this.extensionUri = extensionUri;
    }

    async isSupport(req: http.IncomingMessage) {
        const resourceName = this.getResourceName(req);
        const resourceUri = this.getResourceUri(resourceName);
        await vscode.workspace.fs.stat(resourceUri);
        return true;
    }

    async getResource(req: http.IncomingMessage) {
        const resourceName = this.getResourceName(req);
        const [content, mimeType] = await this.loadResource(resourceName);
        return {
            getContentType: async () => mimeType,
            getCacheControl: async () => "no-store",
            getContent: async () => content
        };
    }

    private getResourceName(req: http.IncomingMessage) {
        const requestUrl = new URL(req.url ?? "/", "http://127.0.0.1/");
        let resourceName = requestUrl.pathname;
        if (resourceName.endsWith("/")) {
            resourceName += "index.html";
        }
        return resourceName;
    }

    private getResourceUri(resourceName: string) {
        return vscode.Uri.joinPath(this.extensionUri, "resources", "preview", resourceName);
    }

    private async loadResource(resourceName: string): Promise<[string, string]> {
        if (!(resourceName in this.contents)) {
            const resourceUri = this.getResourceUri(resourceName);
            const content = (await vscode.workspace.fs.readFile(resourceUri)).toString();
            const mimeType = lookupMimeType(resourceName);
            this.contents[resourceName] = [content, mimeType];
        }
        return this.contents[resourceName];
    }
}
