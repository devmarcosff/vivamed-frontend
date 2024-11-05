'use client'

import { Dialog, DialogBackdrop, DialogPanel, DialogTitle } from '@headlessui/react';
import axios from 'axios';
import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { useEffect, useState } from 'react';
import { useForm } from 'react-hook-form';
import { ImSpinner2 } from "react-icons/im";
import { toast } from 'react-toastify';

interface CadastroCidadao {
  name: string,
  role: string,
  tecResponsavel: string
}

export default function AgendarConsulta({ openAgenda, closeAgenda }: any) {
  const { register, handleSubmit, formState: { errors, isSubmitting }, reset } = useForm();
  const token = Cookie.get('accessToken');
  const [consulta, setConsulta] = useState<any>()
  const [medicamento, setMedicamento] = useState<any>(false)
  const [cidadao, setCidadao] = useState<any>([])
  const [colaborador, setColaborador] = useState<any>([])
  const [user, setUser] = useState<CadastroCidadao | undefined>()
  const [loading, setLoading] = useState(false);

  const agendarConsulta = async (data: any) => {
    var consulta = {
      "prontuario": data.prontuario,
      "tecResponsavel": data.tecResponsavel,
      "horaconsulta": data.horaconsulta,
      "dataconsulta": data.dataconsulta,
      "recorrente": data.recorrente
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/agendasconsulta`, consulta, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      closeAgenda(false)
      reset()
      toast.success(`Consulta agendada com sucesso. Data: ${data.dataconsulta}`, {
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
    })
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setCidadao(e.data)).catch(e => console.log(e))

      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setColaborador(e.data)).catch(e => console.log(e))
    }
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
    <Dialog open={openAgenda} onClose={closeAgenda} className="relative z-[100]">
      <DialogBackdrop
        transition
        className="fixed inset-0 bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 w-full sm:w-1/2 data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>
            <div className={`flex flex-col sm:h-full overflow-y-auto`}>
              <div>
                <div className='flex h-full items-center justify-between p-3 bg-cyan-800 sm:shadow sm:bg-white sm:text-gray-600'>
                  <DialogTitle as="h3" className="text-base font-semibold leading-6 sm:text-gray-600 text-white">
                    Agendamento de consulta
                  </DialogTitle>

                  <button className='text-white flex sm:hidden font-semibold border rounded-md px-3 py-1 hover:bg-white hover:text-black transition-all' onClick={() => { closeAgenda(false) }}>X</button>
                </div>
              </div>
              <div className="p-3">
                <form className="w-full" onSubmit={handleSubmit(agendarConsulta)}>
                  <h2 className='text-gray-600'>Preencha as Informações da consulta</h2>
                  <div className="flex flex-wrap -mx-3 my-3 text-left">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                        Paciente *
                      </label>
                      <select {...register('prontuario')} name="prontuario" id="prontuario" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
                        <option value="">Selecione um paciente</option>
                        {cidadao.map((item: any, index: any) => <option value={item.prontuario} key={index}>{item.nome}</option>)}
                      </select>
                      {
                        errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um paciente</p>
                      }
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-0">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tecResponsavel">
                        Responsável técnico *
                      </label>
                      <select {...register('tecResponsavel')} name="tecResponsavel" id="tecResponsavel" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
                        <option value="">Selecione um colaborador</option>
                        {
                          colaborador.map((item: any, index: any) => <option value={item.id} key={index}>{item.name}</option>)
                        }
                      </select>
                      {
                        errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um colaborador</p>
                      }
                    </div>
                    <div className="w-full md:w-1/2 px-3 my-2">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="dataconsulta">
                        Data da consulta *
                      </label>
                      <input {...register('dataconsulta', { required: 'Por favor preencha este campo' })} className={`${errors.dataconsulta && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="dataconsulta" type="date" />
                      {
                        errors.dataconsulta && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                      }
                    </div>
                    <div className="w-full md:w-1/4 px-3 my-2">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="horaconsulta">
                        Hora da consulta *
                      </label>
                      <input {...register('horaconsulta', { required: 'Por favor preencha este campo' })} className={`${errors.horaconsulta && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="horaconsulta" type="time" />
                      {
                        errors.horaconsulta && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                      }
                    </div>
                    <div className="w-full md:w-1/4 px-3 my-2">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="recorrente">
                        Usuário recorrente
                      </label>
                      <select {...register('recorrente')} name="recorrente" id="recorrente" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
                        <option value={String(false)}>Não</option>
                        <option value={String(true)}>Sim</option>
                      </select>
                      {
                        errors.recorrente && <p className="text-red-500 text-xs italic">Por favor selecione um colaborador</p>
                      }
                    </div>
                    {/* <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                            Responsável técnico *
                          </label>
                          {user && (
                            <input {...register('respTec',)} value={user.name} className={`${errors.respTec && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-500 font-semibold border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="name" type="text" />
                          )}
                          {
                            errors.respTec && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                          }
                        </div> */}
                  </div>
                  {/* <hr className='my-3' />
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
                      </div> */}

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
                        closeAgenda(false)
                        reset()
                      }}
                      className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
                    >
                      Cancelar
                    </button>
                  </div>
                </form>
              </div>
            </div>
          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}
