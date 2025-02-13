<script lang="ts">
	import { onMount } from 'svelte';

	type Order = {
		ono: number;
		created: string;
		shipAddress: string;
		shipCity: string;
		shipZip: string;
		totalAmount: number;
		totalItems: number;
	};

	let orders: Order[] = [];
	let error: string | null = null;

	const API_BASE = import.meta.env.VITE_BACKEND_URL;

	onMount(async () => {
		try {
			const response = await fetch(`${API_BASE}/api/orders`, {
				credentials: 'include'
			});
			if (!response.ok) throw new Error('Failed to fetch orders.');
			orders = await response.json();
		} catch (err) {
			error = (err as Error).message;
		}
	});
</script>

<h2 class="mb-4 text-xl font-bold">Your Order History</h2>

{#if error}
	<p class="text-red-600">{error}</p>
{:else if orders.length === 0}
	<p class="text-gray-600">You have no past orders.</p>
{:else}
	<div class="grid grid-cols-1 gap-4">
		{#each orders as order}
			<div class="rounded bg-white p-4 shadow">
				<h2 class="text-lg font-semibold">Order #{order.ono}</h2>
				<p class="text-sm text-gray-600">Placed on: {new Date(order.created).toLocaleDateString()}</p>
				<p class="text-sm text-gray-600">
					Shipping to: {order.shipAddress}, {order.shipCity}, {order.shipZip}
				</p>
				<p class="font-bold text-blue-600">Total: {order.totalAmount.toFixed(2)} kr</p>
				<p class="text-gray-600">Items: {order.totalItems}</p>
				<a href="/order/{order.ono}" class="text-blue-600 hover:underline">View Details</a>
			</div>
		{/each}
	</div>
{/if}
