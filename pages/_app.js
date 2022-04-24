import "../styles/globals.css";
import "@fortawesome/fontawesome-svg-core/styles.css"; // import Font Awesome CSS
import { config } from "@fortawesome/fontawesome-svg-core";
config.autoAddCss = false; // Tell Font Awesome to skip adding the CSS automatically

function MyApp({ Component, pageProps }) {
  return <Component {...pageProps} />;
}

export default MyApp;
