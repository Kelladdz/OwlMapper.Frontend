import { defineConfig } from 'vite';
import mkcert from 'vite-plugin-mkcert';
import { readFileSync } from 'fs';
import { resolve } from 'path';
import dns from 'dns';

dns.setDefaultResultOrder('verbatim');

export default defineConfig({
	server: {
		port: 8080,
		// https: {
		// 	key: readFileSync(resolve('ca.key')),
		// 	cert: readFileSync(resolve('cert.crt')), // Not needed for Vite 5+
		// },
		cors: {
			origin: 'https://localhost:7033',
			optionsSuccessStatus: 200,
		},
	},
	plugins: [mkcert()],
});
