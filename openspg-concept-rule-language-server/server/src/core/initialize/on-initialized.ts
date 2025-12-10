import {Context, OnInitialized} from '../context';


export const onInitialized = ({connection}: Context): OnInitialized => async () => {
    connection.console.log('successfully initialized');
}
