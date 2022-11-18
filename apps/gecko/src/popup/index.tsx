import * as ReactDOM from "react-dom";
import "normalize.css";
import "./index.css";
import App from "./App";

ReactDOM.render(<App />, document.getElementById("root"));

// Firefox fix for window resize causing drag and drop not to work?
window.addEventListener("resize", (e) => {
  e.stopImmediatePropagation();
});
