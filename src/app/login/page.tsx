"use client";
import { message } from 'antd';
import axios from 'axios';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from 'nookies';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { ImSpinner2 } from "react-icons/im";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdLockOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import logo from '../../assets/vivamed.svg';

interface Inputs {
  username: string
  password: string
}

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isPassword, setIsPassword] = useState<any>(true)
  const [loading, setLoading] = useState<boolean>(false)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const { push } = useRouter()

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    // // AUTENTICAÇÃO DE USUÁRIO *TROCAR A URL DA .ENV*
    axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth`, {
      username: username,
      password: password
    }).then(res => {
      setLoading(true)
      setCookie(null, 'accessToken', res.data.access_token)
      setTimeout(() => {
        toast.success('Estamos te conectando...', {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        push('/')
      }, 1000);
    }).catch(err => {
      setLoading(true)
      toast.error('Usuário ou senha inválido.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    })
  }

  return (
    <div className="flex items-center h-screen overflow-hidden p-5 gap-10">
      {contextHolder}
      <div className="flex justify-center w-full h-screen items-center">
        <div className="gap-10 flex flex-col items-center sm:w-1/3 w-full">
          <div className="text-center flex justify-center flex-col items-center">
            <Image className="w-12 flex my-5" alt="Background Login" src={logo} />
            <h2 className="text-lg font-bold text-slate-700" >Bem vindo ao Vivamed</h2>
            <p className="text-sm font-light text-slate-700">Faça login na sua conta</p>
            {/* <p className="text-xs font-light text-slate-700">Insira seus dados para fazer login.</p> */}
          </div>

          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="usuario">
                  Usuário
                </label>
                <div className="flex items-center w-full gap-3 text-slate-700 bg-white py-2 px-3 shadow-md appearance-none rounded-lg">
                  <FaRegUser className="text-sm" />
                  <input {...register("username", { required: true })} className="bg-transparent outline-none w-full text-slate-700" id="usuario" type="text" placeholder="Insira seu usuário" />
                </div>
                {
                  errors.username && <p className="text-red-500 text-xs italic">Insira um email válido.</p>
                }
              </div>
              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">
                  Senha
                </label>
                <div className="flex items-center w-full gap-3 text-slate-700 bg-white py-2 px-3 shadow-md appearance-none rounded-lg">
                  <MdLockOutline />
                  <input {...register("password", { required: true })} className="bg-transparent outline-none w-full text-slate-700 " id="password" type={isPassword ? 'password' : 'text'} placeholder='******' />
                  {
                    isPassword ? <IoMdEye className="cursor-pointer text-slate-500" onClick={() => setIsPassword(!isPassword)} /> : <IoMdEyeOff className="cursor-pointer text-slate-500" onClick={() => setIsPassword(!isPassword)} />
                  }
                </div>
                {
                  errors.password && <p className="text-red-500 text-xs italic">Insira uma senha válida.</p>
                }
              </div>
              {/* <div className="items-center gap-2 flex md:hidden justify-end mb-3">
                <span className="text-slate-700 text-xs font-light">Novo por aqui?</span>
                <button className="rounded-lg text-sm text-cyan-800 font-semibold">
                  Solicitar acesso
                </button>
              </div>
              <div className="gap-2 hidden md:flex justify-end my-2">
                <span className="text-slate-700 text-xs font-light">Novo por aqui?</span>
                <button className="text-sm text-cyan-800 hover:text-cyan-800/80 font-semibold border-cyan-800 transition-all">
                  Solicitar acesso
                </button>
              </div> */}
              <div className="flex items-center justify-between">
                <button disabled={loading} className="w-full flex items-center justify-center p-2 rounded-lg text-sm bg-cyan-800 text-white font-semibold shadow-xl hover:shadow-none hover:translate-y-0.5 hover:bg-cyan-700 transition-all" type="submit">
                  {loading ? <ImSpinner2 className='animate-spin text-lg text-center' /> : "Acessar conta"}
                </button>
              </div>
            </form>
          </div>

          <div className="flex justify-center">
            <span className="text-slate-500 text-sm">&copy;2024 Stevanini Design Studio</span>
          </div>
        </div>
      </div>
      {/* <div className="hidden md:flex w-full">
        <Image className="rounded-3xl w-full h-[550px] shadow-2xl" alt="Background Login" src={background} />
      </div> */}
    </div>
  );
}
