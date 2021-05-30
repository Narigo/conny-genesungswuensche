import { retrieveAllWishes } from '$lib/airtable/airtable';
import type { RequestHandler } from '@sveltejs/kit';

export const get: RequestHandler = async () => {
	const wishes = await retrieveAllWishes();
	return {
		body: {
			wishes
		}
	};
};
