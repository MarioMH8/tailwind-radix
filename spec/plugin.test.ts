import { expect, test } from 'bun:test';
import type { Config, CSSRuleObject } from 'tailwindcss/types/config';

import type { TailwindRadixColorsOptions } from '../src/options';
import createPlugin from '../src/plugin';

function mockColor(colorName: string) {
	const color: Record<string, string> = {};

	for (let scale = 1; scale <= 12; scale++) {
		color[scale] = colorName + scale.toString();
	}

	return color;
}

const DEFAULT_CONFIG = {
	prefix: '',
	theme: {
		colors: {
			black: 'black',
			current: 'currentColor',
			slate: mockColor('slate'),
			'slate-dark': mockColor('slate-dark'),
			transparent: 'transparent',
			white: 'white',
		},
	},
};

function run({
	config: localConfig = {},
	options = {},
}: {
	config?: Omit<Config, 'content'>;
	options?: TailwindRadixColorsOptions;
} = {}) {
	const registry: CSSRuleObject[] = [];

	const config = { ...DEFAULT_CONFIG, ...localConfig };
	const plugin = createPlugin(options);

	plugin({
		addComponents: (components: CSSRuleObject) => {
			registry.push(components);
		},

		// @ts-expect-error This works.
		config: (path?: string) => {
			if (path === 'prefix') {
				return config.prefix;
			}

			return config;
		},

		// @ts-expect-error This works.
		theme: (path?: string) => {
			if (path === 'colors') {
				return config.theme.colors;
			}

			return config.theme;
		},
	});

	return registry;
}

test('Given no option, All semantic classes are generated', () => {
	const registry = run();
	expect(registry).toEqual([
		{
			'.bg-slate-action': {
				'@apply bg-slate-4 hover:bg-slate-5 active:bg-slate-6 dark:bg-slate-dark-4 dark:hover:bg-slate-dark-5 dark:active:bg-slate-dark-6':
					{},
			},
			'.bg-slate-app': {
				'@apply bg-slate-1 dark:bg-slate-dark-1': {},
			},
			'.bg-slate-ghost': {
				'@apply bg-transparent hover:bg-slate-4 active:bg-slate-5 dark:bg-transparent dark:hover:bg-slate-dark-4 dark:active:bg-slate-dark-5':
					{},
			},
			'.bg-slate-solid': {
				'@apply bg-slate-9 hover:bg-slate-10 dark:bg-slate-dark-9 dark:hover:bg-slate-dark-10 text-slate-dark-12':
					{},
			},
			'.bg-slate-subtle': {
				'@apply bg-slate-2 dark:bg-slate-dark-2': {},
			},
			'.bg-slate-ui': {
				'@apply bg-slate-3 hover:bg-slate-4 active:bg-slate-5 dark:bg-slate-dark-3 dark:hover:bg-slate-dark-4 dark:active:bg-slate-dark-5':
					{},
			},
			'.border-slate-dim': {
				'@apply border-slate-6 dark:border-slate-dark-6': {},
			},
			'.border-slate-normal': {
				'@apply border-slate-7 hover:border-slate-8 dark:border-slate-dark-7 dark:hover:border-slate-dark-8':
					{},
			},
			'.divide-slate-dim': {
				'@apply divide-slate-6 dark:divide-slate-dark-6': {},
			},
			'.divide-slate-normal': {
				'@apply divide-slate-7 hover:divide-slate-8 dark:divide-slate-dark-7 dark:hover:divide-slate-dark-8':
					{},
			},
			'.text-slate-dim': {
				'@apply text-slate-11 dark:text-slate-dark-11': {},
			},
			'.text-slate-normal': {
				'@apply text-slate-12 dark:text-slate-dark-12': {},
			},
		},
	]);
});

test('Given option `disableSemantics`, no semantic classes are generated', () => {
	const registry = run({ options: { disableSemantics: true } });
	expect(registry).toEqual([]);
});

