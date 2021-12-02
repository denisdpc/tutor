<script context="module">
    import { auth, googleProvider } from "$lib/firebaseConfig";
    import { signOut, signInWithPopup, onAuthStateChanged } from "@firebase/auth";
    import { goto } from "$app/navigation";
        
    const logout = async () => {
        try {
            await signOut(auth);
            goto("/");
        } catch(err) {
            console.error(err);
        }        
    }
    const login = async () => {
        try {
            await signInWithPopup(auth, googleProvider);
            goto("/perfil");
        } catch(err) {
            console.error(err);
        }
    }
</script>

<script>
    import { isLoggedInStore, todosStore } from "$lib/stores";
    
    onAuthStateChanged(auth, (user) =>  {
        $todosStore = [];
        if (user) {
            $isLoggedInStore = true;
        } else {
            $isLoggedInStore = false;        
        }
    });
</script>

<nav>
    <ul>
        <li><a href="/">Home</a></li>
        
        {#if $isLoggedInStore }
            <li><a href="/perfil">Perfil</a></li>
            <!-- svelte-ignore a11y-missing-attribute -->
            <li><a on:click={logout}>Logout</a></li>
        {:else}
            <!-- svelte-ignore a11y-missing-attribute -->
            <li><a on:click={login}>Login</a></li>
        {/if}    
    </ul>
</nav>

<style>
    ul {
        display: flex;
        margin: 0;
        padding: 0;
        list-style: none;
    }
    li {
        margin-right: 20px;
        font-weight: bold;
    }
    a {
        text-decoration: none;
    }
    a:hover {
        color: blue;
    }
</style>