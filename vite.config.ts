import path from 'path'
import { defineConfig } from 'vite'
import cssInjectedByJsPlugin from 'vite-plugin-css-injected-by-js'
import dts from 'vite-plugin-dts'

export default defineConfig({
	build: {
		lib: {
			entry: path.resolve(__dirname, 'core/index.ts'),
			name: 'DicifyCore',
			formats: ['es', 'cjs'],
			fileName: format => `docify.${format}.js`,
		},
		rollupOptions: {
			external: ['react', '@tanstack/react-router'],
		},
	},
	plugins: [
		dts({
			include: ['core'],
		}),
		cssInjectedByJsPlugin(),
	],
})
