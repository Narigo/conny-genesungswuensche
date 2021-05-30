<script context="module">
	/**
	 * @type {import('@sveltejs/kit').Load}
	 */
	export async function load({ page, fetch, session, context }) {
		const url = `/wishes.json`;
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
	export let wishes: Wish[];
	console.log('got wishes', wishes);
</script>

<h1>Genesungswünsche</h1>

<section>
	{#each wishes as { name, image, wishes }}
		<article>
			<h2>{name}</h2>
			{#if image}
				<img src={image} />
			{/if}
			<div>{wishes}</div>
		</article>
	{/each}
</section>

<a href="/">Noch einen Eintrag?</a>
