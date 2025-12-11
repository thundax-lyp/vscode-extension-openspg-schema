import {OnDocumentLinks} from '../context';


export const onDocumentLinks: OnDocumentLinks = (_) => async (params) => {
    const {textDocument} = params;
    console.log('undefined function onDocumentLinks', textDocument);
    return null;
};
