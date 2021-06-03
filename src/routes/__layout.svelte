<div><slot /></div>

<style>
	@import '../../static/fonts/fonts.css';
	:global(html, body) {
		display: flex;
		flex-direction: column;
		font-family: 'Mansalva', -apple-system, BlinkMacSystemFont, 'Segoe UI', Roboto, Oxygen, Ubuntu,
			Cantarell, 'Open Sans', 'Helvetica Neue', sans-serif;
		margin: 0;
		min-height: 100%;
		padding: 0;
	}

	div {
		margin: 0 auto;
		max-width: 800px;
		width: 100%;
	}
</style>
