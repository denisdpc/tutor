<script>
    import { signIn, signOut } from '@auth/sveltekit/client';
    import { page } from '$app/stores';

    const handleGoogleSignIn = () => {
        signIn('google', {callbackUrl: '/protected'});
    }

    const handleSignOut = () => {
        signOut();
    }
</script>

<nav>
    <a href="/">Home</a> |
    <a href='/protected'>protegido</a> |
    {#if $page.data.session}
        <button on:click={handleSignOut}>Sign out</button>
    {:else}
        <button on:click={handleGoogleSignIn}>Login</button>
    {/if}    
</nav>

  <slot />