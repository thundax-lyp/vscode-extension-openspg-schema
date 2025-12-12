import {Context, OnInitialized} from '../context';


export const onInitialized = ({connection}: Context): OnInitialized => async () => {
    connection.console.log('schema language server initialized');
}
