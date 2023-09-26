import { redirect } from "@sveltejs/kit";

export const GET = async({ locals, url, cookies }) => {
    const redirectURL = `${url.origin}/oauth`;
    const expectedState = cookies.get('state');
    const expectedVerifier = cookies.get('verifier');

    console.log('EXPECTED VERIFIER: ', expectedVerifier);

    const state = await url.searchParams.get('state');
    const code = await url.searchParams.get('code');

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
    
    throw redirect(303, '/');

}