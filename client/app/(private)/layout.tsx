'use client'
import {ChakraProvider} from "@chakra-ui/react";
import SidebarWithHeader from "../../components/layout/Layout";
import "../../styles/globals.css";

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html>
        <body>
        <ChakraProvider>
            <SidebarWithHeader>
                {children}
            </SidebarWithHeader>
        </ChakraProvider>
        </body>
        </html>
    )
}
