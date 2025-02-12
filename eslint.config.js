import js from '@eslint/js';
import svelte from 'eslint-plugin-svelte';
import globals from 'globals';
import { fileURLToPath } from 'node:url';
import ts from 'typescript-eslint';

const gitignorePath = fileURLToPath(new URL('./.gitignore', import.meta.url));

export default [
	// Add recommended JavaScript configurations
	js.configs.recommended,

	// Add TypeScript configurations
	ts.configs.recommended,

	// Add Svelte configurations
	...svelte.configs['flat/recommended'],

	// Prettier compatibility
	{
		extends: ['eslint-config-prettier']
	},

	// Global settings
	{
		languageOptions: {
			globals: {
				...globals.browser,
				...globals.node
			}
		}
	},

	// Svelte-specific settings
	{
		files: ['**/*.svelte'],
		languageOptions: {
			parserOptions: {
				ecmaVersion: 2020
			}
		}
	},

	// Ignore patterns
	{
		ignorePatterns: ['node_modules', 'dist', '.svelte-kit']
	}
];
