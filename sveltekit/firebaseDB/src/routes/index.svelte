<script>
    let todos = [];
    let task = "";
   
    const addTodo = () => {
        let todo = {
            task: task,
            isComplete: false,
            createdAt: new Date(),
        };
        todos = [todo, ...todos];
        task = "";
    }

    const markAsComplete = (index) => {        
        todos[index].isComplete = !todos[index].isComplete;
    }

    const deleteTodo = (index) => {
        let deleteItem = todos[index];
        todos = todos.filter((item) => item != deleteItem);
    }

    $: console.table(todos);

</script>

<input type="text" placeholder = "Add a task" bind:value={task}>
<button on:click={addTodo}>Add</button>


<ol>
    {#each todos as todo, index}
        <li>
            <span class:complete={todo.isComplete}>{todo.task}</span>
            <span><button on:click={() => markAsComplete(index)}>✔</button></span>
            <span><button on:click={() => deleteTodo(index)}>✘</button></span>
        </li>
    {:else}
        No todos found
    {/each}
</ol>


<style>
    .complete {
        text-decoration: line-through;
    }
</style>

