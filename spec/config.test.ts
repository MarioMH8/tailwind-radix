/* eslint-disable typescript/no-unsafe-assignment */
import { describe, expect, test } from 'bun:test';

import createConfig from '../src/config';

const radixColorShape = {
	1: expect.any(String),
	2: expect.any(String),
	3: expect.any(String),
	4: expect.any(String),
	5: expect.any(String),
	6: expect.any(String),
	7: expect.any(String),
	8: expect.any(String),
	9: expect.any(String),
	10: expect.any(String),
	11: expect.any(String),
	12: expect.any(String),
};

const tailwindColorShape = {
	50: expect.any(String),
	100: expect.any(String),
	200: expect.any(String),
	300: expect.any(String),
	400: expect.any(String),
	500: expect.any(String),
	600: expect.any(String),
	700: expect.any(String),
	800: expect.any(String),
	900: expect.any(String),
	950: expect.any(String),
};

describe('When `priority=no-tailwind`', () => {
	test('Given neither `include` nor `exclude`', () => {
		const config = createConfig();
		const colors = config.theme?.colors;

		expect(colors).toHaveProperty('red', radixColorShape);
		expect(colors).toHaveProperty('red-p3', radixColorShape);
		expect(colors).toHaveProperty('red-a', radixColorShape);
		expect(colors).toHaveProperty('red-p3-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('red-dark-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3-a', radixColorShape);

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-a', radixColorShape);
		expect(colors).toHaveProperty('sage-p3-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3-a', radixColorShape);

		expect(colors).not.toHaveProperty('zinc');

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given only `include`', () => {
		const config = createConfig({
			include: ['red', 'sage', 'zinc'],
		});
		const colors = config.theme?.colors;

		expect(colors).toHaveProperty('red', radixColorShape);
		expect(colors).toHaveProperty('red-dark', radixColorShape);
		expect(colors).not.toHaveProperty('red-p3');
		expect(colors).not.toHaveProperty('red-a');
		expect(colors).not.toHaveProperty('red-p3-a');
		expect(colors).not.toHaveProperty('red-dark-p3');
		expect(colors).not.toHaveProperty('red-dark-a');
		expect(colors).not.toHaveProperty('red-dark-p3-a');

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).not.toHaveProperty('sage-p3');
		expect(colors).not.toHaveProperty('sage-a');
		expect(colors).not.toHaveProperty('sage-p3-a');
		expect(colors).not.toHaveProperty('sage-dark-p3');
		expect(colors).not.toHaveProperty('sage-dark-a');
		expect(colors).not.toHaveProperty('sage-dark-p3-a');

		expect(colors).not.toHaveProperty('zinc');

		expect(colors).not.toHaveProperty('green');

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given only `exclude`', () => {
		const config = createConfig({
			exclude: ['red', 'sage', 'zinc'],
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).not.toHaveProperty('redd-ark');
		expect(colors).toHaveProperty('red-p3', radixColorShape);
		expect(colors).toHaveProperty('red-a', radixColorShape);
		expect(colors).toHaveProperty('red-p3-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('red-dark-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3-a', radixColorShape);

		expect(colors).not.toHaveProperty('sage');
		expect(colors).not.toHaveProperty('sage-dark');
		expect(colors).toHaveProperty('sage-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-a', radixColorShape);
		expect(colors).toHaveProperty('sage-p3-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3-a', radixColorShape);

		expect(colors).not.toHaveProperty('zinc');

		expect(colors).toHaveProperty('green', radixColorShape);
		expect(colors).toHaveProperty('green-p3', radixColorShape);
		expect(colors).toHaveProperty('green-a', radixColorShape);
		expect(colors).toHaveProperty('green-p3-a', radixColorShape);
		expect(colors).toHaveProperty('green-dark', radixColorShape);
		expect(colors).toHaveProperty('green-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('green-dark-a', radixColorShape);
		expect(colors).toHaveProperty('green-dark-p3-a', radixColorShape);

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given both `include` and `exclude`', () => {
		const config = createConfig({
			exclude: ['red'],
			include: ['red', 'green', 'sage', 'zinc'],
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).not.toHaveProperty('red-dark');
		expect(colors).not.toHaveProperty('red-p3');
		expect(colors).not.toHaveProperty('red-a');
		expect(colors).not.toHaveProperty('red-p3-a');
		expect(colors).not.toHaveProperty('red-dark-p3');
		expect(colors).not.toHaveProperty('red-dark-a');
		expect(colors).not.toHaveProperty('red-dark-p3-a');

		expect(colors).toHaveProperty('green', radixColorShape);
		expect(colors).toHaveProperty('green-dark', radixColorShape);
		expect(colors).not.toHaveProperty('green-p3');
		expect(colors).not.toHaveProperty('green-a');
		expect(colors).not.toHaveProperty('green-p3-a');
		expect(colors).not.toHaveProperty('green-dark-p3');
		expect(colors).not.toHaveProperty('green-dark-a');
		expect(colors).not.toHaveProperty('green-dark-p3-a');

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).not.toHaveProperty('sage-p3');
		expect(colors).not.toHaveProperty('sage-a');
		expect(colors).not.toHaveProperty('sage-p3-a');
		expect(colors).not.toHaveProperty('sage-dark-p3');
		expect(colors).not.toHaveProperty('sage-dark-a');
		expect(colors).not.toHaveProperty('sage-dark-p3-a');

		expect(colors).not.toHaveProperty('zinc');

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});
});

describe('When `priority=radix-first`', () => {
	test('Given neither `include` nor `exclude`', () => {
		const config = createConfig({
			priority: 'radix-first',
		});
		const colors = config.theme?.colors;

		expect(colors).toHaveProperty('red', radixColorShape);
		expect(colors).toHaveProperty('red-p3', radixColorShape);
		expect(colors).toHaveProperty('red-a', radixColorShape);
		expect(colors).toHaveProperty('red-p3-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('red-dark-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3-a', radixColorShape);

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-a', radixColorShape);
		expect(colors).toHaveProperty('sage-p3-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3-a', radixColorShape);

		expect(colors).toHaveProperty('zinc', tailwindColorShape);

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given only `include`', () => {
		const config = createConfig({
			include: ['red', 'sage', 'zinc'],
			priority: 'radix-first',
		});
		const colors = config.theme?.colors;

		expect(colors).toHaveProperty('red', radixColorShape);
		expect(colors).toHaveProperty('red-dark', radixColorShape);
		expect(colors).not.toHaveProperty('red-p3');
		expect(colors).not.toHaveProperty('red-a');
		expect(colors).not.toHaveProperty('red-p3-a');
		expect(colors).not.toHaveProperty('red-dark-p3');
		expect(colors).not.toHaveProperty('red-dark-a');
		expect(colors).not.toHaveProperty('red-dark-p3-a');

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).not.toHaveProperty('sage-p3');
		expect(colors).not.toHaveProperty('sage-a');
		expect(colors).not.toHaveProperty('sage-p3-a');
		expect(colors).not.toHaveProperty('sage-dark-p3');
		expect(colors).not.toHaveProperty('sage-dark-a');
		expect(colors).not.toHaveProperty('sage-dark-p3-a');

		expect(colors).toHaveProperty('zinc', tailwindColorShape);

		expect(colors).not.toHaveProperty('green');

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given only `exclude`', () => {
		const config = createConfig({
			exclude: ['red', 'sage', 'zinc'],
			priority: 'radix-first',
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).not.toHaveProperty('red-dark');
		expect(colors).toHaveProperty('red-p3', radixColorShape);
		expect(colors).toHaveProperty('red-a', radixColorShape);
		expect(colors).toHaveProperty('red-p3-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('red-dark-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3-a', radixColorShape);

		expect(colors).not.toHaveProperty('sage');
		expect(colors).not.toHaveProperty('sage-dark');
		expect(colors).toHaveProperty('sage-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-a', radixColorShape);
		expect(colors).toHaveProperty('sage-p3-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3-a', radixColorShape);

		expect(colors).not.toHaveProperty('zinc');

		expect(colors).toHaveProperty('green', radixColorShape);
		expect(colors).toHaveProperty('green-p3', radixColorShape);
		expect(colors).toHaveProperty('green-a', radixColorShape);
		expect(colors).toHaveProperty('green-p3-a', radixColorShape);
		expect(colors).toHaveProperty('green-dark', radixColorShape);
		expect(colors).toHaveProperty('green-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('green-dark-a', radixColorShape);
		expect(colors).toHaveProperty('green-dark-p3-a', radixColorShape);

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given both `include` and `exclude`', () => {
		const config = createConfig({
			exclude: ['red'],
			include: ['red', 'green', 'sage', 'zinc'],
			priority: 'radix-first',
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).not.toHaveProperty('red-dark');
		expect(colors).not.toHaveProperty('red-p3');
		expect(colors).not.toHaveProperty('red-a');
		expect(colors).not.toHaveProperty('red-p3-a');
		expect(colors).not.toHaveProperty('red-dark-p3');
		expect(colors).not.toHaveProperty('red-dark-a');
		expect(colors).not.toHaveProperty('red-dark-p3-a');

		expect(colors).toHaveProperty('green', radixColorShape);
		expect(colors).toHaveProperty('green-dark', radixColorShape);
		expect(colors).not.toHaveProperty('green-p3');
		expect(colors).not.toHaveProperty('green-a');
		expect(colors).not.toHaveProperty('green-p3-a');
		expect(colors).not.toHaveProperty('green-dark-p3');
		expect(colors).not.toHaveProperty('green-dark-a');
		expect(colors).not.toHaveProperty('green-dark-p3-a');

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).not.toHaveProperty('sage-p3');
		expect(colors).not.toHaveProperty('sage-a');
		expect(colors).not.toHaveProperty('sage-p3-a');
		expect(colors).not.toHaveProperty('sage-dark-p3');
		expect(colors).not.toHaveProperty('sage-dark-a');
		expect(colors).not.toHaveProperty('sage-dark-p3-a');

		expect(colors).toHaveProperty('zinc', tailwindColorShape);

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});
});

describe('When `priority=tailwind-first`', () => {
	test('Given neither `include` nor `exclude`', () => {
		const config = createConfig({
			priority: 'tailwind-first',
		});
		const colors = config.theme?.colors;

		expect(colors).toHaveProperty('red', tailwindColorShape);
		expect(colors).toHaveProperty('red-p3', radixColorShape);
		expect(colors).toHaveProperty('red-a', radixColorShape);
		expect(colors).toHaveProperty('red-p3-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('red-dark-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3-a', radixColorShape);

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-a', radixColorShape);
		expect(colors).toHaveProperty('sage-p3-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3-a', radixColorShape);

		expect(colors).toHaveProperty('zinc', tailwindColorShape);

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given only `include`', () => {
		const config = createConfig({
			include: ['red', 'sage', 'zinc'],
			priority: 'tailwind-first',
		});
		const colors = config.theme?.colors;

		expect(colors).toHaveProperty('red', tailwindColorShape);
		expect(colors).toHaveProperty('red-dark', radixColorShape);
		expect(colors).not.toHaveProperty('red-p3');
		expect(colors).not.toHaveProperty('red-a');
		expect(colors).not.toHaveProperty('red-p3-a');
		expect(colors).not.toHaveProperty('red-dark-p3');
		expect(colors).not.toHaveProperty('red-dark-a');
		expect(colors).not.toHaveProperty('red-dark-p3-a');

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).not.toHaveProperty('sage-p3');
		expect(colors).not.toHaveProperty('sage-a');
		expect(colors).not.toHaveProperty('sage-p3-a');
		expect(colors).not.toHaveProperty('sage-dark-p3');
		expect(colors).not.toHaveProperty('sage-dark-a');
		expect(colors).not.toHaveProperty('sage-dark-p3-a');

		expect(colors).toHaveProperty('zinc', tailwindColorShape);

		expect(colors).not.toHaveProperty('green');

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given only `exclude`', () => {
		const config = createConfig({
			exclude: ['red', 'sage', 'zinc'],
			priority: 'tailwind-first',
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).not.toHaveProperty('red-dark');
		expect(colors).toHaveProperty('red-p3', radixColorShape);
		expect(colors).toHaveProperty('red-a', radixColorShape);
		expect(colors).toHaveProperty('red-p3-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('red-dark-a', radixColorShape);
		expect(colors).toHaveProperty('red-dark-p3-a', radixColorShape);

		expect(colors).not.toHaveProperty('sage');
		expect(colors).not.toHaveProperty('sage-dark');
		expect(colors).toHaveProperty('sage-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-a', radixColorShape);
		expect(colors).toHaveProperty('sage-p3-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-a', radixColorShape);
		expect(colors).toHaveProperty('sage-dark-p3-a', radixColorShape);

		expect(colors).not.toHaveProperty('zinc');

		expect(colors).toHaveProperty('green', tailwindColorShape);
		expect(colors).toHaveProperty('green-p3', radixColorShape);
		expect(colors).toHaveProperty('green-a', radixColorShape);
		expect(colors).toHaveProperty('green-p3-a', radixColorShape);
		expect(colors).toHaveProperty('green-dark', radixColorShape);
		expect(colors).toHaveProperty('green-dark-p3', radixColorShape);
		expect(colors).toHaveProperty('green-dark-a', radixColorShape);
		expect(colors).toHaveProperty('green-dark-p3-a', radixColorShape);

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('Given both `include` and `exclude`', () => {
		const config = createConfig({
			exclude: ['red'],
			include: ['red', 'green', 'sage', 'zinc'],
			priority: 'tailwind-first',
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).not.toHaveProperty('red-dark');
		expect(colors).not.toHaveProperty('red-p3');
		expect(colors).not.toHaveProperty('red-a');
		expect(colors).not.toHaveProperty('red-p3-a');
		expect(colors).not.toHaveProperty('red-dark-p3');
		expect(colors).not.toHaveProperty('red-dark-a');
		expect(colors).not.toHaveProperty('red-dark-p3-a');

		expect(colors).toHaveProperty('green', tailwindColorShape);
		expect(colors).toHaveProperty('green-dark', radixColorShape);
		expect(colors).not.toHaveProperty('green-p3');
		expect(colors).not.toHaveProperty('green-a');
		expect(colors).not.toHaveProperty('green-p3-a');
		expect(colors).not.toHaveProperty('green-dark-p3');
		expect(colors).not.toHaveProperty('green-dark-a');
		expect(colors).not.toHaveProperty('green-dark-p3-a');

		expect(colors).toHaveProperty('sage', radixColorShape);
		expect(colors).toHaveProperty('sage-dark', radixColorShape);
		expect(colors).not.toHaveProperty('sage-p3');
		expect(colors).not.toHaveProperty('sage-a');
		expect(colors).not.toHaveProperty('sage-p3-a');
		expect(colors).not.toHaveProperty('sage-dark-p3');
		expect(colors).not.toHaveProperty('sage-dark-a');
		expect(colors).not.toHaveProperty('sage-dark-p3-a');

		expect(colors).toHaveProperty('zinc', tailwindColorShape);

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});
});

describe('Given `aliases`', () => {
	test('Radix color names are aliased', () => {
		const config = createConfig({
			aliases: {
				red: 'sun',
			},
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).toHaveProperty('sun', radixColorShape);

		expect(colors).toHaveProperty('inherit', 'inherit');
		expect(colors).toHaveProperty('transparent', 'transparent');
		expect(colors).toHaveProperty('current', 'currentColor');
		expect(colors).toHaveProperty('black', '#000');
		expect(colors).toHaveProperty('white', '#fff');
	});

	test('`include` respect aliases', () => {
		const config = createConfig({
			aliases: {
				green: 'grass',
				red: 'sun',
			},
			include: ['sun', 'green'],
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).toHaveProperty('sun', radixColorShape);

		expect(colors).not.toHaveProperty('green');
		expect(colors).not.toHaveProperty('grass');

		expect(colors).toHaveProperty('inherit');
		expect(colors).toHaveProperty('transparent');
		expect(colors).toHaveProperty('current');
		expect(colors).toHaveProperty('black');
		expect(colors).toHaveProperty('white');
	});

	test('`exclude` respect aliases', () => {
		const config = createConfig({
			aliases: {
				green: 'grass',
				red: 'sun',
			},
			exclude: ['sun', 'green'],
		});
		const colors = config.theme?.colors;

		expect(colors).not.toHaveProperty('red');
		expect(colors).not.toHaveProperty('sun');

		expect(colors).not.toHaveProperty('green');
		expect(colors).toHaveProperty('grass', radixColorShape);

		expect(colors).toHaveProperty('inherit');
		expect(colors).toHaveProperty('transparent');
		expect(colors).toHaveProperty('current');
		expect(colors).toHaveProperty('black');
		expect(colors).toHaveProperty('white');
	});
});
