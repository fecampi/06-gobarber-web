import React, { useCallback, useRef } from 'react';
import { FiArrowLeft, FiMail, FiLock, FiUser } from 'react-icons/fi';
import { FormHandles } from '@unform/core';
import { Form } from '@unform/web';
import * as Yup from 'yup';
import { Link, useHistory } from 'react-router-dom';
import getValidationErrors from '../../utils/getValidationErrors';
import { Container, Content, Background, AnimationContainer } from './styles';
import logoImg from '../../assets/logo.svg';
import api from '../../services/api';
import { useToast } from '../../hooks/toast';
import Input from '../../components/Input';
import Button from '../../components/Button';

// const initialData = {
//   name: 'Fulano',
// };

interface SignInFormData {
  name: string;
  email: string;
  password: string;
}

const SignUp: React.FC = () => {
  // Para poder colocar o erro dentro do campo
  const formRef = useRef<FormHandles>(null);
  const { addToast } = useToast();
  const history = useHistory();

  const handleSubmit = useCallback(
    async (data: SignInFormData) => {
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
        await api.post('/users', data);
        history.push('/');
        addToast({
          type: 'success',
          title: 'Cadastro realizado!',
          description: 'Você já pode fazer seu logon no GoBarber!',
        });
      } catch (err) {
        if (err instanceof Yup.ValidationError) {
          const errors = getValidationErrors(err);
          formRef.current?.setErrors(errors);
          return;
        }
        // Disparar o toast
        addToast({
          type: 'error',
          title: 'Erro no Cadastro',
          description: 'Ocorreu um erro ao fazer o cadastro, tente novamente',
        });
      }
    },
    [addToast, history],
  );

  return (
    <Container>
      <Background />
      <Content>
        <AnimationContainer>
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
          <Link to="/">
            <FiArrowLeft />
            Voltar para Logon
          </Link>
        </AnimationContainer>
      </Content>
    </Container>
  );
};

export default SignUp;
