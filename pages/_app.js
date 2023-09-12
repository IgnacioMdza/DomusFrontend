import "@/styles/globals.css";
import "@/styles/index.css";
import NavBar from "@/components/NavBar";
import Footer from "@/components/Footer";
import { createTheme, ThemeProvider } from '@mui/material/styles';

const theme = createTheme({
  palette: {
    primary: {
      main: '#FF7068',
      light: '#FF7068',
      dark: '#FF7068',
      contrastText: '#fff',
    },
    secondary: {
      main: '#2B2E4A',
      light: '#2B2E4A',
      dark: '#2B2E4A',
      contrastText: '#fff',
    },
  }
})

export default function App({ Component, pageProps }) {
  return (
    <>
      <ThemeProvider theme={theme}>
        <NavBar />
        <Component {...pageProps} />
        <Footer />
      </ThemeProvider>
    </>
  );
}
