import type { Metadata } from "next";
import { Inter } from "next/font/google";
// context
import { GlobalProvider } from "@/context/GlobalContext";
// components
import Layout from "@/components/Layout";
// styles
import '../styles/globals.scss';

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
	title: "Copper Mountain U13 Page",
	description: "A site dedicated to the boys of Copper Mountain U13 soccer team coached by Will Morales",
};

export default function RootLayout({
	children,
}: {
	children: React.ReactNode;
}) {
	return (
		<html lang="en">
			<body className={inter.className}>
				<GlobalProvider>
					<Layout>{children}</Layout>
				</GlobalProvider>
			</body>
		</html>
	);
}
