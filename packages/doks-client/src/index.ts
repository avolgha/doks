import App from "./App";
import "../assets/fonts.css";
import "./styles/globals.css";

// TODO(avolgha): Add further spacing and style improvements

const appContainer = document.getElementById("root") as HTMLDivElement | null;
if (!appContainer) {
  throw new Error(
    "It does not look like the page was set up correctly! #root is missing."
  );
}

App(appContainer);
