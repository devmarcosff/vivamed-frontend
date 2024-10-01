'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import { UserPlusIcon } from '@heroicons/react/24/outline';
import axios from 'axios';
import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';


interface CadastroCidadao {
  name: string,
  role: string,
  idProf: string
}

export default function CadastrarConsulta({ openModal, closeModal }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const token = Cookie.get('accessToken');
  const [consulta, setConsulta] = useState<any>()
  const [cidadao, setCidadao] = useState<any>([])
  const [user, setUser] = useState<any>()

  const createCidadao = async (data: any) => {

    var consulta = {
      "prontuario": data.prontuario,
      "respTec": data.respTec,
      "role": data.role,
      "idProf": data.idProf,
      "descricao": data.descricao
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, consulta, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => { e.data !== 'Cidadão já está cadastrado.' && setConsulta(consulta) }).catch(e => console.log(e))
  }

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => setCidadao(e.data)).catch(e => console.log(e))
  }

  useEffect(() => {
    // Verifica se está no lado do cliente
    if (typeof window !== 'undefined') {
      const token = Cookie.get('accessToken');
      if (token) {
        const decoded = jwtDecode<CadastroCidadao>(`${token}`)
        setUser(decoded);
      }
    }

    fetchData()
  }, []);

  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-end sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white w-full text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full ${consulta ? 'sm:max-w-[40%]' : 'sm:max-w-[80%]'} data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>
            <div className="bg-white px-4 pb-4 pt-5 sm:p-6 sm:pb-4">
              <div className="flex flex-col">

                {
                  consulta ? (
                    <div>
                      <div className='flex items-center gap-3'>
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <UserPlusIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                        </div>
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Consulta realizada com sucesso!
                        </DialogTitle>
                      </div><hr className='my-3' />
                    </div>
                  ) : (
                    <div>
                      <div className='flex items-center gap-3'>
                        <div className="mx-auto flex h-12 w-12 flex-shrink-0 items-center justify-center rounded-full bg-green-100 sm:mx-0 sm:h-10 sm:w-10">
                          <UserPlusIcon aria-hidden="true" className="h-6 w-6 text-green-600" />
                        </div>
                        <DialogTitle as="h3" className="text-base font-semibold leading-6 text-gray-900">
                          Realizar consulta
                        </DialogTitle>

                      </div>
                      <hr className='my-3' />
                    </div>
                  )
                }
                <div className="mt-3 text-center sm:ml-4 sm:mt-0 sm:text-left">
                  {
                    consulta ? (
                      <div>
                        <div className='bg-gray-100 my-10 p-10 flex justify-around items-center shadow-md rounded'>
                          <div className='bg-white rounded shadow-md p-5 text-gray-700'>
                            <h2 className='font-bold'>Informações da consulta realizada</h2>
                            <p>Prontuario: {consulta.prontuario}</p>
                            <p>Responsável Técnico: {consulta.respTec}</p>
                            <p>Função: {consulta.role}</p>
                            <p className='font-bold'>Descrição da consulta: </p>
                            <p className='truncate max-w-[300px]'>{consulta.descricao}</p>
                          </div>
                        </div>
                        <div className="bg-gray-50 px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            onClick={() => {
                              reset()
                              setConsulta(!consulta)
                            }}
                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
                          >
                            Novo cadastro
                          </button>
                          <button
                            type="button"
                            onClick={() => {
                              reset()
                              closeModal(false)
                            }}
                            className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                          >
                            Sair
                          </button>
                        </div>
                      </div>
                    ) : (
                      <form className="w-full" onSubmit={handleSubmit(createCidadao)}>
                        <h2 className='font-bold'>Informações pessoais</h2>
                        <div className="flex flex-wrap -mx-3 my-3">
                          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                              Paciente *
                            </label>
                            <select {...register('prontuario')} name="prontuario" id="prontuario" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
                              <option value="">Selecione um paciente</option>
                              {
                                cidadao.map((item: any, index: any) => <option value={item.prontuario} key={index}>{item.name}</option>)
                              }
                            </select>
                            {
                              errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um paciente</p>
                            }
                          </div>
                          <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                              Responsável técnico *
                            </label>
                            <input {...register('respTec',)} value={user.name} className={`${errors.respTec && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="grid-first-name" type="text" />
                            {
                              errors.respTec && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                              Cargo *
                            </label>
                            <input {...register('role')} value={user.role} className={`${errors.role && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="grid-first-name" type="text" />
                            {
                              errors.role && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                          <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                              Id. Profissional *
                            </label>
                            <input {...register('idProf')} value={user.idProf} className={`${errors.role && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="grid-first-name" type="text" />
                            {
                              errors.idProf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <hr className='my-3' />
                        <h2 className='font-bold'>Adicionar informações a consulta</h2>
                        <div className="flex flex-wrap -mx-3 my-3">
                          <div className="w-full px-3 mb-6 md:mb-0">
                            <div>
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-city">
                                Informações da consulta
                              </label>
                              <textarea rows={10} {...register('descricao', { required: 'Por favor preencha este campo' })} placeholder='Preencha com as informações da consulta realizada.' id="descricao" name="descricao" className={`${errors.descricao && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                              {
                                errors.descricao && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                              }
                            </div>
                          </div>
                        </div>

                        <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                          <button
                            type="submit"
                            className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
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
