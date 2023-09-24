import PocketBase from 'pocketbase'
//import {SECRET_EMAIL,SECRET_PASSWORD} from '$env/static/private';

export const handle = async ({ event, resolve }) => {
    //const adminPb = new PocketBase("http://127.0.0.1:8090");
    const userPb = new PocketBase("http://127.0.0.1:8090");
    //sign in
    //await adminPb.admins.authWithPassword(SECRET_EMAIL, SECRET_PASSWORD);
    //event.locals.adminPb = adminPb;
    event.locals.userPb = userPb;

    // Load the authStore from the cookie
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
    // Set the cookie
	response.headers.set(
		'set-cookie',
		event.locals.userPb.authStore.exportToCookie()
	);
    return response;
};