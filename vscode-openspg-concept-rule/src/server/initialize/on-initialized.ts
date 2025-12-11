import {Context, OnInitialized} from '../context';


export const onInitialized = ({connection}: Context): OnInitialized => async () => {
    connection.console.log('concept-rule language server initialized');
}
