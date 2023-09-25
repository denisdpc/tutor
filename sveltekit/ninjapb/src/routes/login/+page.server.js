import { SECRET_SIGNATURE } from "$env/static/private";
import { redirect } from "@sveltejs/kit";
import crypto from 'crypto';

export const actions = {
    login: async({ request, locals }) => {
        const loginFormData = await request.formData();
        const email = loginFormData.get('email')??'';
        const password = loginFormData.get('password')??'';

        const hash = crypto.createHash('sha256');
        hash.update(password);
        hash.update(SECRET_SIGNATURE);
        const hashedPassword = hash.digest('hex');

        let loginResponse = {
            email,
            error: true,
            message: ''
        }

        try {
            await locals.userPb.collection('users').authWithPassword(email, hashedPassword);
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