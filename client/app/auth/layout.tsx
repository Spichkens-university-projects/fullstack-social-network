'use client'
import {ChakraProvider} from "@chakra-ui/react";
import "../../styles/globals.css";

export default function AuthLayout({children}: { children: React.ReactNode }) {
    return (
        <html>
        
        <body>
            <ChakraProvider>
                {children}
            </ChakraProvider>
        </body>
        </html>
    )
}

