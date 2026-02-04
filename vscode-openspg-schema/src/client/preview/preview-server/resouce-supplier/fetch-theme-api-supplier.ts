import * as vscode from 'vscode';
import * as http from 'http';
import { ResourceSupplier } from './resource-supplier';

const LIGHT_THEME = `
:root {
    --bg-color: rgb(255,255,255);
    --text-color: rgb(8,8,8);
    --keyword-color: rgb(0,51,179);
    --entity-name-color: rgb(0,0,0);
    --entity-alias-color: rgb(6,125,23);
    --entity-reference-color: rgb(0,0,0);
}
`;

const DARK_THEME = `
:root {
    --bg-color: rgb(30,31,34);
    --text-color: rgb(188,190,196);
    --keyword-color: rgb(207,142,109);
    --entity-name-color: rgb(188,190,196);
    --entity-alias-color: rgb(106,171,115);
    --entity-reference-color: rgb(188,190,196);
}
`;

const HIGH_CONTRAST_THEME = `
:root {
    --bg-color: rgb(19,19,20);
    --text-color: rgb(235,235,235);
    --keyword-color: rgb(237,134,74);
    --entity-name-color: rgb(255,255,255);
    --entity-alias-color: rgb(84,179,62);
    --entity-reference-color: rgb(255,255,255);
}
`;
const THEMES: Record<string, string> = {
    light: LIGHT_THEME,
    dark: DARK_THEME,
    highContrast: HIGH_CONTRAST_THEME
};

export class FetchThemeApiSupplier implements ResourceSupplier {
    async isSupport(req: http.IncomingMessage) {
        return req.url?.endsWith('schema-theme.css') ?? false;
    }

    async getResource() {
        return {
            getContentType: async () => 'text/css',
            getCacheControl: async () => 'no-store',
            getContent: async () => {
                const theme = this.currentTheme();
                return THEMES[theme];
            }
        };
    }

    currentTheme(): 'light' | 'dark' | 'highContrast' {
        const themeKind = vscode.window.activeColorTheme.kind;
        switch (themeKind) {
            case vscode.ColorThemeKind.Light:
                return 'light';
            case vscode.ColorThemeKind.Dark:
                return 'dark';
            case vscode.ColorThemeKind.HighContrast:
                return 'highContrast';
            default:
                return 'light';
        }
    }
}
