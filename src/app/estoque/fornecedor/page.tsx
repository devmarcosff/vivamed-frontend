"use client"

import { SidebarTrue } from "@/components/Sidebar";
import axios from "axios";
import Cookie from 'js-cookie';
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { AiOutlineLoading3Quarters } from "react-icons/ai";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaCheck, FaLink, FaWhatsapp } from "react-icons/fa";
import ReactInputMask from "react-input-mask";
import { toast } from "react-toastify";

export default function Fornecedor() {
  const token = Cookie.get('accessToken')
  const [currentStep, setCurrentStep] = useState<any>('');
  const [fornecedores, setFornecedores] = useState([]);
  const [showSuccess, setShowSuccess] = useState('');
  const [showMessage, setShowMessage] = useState('');
  const [userId, setUserId] = useState<any>();
  const [showLoading, setShowLoading] = useState(false);
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm()

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/fornecedor`).then((res) => {
      setFornecedores(res.data)
    }).catch(e => alert(e))

  }, [currentStep === 'cadastro'])

  const Card = ({ title, description, children }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-allintra-primary-50 h-full">
      <div className="p-6">
        <h2 className="text-xl font-semibold text-allintra-black-500">{title}</h2>
        <p className="mt-1 text-sm text-allintra-gray-500">{description}</p>
      </div>
      <div className="px-6 pb-6">
        {children}
      </div>
    </div>
  );

  const handleSupplierSubmit = (e: any) => {
    const cadastro = { nome: e.nome, cnpj: e.cnpj, email: e.email, contato: e.contato }
    const address = {
      street: e.street,
      city: e.city,
      cep: e.cep,
      state: e.state,
      num: e.num,
      userId: userId
    }

    {
      currentStep == 'endereco' ? (
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/address/criarfornecedor`, address, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then((e) => {
          setShowSuccess('sucesso');
          setShowLoading(true)
          toast.success(`Endereço cadastrado com sucesso.`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
          setTimeout(() => {
            setCurrentStep('cadastro');
          }, 3000)
        }).catch(e => {
          setShowSuccess('erro');
          setShowMessage(e.response.data.message);
          setShowLoading(true)
          reset()
          toast.error(`${e.response.data.message}`, {
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
            setShowLoading(false)
            setShowSuccess('');
            reset()
          }, 3000)
        })
      ) : (
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/fornecedor`, cadastro, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then((e) => {
          setShowSuccess('sucesso');
          setShowLoading(true)
          setUserId(cadastro.cnpj)
          setCurrentStep('endereco');
          toast.success(`${e.data}`, {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }).catch(e => {
          setShowSuccess('erro');
          setShowMessage(e.response.data.message);
          setShowLoading(true)
          toast.error(`Falha ao cadastrar fornecedor.`, {
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
            setShowLoading(false)
            setShowSuccess('');
          }, 3000)
          reset()
        })
      )
    }
  }

  return (
    <div className="flex">
      <SidebarTrue />

      <div className="bg-gradient-to-br from-allintra-primary-800/35 to-allintra-primary-50 to-80% p-4 flex flex-col gap-4 w-full md:mt-0 mt-16">
        <div className="w-full flex flex-col">

          {showSuccess == 'sucesso' ? (
            <div className={`mb-4 p-4 h-full border ${showLoading && 'animate-scaleIn'} border-green-200 bg-green-50 rounded-xl`}>
              <div className="flex items-center">
                <AiOutlineLoading3Quarters className={`${showLoading && 'animate-spin'} h-4 w-4 text-allintra-success-500 mr-2`} />
                {/* <FaCheck className={`h-4 w-4 text-allintra-success-500 mr-2`} /> */}
                <div>
                  <h3 className="text-sm font-medium text-green-800">Parabéns!!!</h3>
                  <p className="text-sm text-green-700">
                    Cadastrado realizado com sucesso.
                  </p>
                </div>
              </div>
            </div>
          ) : showSuccess == 'erro' && (
            <div className={`mb-4 p-4 h-full border border-allintra-error-500 bg-allintra-error-50 rounded-xl ${showLoading && 'animate-scaleIn'}`}>
              <div className="flex items-center">
                <div className="relative">
                  <AiOutlineLoading3Quarters className={`${showLoading && 'animate-spin'} h-4 w-4 text-allintra-error-500 mr-2`} />
                </div>
                <div>
                  <h3 className="text-sm font-medium text-allintra-error-500">Falha ao cadastrar fornecedor</h3>
                  <p className="text-sm text-allintra-error-400">
                    {showMessage}
                  </p>
                </div>
              </div>
            </div>
          )}

          {
            currentStep == "endereco" ? (
              <Card
                title="Cadastro de Endereço"
                description="Insira as informações do endereço"
              >
                <form onSubmit={handleSubmit(handleSupplierSubmit)} className="space-y-4">
                  <div className="grid grid-cols-3 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="street">Rua / Logadouro</label>
                      <input
                        {...register('street')}
                        className={`${errors.street && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                        id="street"
                        type="text"
                        placeholder="Rua da empresa"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="city">Cidade</label>
                      <input
                        {...register('city', { required: 'Por favor preencha este campo' })}
                        type='text'
                        id="city"
                        placeholder="Bom Jesus do Itabapoana"
                        required
                        className={`${errors.city && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="state">Estado</label >
                      <input
                        {...register('state', { required: 'Por favor preencha este campo' })}
                        type='text'
                        id="state"
                        placeholder="Rio de Janeiro"
                        required
                        className={`${errors.state && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cep">CEP</label >
                      <input
                        {...register('cep')}
                        className={`${errors.cep && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                        id="cep"
                        type="text"
                        placeholder="28360-000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="num">Número</label >
                      <input
                        {...register('num')}
                        className={`${errors.num && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                        id="num"
                        type="text"
                        placeholder="28360-000"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="userId">Fornecedor</label >
                      <input
                        {...register('userId')}
                        className={`${errors.userId && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                        id="userId"
                        value={userId}
                        type="text"
                        placeholder={`${userId}`}
                        disabled
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {
                      !showLoading ? (
                        <button type="submit" className="inline-flex w-full sm:w-36 justify-center rounded-xl bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3">
                          Finalizar
                          <FaCheck className="ml-2 h-4 w-4" />
                        </button>
                      ) : (
                        <button type="submit" disabled className="inline-flex w-full sm:w-36 justify-center rounded-xl bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3">
                          <>
                            <AiOutlineLoading3Quarters className={`${showLoading && 'animate-spin'} h-4 w-4 text-white mr-2`} />
                          </>
                        </button>
                      )
                    }
                  </div>
                </form>
              </Card>
            ) : (
              <Card
                title="Cadastro de Fornecedor"
                description="Insira as informações do fornecedor"
              >
                <form onSubmit={handleSubmit(handleSupplierSubmit)} className="space-y-4">
                  <div className="grid grid-cols-4 gap-4">
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="nome">Nome da Empresa / Razão Social</label>
                      <input
                        {...register('nome', { required: 'Por favor preencha este campo' })}
                        className={`${errors.nome && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                        id="nome"
                        placeholder="Nome da empresa"
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="cnpj">CNPJ</label>
                      <ReactInputMask
                        {...register('cnpj', { required: 'Por favor preencha este campo' })}
                        type='text'
                        id="cnpj"
                        mask="99.999.999/9999-99"
                        placeholder="00.000.000/0000-00"
                        required
                        className={`${errors.cnpj && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="email">Email</label>
                      <input
                        {...register('email', { required: 'Por favor preencha este campo' })}
                        className={`${errors.email && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                        id="email"
                        type="email"
                        placeholder="email@empresa.com"
                        required
                      />
                    </div>
                    <div className="space-y-2">
                      <label className="block text-sm font-medium text-gray-700 mb-1" htmlFor="contato">Telefone</label>
                      <ReactInputMask
                        {...register('contato', { required: 'Por favor preencha este campo' })}
                        type='text'
                        id="contato"
                        mask="(99) 99999-9999"
                        placeholder="(00) 00000-0000"
                        required
                        className={`${errors.contato && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded-xl py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}
                      />
                    </div>
                  </div>

                  <div className="flex justify-end">
                    {
                      !showLoading ? (
                        <button type="submit" className="inline-flex w-full sm:w-36 justify-center rounded-xl bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3">
                          Próximo
                          <ChevronRight className="ml-2 h-4 w-4" />
                        </button>
                      ) : (
                        <button type="submit" disabled className="inline-flex w-full sm:w-36 justify-center rounded-xl bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3">
                          <>
                            <AiOutlineLoading3Quarters className={`${showLoading && 'animate-spin'} h-4 w-4 text-white mr-2`} />
                          </>
                        </button>
                      )
                    }
                  </div>
                </form>
              </Card>
            )
          }
        </div>

        <div className="w-full h-full">
          <Card
            title="Lista de Fornecedores"
            description="Ver informações do fornecedor"
          >
            {
              fornecedores.length ? (
                <div className='overflow-auto rounded-xl shadow-sm'>
                  <table className="table-auto w-full bg-white">
                    <thead className='bg-cyan-50 border-b-2 border-white'>
                      <tr>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>Nome da Empresa / Razão Social</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>CNPJ</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>E-mail</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>Telefone</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>Data de cadastro</th>
                        <th className='py-5 px-2 text-center text-nowrap border-r-2 border-white'>Entrar em contato</th>
                      </tr>
                    </thead>
                    <tbody className='text-sm'>
                      {
                        fornecedores && Array.isArray(fornecedores) ? fornecedores?.map((item: any, index: any) => {
                          moment.locale('pt')
                          return (
                            <tr key={index} className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`} onClick={() => console.log(item)}>
                              <td className="px-3 py-3 group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[200px]">{item.nome}</td>
                              <td className="px-3 py-3 text-left group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[120px]">{item.cnpj}</td>
                              <th className="py-3 text-left max-w-44 truncate cursor-pointer">{item.email || "-"}</th>
                              <th className="py-3 text-left max-w-44 truncate cursor-pointer">{item.contato || "-"}</th>
                              <th className="py-3 text-left max-w-44 truncate cursor-pointer">{moment(item.createAt).format('DD/MM/YYYY - HH:mm') || "-"}</th>
                              <th className="py-3 text-left max-w-44 truncate cursor-pointer">
                                <div className="flex gap-2 items-center justify-center">
                                  <FaWhatsapp className="h-7 w-7 bg-allintra-success-500 p-1 rounded-xl shadow-sm text-white transition-all text-xl flex items-center justify-center" />
                                  <BsFillTelephoneFill className="h-7 w-7 bg-allintra-gray-700 p-1 rounded-xl shadow-sm text-white transition-all text-xl flex items-center justify-center" />
                                  <FaLink className="h-7 w-7 bg-allintra-gray-700 p-1 rounded-xl shadow-sm text-white transition-all text-xl flex items-center justify-center" />
                                </div>
                              </th>
                            </tr>
                          )
                        }) :
                          <tr className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`}>
                            <td className="px-3 py-3 group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[200px]"></td>
                            <td className="px-3 py-3 text-left group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[120px]"></td>
                            <th className="py-3 text-left max-w-44 truncate cursor-pointer"><span className='font-semibold text-gray-600'>Não existe fornecedores cadastrados</span></th>
                            <th className="py-3 text-left max-w-44 truncate cursor-pointer"></th>
                            <th className="py-3 text-left max-w-44 truncate cursor-pointer"></th>
                            <th className="py-3 text-left max-w-44 truncate cursor-pointer"></th>
                          </tr>
                      }
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='bg-cyan-50 py-5 border-white text-center m-3 rounded-xl shadow-sm'>
                  <span className='font-semibold text-gray-600'>Não existe fornecedores cadastrados</span>
                </div>
              )
            }
          </Card>
        </div>
      </div >
    </div >
  );
}
