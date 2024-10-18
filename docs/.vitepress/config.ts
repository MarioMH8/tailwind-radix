import { defineConfig } from 'vitepress';

export default defineConfig({
	cleanUrls: true,
	description: `Bring Radix's color system to Tailwind, and enjoy the best of both Tailwind CSS and Radix UI`,
	head: [
		[
			'link',
			{
				href: '/tailwindcss.svg',
				rel: 'icon',
				type: 'image/svg+xml',
			},
		],
	],
	lastUpdated: true,
	themeConfig: {
		editLink: {
			pattern: 'https://github.com/hexadrop/tailwind-radix-colors/edit/master/docs/:path',
		},
		footer: {
			message: 'Released under the MIT license.',
		},
		logo: '/tailwindcss.svg',
		nav: [
			{
				link: 'https://tailwindcss.com/',
				text: 'Tailwind CSS',
			},
			{
				link: 'https://www.radix-ui.com/',
				text: 'Radix UI',
			},
		],
		search: {
			provider: 'local',
		},
		sidebar: [
			{
				base: '/introduction',
				items: [
					{
						link: '/getting-started',
						text: 'Getting Started',
					},
					{
						link: '/usage',
						text: 'Usage',
					},
				],
				text: 'Introduction',
			},
			{
				base: '/guide',
				items: [
					{
						link: '/utility-first',
						text: 'Utility-First',
					},
					{
						link: '/semantic-first',
						text: 'Semantic-First',
					},
					{
						link: '/custom-colors',
						text: 'Custom Colors',
					},
				],
				text: 'Guide',
			},
			{
				base: '/reference',
				items: [
					{
						link: '/options',
						text: 'Plugin Options',
					},
					{
						link: '/semantic-table',
						text: 'Semantic Table',
					},
				],
				text: 'Reference',
			},
			{
				base: '/faq',
				items: [
					{
						link: '/why-another-palette',
						text: 'Why Another Palette?',
					},
					{
						link: '/why-this-plugin',
						text: 'Why This Plugin?',
					},
					{
						link: '/why-smaller-css-bundle',
						text: 'Why Smaller CSS Bundle?',
					},
				],
				text: 'FAQ',
			},
		],
		socialLinks: [
			{
				icon: 'github',
				link: 'https://github.com/hexadrop/tailwind-radix-colors',
			},
		],
	},
	title: 'Tailwind Radix Colors',
});
