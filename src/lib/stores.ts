import { writable } from 'svelte/store';

export const user = writable<{ userid: number; fname: string; lname: string; email: string } | null>(null);
