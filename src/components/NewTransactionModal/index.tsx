import { FormEvent, useState } from "react";
import Modal from "react-modal";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";
import { api } from "../../services/api";

Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [value, setValue] = useState(0);
  const [transactionType, setTransactionType] = useState("deposit");

  function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    const data = {
      title,
      category,
      value,
      transactionType
    }

    api.post("/transactions", data);
  }

  return(
    <>
      <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        overlayClassName="react-modal-overlay"
        className="react-modal-content"
      >

        <button
          type="button"
          onClick={onRequestClose}
          className="react-modal-close"
        >
          <img src={closeImg} alt="fechar modal" />
        </button>

        <Container onSubmit={handleCreateNewTransaction}>
          <h2>Cadastrar transação</h2>

          <input
            type="text"
            placeholder="Título"
            value={title}
            onChange={(event) => {setTitle(event.target.value)}}
          />

          <input
            type="number"
            placeholder="Valor"
            value={value}
            onChange={(event) => {setValue(Number(event.target.value))}}
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => { setTransactionType("deposit") }}
              isActive={transactionType === "deposit"}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => { setTransactionType("withdraw") }}
              isActive={transactionType === "withdraw"}
              activeColor="red"
            >
              <img src={outcomeImg} alt="Saída" />
              <span>Saída</span>
            </RadioBox>
          </TransactionTypeContainer>

          <input
            type="text"
            placeholder="Categoria"
            value={category}
            onChange={(event) => {setCategory(event.target.value)}}
          />

          <button type="submit">
            Cadastrar
          </button>
        </Container>
      </Modal>
    </>
  );
}

export { NewTransactionModal };