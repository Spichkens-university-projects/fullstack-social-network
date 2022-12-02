import Header from "../components/header/Header";
import '../styles/globals.scss'

export default function RootLayout({
                                       children,
                                   }: {
    children: React.ReactNode
}) {
    return (
        <html>
        <body>
        <Header/>
        {children}
        </body>
        </html>
    )
}
