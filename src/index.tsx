import { createRoot } from "react-dom/client";

import App from "./App";

const container = document.createElement("div");
container.classList.add("wrapper");
document.body.appendChild(container);

const root = createRoot(container);
root.render(<App />);
