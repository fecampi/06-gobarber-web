import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import getValidationErrors from '../../utils/getValidationErros';
import { Container, Content, Background } from './styles';
import logoImg from '../../assets/logo.svg';

import Input from '../../components/Input';
import Button from '../../components/Button';

// const initialData = {
//   name: 'Fulano',
// };

const SignUp: React.FC = () => {
  // Para poder colocar o erro dentro do campo
  const formRef = useRef<FormHandles>(null);
  const handleSubmit = useCallback(async (data: object) => {
    try {
      formRef.current?.setErrors({});
      // tenta..os dados(data) estão no formato objeto com essa forma(shape)
      const schema = Yup.object().shape({
        // obrigatório
        name: Yup.string().required('Nome obrigatório'),
        // obrigatório em formato de email
        email: Yup.string()
          .required('E-mail obrigatório')
          .email('Digite um e-mail válido'),
        // minimo de 6 letras
        password: Yup.string().min(6, 'Mínimo 6 dígitos'),
      });
      await schema.validate(data, {
        // Retorna todos os erros, não só o primeiro
        abortEarly: false,
      });
    } catch (err) {
      // Pega todos os erros como o utils
      const errors = getValidationErrors(err);
      // verifica se existe, caso exista set
      formRef.current?.setErrors(errors);
      console.log(err);
    }
  }, []);

  return (
    <Container>
      <Background />
      <Content>
        <img src={logoImg} alt="GoBarber" />
        {/* Form initialData={initialData} -> Iniciar campos preenchidos */}
        <Form ref={formRef} onSubmit={handleSubmit}>
          <h1>Faça seu Cadastro</h1>
          <Input name="name" icon={FiUser} placeholder="Nome" />
          <Input name="email" icon={FiMail} placeholder="E-mail" />
          <Input
            name="password"
            icon={FiLock}
            type="password"
            placeholder="Senha"
          />
          <Button type="submit">Cadastrar</Button>
        </Form>
        <a href="/">
          <FiArrowLeft />
          Voltar para Logon
        </a>
      </Content>
    </Container>
  );
};

export default SignUp;
