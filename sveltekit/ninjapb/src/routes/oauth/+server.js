import { redirect } from "@sveltejs/kit";

export const GET = async({ locals, url, cookies }) => {
    const redirectURL = `${url.origin}/oauth`;
    const expectedState = cookies.get('state');
    const expectedVerifier = cookies.get('verifier');

    console.log('EXPECTED VERIFIER: ', expectedVerifier);

    const state = await url.searchParams.get('state');
    const code = await url.searchParams.get('code');

    console.log('URL get: ', url.searchParams);

    const authMethods = await locals.userPb?.collection('users').listAuthMethods();
    if (!authMethods.authProviders) {
        console.log('no auth providers');
        throw redirect(303, '/signup');        
    }

    const provider = authMethods.authProviders[0];
    if (!provider) {
        console.log('provider not found');
        throw redirect(303, '/signup');        
    }

    if (expectedState != state) {
        console.log('return state does not match expected', expectedState, state);
        throw redirect(303, '/signup');        
    }

    try {
        await locals.userPb?.collection('users').authWithOAuth2Code(provider.name, code, expectedVerifier, redirectURL, {
            name: 'my awesome user'
        })
    } catch(err) {
        console.log('error signing up with OAuth2', err);
    } 

    console.log('valid: ', locals.userPb.authStore.isValid);
    console.log('TOKEN: ', locals.userPb.authStore.token);
    console.log('MODEL: ', locals.userPb.authStore.model);
    console.log('id: ', locals.userPb.authStore.model.id);
    console.log('email: ', locals.userPb.authStore.model.email);    
    console.log('username: ', locals.userPb.authStore.model.username);
    console.log('avatar url: ', locals.userPb.authStore.model.avatar.url);
    console.log('---------------');
    console.log('RECORD: \n', locals.userPb.authStore);
    console.log('---------------');
    
    throw redirect(303, '/');

}