import { render, screen } from "@testing-library/react";
import userEvent from "@testing-library/user-event";
import Button from "../Button";

describe("Button component", () => {
  it("renders a button", () => {
    render(<Button />);
    expect(screen.getByRole("button")).toBeInTheDocument();
  });

  it("allows the user to pass a button text", () => {
    render(<Button text="Click me" />);
    expect(screen.getByRole("button")).toHaveTextContent("Click me");
  });

  it("allows the user to pass a click handler", async () => {
    const dummyClickHandler = jest.fn();
    render(<Button text="Click me" onClick={dummyClickHandler} />);

    // Simulate a user clicking the button
    const user = userEvent.setup();
    await user.click(screen.getByText(/Click me/));

    // Check the click handler was called
    expect(dummyClickHandler).toHaveBeenCalled();
  });
});
