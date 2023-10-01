<!-- Página de Login customizada - vide hooks.server.js -->

<script>
    import { page } from '$app/stores';
    import { signIn } from '@auth/sveltekit/client';

    import { onMount } from "svelte";

    // onMount(() => {
    //     if (!$page.data.session) {
    //         setTimeout(()=> {
    //             signIn('google', {callbackUrl: '/protected'})
    //         },3000); // redireciona para página de login
    //     }
    // });
</script>

<br>

Página ter acesso realize o LOGIN


