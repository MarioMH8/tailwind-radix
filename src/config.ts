import rawRadixPalette from '@radix-ui/colors';
import tailwindPalette from 'tailwindcss/colors';
import type { Config } from 'tailwindcss/types/config';

import type { Color, ColorName, ColorNameComponents, Palette } from './colors';
import { buildColorName, parseColorName } from './colors';
import type { RadixBaseColorName, TailwindRadixColorsOptions } from './options';
import { RADIX_BASE_COLOR_NAMES } from './options';

/**
 * According to the options given by the user, resolve the final palette from
 * both Radix and Tailwind.
 */
function resolvePalette(radixPalette: Palette, tailwindPalette: Palette, options: TailwindRadixColorsOptions): Palette {
	const fullRadixPalette = transformRadixPalette(radixPalette);
	const aliasedRadixPalette = aliasRadixPalette(fullRadixPalette, options.aliases ?? {});

	const normalizedTailwindPalette = normalizeTailwindPalette(tailwindPalette);

	const checkInclusion = createInclusionChecker(options);
	const filteredRadixPalette = Object.fromEntries(
		Object.entries(aliasedRadixPalette).filter(([colorName]) => checkInclusion(colorName))
	);
	const filteredTailwindPalette = Object.fromEntries(
		Object.entries(normalizedTailwindPalette).filter(([colorName]) => checkInclusion(colorName))
	);

	if (options.priority === 'radix-first') {
		return { ...filteredTailwindPalette, ...filteredRadixPalette };
	}

	if (options.priority === 'tailwind-first') {
		return { ...filteredRadixPalette, ...filteredTailwindPalette };
	}

	return filteredRadixPalette;
}

/**
 * Transform the Radix palette to a format that Tailwind understands.
 *
 * @see https://tailwindcss.com/docs/customizing-colors#using-custom-colors
 */
function transformRadixPalette(radixPalette: Palette): Palette {
	const transformedPalette: Palette = {};

	for (const [radixColorName, radixColor] of Object.entries(radixPalette)) {
		const transformedColorName = transformRadixColorName(radixColorName);
		transformedPalette[transformedColorName] = transformRadixColor(radixColor);
	}

	return transformedPalette;
}

/**
 * Radix color name: `blueDarkP3A`
 *
 * Transformed color name: `blue-dark-p3-a`
 */
function transformRadixColorName(radixColorName: ColorName): ColorName {
	if (RADIX_BASE_COLOR_NAMES.includes(radixColorName as RadixBaseColorName)) {
		return radixColorName.toLowerCase();
	}

	const replaced = radixColorName.toLowerCase().replace('dark', '-dark').replace('p3', '-p3');
	if (replaced.endsWith('a')) {
		return `${replaced.slice(0, -1)}-a`;
	}

	return replaced;
}

/**
 * Radix color: `{ blue1: "#0d1520", blue2: "#111927", ..., blue12: "#c2e6ff" }`
 *
 * Transformed color: `{ 1: "#0d1520", 2: "#111927", ..., 12: "#c2e6ff" }`
 */
function transformRadixColor(radixColor: Color): Color {
	const transformedColor: Color = {};

	for (const [radixColorScale, colorValue] of Object.entries(radixColor)) {
		const transformedColorScale = /\d+$/.exec(radixColorScale)?.[0];

		if (transformedColorScale) {
			transformedColor[transformedColorScale] = colorValue;
		}
	}

	return transformedColor;
}

/**
 * Replace Radix color names with their aliases.
 */
function aliasRadixPalette(radixPalette: Palette, aliases: Record<string, string>): Palette {
	const aliasedPalette: Palette = {};

	for (const [radixColorName, radixColor] of Object.entries(radixPalette)) {
		const colorNameComponents = parseColorName(radixColorName);
		const aliasedBase = aliases[colorNameComponents.base] ?? colorNameComponents.base;
		const aliasedColorName = buildColorName({
			...colorNameComponents,
			base: aliasedBase,
		});
		aliasedPalette[aliasedColorName] = radixColor;
	}

	return aliasedPalette;
}

/**
 * Remove deprecated color names from the Tailwind palette.
 */
function normalizeTailwindPalette(tailwindPalette: Palette): Palette {
	const deprecatedColorNames = new Set(['blueGray', 'coolGray', 'lightBlue', 'trueGray', 'warmGray']);

	return Object.keys(tailwindPalette)
		.filter(colorName => !deprecatedColorNames.has(colorName))
		.reduce<Palette>((palette, colorName) => {
			const tailwindColor = tailwindPalette[colorName];
			if (!tailwindColor) {
				return palette;
			}
			palette[colorName] = tailwindColor;

			return palette;
		}, {});
}

/**
 * Create a function that checks whether a Radix color name should be included,
 * i.e. be transformed and added to the new palette.
 *
 * This particularly deals with the `include` and `exclude` options.
 */
function createInclusionChecker(options: TailwindRadixColorsOptions) {
	const { exclude = [], include } = options;

	const parsedInclude = include?.map(value => parseColorName(value));
	const parsedExclude = exclude.map(value => parseColorName(value));

	return (candidate: ColorName) => {
		const parsedCandidate = parseColorName(candidate);

		if (parsedInclude && !parsedInclude.some(colorName => match(colorName, parsedCandidate))) {
			return false;
		}

		return !parsedExclude.some(colorName => match(colorName, parsedCandidate));
	};
}

/**
 * Check whether two color names matches.
 *
 * @note A base color and its dark variant are considered a successful match.
 * This is because we cannot include only one but not both; otherwise, the
 * automatic dark mode support of semantic classes will not work. Even if the
 * user has explicitly disabled the usage of semantic classes, it is still
 * better to keep this behavior, for the following reasons:
 *
 * 1. The user may well still want dark mode, but prefers to style it manually.
 * 2. Behavior stays consistent before and after semantic classes are disabled.
 * 3. Avoid "options-drilling" for better DX. Otherwise, you will have to pass
 * the option `disableSemantics` all the way down to this function.
 */
function match(a: ColorNameComponents, b: ColorNameComponents) {
	return a.base === b.base && a.p3 === b.p3 && a.alpha === b.alpha;
}

/**
 * Build the config part of this plugin, which will be the second argument of
 * `plugin.withOptions`.
 *
 * @see https://tailwindcss.com/docs/plugins#extending-the-configuration
 */
export default function createConfig(options: TailwindRadixColorsOptions = {}): Partial<Config> {
	return {
		theme: {
			colors: {
				black: '#000',
				current: 'currentColor',
				inherit: 'inherit',
				transparent: 'transparent',
				white: '#fff',
				...resolvePalette(rawRadixPalette, tailwindPalette as unknown as Palette, options),
			},
		},
	};
}
