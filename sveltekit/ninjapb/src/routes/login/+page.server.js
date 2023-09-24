import { redirect } from "@sveltejs/kit";

export const actions = {
    login: async({ request, locals }) => {
        const loginFormData = await request.formData();
        const email = loginFormData.get('email')??'';
        const password = loginFormData.get('password')??'';

        let loginResponse = {
            email,
            error: true,
            message: ''
        }

        try {
            await locals.userPb.collection('users').authWithPassword(email, password);
            loginResponse.error = locals.userPb.authStore.isValid
        } catch(err) {            
            console.log('ERRO login > +page.server.js: ');
            loginResponse.message = err.message;            
            return loginResponse;            
        } finally {            
            if (loginResponse.error) throw redirect(303, '/auth');
        }

    }
}