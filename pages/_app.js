import "../styles/globals.css";
// app.use(express.static("public"));

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
