<script>
    import { page } from '$app/stores';
    import { signIn } from '@auth/sveltekit/client';

    import { onMount } from "svelte";

    onMount(() => {
        if (!$page.data.session) {
            signIn('google', {callbackUrl: '/protected'});
        }
    });

</script>