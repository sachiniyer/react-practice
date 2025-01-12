import React from "react";
import { createRoot } from "react-dom/client";
import Button from "./Button";

const container = document.getElementById("root");
const root = createRoot(container);
root.render(
  <div>
    <h1>TDD Button</h1>
    <div>
      <p>Once you've implemented your button, you'll see it below!</p>
      <Button text="Click me" onClick={() => alert("hello!")} />
    </div>
  </div>
);
