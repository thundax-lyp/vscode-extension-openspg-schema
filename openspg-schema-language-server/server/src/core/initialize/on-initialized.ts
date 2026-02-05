import { Context, OnInitialized } from '../context';

export const onInitialized =
    ({ connection }: Context): OnInitialized =>
    async () => {
        connection.console.log('OpenSPG Schema language server initialized');
    };
