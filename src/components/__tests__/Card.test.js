import Card from "../Card";
import { WithOffer } from "../Card";
import MOCK_DATA from "../mocks/mockCard.json";
import "@testing-library/jest-dom";
import { render, screen } from "@testing-library/react";
import "../mocks/mockCard.json";

it("Should render card with props", () => {
  render(<Card res={MOCK_DATA} />);
  const name = screen.getByText("Burger King");
  expect(name).toBeInTheDocument();
});

it("Should render card with Offers", () => {
  const Offer = WithOffer(Card);
  render(<Offer res={MOCK_DATA} />);
  const offer = screen.getByText("ITEMS AT ₹99");
  expect(offer).toBeInTheDocument();
});
