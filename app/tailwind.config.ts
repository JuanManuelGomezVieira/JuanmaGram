import type { Config } from "tailwindcss";

const config: Config =  {
	content: ['./index.html', './src/**/*.{js,ts,jsx,tsx}'],
	theme: {
		extend: {
			colors: {
				basecolor: "rgba(var(--basecolor))",
				basebgcolor: "rgba(var(--basebgcolor))",
				button_color: "rgba(var(--button_color))",
				button_bgcolor: "rgba(var(--button_bgcolor))",
				input_color: "rgba(var(--input_color))",
				input_bgcolor: "rgba(var(--input_bgcolor))",
				input_border: "rgba(var(--input_border))",
				material_icon_color: "rgba(var(--material_icon_color))",
				separator_line: "rgba(var(--separator_line))",
			},
		},
	},
	plugins: [],
};
export default config