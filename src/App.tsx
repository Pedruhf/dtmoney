import { useState } from "react";

import { Dashboard } from "./components/Dashboard";
import { Header } from "./components/Header";
import { NewTransactionModal } from "./components/NewTransactionModal";
import { GlobalStyle } from "./styles/global";


export function App() {
  const [isNewTransacionModalOpen, setIsNewTransacionModalOpen] = useState(false);


  function handleOpenNewTransactionModal() {
    setIsNewTransacionModalOpen(true);
  }

  function handleCloseNewTransactionModal() {
    setIsNewTransacionModalOpen(false);
  }

  return (
    <>
      <GlobalStyle />

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransacionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </>
  );
}

