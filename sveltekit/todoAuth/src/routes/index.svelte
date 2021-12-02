<script context="module">
    import { db } from "$lib/firebaseConfig";    
    import { collection, query, addDoc, deleteDoc, updateDoc, getDocs, doc, where } from "firebase/firestore";
    import { auth } from "$lib/firebaseConfig";
</script>

<script>
    import { onMount } from "svelte";
    import { isLoggedInStore, todosStore } from "$lib/stores";

    let user;
    let task = "";
    
    onMount(async() => {
        user = auth.currentUser;
        if (user) {
            if ($todosStore.length === 0) {
                const todosRef = collection(db,"todos");            
                const q = query(todosRef, where("userId","==",user.uid));
                const querySnapshot = await getDocs(q);

                querySnapshot.forEach((doc) => {
                    let todo = {...doc.data(), id: doc.id};
                    $todosStore.push(todo)
                });
                $todosStore = $todosStore;
            }
        }
    });

    const addTodo = async() => {
        let newTodo = {
            task: task,
            isComplete: false,
            createdAt: new Date(),
            userId: user.uid,
        };
        const docRef = await addDoc(collection(db, "todos"), {
            ...newTodo
        });
        newTodo["id"] = docRef.id;

        $todosStore = [newTodo, ...$todosStore];
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

<h1>Inicio</h1>

{#if $isLoggedInStore}
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
{/if}

<style>
    .complete {
        text-decoration: line-through;
    }
</style>
