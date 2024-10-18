/**
 * A descriptive color name.
 *
 * @example "red", "greenp3a", "bluedark"
 */
type ColorName = string;

/**
 * One single color can have many different scales.
 *
 * @example
 * 50, 100, 200, ..., 900, 950 // Tailwind
 * 1, 2, 3, ..., 11, 12 // Radix
 */
type ColorScale = string;

/**
 * A hex notation or a `color` function.
 *
 * @example "#641723", "color(display-p3 0.36 0.115 0.143)"
 *
 * @see https://developer.mozilla.org/en-US/docs/Web/CSS/CSS_colors/Color_values
 */
type ColorValue = string;

/**
 * An object of different color scales and their color values, or a single
 * color value string.
 *
 * For those colors coming from Tailwind or Radix, they are always objects. For
 * user-customized colors, they can be either an object or a string.
 */
type Color = ColorValue | Record<ColorScale, ColorValue>;

/**
 * A collection of colors.
 */
type Palette = Record<ColorName, Color>;

/**
 * The components that together make up a color name.
 */
interface ColorNameComponents {
	/**
	 * Whether it is an alpha variant.
	 */
	alpha: boolean;
	/**
	 * Its base color name, in lowercase.
	 */
	base: string;
	/**
	 * Whether it is a dark variant.
	 */
	dark: boolean;
	/**
	 * Whether it is a P3 variant.
	 */
	p3: boolean;
}

/**
 * Parse a given color name into its components.
 */
function parseColorName(colorName: ColorName): ColorNameComponents {
	if (!colorName) {
		return {
			alpha: false,
			base: '',
			dark: false,
			p3: false,
		};
	}
	const execArray = /^(?<base>.+?)(?<dark>-dark)?(?<p3>-p3)?(?<alpha>-a)?$/i.exec(colorName);
	if (!execArray) {
		return {
			alpha: false,
			base: colorName,
			dark: false,
			p3: false,
		};
	}
	const matchGroups = execArray.groups;

	if (!matchGroups) {
		return {
			alpha: false,
			base: colorName,
			dark: false,
			p3: false,
		};
	}

	const { alpha, base, dark, p3 } = matchGroups;

	if (!base) {
		return {
			alpha: false,
			base: colorName,
			dark: false,
			p3: false,
		};
	}

	return {
		alpha: alpha !== undefined,
		base: base.toLowerCase(),
		dark: dark !== undefined,
		p3: p3 !== undefined,
	};
}

/**
 * Build a color name from given components.
 */
function buildColorName(components: ColorNameComponents): ColorName {
	const { alpha, base, dark, p3 } = components;

	let colorName = base;

	if (dark) {
		colorName += '-dark';
	}

	if (p3) {
		colorName += '-p3';
	}

	if (alpha) {
		colorName += '-a';
	}

	return colorName;
}

export type { Color, ColorName, ColorNameComponents, ColorScale, ColorValue, Palette };

export { buildColorName, parseColorName };
