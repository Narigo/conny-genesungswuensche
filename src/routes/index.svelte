<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/index.json`;
		const res = await fetch(url);

		if (res.ok) {
			return {
				props: {
					...(await res.json())
				}
			};
		}

		return {
			status: res.status,
			error: new Error(`Could not load ${url}`)
		};
	}
</script>

<script lang="ts">
	import { base } from '$app/paths';
	import { onMount } from 'svelte';
	export let wishes: Wish[];

	let wishHtml = [];

	onMount(() => {
		wishHtml.forEach((html) => {
			const randomDegree = Math.floor(Math.random() * 6) - 3;
			html.style = `transform: rotate(${randomDegree}deg);`;
		});
	});

	const verbs = ['kritzelte', 'meinte', 'sagte', 'schrieb', 'tippte', 'wünschte'];
	const adj = [
		'genüsslich',
		'mit Bedacht',
		'mit Liebe',
		'mit Sorgfalt',
		'schnell',
		'voller Respekt'
	];

	function randomOf(arr: string[]): string {
		return arr[Math.floor(Math.random() * arr.length)];
	}

	function wroteAt(name: string, at: string): string {
		return `${name} ${randomOf(verbs)} am ${at} ${randomOf(adj)}:`;
	}
</script>

<h1>Genesungswünsche</h1>

<section>
	{#each wishes as { createdAt, image, name, wishes }, index}
		<article bind:this={wishHtml[index]}>
			<div>{wroteAt(name, createdAt)}</div>
			{#if image}
				<img src={image} alt={name} />
			{/if}
			<div>{wishes}</div>
		</article>
	{/each}
</section>

<a href="{base}/create">Noch einen Eintrag?</a>

<style>
	article {
		background-color: #fff;
		box-shadow: 0 0 10px -5px #000;
		margin: 3em 0;
		padding: 1em;
	}
</style>
