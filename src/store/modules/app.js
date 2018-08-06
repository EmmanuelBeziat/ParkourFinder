const env = JSON.parse(unescape(process.env.PACKAGE_JSON || '%7B%7D'))

const state = {
	name: env.name,
	version: env.version
}

export default {
	namespaced: true,
	state,
}
