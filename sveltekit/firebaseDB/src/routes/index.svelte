<script context="module">
    import { db } from "$lib/firebaseConfig";    
    import { collection, query, addDoc, deleteDoc, updateDoc, getDocs, doc, DocumentReference } from "firebase/firestore";
</script>

<script>
    import { todosStore } from "$lib/stores";
    import { onMount } from "svelte";

    onMount(async() => {
        if ($todosStore.length === 0) {
            console.log("CARREGAMENTO");
            const q = query(collection(db, "todos"));
            const querySnapshot = await getDocs(q);
            querySnapshot.forEach((doc) => {
                let todo = {...doc.data(), id: doc.id};
                $todosStore.push(todo)
            });
            $todosStore = $todosStore;
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

        $todosStore = [newTodo, ...todos];
        task = "";
    }

    const deleteTodo = async(index) => {
        let item = $todosStore[index];
        await deleteDoc(doc(db,"todos", item.id));
        $todosStore = $todosStore.filter((itemList) => itemList != item);
    }

    const markAsComplete = async(index) => {
        let item = $todosStore[index];
        await updateDoc(doc(db,"todos",item.id), {
            isComplete: !item.isComplete
        });        
        $todosStore[index].isComplete = !$todosStore[index].isComplete;
    }

    const keyIsPressed = (event) => {
        if (event.key === "Enter" && task != "") {
            addTodo()
        }
    }

</script>

<input type="text" placeholder = "Add a task" bind:value={task} on:keydown={keyIsPressed}>
<button on:click={addTodo}>Add</button>

<ol>    
    {#each $todosStore as todo, index}
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

