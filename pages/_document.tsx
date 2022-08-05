import { Head, Html, Main, NextScript } from "next/document";
import { getCssText, styled } from "../stitches.config";

const Body = styled("body", {
	backgroundColor: "hsl(200 7.0% 8.8%)",
});

export default function MyDocument() {
	return (
		<Html lang="en">
			<Head>
				<style
					id="stitches"
					dangerouslySetInnerHTML={{ __html: getCssText() }}
				/>
			</Head>
			<Body>
				<Main />
				<NextScript />
			</Body>
		</Html>
	);
}
