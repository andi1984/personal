import { render, screen } from "@testing-library/react";
import BackToHome from "./index";

describe("BackToHome", () => {
  it("renders the back to home link", () => {
    render(<BackToHome />);
    const link = screen.getByRole("link", { name: /back to homepage/i });
    expect(link).toBeInTheDocument();
    expect(link).toHaveTextContent("← Back to Home");
  });

  it("navigates to the homepage", () => {
    render(<BackToHome />);
    const link = screen.getByRole("link", { name: /back to homepage/i });
    expect(link).toHaveAttribute("href", "/");
  });

  it("applies custom className when provided", () => {
    render(<BackToHome className="custom-class" />);
    const link = screen.getByRole("link", { name: /back to homepage/i });
    expect(link).toHaveClass("custom-class");
  });

  it("has proper accessibility attributes", () => {
    render(<BackToHome />);
    const link = screen.getByRole("link", { name: /back to homepage/i });
    expect(link).toHaveAttribute("aria-label", "Back to homepage");
  });

  it("applies the correct styling classes", () => {
    render(<BackToHome />);
    const link = screen.getByRole("link", { name: /back to homepage/i });
    expect(link).toHaveClass("inline-flex");
    expect(link).toHaveClass("items-center");
    expect(link).toHaveClass("gap-2");
  });
});
