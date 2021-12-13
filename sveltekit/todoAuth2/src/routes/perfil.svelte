<script>
    import { getAuth } from "firebase/auth";

    const auth = getAuth();
    const user = auth.currentUser;
</script>

<h1>Perfil</h1>

{#if user}
    <p>{user.displayName}</p>
    <p>{user.email}</p>
    <img src="{user.photoURL}" alt="">
{:else}
    <p>Não há usuário logado</p>
{/if}