'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from "react-icons/im";
import { toast } from 'react-toastify';
import getCookie from './getCookie';

interface CadastroCidadao {
  id: string,
  name: string,
  role: string,
  idProf: string
}

export default function CadastrarConsulta({ openModal, closeModal }: any) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const token = Cookie.get('accessToken');
  const [consulta, setConsulta] = useState<any>()
  const [medicamento, setMedicamento] = useState<any>(false)
  const [cidadao, setCidadao] = useState<any>([])
  const [user, setUser] = useState<CadastroCidadao | undefined>()
  const [loading, setLoading] = useState(false);

  const createMedicamento = async (data: any) => {
    var medicamentos = {
      "prescricao": data.prescricao,
      "quantidade": data.quantidade,
      "use": data.use,
      "cidadao": `${consulta}`
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/medicamentos`, medicamentos, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(() => {
      setLoading(true)
      setTimeout(() => {
        setMedicamento(!medicamento)
        setConsulta(!consulta)
        reset()
        closeModal(false)
        toast.success("Medicamento inserido com sucesso.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    }).catch(e => {
      setLoading(true)
      setTimeout(() => {
        toast.error("Erro ao adicionar medicamento.", {
          position: "bottom-right",
          autoClose: 5000,
          hideProgressBar: false,
          closeOnClick: true,
          pauseOnHover: true,
          draggable: true,
          progress: undefined,
          theme: "light",
        });
      }, 1000);
    }).finally(() => {
      setTimeout(() => {
        setLoading(false)
      }, 1000);
    })
  }

  const createCidadao = async (data: any) => {
    var consulta = {
      "prontuario": data.prontuario,
      "respTec": user?.id,
      "role": data.role,
      "idProf": data.idProf,
      "descricao": data.descricao
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, consulta, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      // setLoading(true)
      // setTimeout(() => {
      setConsulta(e.data)
      toast.success("Consulta inserida com sucesso.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // }, 1000);
    }).catch(e => {
      // setLoading(true)
      // setTimeout(() => {
      toast.error("Erro ao adicionar consulta.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      // }, 1000);
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setCidadao(e.data)).catch(e => console.log(e))
    }
    // Verifica se está no lado do cliente
    getCookie()

    fetchData()
  }, [token]);

  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full ${consulta ? 'sm:max-w-[40%]' : 'sm:max-w-[80%]'} data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>
            <div className={`flex flex-col sm:h-full overflow-y-auto`}>
              <div>
                <div className='flex h-full items-center justify-between p-3 bg-cyan-800 sm:shadow sm:bg-white sm:text-gray-600'>
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 sm:text-gray-600 text-white">
                    Realizar consulta
                  </DialogTitle>

                  <button className='text-white flex sm:hidden font-semibold border rounded-md px-3 py-1 hover:bg-white hover:text-black transition-all' onClick={() => { closeModal(false) }}>X</button>
                </div>
              </div>
              <div className="p-3">
                {
                  consulta ? (
                    <div>
                      <div>
                        {
                          medicamento ? (
                            <form className="w-full" onSubmit={handleSubmit(createMedicamento)}>
                              <h2 className='font-bold'>Adicionar medicamento</h2>
                              <div className="flex flex-wrap  bg-gray-50 my-3 p-3 shadow-md rounded">
                                <div className="w-full md:w-1/3 px-3 my-2">
                                  <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prescricao">
                                    Medicamento *
                                  </label>
                                  <select {...register('prescricao')} name="prescricao" id="prescricao" className={`shadow-md block w-full text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
                                    <option value="">Selecione um medicamento</option>
                                    <option value="dipirona">Dipirona</option>
                                    <option value="rivotril">Rivotril</option>
                                    <option value="alprazolam">Alprazolam</option>
                                  </select>
                                  {
                                    errors.prescricao && <p className="text-red-500 text-xs italic">Por favor selecione um medicamento</p>
                                  }
                                </div>
                                <div className="w-full md:w-1/3 px-3 my-2">
                                  <div>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="quantidade">
                                      Quantidade *
                                    </label>
                                    <input {...register('quantidade', { required: 'Por favor preencha este campo' })} type='text' placeholder='Quantidade' id="quantidade" name="quantidade" className={`${errors.quantidade && 'border-red-500'} appearance-none shadow-md block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                    {
                                      errors.quantidade && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                    }
                                  </div>
                                </div>
                                <div className="w-full md:w-1/3 px-3 my-2">
                                  <div>
                                    <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="use">
                                      Tempo de uso
                                    </label>
                                    <input {...register('use')} placeholder='6/6 horas' id="use" name="use" className={`${errors.quantidade && 'border-red-500'} appearance-none shadow-md block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} />
                                    {
                                      errors.use && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                    }
                                  </div>
                                </div>
                              </div>
                              <div className="px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
                                <button
                                  type="submit"
                                  className="inline-flex w-full sm:w-44 justify-center rounded-md bg-cyan-800 hover:bg-cyan-700 px-3 py-2 text-sm font-semibold text-white shadow-sm sm:ml-3"
                                >
                                  {loading ? <ImSpinner2 className='animate-spin text-lg text-center' /> : "Inserir medicamento"}
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
                            </form>
                          ) : (
                            <div className='bg-gray-50 p-10 shadow-md rounded text-center'>
                              <div>
                                <h2>Consulta adicionada ao paciente.</h2>
                                <h2>Deseja adicionar medicamentos a consulta?</h2>
                              </div>

                              <div className="px-4 py-3 flex justify-center gap-3 sm:px-6">
                                <button
                                  type="submit"
                                  onClick={() => {
                                    reset()
                                    setMedicamento(true)
                                  }}
                                  className="inline-flex w-full justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3 sm:w-auto"
                                >
                                  SIM
                                </button>
                                <button
                                  type="button"
                                  onClick={() => {
                                    reset()
                                    setConsulta(!consulta)
                                    closeModal(false)
                                  }}
                                  className="inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                                >
                                  NÃO
                                </button>
                              </div>
                            </div>
                          )
                        }
                      </div>
                    </div>
                  ) : (
                    <form className="w-full" onSubmit={handleSubmit(createCidadao)}>
                      <h2 className='font-bold text-left'>Preencha as Informações da consulta</h2>
                      <div className="flex flex-wrap -mx-3 my-3 text-left">
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Paciente *
                          </label>
                          <select {...register('prontuario')} name="prontuario" id="prontuario" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
                            <option value="">Selecione um paciente</option>
                            {
                              cidadao.map((item: any, index: any) => <option value={item.prontuario} key={index}>{item.nome}</option>)
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
                          {user && (
                            <input value={user.name} className={`${errors.respTec && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-500 font-semibold border rounded py-3 px-4 leading-tight focus:outline-none`} id="grid-first-name" type="text" />
                          )}
                          {
                            errors.respTec && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                          }
                        </div>
                        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Cargo *
                          </label>
                          {user && (
                            <input {...register('role')} value={user.role} className={`${errors.role && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-500 font-semibold capitalize border rounded py-3 px-4 leading-tight focus:outline-none`} id="grid-first-name" type="text" />
                          )}
                          {
                            errors.role && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                          }
                        </div>
                        <div className="w-full md:w-1/6 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="grid-first-name">
                            Id. Profissional *
                          </label>
                          {user && (
                            <input {...register('idProf')} value={user.idProf} className={`${errors.role && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-500 font-semibold border rounded py-3 px-4 leading-tight focus:outline-none`} id="grid-first-name" type="text" />
                          )}
                          {
                            errors.idProf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                          }
                        </div>
                      </div>
                      <hr className='my-3' />
                      <h2 className='font-bold text-left'>Adicionar informações a consulta</h2>
                      <div className="flex flex-wrap -mx-3 my-3 text-left">
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
                          disabled={isSubmitting}
                          className="inline-flex w-full sm:w-36 justify-center rounded-md bg-cyan-800 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3"
                        >
                          {isSubmitting ? <ImSpinner2 className='animate-spin text-lg text-center' /> : "Inserir consulta"}
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
          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}
