import { render } from "@testing-library/react";
import { SearchInput } from "./search-input";

describe("search input", () => {
  it("should render", () => {
    render(<SearchInput />);
  });
});
