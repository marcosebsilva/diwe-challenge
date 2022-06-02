import BaseButton from 'components/UI/BaseButton';
import BaseInput from 'components/UI/BaseInput';
import useToken from 'hooks/useToken';
import React, {
  useState, useCallback, useEffect, useRef,
} from 'react';
import { useMutation } from 'react-query';
import * as Contacts from 'services/contacts';
import * as Styled from './style';

export default function AddContact() {
  const [email, setEmail] = useState('');
  const [name, setName] = useState('');
  const [phone, setPhone] = useState('');
  const [feedback, setFeedback] = useState({ message: '', show: false });
  const [token] = useToken();
  const timeoutRef = useRef(null);

  const {
    isError,
    isSuccess,
    mutate,
  } = useMutation(Contacts.register);

  useEffect(() => {
    if (isError) {
      setFeedback({
        message: 'Algo deu errado ao cadastrar o usuário.',
        show: true,
      });
    }

    if (isSuccess) {
      setFeedback({
        message: 'Usuário cadastrado com sucesso!',
        show: true,
      });
    }

    if (isError || isSuccess) {
      const TWO_SECONDS = 2000;
      timeoutRef.current = setTimeout(() => {
        setFeedback({
          message: '',
          show: false,
        });
      }, TWO_SECONDS);
    }

    return () => clearTimeout(timeoutRef.current);
  }, [isError, isSuccess]);

  const handleChange = useCallback((event) => {
    switch (event.target.name) {
      case 'email':
        setEmail(event.target.value);
        break;
      case 'name':
        setName(event.target.value);
        break;
      case 'phone':
        setPhone(event.target.value);
        break;
      default:
        break;
    }
  });

  const handleRegister = (e) => {
    e.preventDefault();
    mutate({ token, contact: { email, name, mobile: phone.toString() } });
  };

  return (
    <Styled.Wrapper>
      {feedback.show && (
        <Styled.Feedback
          data-testid="add-contact-feedback"
          color={isSuccess ? 'green' : 'red'}
        >
          {feedback.message}
        </Styled.Feedback>
      )}
      <Styled.TitleWrapper>
        <h1>Cadastre um novo contato</h1>
        <h2>Preencha as informações para cadastrar um novo contato</h2>
      </Styled.TitleWrapper>
      <Styled.Form onSubmit={handleRegister} data-testid="add-contact-form">
        <BaseInput
          testid="add-contact-name-input"
          label="Nome completo"
          placeholder="Digite o nome do contato"
          handleChange={handleChange}
          value={name}
          name="name"
          required
        />
        <BaseInput
          label="Email"
          testid="add-contact-email-input"
          handleChange={handleChange}
          placeholder="Digite o email"
          name="email"
          required
          type="email"
          value={email}
        />
        <BaseInput
          label="Celular"
          placeholder="Digite o celular"
          value={phone}
          testid="add-contact-phone-input"
          name="phone"
          handleChange={handleChange}
          type="number"
          maxlength={11}
          required
        />
        <BaseButton
          testid="add-contact-button"
        >
          Cadastrar contato
        </BaseButton>
      </Styled.Form>
    </Styled.Wrapper>
  );
}
