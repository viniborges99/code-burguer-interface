import React from 'react'
import { useForm } from 'react-hook-form'
import { Link } from 'react-router-dom'
import { toast } from 'react-toastify'

import { yupResolver } from '@hookform/resolvers/yup'
import * as Yup from 'yup'

import Logo from '../../assets/code-burger 2.svg'
import RegisterImg from '../../assets/registerImg.svg'
import Button from '../../components/button'
import api from '../../services/api'
import {
  Container,
  RegisterImage,
  ContainerItens,
  Label,
  Input,
  Logoimg,
  SignInLink,
  ErrorMessage
} from './styles'

function Register() {
  const schema = Yup.object().shape({
    name: Yup.string().required('nome obrigatório'),
    email: Yup.string()
      .email('Digite um e-mail valido')
      .required('O e-mail é obrigatório'),
    password: Yup.string()
      .required('A senha é obrigatória')
      .min(6, 'A senha deve ter no mínimo 6 dígitos'),
    confirmPassword: Yup.string()
      .required('A senha é obrigatória')
      .oneOf([Yup.ref('password')], 'As senhas devem ser iguais')
  })
  const {
    register,
    handleSubmit,
    formState: { errors }
  } = useForm({
    resolver: yupResolver(schema)
  })

  const onSubmit = async (clientdata) => {
    try {
      const { status } = await api.post(
        'users',
        {
          name: clientdata.name,
          email: clientdata.email,
          password: clientdata.password
        },
        { validateStatus: () => true }
      )

      if (status === 201 || status === 200) {
        toast.success('Cadastro criado com sucesso')
      } else if (status === 409) {
        toast.error('E-mail já cadastrado! Tente novamente ')
      } else {
        throw new Error()
      }
    } catch (err) {
      toast.error('Falha no sistema! tente novamente')
    }
  }
  return (
    <Container>
      <RegisterImage src={RegisterImg} alt="RegisterImg-image" />
      <ContainerItens>
        <Logoimg src={Logo} alt="logo" />
        <h1>Cadastre-se</h1>
        <form noValidate onSubmit={handleSubmit(onSubmit)}>
          <Label error={errors.name?.message}>Name</Label>
          <Input
            type="text"
            {...register('name')}
            error={errors.name?.message}
          />
          <ErrorMessage>{errors.name?.message}</ErrorMessage>

          <Label error={errors.email?.message}>Email</Label>
          <Input
            type="email"
            {...register('email')}
            error={errors.email?.message}
          />
          <ErrorMessage>{errors.email?.message}</ErrorMessage>

          <Label error={errors.password?.message}>Senha</Label>
          <Input
            type="password"
            {...register('password')}
            error={errors.password?.message}
          />
          <ErrorMessage>{errors.password?.message}</ErrorMessage>
          <Label error={errors.confirmPassword?.message}>Confirmar Senha</Label>
          <Input
            type="password"
            {...register('confirmPassword')}
            error={errors.confirmPassword?.message}
          />
          <ErrorMessage>{errors.confirmPassword?.message}</ErrorMessage>

          <Button type="submit" style={{ marginTop: 30, marginBottom: 25 }}>
            Sign up
          </Button>
        </form>
        <SignInLink>
          Já possui conta?{' '}
          <Link style={{ color: '#ffff' }} to="/login">
            Sing In
          </Link>
        </SignInLink>
      </ContainerItens>
    </Container>
  )
}

export default Register
