/** @type {import('tailwindcss').Config} */
module.exports = {
    content: [
        "./components/**/*.{js,vue,ts}",
        "./layouts/**/*.vue",
        "./pages/**/*.vue",
        "./plugins/**/*.{js,ts}",
        "./nuxt.config.{js,ts}",
        "./app.vue",
    ],
    theme: {
        extend: {
            colors: {
                indigo: {
                    50: '#E0E7FF',
                    100: '#C7D2FE',
                    200: '#A5B4FC',
                    300: '#818CF8',
                    400: '#6366F1',
                    500: '#4F46E5',
                    600: '#4338CA',
                    700: '#3730A3',
                    800: '#312E81',
                    900: '#1E1A78',
                },
                primary: '#4F46E5',
                secondary: '#A5B4FC',
                background: '#F8FAFC',
                text: '#1F2937',
            },
            borderColor: theme => ({
                ...theme('colors'),
                primary: '#4F46E5',
            }),
            backgroundColor: theme => ({
                ...theme('colors'),
                primary: '#4F46E5',
                primaryHover: '#4338CA',
            }),
            textColor: theme => ({
                ...theme('colors'),
                primary: '#4F46E5',
            }),
            // Font size
            fontSize: {
                'xxs': '0.5rem',
                'xs': '0.75rem',
                'sm': '0.875rem',
                'base': '1rem',
                'lg': '1.125rem',
                'highlight': '5rem',
                'h1': '4rem',
                'h2': '3rem',
                'h3': '2rem',
                'h4': '1.5rem',
                'h5': '1.25rem',
                'highlight_sm': '3.5rem',
                'h1_sm': '3rem',
                'h2_sm': '2.25rem',
                'h3_sm': '1.75rem',
                'h4_sm': '1.5rem',
                'h5_sm': '1.25rem'
            },
            lineHeight: {
                'xxs': '0.75rem',
                'xs': '1rem',
                'sm': '1.25rem',
                'base': '1.35rem',
                'lg': '1.45rem',
                'highlight': '5.5rem',
                'h1': '4.25rem',
                'h2': '3.25rem',
                'h3': '2.25rem',
                'h4': '1.75rem',
                'h5': '1.5rem',
                'highlight_sm': '3.75rem',
                'h1_sm': '3.25rem',
                'h2_sm': '2.5rem',
                'h3_sm': '2rem',
                'h4_sm': '1.75rem',
                'h5_sm': '1.5rem',
            },
            typography: {
                DEFAULT: {
                    css: {
                        'h1, h2, h3, h4': {
                            'scroll-margin-top': '5rem',
                        },
                        maxWidth: '100ch',
                        color: 'rgb(55 65 81)',
                        h1: {
                            color: 'rgb(17 24 39)',
                            fontWeight: '700',
                        },
                        h2: {
                            color: 'rgb(31 41 55)',
                            fontWeight: '600',
                        },
                        h3: {
                            color: 'rgb(55 65 81)',
                            fontWeight: '500',
                        },
                        a: {
                            color: 'rgb(37 99 235)',
                            textDecoration: 'none',
                            '&:hover': {
                                color: 'rgb(29 78 216)',
                                textDecoration: 'underline',
                            },
                        },
                        pre: {
                            backgroundColor: 'rgb(17 24 39)',
                            color: 'rgb(243 244 246)',
                            borderRadius: '0.5rem',
                        },
                        code: {
                            color: 'rgb(31 41 55)',
                            backgroundColor: 'rgb(243 244 246)',
                            borderRadius: '0.25rem',
                            padding: '0.25rem 0.375rem',
                            fontWeight: '400',
                        },
                        'pre code': {
                            color: 'inherit',
                            backgroundColor: 'transparent',
                            padding: '0',
                        },
                    },
                },
            },
        },
    },
    variants: {
        extend: {
            backgroundColor: ['hover', 'focus'],
            textColor: ['hover', 'focus'],
            borderColor: ['hover', 'focus'],
        },
    },
    plugins: [
        require('@tailwindcss/typography'),
    ],
}
