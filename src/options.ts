const RADIX_BASE_COLOR_NAMES = [
	'amber',
	'blue',
	'bronze',
	'brown',
	'crimson',
	'cyan',
	'gold',
	'grass',
	'gray',
	'green',
	'indigo',
	'iris',
	'jade',
	'lime',
	'mauve',
	'mint',
	'olive',
	'orange',
	'pink',
	'plum',
	'purple',
	'red',
	'ruby',
	'sage',
	'sand',
	'sky',
	'slate',
	'teal',
	'tomato',
	'violet',
	'yellow',
] as const;

type RadixBaseColorName = (typeof RADIX_BASE_COLOR_NAMES)[number];

/**
 * Options of plugin `tailwind-radix-colors`.
 */
interface TailwindRadixColorsOptions {
	/**
	 * Aliases of Radix color names.
	 *
	 * Useful when a Radix color name conflicts with a Tailwind one, and you are
	 * trying to preserve both of them.
	 *
	 * @default {}
	 *
	 * @see https://tailwind-radix-colors.mariomh.com/options#aliases
	 */
	aliases?: Partial<Record<RadixBaseColorName, string>>;
	/**
	 * Disable the Intellisense of semantic classes.
	 *
	 * @default false
	 *
	 * @see https://tailwind-radix-colors.mariomh.com/options#disablesemantics
	 */
	disableSemantics?: boolean;
	/**
	 * An array of Radix color names that you do not want to see in Intellisense.
	 * This applies after the `include` option is applied.
	 *
	 * @default []
	 *
	 * @see https://tailwind-radix-colors.mariomh.com/options#exclude
	 */
	exclude?: string[];
	/**
	 * An array of Radix color names that you want to see in Intellisense.
	 *
	 * @default undefined
	 *
	 * @see https://tailwind-radix-colors.mariomh.com/options#include
	 */
	include?: string[] | undefined;
	/**
	 * A priority strategy to resolve color name conflicts between Radix and
	 * Tailwind.
	 *
	 * - If `no-tailwind`, Tailwind color names will be completely wiped out.
	 * - If `radix-first`, Radix color names will override Tailwind upon conflict.
	 * - If `tailwind-first`, Tailwind color names will override Radix upon conflict.
	 *
	 * @default "no-tailwind"
	 *
	 * @see https://tailwind-radix-colors.mariomh.com/options#priority
	 */
	priority?: 'no-tailwind' | 'radix-first' | 'tailwind-first';
}

export type { RadixBaseColorName, TailwindRadixColorsOptions };

export { RADIX_BASE_COLOR_NAMES };
