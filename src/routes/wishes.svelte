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
</script>

<h1>Genesungswünsche</h1>

<section>
	{#each wishes as { createdAt, image, name, wishes }}
		<article>
			<h2>{name}</h2>
			<span>{createdAt}</span>
			{#if image}
				<img src={image} alt={name} />
			{/if}
			<div>{wishes}</div>
		</article>
	{/each}
</section>

<a href=".">Noch einen Eintrag?</a>