test('Prefix are respected', () => {
	const registry = run({ config: { prefix: 'tw-' } });
	expect(registry).toEqual([
		{
			'.bg-slate-action': {
				'@apply bg-slate-4 hover:bg-slate-5 active:bg-slate-6 tw-dark:bg-slate-dark-4 tw-dark:hover:bg-slate-dark-5 tw-dark:active:bg-slate-dark-6':
					{},
			},
			'.bg-slate-app': {
				'@apply bg-slate-1 tw-dark:bg-slate-dark-1': {},
			},
			'.bg-slate-ghost': {
				'@apply bg-transparent hover:bg-slate-4 active:bg-slate-5 tw-dark:bg-transparent tw-dark:hover:bg-slate-dark-4 tw-dark:active:bg-slate-dark-5':
					{},
			},
			'.bg-slate-solid': {
				'@apply bg-slate-9 hover:bg-slate-10 tw-dark:bg-slate-dark-9 tw-dark:hover:bg-slate-dark-10 text-slate-dark-12':
					{},
			},
			'.bg-slate-subtle': {
				'@apply bg-slate-2 tw-dark:bg-slate-dark-2': {},
			},
			'.bg-slate-ui': {
				'@apply bg-slate-3 hover:bg-slate-4 active:bg-slate-5 tw-dark:bg-slate-dark-3 tw-dark:hover:bg-slate-dark-4 tw-dark:active:bg-slate-dark-5':
					{},
			},
			'.border-slate-dim': {
				'@apply border-slate-6 tw-dark:border-slate-dark-6': {},
			},
			'.border-slate-normal': {
				'@apply border-slate-7 hover:border-slate-8 tw-dark:border-slate-dark-7 tw-dark:hover:border-slate-dark-8':
					{},
			},
			'.divide-slate-dim': {
				'@apply divide-slate-6 tw-dark:divide-slate-dark-6': {},
			},
			'.divide-slate-normal': {
				'@apply divide-slate-7 hover:divide-slate-8 tw-dark:divide-slate-dark-7 tw-dark:hover:divide-slate-dark-8':
					{},
			},
			'.text-slate-dim': {
				'@apply text-slate-11 tw-dark:text-slate-dark-11': {},
			},
			'.text-slate-normal': {
				'@apply text-slate-12 tw-dark:text-slate-dark-12': {},
			},
		},
	]);
});

test('Custom colors are ignored, if it does not have 12 scales', () => {
	const registry = run({
		config: {
			theme: {
				colors: {
					black: 'black',
					current: 'currentColor',
					custom: '#123456',
					transparent: 'transparent',
					white: 'white',
				},
			},
		},
	});
	expect(registry).toEqual([]);
});

test('Custom colors are ignored, if it has 12 scales, but no dark variant', () => {
	const registry = run({
		config: {
			theme: {
				colors: {
					black: 'black',
					current: 'currentColor',
					custom: mockColor('custom'),
					transparent: 'transparent',
					white: 'white',
				},
			},
		},
	});
	expect(registry).toEqual([]);
});

test('Custom colors are respected, if it has 12 scales and a dark variant', () => {
	const registry = run({
		config: {
			theme: {
				colors: {
					black: 'black',
					current: 'currentColor',
					custom: mockColor('custom'),
					'custom-dark': mockColor('custom-dark'),
					transparent: 'transparent',
					white: 'white',
				},
			},
		},
	});
	expect(registry).toEqual([
		{
			'.bg-custom-action': {
				'@apply bg-custom-4 hover:bg-custom-5 active:bg-custom-6 dark:bg-custom-dark-4 dark:hover:bg-custom-dark-5 dark:active:bg-custom-dark-6':
					{},
			},
			'.bg-custom-app': {
				'@apply bg-custom-1 dark:bg-custom-dark-1': {},
			},
			'.bg-custom-ghost': {
				'@apply bg-transparent hover:bg-custom-4 active:bg-custom-5 dark:bg-transparent dark:hover:bg-custom-dark-4 dark:active:bg-custom-dark-5':
					{},
			},
			'.bg-custom-solid': {
				'@apply bg-custom-9 hover:bg-custom-10 dark:bg-custom-dark-9 dark:hover:bg-custom-dark-10': {},
			},
			'.bg-custom-subtle': {
				'@apply bg-custom-2 dark:bg-custom-dark-2': {},
			},
			'.bg-custom-ui': {
				'@apply bg-custom-3 hover:bg-custom-4 active:bg-custom-5 dark:bg-custom-dark-3 dark:hover:bg-custom-dark-4 dark:active:bg-custom-dark-5':
					{},
			},
			'.border-custom-dim': {
				'@apply border-custom-6 dark:border-custom-dark-6': {},
			},
			'.border-custom-normal': {
				'@apply border-custom-7 hover:border-custom-8 dark:border-custom-dark-7 dark:hover:border-custom-dark-8':
					{},
			},
			'.divide-custom-dim': {
				'@apply divide-custom-6 dark:divide-custom-dark-6': {},
			},
			'.divide-custom-normal': {
				'@apply divide-custom-7 hover:divide-custom-8 dark:divide-custom-dark-7 dark:hover:divide-custom-dark-8':
					{},
			},
			'.text-custom-dim': {
				'@apply text-custom-11 dark:text-custom-dark-11': {},
			},
			'.text-custom-normal': {
				'@apply text-custom-12 dark:text-custom-dark-12': {},
			},
		},
	]);
});
