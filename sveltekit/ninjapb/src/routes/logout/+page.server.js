import { redirect } from "@sveltejs/kit";

export function load({locals}) {
    //if (locals.userPb.authStore.baseToken) locals.userPb.authStore.clear();
    locals.userPb.authStore.clear();
    console.log('LOGOUT');
    throw redirect(303,'/');
}