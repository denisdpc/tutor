import { redirect } from '@sveltejs/kit';

export const load = async (event) => {
    const session = await event.locals.getSession();

    if (!session?.user) {        
        console.log("redireciona para página em /login")
        //throw redirect(307, 'auth/signin');
        throw redirect(307, 'login');
        //console.log("sem sessao")
    }

    return {
        session
    };
};