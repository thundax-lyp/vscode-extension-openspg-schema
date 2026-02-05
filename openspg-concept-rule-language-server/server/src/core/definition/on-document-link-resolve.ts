import { OnDocumentLinkResolve } from '../context';

export const onDocumentLinkResolve: OnDocumentLinkResolve = (_) => async (params) => {
    const { range, target } = params;
    console.log('undefined function onDocumentLinkResolve', range, target);
    return null;
};
