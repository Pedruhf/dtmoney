import { FormEvent, useState } from "react";
import { useTransactions } from "../../hooks/useTransactions";
import Modal from "react-modal";

import { Container, RadioBox, TransactionTypeContainer } from "./styles";
import closeImg from "../../assets/close.svg";
import incomeImg from "../../assets/income.svg";
import outcomeImg from "../../assets/outcome.svg";

Modal.setAppElement("#root");

interface NewTransactionModalProps {
  isOpen: boolean;
  onRequestClose: () => void;
}

const NewTransactionModal = ({ isOpen, onRequestClose }: NewTransactionModalProps) => {
  const { handleCreateTransaction } = useTransactions();
  
  const [title, setTitle] = useState("");
  const [category, setCategory] = useState("");
  const [amount, setAmount] = useState(0);
  const [type, setType] = useState("deposit");

  async function handleCreateNewTransaction(event: FormEvent) {
    event.preventDefault();

    await handleCreateTransaction({
      title,
      category,
      amount,
      type
    });

    setTitle("");
    setCategory("");
    setAmount(0);
    setType("deposit");

    onRequestClose();
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
            value={amount}
            onChange={(event) => {setAmount(Number(event.target.value))}}
          />

          <TransactionTypeContainer>
            <RadioBox
              type="button"
              onClick={() => { setType("deposit") }}
              isActive={type === "deposit"}
              activeColor="green"
            >
              <img src={incomeImg} alt="Entrada" />
              <span>Entrada</span>
            </RadioBox>

            <RadioBox
              type="button"
              onClick={() => { setType("withdraw") }}
              isActive={type === "withdraw"}
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