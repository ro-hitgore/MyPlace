import Header from "../components/Header";
import Footer from "../components/Footer";
import "../styles/globals.css";
import { MyPlaceContextProvider } from "../context/MyPlaceContext";

export default function App({ Component, pageProps }) {
  return (
    <MyPlaceContextProvider>
      <div>
        <Header />
        <Component {...pageProps} />
        <Footer />
      </div>
    </MyPlaceContextProvider>
  );
}
