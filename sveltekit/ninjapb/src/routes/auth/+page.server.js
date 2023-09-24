import { redirect } from "@sveltejs/kit";

export function load({locals}) {
    if(!locals.userPb.authStore.isValid) throw redirect(303, '/login');

    const user = {
        firstname: locals.user.firstname
    }

    return { user };

}