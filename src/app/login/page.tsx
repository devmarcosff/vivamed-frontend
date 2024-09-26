"use client";
import { message } from 'antd';
import axios from 'axios';
import Image from "next/image";
import { useRouter } from "next/navigation";
import { setCookie } from 'nookies';
import { useState } from "react";
import { SubmitHandler, useForm } from "react-hook-form";
import { FaRegUser } from "react-icons/fa";
import { IoMdEye, IoMdEyeOff } from "react-icons/io";
import { MdLockOutline } from "react-icons/md";
import { toast } from 'react-toastify';
import logo from '../../assets/vivamed.svg';
import background from './assets/bg2.jpg';

interface Inputs {
  username: string
  password: string
}

export default function Login() {
  const [messageApi, contextHolder] = message.useMessage();
  const [isPassword, setIsPassword] = useState<any>(true)
  const {
    register,
    handleSubmit,
    watch,
    formState: { errors },
  } = useForm<Inputs>()
  const { push } = useRouter()

  const onSubmit: SubmitHandler<Inputs> = ({ username, password }) => {
    // // AUTENTICAÇÃO DE USUÁRIO *TROCAR A URL DA .ENV*
    axios.post(`https://menezestech.com/auth`, {
      username: username,
      password: password
    }).then(res => {
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
      setCookie(null, 'accessToken', res.data.access_token)
      // jwtDecode(res.data.access_token)
      push('/')
    }).catch(err => {
      toast.error('Usuário ou senha inválidos.', {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }

  return (
    <div className="flex items-center h-screen overflow-hidden p-5 gap-10">
      {contextHolder}
      <div className="md:w-2/4 w-full">
        <div className="gap-10 flex flex-col items-center">

          <div className="text-center flex justify-center flex-col items-center">
            <Image className="w-12 hidden md:flex my-5" alt="Background Login" src={logo} />
            <h2 className="text-lg font-bold text-slate-700" >Faça login na sua conta</h2>
            <p className="text-xs font-light text-slate-700">Insira seus dados para fazer login.</p>
          </div>

          <div className="w-full md:w-2/3">
            <form onSubmit={handleSubmit(onSubmit)}>
              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="email">
                  Email
                </label>
                <div className="flex items-center w-full gap-3 text-slate-700 bg-white py-2 px-3 shadow appearance-none border rounded-lg">
                  <FaRegUser className="text-sm" />
                  <input {...register("username", { required: true })} className="bg-transparent outline-none w-full text-sm text-slate-700" id="username" type="text" placeholder="admin@admin.com" />
                </div>
                {
                  errors.username && <p className="text-red-500 text-xs italic">Insira um email válido.</p>
                }
              </div>
              <div className="mb-4">
                <label className="block text-slate-700 text-sm font-bold mb-2" htmlFor="password">
                  Senha
                </label>
                <div className="flex items-center w-full gap-3 text-slate-700 bg-white py-2 px-3 shadow appearance-none border rounded-lg">
                  <MdLockOutline />
                  <input {...register("password", { required: true })} className="bg-transparent outline-none w-full text-sm text-slate-700" id="password" type={isPassword ? 'password' : 'text'} placeholder="******" />
                  {
                    isPassword ? <IoMdEye className="cursor-pointer text-lg text-slate-500" onClick={() => setIsPassword(!isPassword)} /> : <IoMdEyeOff className="cursor-pointer text-lg text-slate-500" onClick={() => setIsPassword(!isPassword)} />
                  }
                </div>
                {
                  errors.password && <p className="text-red-500 text-xs italic">Insira uma senha válido.</p>
                }
              </div>
              <div className="items-center gap-2 flex md:hidden justify-end mb-3">
                <span className="text-slate-700 text-xs font-light">Novo por aqui?</span>
                <button className="rounded-lg text-sm text-[#6d68d7] font-semibold">
                  Registrar
                </button>
              </div>
              <div className="gap-2 hidden md:flex justify-end my-2">
                <span className="text-slate-700 text-xs font-light">Novo por aqui?</span>
                <button className="text-sm text-[#6d68d7] hover:text-[#6d68d7]/80 font-semibold border-[#6d68d7] transition-all">
                  Registrar
                </button>
              </div>
              <div className="flex items-center justify-between">
                <button className="w-full p-2 rounded-lg text-sm bg-[#6d68d7] text-white font-semibold border border-slate-300 shadow-xl hover:shadow-none hover:translate-y-0.5 hover:bg-[#6d68d7]/80 transition-all" type="submit">
                  Acessar conta
                </button>
              </div>
            </form>
          </div>

          <div className="flex justify-center">
            <span className="text-slate-500 text-sm">&copy;2024 Stevanini Design Studio</span>
          </div>
        </div>
      </div>
      <div className="hidden md:flex w-full">
        <Image className="rounded-3xl w-full h-[550px] shadow-2xl" alt="Background Login" src={background} />
      </div>
    </div>
  );
}
