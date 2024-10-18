import { describe, expect, test } from 'bun:test';

import { buildColorName, parseColorName } from '../src/colors';

describe('Parse color name', () => {
	test('base', () => {
		const result = parseColorName('blue');
		expect(result).toEqual({
			alpha: false,
			base: 'blue',
			dark: false,
			p3: false,
		});
	});

	test('P3', () => {
		const result = parseColorName('blue-p3');
		expect(result).toEqual({
			alpha: false,
			base: 'blue',
			dark: false,
			p3: true,
		});
	});

	test('alpha', () => {
		const result = parseColorName('blue-a');
		expect(result).toEqual({
			alpha: true,
			base: 'blue',
			dark: false,
			p3: false,
		});
	});

	test('P3 alpha', () => {
		const result = parseColorName('blue-p3-a');
		expect(result).toEqual({
			alpha: true,
			base: 'blue',
			dark: false,
			p3: true,
		});
	});

	test('dark', () => {
		const result = parseColorName('blue-dark');
		expect(result).toEqual({
			alpha: false,
			base: 'blue',
			dark: true,
			p3: false,
		});
	});

	test('dark P3', () => {
		const result = parseColorName('blue-dark-p3');
		expect(result).toEqual({
			alpha: false,
			base: 'blue',
			dark: true,
			p3: true,
		});
	});

	test('dark alpha', () => {
		const result = parseColorName('blue-dark-a');
		expect(result).toEqual({
			alpha: true,
			base: 'blue',
			dark: true,
			p3: false,
		});
	});

	test('dark P3 alpha', () => {
		const result = parseColorName('blue-dark-p3-a');
		expect(result).toEqual({
			alpha: true,
			base: 'blue',
			dark: true,
			p3: true,
		});
	});

	test('invalid', () => {
		const result = parseColorName('lorem-ipsum');
		expect(result).toEqual({
			alpha: false,
			base: 'lorem-ipsum',
			dark: false,
			p3: false,
		});
	});

	test('undefined', () => {
		// @ts-expect-error test undefined
		const result = parseColorName();
		expect(result).toEqual({
			alpha: false,
			base: '',
			dark: false,
			p3: false,
		});
	});

	test('empty', () => {
		const result = parseColorName('');
		expect(result).toEqual({
			alpha: false,
			base: '',
			dark: false,
			p3: false,
		});
	});
});

describe('Build color name', () => {
	test('base', () => {
		const result = buildColorName({
			alpha: false,
			base: 'blue',
			dark: false,
			p3: false,
		});
		expect(result).toEqual('blue');
	});

	test('P3', () => {
		const result = buildColorName({
			alpha: false,
			base: 'blue',
			dark: false,
			p3: true,
		});
		expect(result).toEqual('blue-p3');
	});

	test('alpha', () => {
		const result = buildColorName({
			alpha: true,
			base: 'blue',
			dark: false,
			p3: false,
		});
		expect(result).toEqual('blue-a');
	});

	test('P3 alpha', () => {
		const result = buildColorName({
			alpha: true,
			base: 'blue',
			dark: false,
			p3: true,
		});
		expect(result).toEqual('blue-p3-a');
	});

	test('dark', () => {
		const result = buildColorName({
			alpha: false,
			base: 'blue',
			dark: true,
			p3: false,
		});
		expect(result).toEqual('blue-dark');
	});

	test('dark P3', () => {
		const result = buildColorName({
			alpha: false,
			base: 'blue',
			dark: true,
			p3: true,
		});
		expect(result).toEqual('blue-dark-p3');
	});

	test('dark alpha', () => {
		const result = buildColorName({
			alpha: true,
			base: 'blue',
			dark: true,
			p3: false,
		});
		expect(result).toEqual('blue-dark-a');
	});

	test('dark P3 alpha', () => {
		const result = buildColorName({
			alpha: true,
			base: 'blue',
			dark: true,
			p3: true,
		});
		expect(result).toEqual('blue-dark-p3-a');
	});
});
