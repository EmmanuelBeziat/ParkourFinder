const env = JSON.parse(unescape(process.env.PACKAGE_JSON || '%7B%7D'))

export const api = {
	spots: 'https://rest.parkourfinder.com/spots',
	teams: 'https://rest.parkourfinder.com/teams',
	osm: 'https://nominatim.openstreetmap.org/reverse',
}

export const app = {
	name: env.name,
	version: env.version,
	description: env.description,
	author: env.author,
}
