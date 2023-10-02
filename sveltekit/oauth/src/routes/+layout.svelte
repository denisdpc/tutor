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

<nav class="navbar navbar-expand-lg bg-body-tertiary">
    <div class="container-fluid">
      <a class="navbar-brand" href="/">Todo</a>
      <button class="navbar-toggler" type="button" data-bs-toggle="collapse" data-bs-target="#navbarSupportedContent" aria-controls="navbarSupportedContent" aria-expanded="false" aria-label="Toggle navigation">
        <span class="navbar-toggler-icon"></span>
      </button>
        <div class="collapse navbar-collapse" id="navbarSupportedContent">

            <ul class="navbar-nav me-auto mb-2 mb-lg-0">                                
                <li class="nav-item">
                    <a class="nav-link" href="/protected">Protegido</a>                    
                </li>                
                <li class="nav-item">
                    <button type="button" class="btn btn-primary" data-bs-toggle="modal" data-bs-target="#loginModal">
                        Launch demo modal
                      </button>
                </li>
            </ul>

            {#if $page.data.session}
                <div class="nav-item dropdown">
                    <a class="nav-link dropdown-toggle" href="#" role="button" data-bs-toggle="dropdown" aria-expanded="false">                        
                        <img
                        src="{ $page.data.session.user?.image }"
                        class="rounded-circle"
                        height="50"
                        alt="Black and White Portrait of a Man"
                        loading="lazy" />                        
                        <br>{ $page.data.session.user?.name }
                        <br>{ $page.data.session.user?.email }                        
                    </a>
                    <ul class="dropdown-menu dropdown-menu-end">
                        <li><a class="dropdown-item" href="#">Action</a></li>
                        <li><a class="dropdown-item" href="#">Another action</a></li>
                        <li><hr class="dropdown-divider"></li>
                        <li><a class="dropdown-item" href="#"><button class="btn btn-warning" on:click={handleSignOut}>Logout</button> </a></li>
                    </ul>
                </div>
            {:else}
                <button class="btn btn-info" on:click={handleGoogleSignIn}>Login</button>
            {/if}
        </div>
    </div>
</nav>

<!-- Modal -->
<div class="modal fade" id="loginModal" tabindex="-1" aria-labelledby="exampleModalLabel" aria-hidden="true">
    <div class="modal-dialog">
      <div class="modal-content">
        <div class="modal-header">
          <h1 class="modal-title fs-5" id="exampleModalLabel">Log in</h1>
          <button type="button" class="btn-close" data-bs-dismiss="modal" aria-label="Close"></button>
        </div>
        <div class="modal-body mx-auto">
          ...
        </div>
        <div class="modal-footer">
          <button type="button" class="btn btn-secondary" data-bs-dismiss="modal">Close</button>
          <button type="button" class="btn btn-primary">Save changes</button>
        </div>
      </div>
    </div>
  </div>




<slot />