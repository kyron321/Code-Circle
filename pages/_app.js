import "../styles/globals.css";
import Layout from "../components/Layout";
import { AuthContextProvider } from "../contexts/AuthContext";


export default function App({ Component, pageProps }) {

  return (
    <AuthContextProvider>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </AuthContextProvider>
  );
}
