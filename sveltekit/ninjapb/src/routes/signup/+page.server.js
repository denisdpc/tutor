import { redirect } from "@sveltejs/kit";

export async function load({ locals, url, cookies}) {
    return {

    }
}

export const actions = {
    signup: async() => {

    }, 
    OAuth2: async({ cookies, url, locals }) => {
        const authMethods = await locals.userPb?.collection('users').listAuthMethods();
        //console.log(authMethods);

        if (!authMethods) {
            return {
                authProviders: '',
            }
        }

        const redirectURL = `${url.origin}/oauth`;
        const googleAuthProvider = authMethods.authProviders[0];
        const authProviderRedirect = `${googleAuthProvider.authUrl}${redirectURL}`;

        const state = googleAuthProvider.state;
        const verifier = googleAuthProvider.codeVerifier;

        cookies.set('state', state);
        cookies.set('verifier', verifier)

        console.log('OAuth2 VERIFIER: ', cookies.get('verifier'));
       

        throw redirect(302, authProviderRedirect);
    }
}