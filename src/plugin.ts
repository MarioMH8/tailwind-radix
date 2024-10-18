import type { CSSRuleObject, PluginAPI, PluginCreator, PrefixConfig } from 'tailwindcss/types/config';

import type { Color, ColorName, Palette } from './colors';
import { buildColorName, parseColorName } from './colors';
import type { TailwindRadixColorsOptions } from './options';

/**
 * Generate semantic classes, via Tailwind's `addComponents` API.
 *
 * @see https://tailwindcss.com/docs/plugins#adding-components
 */
function generateSemanticClasses(api: PluginAPI) {
	const palette = api.theme<Palette>('colors');
	const prefix = api.config<PrefixConfig>('prefix');

	for (const [colorName, color] of Object.entries(palette)) {
		if (parseColorName(colorName).dark || !hasAllScales(color)) {
			continue;
		}

		const { darkColorName, foregroundColorName } = findFamily(colorName);

		const darkColor = palette[darkColorName];

		if (!darkColor || !hasAllScales(darkColor)) {
			continue;
		}

		const foregroundColor = palette[foregroundColorName];
		const shouldApplyForeground = foregroundColor && hasAllScales(foregroundColor);

		api.addComponents({
			[`.bg-${colorName}-action`]: apply(
				`bg-${colorName}-4`,
				`hover:bg-${colorName}-5`,
				`active:bg-${colorName}-6`,
				`${prefix}dark:bg-${darkColorName}-4`,
				`${prefix}dark:hover:bg-${darkColorName}-5`,
				`${prefix}dark:active:bg-${darkColorName}-6`
			),
			[`.bg-${colorName}-app`]: apply(`bg-${colorName}-1`, `${prefix}dark:bg-${darkColorName}-1`),
			[`.bg-${colorName}-ghost`]: apply(
				`bg-transparent`,
				`hover:bg-${colorName}-4`,
				`active:bg-${colorName}-5`,
				`${prefix}dark:bg-transparent`,
				`${prefix}dark:hover:bg-${darkColorName}-4`,
				`${prefix}dark:active:bg-${darkColorName}-5`
			),
			[`.bg-${colorName}-solid`]: apply(
				`bg-${colorName}-9`,
				`hover:bg-${colorName}-10`,
				`${prefix}dark:bg-${darkColorName}-9`,
				`${prefix}dark:hover:bg-${darkColorName}-10`,
				shouldApplyForeground ? `text-${foregroundColorName}-12` : ''
			),
			[`.bg-${colorName}-subtle`]: apply(`bg-${colorName}-2`, `${prefix}dark:bg-${darkColorName}-2`),
			[`.bg-${colorName}-ui`]: apply(
				`bg-${colorName}-3`,
				`hover:bg-${colorName}-4`,
				`active:bg-${colorName}-5`,
				`${prefix}dark:bg-${darkColorName}-3`,
				`${prefix}dark:hover:bg-${darkColorName}-4`,
				`${prefix}dark:active:bg-${darkColorName}-5`
			),
			[`.border-${colorName}-dim`]: apply(`border-${colorName}-6`, `${prefix}dark:border-${darkColorName}-6`),
			[`.border-${colorName}-normal`]: apply(
				`border-${colorName}-7`,
				`hover:border-${colorName}-8`,
				`${prefix}dark:border-${darkColorName}-7`,
				`${prefix}dark:hover:border-${darkColorName}-8`
			),
			[`.divide-${colorName}-dim`]: apply(`divide-${colorName}-6`, `${prefix}dark:divide-${darkColorName}-6`),
			[`.divide-${colorName}-normal`]: apply(
				`divide-${colorName}-7`,
				`hover:divide-${colorName}-8`,
				`${prefix}dark:divide-${darkColorName}-7`,
				`${prefix}dark:hover:divide-${darkColorName}-8`
			),
			[`.text-${colorName}-dim`]: apply(`text-${colorName}-11`, `${prefix}dark:text-${darkColorName}-11`),
			[`.text-${colorName}-normal`]: apply(`text-${colorName}-12`, `${prefix}dark:text-${darkColorName}-12`),
		} as CSSRuleObject);
	}
}

