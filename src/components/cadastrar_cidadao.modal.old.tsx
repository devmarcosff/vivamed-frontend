'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookie from 'js-cookie';
import nookies from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';


interface CadastroCidadao {
  prontuario: string,
  name: string,
  cpf: string,
  birthday: Date,
  caps: boolean,
  username: string,
  password: string

  // Address
  street: string,
  city: string,
  num: string,
  cep: string,
  state: string
}

export default function CadastrarCidadaoModal({ openModal, closeModal }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const token = nookies.get(null, "accessToken")
  const [isRegistro, setIsRegistro] = useState<any>()
  const [isAddress, setIsAddress] = useState<any>()

  const createAddress = async (data: any) => {
    try {
      const token = Cookie.get('accessToken')
      var address = {
        "street": data.street,
        "city": data.city,
        "num": data.num,
        "cep": data.cep,
        "state": "RJ",
        "userId": isRegistro.prontuario
      }

      await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/address/cidadao`, address, {
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`
        },
      }).then(e => {
        closeModal(false)
        setIsAddress('')
        setIsRegistro('')
        reset()
      }).catch(e => console.log(e.message))
    } catch (error) {
      console.error('Erro ao criar endereço', error);
    }
  }

  const createCidadao = async (data: any) => {
    var cadastro = {
      "prontuario": data.prontuario,
      "name": data.name,
      "cpf": data.cpf,
      "birthday": data.birthday,
      "frequencia": data.frequencia || "NAO-INTENSIVO",
      "caps": data.caps,
      "password": "smsbj"
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, cadastro, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      setIsRegistro(cadastro)
      reset()
    }).catch(e => console.log(e))
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
            className={`relative transform overflow-hidden rounded-lg bg-white w-full text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full ${isRegistro ? 'sm:max-w-[40%]' : 'sm:max-w-[80%]'} data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col">

                {
                  isAddress ? (
                    <div className='flex items-center gap-3'>
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                        <UserPlusIcon aria-hidden="true" className="h-6 w-6 text-cyan-600" />
                      </div>
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Usuário cadastrado com sucesso!
                      </DialogTitle>
                    </div>
                  ) : (
                    <div className='flex items-center gap-3'>
                      <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-cyan-100 sm:mx-0 sm:h-10 sm:w-10">
                        <UserPlusIcon aria-hidden="true" className="h-6 w-6 text-cyan-600" />
                      </div>
                      <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                        Novo cadastro de paciente
                      </DialogTitle>
                    </div>
                  )
                }
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  {
                    isRegistro ? (
                      <form className="w-full mt-10" onSubmit={handleSubmit(createAddress)}>
                        <h2 className='font-bold'>Adicionar endereço</h2>
                        <div className="flex flex-wrap -mx-3 my-4 text-left">
                          <div className="w-full md:w-2/4 px-3 my-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street">
                              Logadouro
                            </label>
                            <input {...register('street', { required: 'Por favor preencha este campo' })} className={`${errors.street && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="street" type="text" placeholder="Av. Gov. Roberto Silveira" />
                            {
                              errors.street && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                          <div className="w-full md:w-2/4 px-3 my-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="num">
                              N°
                            </label>
                            <input {...register('num', { required: 'Por favor preencha este campo' })} className={`appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"`} id="num" type="text" placeholder="100" />
                          </div>
                          <div className="w-full md:w-2/4 px-3 my-2">
                            <div className='w-full'>
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                                Cidade / Destrito
                              </label>
                              <div className="relative">
                                <select {...register('city', { required: 'Por favor preencha este campo' })} className={`${errors.city && 'border-red-500'} block appearance-none shadow-md w-full bg-gray-200 border border-gray-200 text-gray-700 py-3 px-4 pr-8 rounded leading-tight focus:outline-none focus:bg-white focus:border-gray-500"`} id="city">
                                  <option>Bom Jesus do Itabapoana</option>
                                  <option>Usina Santa Maria</option>
                                </select>
                                <div className="pointer-events-none absolute inset-y-0 right-0 flex items-center px-2 text-gray-700">
                                  <svg className="fill-current h-4 w-4" xmlns="http://www.w3.org/2000/svg" viewBox="0 0 20 20"><path d="M9.293 12.95l.707.707L15.657 8l-1.414-1.414L10 10.828 5.757 6.586 4.343 8z" /></svg>
                                </div>
                              </div>
                              {
                                errors.city && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                              }
                            </div>
                          </div>
                          <div className="w-full md:w-2/4 px-3 my-2">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cep">
                              Cep
                            </label>
                            <input {...register('cep', { required: 'Por favor preencha este campo' })} className={`${errors.cep && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500"`} id="cep" type="text" placeholder="28360000" />
                            {
                              errors.cep && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>

                        <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                          >
                            Cadastrar
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              closeModal(false)
                              setIsAddress('')
                              setIsRegistro('')
                              reset()
                            }}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Cancelar
                          </button>
                        </div>
                      </form>
                    ) : (
                      <form className="w-full mt-10" onSubmit={handleSubmit(createCidadao)}>
                        <h2 className='font-bold text-left'>Informações pessoais</h2>
                        <div className="flex flex-wrap -mx-3 my-3 text-left">
                          <div className="w-full md:w-1/2 px-3 my-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                              Prontuário *
                            </label>
                            <input {...register('prontuario', { required: 'Por favor preencha este campo' })} className={`${errors.prontuario && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="prontuario" type="text" placeholder="Informe o prontuário do paciente" />
                            {
                              errors.prontuario && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                          <div className="w-full md:w-1/2 px-3 my-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                              Nome completo *
                            </label>
                            <input {...register('name', { required: 'Por favor preencha este campo' })} className={`${errors.name && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="name" type="text" placeholder="Informe o nome do paciente" />
                            {
                              errors.name && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                          <div className="w-full md:w-1/2 px-3 my-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birthday">
                              Data de nascimento *
                            </label>
                            <input {...register('birthday', { required: 'Por favor preencha este campo' })} className={`${errors.birthday && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="birthday" type="date" />
                            {
                              errors.birthday && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                          <div className="w-full md:w-1/2 px-3 my-3">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf">
                              CPF *
                            </label>
                            <input {...register('cpf', { required: 'Por favor preencha este campo' })} className={`${errors.cpf && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="cpf" type="text" placeholder="000.000.000.00" />
                            {
                              errors.cpf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full md:w-1/5 my-3">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="frequencia">
                            Frequencia do usuário *
                          </label>
                          <select {...register('frequencia')} name="frequencia" id="frequencia" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
                            <option value="">Selecione uma frequencia</option>
                            <option value="INTENSIVO">INTENSIVO</option>
                            <option value="SEMI-INTENSIVO">SEMI-INTENSIVO</option>
                            <option value="NAO-INTENSIVO">NAO-INTENSIVO</option>
                          </select>
                          {
                            errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um paciente</p>
                          }
                        </div>

                        <div className="flex flex-wrap my-3">
                          <div className="w-full px-3 md:mb-0 gap-2 flex items-center">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold" htmlFor="caps">
                              Declaro que este usuário está sobre a proteção e os serviços prestados pelo CAPS.
                            </label>
                            <input {...register('caps')} type='checkbox' defaultChecked name='caps' id='caps' />
                          </div>
                        </div>

                        <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-cyan-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-500 sm:ml-3 sm:w-auto"
                          >
                            Cadastrar
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
