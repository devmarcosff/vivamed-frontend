'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from 'react-icons/im';
import ReactInputMask from 'react-input-mask';
import { toast } from 'react-toastify';
import getCookie from './getCookie';

export default function CadastrarCidadaoModal({ openModal, closeModal, senhaCidadao }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const [isSenha, setIsSenha] = useState<any>()
  const [isRegistro, setIsRegistro] = useState<any>()
  const token = Cookie.get('accessToken');
  const [loading, setLoading] = useState(false);
  const [role, setRole] = useState<any>('')

  useEffect(() => {
    const isGetCookie = getCookie()
    setRole(isGetCookie)
  }, [])

  const createColaborador = async (data: any) => {
    var cadastro = {
      "name": data.name,
      "cpf": data.cpf,
      "birthday": data.birthday,
      "role": data.role,
      "idProf": data.idProf,
      "username": data.username,
      "password": `${senhaCidadao}`
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/user`, cadastro, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      setLoading(true)
      setTimeout(() => {
        toast.success("Colaborador cadastrado com sucesso.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
        reset()
        setIsSenha(senhaCidadao)
        setIsRegistro(cadastro)
      }, 1000);
    }).catch(e => {
      setLoading(true)
      setTimeout(() => {
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
        reset()
      }, 1000);
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    })
  }

  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white w-full text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full sm:max-w-[80%] data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col">

                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  {
                    isSenha ? (
                      <div>
                        <div className='flex items-center gap-3'>
                          <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                            <UserPlusIcon aria-hidden="true" className="h-6 w-6 text-cyan-800" />
                          </div>
                          <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                            Colaborador cadastrado com sucesso
                          </DialogTitle>
                        </div>
                        <div className='bg-gray-100 rounded shadow-md my-6 p-5'>
                          <h2 className='mb-3'>Informações do cadastro colaborador:</h2>
                          <p className='capitalize'><span className='font-semibold'>Nome:</span> {isRegistro.name || 'Undefined'}</p>
                          <p className='capitalize'><span className='font-semibold'>Função:</span> {isRegistro.role || 'Undefined'}</p>
                          <p><span className='font-semibold'>Usuário:</span> {isRegistro.username || 'Undefined'}</p>
                          <p><span className='font-semibold'>Senha:</span> {isRegistro.password || 'Undefined'}</p>
                        </div>

                        <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            onClick={() => {
                              reset()
                              setIsSenha(!senhaCidadao)
                            }}
                            className="inline-flex w-full justify-center rounded-md bg-cyan-800 hover:bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3 sm:w-auto"
                          >
                            Novo colaborador
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              reset()
                              closeModal(false)
                              setIsSenha(!senhaCidadao)
                            }}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Sair
                          </button>
                        </div>
                      </div>
                    )
                      : (
                        <>
                          <div className='flex items-center gap-3'>
                            <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                              <UserPlusIcon aria-hidden="true" className="h-6 w-6 text-cyan-800" />
                            </div>
                            <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                              Novo cadastro de colaborador
                            </DialogTitle>
                          </div>
                          <form className="w-full mt-10" onSubmit={handleSubmit(createColaborador)}>
                            <h2 className='font-bold'>Informações pessoais</h2>
                            <div className="flex flex-wrap -mx-3 my-4 text-left">
                              <div className="w-full md:w-1/3 px-3 my-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                  Nome completo *
                                </label>
                                <input {...register('name', { required: 'Por favor preencha este campo' })} className={`${errors.name && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="name" type="text" placeholder="Informe o prontuário do paciente" />
                                {
                                  errors.name && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                }
                              </div>
                              <div className="w-full md:w-1/3 px-3 my-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf">
                                  cpf *
                                </label>
                                <ReactInputMask
                                  {...register('cpf', { required: 'Por favor preencha este campo' })}
                                  type='tel'
                                  id="cpf"
                                  mask="999.999.999-99"
                                  placeholder='999.999.999-99'
                                  className={`${errors.telContato && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                />
                                {/* <input {...register('cpf', { required: 'Por favor preencha este campo' })} className={`${errors.cpf && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="cpf" type="text" placeholder="000.000.000-00" /> */}
                                {
                                  errors.cpf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                }
                              </div>
                              <div className="w-full md:w-1/3 px-3 my-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birthday">
                                  Data de nascimento *
                                </label>
                                <ReactInputMask
                                  {...register('birthday', { required: 'Por favor preencha este campo' })}
                                  type='text'
                                  id="birthday"
                                  mask="99/99/9999"
                                  placeholder='01/01/1999'
                                  className={`${errors.telContato && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`}
                                />
                                {/* <input {...register('birthday', { required: 'Por favor preencha este campo' })} className={`${errors.birthday && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="birthday" type="date" /> */}
                                {
                                  errors.birthday && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                }
                              </div>
                              <div className="w-full md:w-1/3 px-3 my-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="idProf">
                                  Identificação do profissional *
                                </label>
                                <input {...register('idProf', { required: 'Por favor preencha este campo' })} className={`${errors.idProf && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="idProf" type="text" placeholder="000000" />
                                {
                                  errors.idProf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                }
                              </div>
                              <div className="w-full md:w-1/3 px-3 my-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="role">
                                  Função do colaborador *
                                </label>
                                <select {...register('role')} name="role" id="role" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
                                  <option value="">Selecione uma frequencia</option>
                                  {
                                    (role === "coordenadorcaps" || role === "admin") && (
                                      <>
                                        <option value="coordenadorcaps">Coordenador Caps</option>
                                        <option value="administrativocaps">Administrador Caps</option>
                                        <option value="farmaceuticocaps">Farmaceutico Caps</option>
                                        <option value="enfermeirocaps">Enfermeiro Caps</option>
                                        <option value="medicocaps">Médico Caps</option>
                                      </>
                                    )
                                  }
                                  {
                                    (role === "coordenadorfarmacia" || role === "admin") && (
                                      <>
                                        <option value="coordenadorfarmacia">Coordenador Farmácia</option>
                                        <option value="administrativofarmacia">Administrador Farmacia</option>
                                        <option value="farmaceuticofarmacia">Farmaceutico Farmacia</option>
                                        <option value="enfermeirofarmacia">Enfermeiro Farmácia</option>
                                        <option value="medicofarmacia">Médico Farmácia</option>
                                      </>
                                    )
                                  }
                                </select>
                                {
                                  errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um paciente</p>
                                }
                              </div>
                              <div className="w-full md:w-1/3 px-3 my-2">
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="username">
                                  Usuário *
                                </label>
                                <input {...register('username', { required: 'Por favor preencha este campo' })} className={`${errors.username && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="username" type="text" placeholder="Usuário" />
                                {
                                  errors.username && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                }
                              </div>
                            </div>

                            <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                              <button
                                type="submit"
                                disabled={loading}
                                className="inline-flex w-full sm:w-44 justify-center rounded-md bg-cyan-800 hover:bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3"
                              >
                                {loading ? <ImSpinner2 className='animate-spin text-lg text-center' /> : "Inserir colaborador"}
                              </button>
                              <button
                                type="button"
                                onClick={() => {
                                  closeModal(false)
                                  reset()
                                }}
                                className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                              >
                                Cancelar
                              </button>
                            </div>
                          </form>
                        </>
                      )
                  }
                </div>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}
