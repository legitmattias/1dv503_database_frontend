<script lang="ts">
	import { feedback } from '$lib/stores';

	let message = '';
	let type: 'success' | 'error' = 'success';
	let visible = false;

	// Subscribe to feedback store
	feedback.subscribe((value) => {
		if (value) {
			message = value.message;
			type = value.type;
			visible = true;

			// Auto-hide
			setTimeout(() => (visible = false), 2000);
		}
	});
</script>

{#if visible}
	<div
		class="fixed left-1/2 top-5 w-80 -translate-x-1/2 transform rounded-lg bg-opacity-80 p-4 text-center opacity-100 shadow-lg transition-opacity duration-300 ease-in-out"
		class:border-red-500={type === 'error'}
		class:border-green-500={type === 'success'}
		class:bg-red-100={type === 'error'}
		class:bg-green-100={type === 'success'}
	>
		<p class="font-medium" class:text-red-700={type === 'error'} class:text-green-700={type === 'success'}>
			{message}
		</p>
	</div>
{/if}