/**
 * Check whether a color has all 12 scales needed to generate semantic classes.
 */
function hasAllScales(color: Color) {
	if (typeof color === 'string') {
		return false;
	}

	for (let scale = 1; scale <= 12; scale++) {
		if (!color[scale]) {
			return false;
		}
	}

	return true;
}

/**
 * Each Radix base color name has a corresponding gray scale color name, which,
 * if applied on the foreground against the base color background, can create a
 * more colorful and harmonious vibe.
 *
 * @see https://www.radix-ui.com/colors/docs/palette-composition/composing-a-palette#natural-pairing
 */
const naturalColorPairs: Record<ColorName, ColorName> = {
	amber: 'sand',
	blue: 'slate-dark',
	bronze: 'sand-dark',
	brown: 'sand-dark',
	crimson: 'mauve-dark',
	cyan: 'slate-dark',
	gold: 'sand-dark',
	grass: 'olive-dark',
	gray: 'gray-dark',
	green: 'sage-dark',
	indigo: 'slate-dark',
	iris: 'slate-dark',
	jade: 'sage-dark',
	lime: 'olive',
	mauve: 'mauve-dark',
	mint: 'sage',
	olive: 'olive-dark',
	orange: 'sand-dark',
	pink: 'mauve-dark',
	plum: 'mauve-dark',
	purple: 'mauve-dark',
	red: 'mauve-dark',
	ruby: 'mauve-dark',
	sage: 'sage-dark',
	sand: 'sand-dark',
	sky: 'slate',
	slate: 'slate-dark',
	teal: 'sage-dark',
	tomato: 'mauve-dark',
	violet: 'mauve-dark',
	yellow: 'sand',
} as const;

/**
 * For a given base color name, find its corresponding dark color name and
 * foreground color name.
 */
function findFamily(colorName: string) {
	const { alpha, base, p3 } = parseColorName(colorName);

	// blacka / blackp3a
	if (base === 'black') {
		return {
			darkColorName: buildColorName({
				alpha,
				base: 'white',
				dark: false,
				p3,
			}),
			foregroundColorName: buildColorName({
				alpha: false,
				base: 'white',
				dark: false,
				p3,
			}),
		};
	}

	// whitea / whitep3a
	if (base === 'white') {
		return {
			darkColorName: buildColorName({
				alpha,
				base: 'black',
				dark: false,
				p3,
			}),
			foregroundColorName: buildColorName({
				alpha: false,
				base: 'black',
				dark: false,
				p3,
			}),
		};
	}

	return {
		darkColorName: buildColorName({
			alpha,
			base,
			dark: true,
			p3,
		}),
		foregroundColorName: buildColorName({
			alpha: false,
			base: naturalColorPairs[base] ?? '',
			dark: false,
			p3,
		}),
	};
}

/**
 * Composite utility classes using `@apply`.
 *
 * @see https://github.com/tailwindlabs/tailwindcss/discussions/2049
 */
function apply(...classes: string[]) {
	const processedClasses = classes
		.filter(className => className !== '')
		.map(className => className.replaceAll(' ', '_'));

	return { [`@apply ${processedClasses.join(' ')}`]: {} };
}

/**
 * Build the plugin part of this plugin, which will be the first argument of
 * `plugin.withOptions`.
 *
 * @see https://tailwindcss.com/docs/plugins
 */
export default function createPlugin(options: TailwindRadixColorsOptions = {}): PluginCreator {
	const { disableSemantics } = options;

	if (disableSemantics) {
		return () => {
			/*
			 * Do nothing, since the only purpose of the plugin part is to generate
			 * semantics classes.
			 */
		};
	}

	return generateSemanticClasses;
}
