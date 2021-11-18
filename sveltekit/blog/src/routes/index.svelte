<script context="module">
    export const load = async({fetch}) => {
        const res = await fetch("https://jsonplaceholder.typicode.com/posts")
        const posts = await res.json();
        return {
            props: {
                posts,
            }
        }
    }
</script>

<script>
    export let posts;
</script>


<h1>Posts</h1>

{JSON.stringify(posts)}