import * as http from 'http';
import {ResourceSupplier} from './resource-supplier';

export class FetchThemeApiSupplier implements ResourceSupplier {
    private isDarkTheme = false;
    private resourceContent: string | undefined;

    async isSupport(req: http.IncomingMessage) {
        return req.url?.endsWith('schema-theme.css') ?? false;
    }

    async getResource() {
        return {
            getContentType: async () => 'text/css',
            getCacheControl: async () => 'no-store',
            getContent: async () => {
                if (!this.resourceContent || this.isDarkTheme != this.getSystemDarkTheme()) {
                    this.isDarkTheme = this.getSystemDarkTheme();
                    this.resourceContent = `` +
                        `:root {` +
                        `	--bg-color: rgb(43, 43, 43);` +
                        `	--text-color: rgb(169, 183, 198);` +
                        `	--keyword-color: rgb(204, 120, 50);` +
                        `	--entity-name-color: rgb(169, 183, 198);` +
                        `	--entity-alias-color: rgb(106, 135, 89);` +
                        `	--entity-reference-color: rgb(118, 154, 165);` +
                        `}`;
                }
                return this.resourceContent;
            }
        };
    }

    getSystemDarkTheme() {
        return true;
    }
}
