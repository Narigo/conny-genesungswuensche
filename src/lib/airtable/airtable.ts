import Airtable, { Attachment } from 'airtable';

const apiKey = import.meta.env.VITE_AIRTABLE_API_TOKEN as string;
const apiBase = import.meta.env.VITE_AIRTABLE_BASE as string;

export async function retrieveAllWishes(): Promise<Wish[]> {
	return new Promise((resolve, reject) => {
		let wishes: Wish[] = [];
		const base = new Airtable({ apiKey }).base(apiBase);
		base('get_well_soon')
			.select({
				view: 'database',
				fields: ['name', 'image', 'wishes'],
				filterByFormula: '{publish}'
			})
			.eachPage(
				(records, fetchNextPage) => {
					wishes = [
						...wishes,
						...records.map((record) => {
							const image =
								(record.get('image') as readonly Attachment[]).length > 0
									? record.get('image')[0].url
									: null;
							return {
								name: record.get('name') as string,
								image,
								wishes: record.get('wishes') as string
							};
						})
					];
					fetchNextPage();
				},
				(err) => {
					if (err) {
						return reject(err);
					}
					return resolve(wishes);
				}
			);
	});
}
