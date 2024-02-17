import { act, fireEvent, render, screen } from "@testing-library/react";
import Form from "./index";

describe("When Events is created", () => {
  it("a list of event card is displayed", async () => {
    render(<Form />);
    await screen.findByText("Email");
    await screen.findByText("Nom");
    await screen.findByText("Prénom");
    await screen.findByText("Personel / Entreprise");
  });

  describe("and a click is triggered on the submit button", () => {
    it("the success action is called", async () => {
      const onSuccess = jest.fn();
      render(<Form onSuccess={onSuccess} />);

      const sendButton = await screen.findByText("Envoyer");
      expect(sendButton).toBeInTheDocument();

      await act(async () => {
        fireEvent(
          await screen.findByTestId("button-test-id"),
          new MouseEvent("click", {
            cancelable: true,
            bubbles: true,
          })
        );
      });

      const inProgressButton = await screen.findByText("En cours");
      expect(inProgressButton).toBeInTheDocument();

      expect(onSuccess).toHaveBeenCalled();
    });
  });
});
