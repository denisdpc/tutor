import PocketBase from 'pocketbase'
//import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';

export const handle = async({ event, resolve }) => {
    event.locals.userPb = new PocketBase("http://127.0.0.1:8090");
    event.locals.userPb.authStore.loadFromCookie(event.request.headers.get('cookie') || '');

    try {
        // get an up-to-date auth store state by verifying and refreshing the loaded auth model (if any)
        event.locals.userPb.authStore.isValid && await event.locals.userPb.collection('users').authRefresh();
        event.locals.user = {...event.locals.userPb.authStore.model};
    } catch (err) {
        // clear the auth store on failed refresh
        console.log('error in hooks: ', err)
        event.locals.userPb.authStore.clear();
    }

    const response = await resolve(event);

    // response.headers.set(                            // google auth deixa de funcionar
	// 	'set-cookie',                                   // muda verifier
	// 	event.locals.userPb.authStore.exportToCookie()
	// );    

    console.log("HOOKS");


    return response;
}