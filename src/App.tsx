import { useState } from "react";
import { TransactionsProvider } from "./hooks/useTransactions";

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
    <TransactionsProvider>
      <GlobalStyle />

      <Header onOpenNewTransactionModal={handleOpenNewTransactionModal} />

      <Dashboard />

      <NewTransactionModal
        isOpen={isNewTransacionModalOpen}
        onRequestClose={handleCloseNewTransactionModal}
      />
    </TransactionsProvider>
  );
}

