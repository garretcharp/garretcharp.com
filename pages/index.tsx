import Head from "next/head";
import React from "react";
import { styled } from "../stitches.config";

const Text = styled("p", {
	fontFamily: "$system",
	color: "white",
});

const Container = styled("div", {
	marginX: "auto",
	paddingX: "$3",

	variants: {
		size: {
			1: {
				maxWidth: "300px",
			},
			2: {
				maxWidth: "585px",
			},
			3: {
				maxWidth: "865px",
			},
		},
	},
});

export default function Home() {
	return (
		<React.Fragment>
			<Head>
				<title>Garret Harp | Software Engineer</title>
			</Head>
			<Container size={{ "@initial": "1", "@bp1": "2" }}>
				<Text as="h1">Hello, my name is Garret.</Text>
				<Text>
					I have a passion for web development, and solving problems. I enjoy
					creating things that benefit others. (this is a test)
				</Text>
			</Container>
		</React.Fragment>
	);
}
