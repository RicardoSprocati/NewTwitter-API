import { yupResolver } from '@hookform/resolvers/yup'
import * as yup from "yup"
import { useForm } from 'react-hook-form'

import { registrar } from '../api/auth'
import { Campo, Entrada, FormRegistro, MsgErro, Rotulo } from './Registrar.estilo'
import type { FormInputs } from '../tipos'
import { useNavigate } from 'react-router-dom'


const schema = yup.object({
    username: yup.string().required("Este campo não pode estar em branco."),
    email: yup.string().email("Insira um endereço de email válido.").required("Este campo não pode estar em branco."),
    senha: yup.string().required("Este campo não pode estar em branco.").min(6,"A senha deve ter no mínimo 6 caracteres."),
})

export default function Registrar() {
    const navigate = useNavigate()
    const { register, handleSubmit, formState: { errors, isSubmitting }, reset } =
    useForm<FormInputs>({ resolver: yupResolver(schema) })

    async function onSubmit(data: FormInputs) {
        try {
            await registrar(data)
            alert("Registrado! Agora faça login.")
            reset()
            navigate("/entrar")
        } catch (e: any) {
            alert("Não foi possível registrar. Verifique os dados.")
        }
    }

    return (
        <FormRegistro onSubmit={handleSubmit(onSubmit)} noValidate>
            <h1>Registrar</h1>
            <Campo>
                <Rotulo htmlFor="username">Usuário</Rotulo>
                <Entrada id="username" {...register("username")} invalido={!!errors.username}/>
                {errors.username && <MsgErro>{errors.username.message}</MsgErro>}
            </Campo>

            <Campo>
                <Rotulo htmlFor="email">Email</Rotulo>
                <Entrada id="email" type="email" {...register("email")} invalido={!!errors.email}/>
                {errors.email && <MsgErro>{errors.email.message}</MsgErro>}
            </Campo>

            <Campo>
                <Rotulo htmlFor="display_name">Nome de exibição (opcional)</Rotulo>
                <Entrada id="display_name" {...register("display_name")}/>
            </Campo>

            <Campo>
                <Rotulo htmlFor="senha">Senha</Rotulo>
                <Entrada id="senha" type="password" {...register("senha")} invalido={!!errors.senha}/>
                {errors.senha && <MsgErro>{errors.senha.message}</MsgErro>}
            </Campo>

            <button disabled={isSubmitting}>Registrar</button>
        </FormRegistro>
    )
}