<script lang="ts">
	export let data: { order: Order };

	type Order = {
		orderId: number;
		created: string;
		shippingAddress: {
			name: string;
			address: string;
			city: string;
			zip: string;
		};
		items: { isbn: string; title: string; price: number; qty: number; total: number }[];
		totalAmount: number;
	};
</script>

<h1 class="text-xl font-bold">Order Confirmation</h1>

{#if data.order}
	<div class="rounded bg-white p-4 shadow">
		<h2 class="text-lg font-semibold">Invoice for Order No. {data.order.orderId}</h2>
		<p class="text-sm">Date: {new Date(data.order.created).toLocaleDateString()}</p>

		<h3 class="text-md mt-4 font-semibold">Shipping Address</h3>
		<p>{data.order.shippingAddress.name}</p>
		<p>{data.order.shippingAddress.address}</p>
		<p>{data.order.shippingAddress.city}, {data.order.shippingAddress.zip}</p>

		<hr class="my-4" />

		<table class="w-full border-collapse border border-gray-300">
			<thead>
				<tr class="bg-gray-200">
					<th class="border px-2 py-1">ISBN</th>
					<th class="border px-2 py-1">Title</th>
					<th class="border px-2 py-1">Price</th>
					<th class="border px-2 py-1">Qty</th>
					<th class="border px-2 py-1">Total</th>
				</tr>
			</thead>
			<tbody>
				{#each data.order.items as item}
					<tr>
						<td class="border px-2 py-1">{item.isbn}</td>
						<td class="border px-2 py-1">{item.title}</td>
						<td class="border px-2 py-1">{item.price.toFixed(2)} kr</td>
						<td class="border px-2 py-1">{item.qty}</td>
						<td class="border px-2 py-1">{item.total.toFixed(2)} kr</td>
					</tr>
				{/each}
			</tbody>
		</table>

		<h3 class="mt-4 text-lg font-bold">Total: {data.order.totalAmount.toFixed(2)} kr</h3>
	</div>
{:else}
	<p>Loading order details...</p>
{/if}
