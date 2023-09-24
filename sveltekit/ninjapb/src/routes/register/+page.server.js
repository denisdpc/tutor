import { SECRET_SIGNATURE } from "$env/static/private";
import crypto from 'crypto';
import { redirect } from "@sveltejs/kit";

export const actions = {
    register: async({ request, locals }) => {
        const form = await request.formData();
        const firstname = form.get('firstname')??'';
        const lastname = form.get('lastname')?? '';
        const email = form.get('email')??'';
        const password = form.get('password')??'';
        const passwordConfirm = form.get('confirmPassword')??'';

        const username = form.get('username')?? '';
        
        const userNospace = username.replace(/\s/g,''); // //remove all white space

        let createResult = false;

        const hash = crypto.createHash('sha246');
        hash.update(password);
        hash.update(SECRET_SIGNATURE);
        const hashedPassword = hash.digest('hex');
        
        const data = {
            username: userNospace,
            email,            
            password: hashedPassword,
            passwordConfirm: hashedPassword,
            firstname,
            lastname
        };

        let registerResponse = {
            error:false,
            email:email,
            firstname,
            lastname,
            username: userNospace,
            message: ''
        }


        try {
            const result = await locals.userPb.collection('users').create(data);
            if (result) createResult = true;            
        } catch(err) {
            console.log('ERR: ', err);
            registerResponse.error = true;
            registerResponse.message = err.message;
        } finally {
            if (!createResult) return registerResponse;
            throw redirect(303, '/login');
        }

    }
}