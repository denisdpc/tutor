import { writable } from "svelte/store";

export const todosStore = writable([]);
export const isLoggedInStore = writable(false);