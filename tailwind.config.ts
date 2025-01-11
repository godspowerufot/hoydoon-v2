import type { Config } from "tailwindcss";

export default {
  content: [
    "./pages/**/*.{js,ts,jsx,tsx,mdx}",
    "./components/**/*.{js,ts,jsx,tsx,mdx}",
    "./app/**/*.{js,ts,jsx,tsx,mdx}",
  ],
  theme: {
    extend: {
        boxShadow: {
            custom: '0 2px 4px rgba(0, 0, 0, 0.25)',
        },
        
        colors: {
            primary: '#09858D',
            secondary: '#E13636',
            black: '#1E1E1E',
            white: '#F4F4F4',
            gray: '#8F8F8F',
            textgray: '#1E1E1E',
            dark: '#1E40AF',
            inputBg: '#c1979e1c',
            header: '#000000',
        },
        backgroundImage: {
          'primarytransparent': "linear-gradient(129.42deg, rgba(255, 255, 255, 0.2) -11.83%, rgba(255, 255, 255, 0.3) 48.36%, rgba(255, 255, 255, 0.2) 107.36%)",
        },
        width: {
            '3/10': '29%',
            '4/10': '39%',
            '5/10': '49%',
            '6/10': '59%',
            '7/10': '70%',
            '8/10': '80%',
            '9/10': '90%',
        },
       
        fontFamily: {
          'bricolage': ['Bricolage Grotesque', 'serif'],
        },
    
        fontSize: {
            '10xs-1': '2.1px',
            '4xs-8': '8.8px',
            '3xs-3': '9.3px',
            l: '12px',
            label: '14px',
            xl: '20px',
            base: '16px',
            '17xl': '36px',
            '3xl': '22px',
            '10xl': '29px',
            '13xl': '32px',
            lgi: '18px',
            '7xl': '26px',
            '5xl': '24px',
            'xl-4': '20.4px',
            'base-9': '16.9px',
            '6xl-3': '25.3px',
            xs: '12px',
            '51xl-5': '70.5px',
            '23xl': '42px',
            '24xl': '48px',
            '60xl':'92px',
            '37xl': '56px',
            inherit: 'inherit',
        },
        
    },

  },
  plugins: [],
} satisfies Config;
