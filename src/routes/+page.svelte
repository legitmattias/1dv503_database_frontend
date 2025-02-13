<script lang="ts">
	import { user } from '$lib/stores';
</script>

<h1>Welcome to the Bookstore</h1>

<nav>
	<ul>
    {#if $user}
      <li><a href="/books" class="hover:underline">Browse Books</a></li>
      <li><a href="/order" class="hover:underline">Order History</a></li>
    {:else}
      <li><a href="/auth/login" class="hover:underline">Login</a></li>
      <li><a href="/auth/register" class="hover:underline">Register</a></li>
    {/if}
	</ul>
</nav>