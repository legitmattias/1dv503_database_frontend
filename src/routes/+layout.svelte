<script lang="ts">
	export let data: { user: string | null };
</script>

<div class="flex min-h-screen flex-col bg-gray-100">
	<header class="bg-blue-600 p-4 text-white">
		<div class="container mx-auto flex items-center justify-between">
			<h1 class="text-lg font-bold">Assignment 2 - Bookstore</h1>
			{#if data.user}
				<div class="flex items-center gap-2">
					<p>Welcome, {data.user}!</p>
					<a href="/logout" class="text-sm text-red-200 hover:underline"
						>Logout</a
					>
				</div>
			{/if}
		</div>
    <div>
      <a href="/auth/login" class="text-sm text-red-200 hover:underline">LOGIN PAGE</a>
    </div>
	</header>

	<main class="container mx-auto flex-grow p-4">
		<slot />
	</main>
</div>
