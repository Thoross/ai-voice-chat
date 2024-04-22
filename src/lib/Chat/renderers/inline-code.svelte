<script lang="ts">
	export let raw: string;
</script>

<code class="rounded bg-gray-950 p-1 font-mono text-orange-500">
	{raw.replace(/`/g, '')}
</code>
