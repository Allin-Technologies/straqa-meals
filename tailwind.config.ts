import type { Config } from "tailwindcss";
import { fontFamily } from "tailwindcss/defaultTheme";

export default {
  darkMode: ["class"],
  content: [
    "./src/pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/components/**/*.{js,ts,jsx,tsx,mdx}",
    "./src/app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
  	container: {
  		center: true,
  		padding: {
  			'2xl': '2rem',
  			DEFAULT: '1rem',
  			lg: '2rem',
  			md: '2rem',
  			sm: '1rem',
  			xl: '2rem'
  		},
  		screens: {
  			'2xl': '86rem'
  		}
  	},
  	extend: {
  		fontFamily: {
  			sans: [
  				'var(--font-geist-sans)',
                    ...fontFamily.sans
                ],
  			mono: [
  				'var(--font-geist-mono)',
                    ...fontFamily.mono
                ]
  		},
  		colors: {
  			background: 'hsl(var(--background))',
  			foreground: 'hsl(var(--foreground))',
  			card: {
  				DEFAULT: 'hsl(var(--card) / 0.79)',
  				foreground: 'hsl(var(--card-foreground))'
  			},
  			popover: {
  				DEFAULT: 'hsl(var(--popover))',
  				foreground: 'hsl(var(--popover-foreground))'
  			},
  			primary: {
  				DEFAULT: 'hsl(var(--primary))',
  				foreground: 'hsl(var(--primary-foreground))'
  			},
  			secondary: {
  				DEFAULT: 'hsl(var(--secondary))',
  				foreground: 'hsl(var(--secondary-foreground))'
  			},
  			muted: {
  				DEFAULT: 'hsl(var(--muted))',
  				foreground: 'hsl(var(--muted-foreground))'
  			},
  			accent: {
  				DEFAULT: 'hsl(var(--accent))',
  				foreground: 'hsl(var(--accent-foreground))'
  			},
  			destructive: {
  				DEFAULT: 'hsl(var(--destructive))',
  				foreground: 'hsl(var(--destructive-foreground))'
  			},
  			border: 'hsl(var(--border))',
  			input: 'hsl(var(--input))',
  			ring: 'hsl(var(--ring))',
  			chart: {
  				'1': 'hsl(var(--chart-1))',
  				'2': 'hsl(var(--chart-2))',
  				'3': 'hsl(var(--chart-3))',
  				'4': 'hsl(var(--chart-4))',
  				'5': 'hsl(var(--chart-5))'
  			}
  		},
  		borderRadius: {
  			lg: 'var(--radius)',
  			md: 'calc(var(--radius) - 2px)',
  			sm: 'calc(var(--radius) - 4px)'
  		},
  		typography: '({}) => ({\n        DEFAULT: {\n          css: [\n            {\n              "--tw-prose-body": "var(--text)",\n              "--tw-prose-headings": "var(--text)",\n              h1: {\n                fontWeight: "normal",\n                marginBottom: "0.2em",\n                lineHeight: "1.2",\n                fontSize: "3.5rem", // Largest heading\n              },\n              h2: {\n                marginBottom: "0.175em",\n                lineHeight: "1.2",\n                fontSize: "2.8rem", // 80% of h1\n              },\n              h3: {\n                fontSize: "2.25rem", // 80% of h2\n              },\n              h4: {\n                fontSize: "1.75rem", // Matches h5, slightly larger\n              },\n              h5: {\n                fontSize: "1.75rem", // Matches requirement\n              },\n              h6: {\n                fontSize: "1.25rem", // Smallest heading\n              },\n            },\n          ],\n        },\n        base: {\n          css: [\n            {\n              h1: {\n                fontSize: "2.5rem", // Largest heading for base size\n              },\n              h2: {\n                fontSize: "2rem", // Slightly smaller\n              },\n            },\n          ],\n        },\n        md: {\n          css: [\n            {\n              h1: {\n                fontSize: "4.5rem", // Larger headings for medium size screens\n                whiteSpace: "wrap",\n              },\n              h2: {\n                fontSize: "3.75rem",\n              },\n              h3: {\n                fontSize: "3rem",\n              },\n              h4: {\n                fontSize: "2.5rem",\n              },\n              h5: {\n                fontSize: "2rem",\n              },\n              h6: {\n                fontSize: "1.5rem",\n              },\n            },\n          ],\n        },\n      })',
  		keyframes: {
  			'accordion-down': {
  				from: {
  					height: '0'
  				},
  				to: {
  					height: 'var(--radix-accordion-content-height)'
  				}
  			},
  			'accordion-up': {
  				from: {
  					height: 'var(--radix-accordion-content-height)'
  				},
  				to: {
  					height: '0'
  				}
  			}
  		},
  		animation: {
  			'accordion-down': 'accordion-down 0.2s ease-out',
  			'accordion-up': 'accordion-up 0.2s ease-out'
  		}
  	}
  },
  plugins: [require("tailwindcss-animate"), require("@tailwindcss/typography")],
} satisfies Config;
