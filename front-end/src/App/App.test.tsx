import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";

import { createRouterProvider } from "../test-setup/testRouters";
import { App } from "./App";


test("App name is rendered", () => {
  render(createRouterProvider(<App />));
  expect(screen.getByText("Satın")).toBeInTheDocument();
  expect(screen.getByText("alın")).toBeInTheDocument();
});
