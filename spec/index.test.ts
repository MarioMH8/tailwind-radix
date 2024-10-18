import { expect, test } from 'bun:test';
import postcss from 'postcss';
import prettier from 'prettier';
import type { Config } from 'tailwindcss';
import tailwind from 'tailwindcss';

import plugin from '../src';
import type { TailwindRadixColorsOptions } from '../src/options';

async function run({
	config = {},
	content,
	options = {},
}: {
	config?: Omit<Config, 'content'>;
	content: string;
	options?: TailwindRadixColorsOptions;
}) {
	const configWithPlugin = {
		...config,
		content: [{ raw: content }],
		plugins: [plugin(options)],
	};

	const result = await postcss(tailwind(configWithPlugin)).process('@tailwind utilities; @tailwind components;', {
		from: undefined,
	});

	return result.css;
}

async function format(source: string) {
	return prettier.format(source, { parser: 'css' });
}

test('Given no option, both utility and semantic classes are generated', async () => {
	const result = await run({
		content: 'bg-slate-1 bg-slate-app',
	});

	expect(await format(result)).toMatchSnapshot();
});

test('Given option `disableSemantics`, semantic classes are not generated', async () => {
	const result = await run({
		content: 'bg-slate-1 bg-slate-app',
		options: { disableSemantics: true },
	});

	expect(await format(result)).toMatchSnapshot();
});

test('Given option `include`, only specified colors are generated', async () => {
	const result = await run({
		content: 'bg-slate-1 bg-blue-1',
		options: { include: ['slate'] },
	});

	expect(await format(result)).toMatchSnapshot();
});

test('Given option `exclude`, specified colors are not generated', async () => {
	const result = await run({
		content: 'bg-slate-1',
		options: { exclude: ['slate'] },
	});

	expect(await format(result)).toMatchSnapshot();
});

test('Given option `priority=radix-only`, Tailwind colors are preserved', async () => {
	const result = await run({
		content: 'bg-zinc-100',
		options: { priority: 'radix-first' },
	});

	expect(await format(result)).toMatchSnapshot();
});

test('Given option `priority=tailwind-first`, Tailwind colors take precedence', async () => {
	const result = await run({
		content: 'bg-red-100',
		options: { priority: 'tailwind-first' },
	});

	expect(await format(result)).toMatchSnapshot();
});

test('Given option `aliases`, conflicted color names are both preserved', async () => {
	const result = await run({
		content: 'bg-sun-9 bg-red-700',
		options: {
			aliases: {
				red: 'sun',
			},
			priority: 'radix-first',
		},
	});

	expect(await format(result)).toMatchSnapshot();
});

test('Utility classes are generated for custom colors', async () => {
	const result = await run({
		config: {
			theme: {
				extend: {
					colors: {
						custom1: '#123456',
						custom2: {
							1: '#654321',
						},
					},
				},
			},
		},
		content: 'bg-custom1 bg-custom2-1',
		options: {},
	});

	expect(await format(result)).toMatchSnapshot();
});

test('CSS classes are in correct shape', async () => {
	const result = await run({
		content:
			'bg-slate-app bg-slate-subtle bg-slate-ui bg-slate-ghost bg-slate-action border-slate-dim border-slate-normal divide-slate-dim divide-slate-normal text-slate-dim text-slate-normal',
	});

	expect(await format(result)).toMatchSnapshot();
});
