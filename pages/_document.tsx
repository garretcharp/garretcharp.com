import { Head, Html, Main, NextScript } from "next/document";
import { getCssText } from "../stitches.config";

export default function MyDocument() {
	return (
		<Html lang="en">
			<Head>
				<style
					id="stitches"
					dangerouslySetInnerHTML={{ __html: getCssText() }}
				/>
				<style>
					{`body {
						background-color: hsl(200 7.0% 8.8%);
					}`}
				</style>
			</Head>
			<body>
				<Main />
				<NextScript />
			</body>
		</Html>
	);
}
