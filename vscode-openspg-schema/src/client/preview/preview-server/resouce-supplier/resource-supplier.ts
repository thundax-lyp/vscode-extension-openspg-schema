import * as http from 'http';

export interface Resource {
    getContentType: () => Promise<string>;
    getCacheControl: () => Promise<string>;
    getContent: () => Promise<string>;
}

export interface ResourceSupplier {
    isSupport: (req: http.IncomingMessage) => Promise<boolean>;
    getResource: (req: http.IncomingMessage) => Promise<Resource>;
}
