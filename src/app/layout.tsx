import type { Metadata } from "next";
import { Inter } from "next/font/google";
import Providers from "./Providers";                 // ← this now exists
import Layout from "@/components/Layout";
import "../styles/globals.scss";

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Copper Mountain U13 Page",
	description:
		"A site dedicated to the boys of Copper Mountain U13 soccer team coached by Will Morales",
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
	return (
		<html lang="en">
			<head>
				<link
					rel="stylesheet"
					href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/6.7.2/css/all.min.css"
					integrity="sha512-Evv84Mr4kqVGRNSgIGL/F/aIDqQb7xQ2vcrdIwxfjThSH8CSR7PBEakCr51Ck+w+/U6swU2Im1vVX0SVk9ABhg=="
					crossOrigin="anonymous"
					referrerPolicy="no-referrer"
				/>
			</head>
			<body className={inter.className}>
				<Providers>
					<Layout>{children}</Layout>
				</Providers>
			</body>
		</html>
	);
}
