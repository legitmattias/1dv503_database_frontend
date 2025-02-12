<script lang="ts">
	import { onMount } from 'svelte';
	import { goto } from '$app/navigation';

	type CartItem = {
		isbn: string;
		title: string;
		author: string;
		price: number;
		qty: number;
	};

	let cart: CartItem[] = [];
	let error: string | null = null;
	let totalPrice = 0;

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	// Fetch cart items
	onMount(async () => {
		try {
			const response = await fetch(`${API_BASE}/api/cart`, {
				credentials: 'include'
			});
			if (!response.ok) throw new Error('Failed to fetch cart.');
			cart = await response.json();
			totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
		} catch (err) {
			error = (err as Error).message;
		}
	});

	// Remove book from cart
	const removeFromCart = async (isbn: string) => {
		try {
			const response = await fetch(`${API_BASE}/api/cart`, {
				method: 'DELETE',
				headers: { 'Content-Type': 'application/json' },
				credentials: 'include',
				body: JSON.stringify({ isbn })
			});
			if (!response.ok) throw new Error('Failed to remove item.');
			cart = cart.filter((item) => item.isbn !== isbn);
			totalPrice = cart.reduce((sum, item) => sum + item.price * item.qty, 0);
		} catch (err) {
			error = (err as Error).message;
		}
	};

	// Checkout (places order)
	const checkout = async () => {
		try {
			const response = await fetch(`${API_BASE}/api/orders/checkout`, {
				method: 'POST',
				credentials: 'include'
			});
			if (!response.ok) throw new Error('Failed to place order.');

			const data = await response.json();
			alert(`Order placed successfully! Order ID: ${data.orderId}`);

			// Redirect to order confirmation page
			goto(`/order/${data.orderId}`);
		} catch (err) {
			error = (err as Error).message;
		}
	};
</script>

{#if error}
	<p class="text-red-600">{error}</p>
{:else}
	<div class="mx-auto max-w-3xl rounded bg-white p-6 shadow">
		<h2 class="mb-4 text-xl font-bold">Your Cart</h2>

		{#if cart.length === 0}
			<p class="text-gray-600">Your cart is empty.</p>
		{:else}
			<ul class="divide-y divide-gray-300">
				{#each cart as item}
					<li class="flex items-center justify-between p-4">
						<div>
							<h3 class="text-lg font-semibold">{item.title}</h3>
							<p class="text-sm text-gray-600">by {item.author}</p>
							<p class="font-bold text-blue-600">{(item.price * item.qty).toFixed(2)} kr</p>
							<p class="text-gray-600">Qty: {item.qty}</p>
						</div>
						<button class="rounded bg-red-600 px-4 py-2 text-white" on:click={() => removeFromCart(item.isbn)}>
							Remove
						</button>
					</li>
				{/each}
			</ul>

			<div class="mt-4 flex items-center justify-between border-t p-4">
				<h3 class="text-lg font-bold">Total: {totalPrice.toFixed(2)} kr</h3>
				<button class="rounded bg-green-600 px-6 py-2 text-white" on:click={checkout}> Checkout </button>
			</div>
		{/if}
	</div>
{/if}
