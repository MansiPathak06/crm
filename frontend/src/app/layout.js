import "./globals.css";
export const metadata = {
  title: 'Managency CRM',
  description: 'CRM Dashboard',
}


export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>{children}</body>
    </html>
  );
}
