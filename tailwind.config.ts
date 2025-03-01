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
    
        
    },

  },
  plugins: [],
} satisfies Config;
