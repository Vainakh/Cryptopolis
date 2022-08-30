import { ThemeProvider } from 'next-themes';
import '../styles/globals.css';

const MyApp = ({ Component, pageProps }) => (
  <ThemeProvider attribute="class">
    <div className="dark: bg-nft-dark bg-white min-h-screen">
      <h1>Navbar</h1>
      <Component {...pageProps} />
      <h1>Footer</h1>
    </div>
  </ThemeProvider>
);

export default MyApp;
