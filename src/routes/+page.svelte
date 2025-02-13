<script lang="ts">
	import { user } from '$lib/stores';
</script>

<div class="flex min-h-screen flex-col items-center bg-gray-100 p-6 py-20 text-center">
	<h1 class="text-4xl font-bold text-gray-800">Welcome to The Bookstore</h1>
	<p class="mt-2 text-lg text-gray-600">Your gateway to thousands of books!</p>

	<!-- Ensure buttons are centered properly -->
	<nav class="mt-8 w-full max-w-3xl">
		<div class="grid gap-4 sm:grid-cols-2 md:grid-cols-3">
			{#if $user}
				<a
					href="/books"
					class="group flex items-center justify-center rounded-lg border-2 border-blue-600 bg-blue-50 bg-opacity-50 p-6 text-lg font-semibold text-blue-800 transition hover:bg-blue-600 hover:text-white"
				>
					Browse Books
				</a>
				<a
					href="/order"
					class="group flex items-center justify-center rounded-lg border-2 border-green-600 bg-green-50 bg-opacity-50 p-6 text-lg font-semibold text-green-800 transition hover:bg-green-600 hover:text-white"
				>
					Order History
				</a>
				<a
					href="/cart"
					class="group flex items-center justify-center rounded-lg border-2 border-yellow-600 bg-yellow-50 bg-opacity-50 p-6 text-lg font-semibold text-yellow-800 transition hover:bg-yellow-600 hover:text-white"
				>
					My Cart
				</a>
			{:else}
				<!-- Center login and register buttons -->
				<div class="col-span-full flex justify-center gap-4">
					<a
						href="/auth/login"
						class="group flex w-48 items-center justify-center rounded-lg border-2 border-red-600 bg-red-50 bg-opacity-50 p-6 text-lg font-semibold text-red-800 transition hover:bg-red-600 hover:text-white"
					>
						Login
					</a>
					<a
						href="/auth/register"
						class="group flex w-48 items-center justify-center rounded-lg border-2 border-purple-600 bg-purple-50 bg-opacity-50 p-6 text-lg font-semibold text-purple-800 transition hover:bg-purple-600 hover:text-white"
					>
						Register
					</a>
				</div>
			{/if}
		</div>
	</nav>
</div>
