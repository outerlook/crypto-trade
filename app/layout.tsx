import './globals.css';

export const metadata = {
  title: 'Basic canvas',
  description: 'A basic canvas example',
};
export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body className={'h-screen flex flex-col'}>{children}</body>
    </html>
  );
}
