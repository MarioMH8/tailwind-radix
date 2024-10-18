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
	const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity));
    }
    .bg-slate-app {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity));
    }
    @media (prefers-color-scheme: dark) {
      .bg-slate-app {
        --tw-bg-opacity: 1;
        background-color: rgb(17 17 19 / var(--tw-bg-opacity));
      }
    }
  `;

	const result = await run({
		content: 'bg-slate-1 bg-slate-app',
	});

	expect(await format(result)).toEqual(await format(expected));
});

test('Given option `disableSemantics`, semantic classes are not generated', async () => {
	const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity))
    }
  `;

	const result = await run({
		content: 'bg-slate-1 bg-slate-app',
		options: { disableSemantics: true },
	});

	expect(await format(result)).toEqual(await format(expected));
});

test('Given option `include`, only specified colors are generated', async () => {
	const expected = `
    .bg-slate-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(252 252 253 / var(--tw-bg-opacity));
    }
  `;

	const result = await run({
		content: 'bg-slate-1 bg-blue-1',
		options: { include: ['slate'] },
	});

	expect(await format(result)).toEqual(await format(expected));
});

test('Given option `exclude`, specified colors are not generated', async () => {
	const expected = '';

	const result = await run({
		content: 'bg-slate-1',
		options: { exclude: ['slate'] },
	});

	expect(await format(result)).toEqual(await format(expected));
});

test('Given option `priority=radix-only`, Tailwind colors are preserved', async () => {
	const expected = `
    .bg-zinc-100 {
      --tw-bg-opacity: 1;
      background-color: rgb(244 244 245 / var(--tw-bg-opacity));
    }
  `;

	const result = await run({
		content: 'bg-zinc-100',
		options: { priority: 'radix-first' },
	});

	expect(await format(result)).toEqual(await format(expected));
});

test('Given option `priority=tailwind-first`, Tailwind colors take precedence', async () => {
	const expected = `
    .bg-red-100 {
      --tw-bg-opacity: 1;
      background-color: rgb(254 226 226 / var(--tw-bg-opacity));
    }
  `;

	const result = await run({
		content: 'bg-red-100',
		options: { priority: 'tailwind-first' },
	});

	expect(await format(result)).toEqual(await format(expected));
});

test('Given option `aliases`, conflicted color names are both preserved', async () => {
	const expected = `
    .bg-red-700 {
      --tw-bg-opacity: 1;
      background-color: rgb(185 28 28 / var(--tw-bg-opacity));
    }
    .bg-sun-9 {
      --tw-bg-opacity: 1;
      background-color: rgb(229 72 77 / var(--tw-bg-opacity));
    }
  `;

	const result = await run({
		content: 'bg-sun-9 bg-red-700',
		options: {
			aliases: {
				red: 'sun',
			},
			priority: 'radix-first',
		},
	});

	expect(await format(result)).toEqual(await format(expected));
});

test('Utility classes are generated for custom colors', async () => {
	const expected = `
    .bg-custom1 {
      --tw-bg-opacity: 1;
      background-color: rgb(18 52 86 / var(--tw-bg-opacity));
    }
    .bg-custom2-1 {
      --tw-bg-opacity: 1;
      background-color: rgb(101 67 33 / var(--tw-bg-opacity));
    }
  `;

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

	expect(await format(result)).toEqual(await format(expected));
});

test('CSS classes are in correct shape', async () => {
	const result = await run({
		content:
			'bg-slate-app bg-slate-subtle bg-slate-ui bg-slate-ghost bg-slate-action border-slate-dim border-slate-normal divide-slate-dim divide-slate-normal text-slate-dim text-slate-normal',
	});

	expect(await format(result)).toMatchSnapshot();
});
