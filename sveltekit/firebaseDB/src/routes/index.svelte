<script context="module">
    import { db } from "$lib/firebaseConfig";    
    import { collection, query, addDoc, getDocs } from "firebase/firestore";
</script>

<script>
    import { todosStore } from "$lib/stores";
    import { onMount } from "svelte";
    
    let todos = $todosStore;   

    onMount(async() => {
        if ($todosStore.length === 0) {
            console.log("CARREGAMENTO");
            const q = query(collection(db, "todos"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let todo = {...doc.data(), id: doc.id};
                $todosStore.push(todo)
            });
            todos = $todosStore;
        }        
    });
    
    let task = "";
   
    const addTodo = async() => {
        let newTodo = {
            task: task,
            isComplete: false,
            createdAt: new Date(),
        };
        await addDoc(collection(db, "todos"), {
            todo: newTodo
        });
        
        todos = [newTodo, ...todos];
        task = "";
    }

    const markAsComplete = (index) => {        
        todos[index].isComplete = !todos[index].isComplete;
    }

    const deleteTodo = (index) => {
        let deleteItem = todos[index];
        todos = todos.filter((item) => item != deleteItem);
    }

    const keyIsPressed = (event) => {
        if (event.key === "Enter" && task != "") {
            addTodo()
        }
    }


    //$: console.table(todos);

</script>

<input type="text" placeholder = "Add a task" bind:value={task} on:keydown={keyIsPressed}>
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


<!-- <svelte:window on:keydown={keyIsPressed}></svelte:window> -->

<style>
    .complete {
        text-decoration: line-through;
    }
</style>

