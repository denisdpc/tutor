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
        { $page.data.session.user?.name } | { $page.data.session.user?.email } |
        <img src="{ $page.data.session.user?.image }" alt="foto"> |
        <button on:click={handleSignOut}>Sign out</button> 
    {:else}
        <button on:click={handleGoogleSignIn}>Login</button>
    {/if}    
</nav>

  <slot />