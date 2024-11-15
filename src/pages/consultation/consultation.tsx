"use client"

import getCookie from '@/components/getCookie';
import { BoxInfo } from '@/components/stylesComponents/molecules/BoxInfo';
import { Drawer } from '@/components/stylesComponents/organisms/Drawer';
import { isNotCaps } from '@/components/types/routes.t';
import userDecoded from '@/components/userDecoded';
import { DialogTitle } from '@radix-ui/react-dialog';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { useForm } from 'react-hook-form';
import { BsClipboardPlusFill } from 'react-icons/bs';
import { IoIosInformationCircleOutline, IoMdAddCircleOutline, IoMdCheckmark, IoMdPrint } from 'react-icons/io';
import { MdDelete, MdModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import './style.css';

interface cidadao {
  createAt: string,
  descricao: string,
  id: string,
  paciente: string,
  prontuario: string,
  respTec: string,
  role: string,
  medicamentos: []
}

export default function Consultation() {
  const router = useRouter();
  const pathname = usePathname();
  const [consulta, setConsulta] = useState<any>()
  const [idConsulta, setIdConsulta] = useState<any>()
  const [drawer, setDrawer] = useState<any>('fechar')
  const [consultas, setConsultas] = useState<any>([])
  const [agendaConsulta, setAgendaConsulta] = useState<any>([])
  const [colaborador, setColaborador] = useState<any>([])
  const [medicamentos, setMedicamentos] = useState<any>([])
  const [role, setRole] = useState<any>([])
  const [decoded, setUser] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [criarMedicamentos, setCriarMedicamentos] = useState<any>([]);
  const token = Cookie.get('accessToken')
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm()

  const detalhesConsulta = async (detalheconsulta: any) => {
    setDrawer(`${'detalhesconsulta'}`)
    setConsulta(detalheconsulta)

    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consulta/${detalheconsulta.id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => {
      setMedicamentos(e.data.medicamentos)
    }).catch(e => console.log(e))
  }

  const abrirConsulta = () => {
    setDrawer(`${'abrir'}`)
  }

  const inserirConsulta = async (data: any) => {
    var consulta = {
      "idRespTec": decoded?.id,
      "prontuario": data.prontuario,
      "role": decoded?.role,
      "descricao": data.descricao,
    }

    const createMedicamento = async () => {
      const encontrarMedicamento = criarMedicamentos.some((item: any) => item.name && item.manha && item.tarde && item.noite)
      if (encontrarMedicamento === true) {
        const medicamentosComConsulta = criarMedicamentos.map((medicamento: any) => ({
          ...medicamento,
          consulta: localStorage.getItem('idConsulta'),  // A consulta vai ser passada para todos os medicamentos
        }));
        await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/medicamentos`, medicamentosComConsulta, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then(e => {
          setDrawer(`fechar`)
          localStorage.removeItem('idConsulta')
          setCriarMedicamentos([])
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
        })
      }
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, consulta, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      localStorage.setItem('idConsulta', e.data)
      reset()
      if (localStorage.getItem('idConsulta')) createMedicamento()
      setDrawer(`fechar`)
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
    }).catch(e => {
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
    })
  }

  const deletarMedicamento = async (id?: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/medicamentos/deletemany/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => {
      console.log('Deletando medicamento...')
      setDrawer(`fechar`)
      toast.success(`${e.data}`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
      console.log('Deletado')
    }).catch(e => {
      console.log(e.data)
      toast.error(`${e.data}`, {
        position: "bottom-right",
        autoClose: 2500,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });
    })
  }

  const deletarConsulta = async (id?: string) => {
    const idsMedicamentos = medicamentos.length > 0 ? medicamentos.map((med: any) => med.id).join(',') : null;
    const consultaAposMedicamento = async () => {
      try {
        console.log('Aguarde deletando consulta...')
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/consulta/${id}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(e => {
          console.log('Consulta deletada com sucesso')
          setDrawer(`fechar`)
          toast.success(`${e.data}`, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }).catch(e => {
          toast.error(`${e.data}`, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
      } catch (err) {
        console.log('Erro ao excluir consulta:', err)
      }
    }
    if (idsMedicamentos) {
      console.log('Aguarde deletando medicamento...')
      try {
        await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/medicamentos/deletemany/${idsMedicamentos}`, {
          headers: {
            Authorization: `Bearer ${token}`
          }
        }).then(e => {
          console.log('Medicamento deletado com sucesso')
          consultaAposMedicamento()
          toast.success(`${e.data}`, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        }).catch(e => {
          toast.error(`${e.data}`, {
            position: "bottom-right",
            autoClose: 2500,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
      } catch (err) {
        console.log('Erro ao excluir medicamento:', err)
      }
    } else { consultaAposMedicamento() }
  }

  const Icon = ({ id, open }: any) => {
    return (
      <svg
        xmlns="http://www.w3.org/2000/svg"
        fill="none"
        viewBox="0 0 24 24"
        strokeWidth={2}
        stroke="currentColor"
        className={`${id === open ? "rotate-180" : ""} h-3 w-3 transition-transform`}
      >
        <path strokeLinecap="round" strokeLinejoin="round" d="M19.5 8.25l-7.5 7.5-7.5-7.5" />
      </svg>
    );
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setConsultas(e.data)).catch(e => console.log(e))

      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/agendasconsulta/todos`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setAgendaConsulta(e.data)).catch(e => console.log(e))

      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setColaborador(e.data)).catch(e => console.log(e))
    }
    const isGetCookie = getCookie()
    userDecoded(setUser)
    setRole(isGetCookie)
    fetchData()
    isNotCaps(`${pathname}`)
  }, [drawer == 'fechar']);

  const adicionarMedicamento = () => {
    const novoMedicamento = { name: '', manha: '', tarde: '', noite: '' };
    setCriarMedicamentos((prevState: any) => [...prevState, novoMedicamento]);
  };

  const handleInputChange = (index: any, field: any, value: any) => {
    setCriarMedicamentos((prevState: any) =>
      prevState.map((criarMedicamentos: any, i: any) =>
        i === index ? { ...criarMedicamentos, [field]: value } : criarMedicamentos
      )
    );
  };

  const removerMedicamento = (indexToRemove: any) => {
    setCriarMedicamentos((prevState: any) => prevState.filter((_: any, index: any) => index !== indexToRemove));
  };

  return (
    <>
      <div className="bg-gradient-to-br from-allintra-primary-800/35 to-allintra-primary-50 to-80% my-3 shadow-sm rounded-md w-full max-h-full overflow-auto relative">
        <div className="flex lg:flex-row justify-between items-center w-full top-0 p-5 gap-3 sticky bg-white shadow-sm z-10">
          <h2 className='font-semibold'>Consultas realizadas</h2>
          <div className='flex gap-3 w-full sm:w-[initial]'>
            <button
              onClick={() => {
                abrirConsulta()
              }}
              className='px-3 py-2 text-allintra-primary-50 bg-allintra-primary-800 hover:bg-cyan-700 transition-all text-sm font-semibold shadow-md rounded-md flex gap-3 items-center justify-center'>
              <BsClipboardPlusFill size={20} />
              <span>Realizar consulta</span>
            </button>
          </div>
        </div>

        {
          consultas.length ? (
            <div className='overflow-auto rounded-md shadow-sm m-3 mb-10'>
              <table className="table-auto w-full bg-white">
                <thead className='bg-cyan-50 border-b-2 border-white'>
                  <tr>
                    <th className='py-5 px-2'>Prontuário</th>
                    <th className='py-5 px-2'>Paciente</th>
                    <th className='py-5 px-2 text-wrap'>Consulta realizada</th>
                    <th className='py-5 px-2 text-wrap'>Medicamento</th>
                    <th className='py-5 px-2'>Resp. Técnico</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-center'>
                  {
                    consultas.map((item: any, index: any) => {
                      moment.locale('pt')
                      return (
                        <tr key={index} className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`} onClick={() => detalhesConsulta(item)}>
                          <th className="py-3 text-center max-w-44 truncate cursor-pointer">{item.prontuario || "-"}</th>
                          <td className="py-3 text-center group-hover/item:underline group-hover/item:text-cyan-500">{item.paciente || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{!!item.createAt && moment(item.createAt).format("DD/MM/YYYY - HH:mm") || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.medicamentos.length ? 'Sim' : 'Não'}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.respTec || "-"}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <div className='bg-cyan-50 py-5 border-white text-center m-3 rounded-md shadow-sm'>
              <span className='font-semibold text-gray-600'>Não existe consultas realizadas</span>
            </div>
          )
        }
      </div >
      {/* Drawer Detalhes da Consulta */}
      <Drawer.Root open={drawer == 'detalhesconsulta'} onOpenChange={() => setDrawer('fechar')}>
        <Drawer.Content>
          <DialogTitle>
            <BoxInfo.Root type={`success`} className='mb-3'>
              <BoxInfo.Icon icon={IoMdCheckmark} type={'success'} />
              <BoxInfo.Message>Consulta inserida - {moment(consulta?.createAt).format("DD/MM/YYYY")}</BoxInfo.Message>
            </BoxInfo.Root>
          </DialogTitle>

          <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 h-[88%] flex flex-col justify-between relative'>
            <div>
              <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm z-10'>
                <h2 className='font-semibold text-allintra-gray-700'>Consulta inserida</h2>
                <div className='flex gap-3 items-center'>
                  <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <MdModeEditOutline />
                  </button>
                  <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <IoMdPrint />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap w-full my-0 p-4">
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Paciente</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.paciente}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Data realizada</span>
                  <div className='text-gray-800'>
                    <span>{moment(consulta?.createAt).format("DD/MM/YYYY")}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Responsável Técnico</span>
                  <div className='text-gray-800 flex flex-col'>
                    <span>{consulta?.respTec}</span>
                    <span className='text-allintra-gray-600'>@{consulta?.idRespTec}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Hora realizada</span>
                  <div className='text-gray-800'>
                    <span>{moment(consulta?.createAt).format("HH:mm")}</span>
                  </div>
                </div>

                <div className="w-full p-3 my-2 border-t">
                  <span className="text-allintra-gray-700 text-sm">Anamnese / Exame Clínico</span>
                  <div className="border shadow-sm p-5 text-gray-800 animate-scaleIn rounded bg-allintra-gray-300 hover:border-allintra-primary-500 w-full break-words whitespace-pre-line">
                    {consulta?.descricao}
                  </div>
                </div>

                {
                  medicamentos.length ? (
                    <div className="w-full py-3 my-2 border-t">
                      <span className='text-allintra-gray-700 text-sm'>Medicamentos</span>
                      <div className='text-gray-800 grid sm:grid-cols-4 grid-cols-1 gap-3'>
                        {
                          medicamentos.map((item: any, index: any) => (
                            <>
                              <ul key={index} className='bg-white shadow-sm group/delete rounded-md px-3 py-2 border relative z-0 hover:border-allintra-primary-500 transition-all animate-scaleIn'>
                                <li className='capitalize font-semibold'>{item.name}</li>
                                <li>Horário Manhã: {item.manha}</li>
                                <li>Horário Tarde: {item.tarde}</li>
                                <li>Horário Noite: {item.noite}</li>

                                <button
                                  onClick={() => deletarMedicamento(item.id)}
                                  className='group-hover/delete:flex hidden transition-all bg-allintra-error-50 border-allintra-error-500 hover:bg-red-100 absolute top-3 right-3 border rounded shadow-sm p-1'><MdDelete /></button>
                              </ul>
                            </>
                          ))
                        }
                      </div>
                    </div>
                  ) : ''
                }
              </div>
            </div>

            <div className='flex justify-between items-center w-full gap-3 bg-allintra-gray-300 px-4 py-2 sticky bottom-0 left-0'>
              <span className='text-allintra-gray-500 text-sm truncate w-full hidden sm:flex'>{consulta?.id}</span>
              <div className='flex gap-3 w-full sm:w-[initial]'>
                <button className='px-3 py-1 w-full sm:w-[120px] text-allintra-error-50 bg-red-400 hover:bg-red-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => deletarConsulta(consulta?.id)}>Deletar</button>
                <button className='px-3 py-1 w-full sm:w-[120px] text-allintra-attention-50 bg-orange-400 hover:bg-orange-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Editar Consulta')}>Remarcar</button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root >

      {/* Drawer Inserir Consulta */}
      < Drawer.Root open={drawer == 'abrir'
      } onOpenChange={() => setDrawer('fechar')} >
        <Drawer.Content>
          {
            agendaConsulta.length ? (
              <>
                <DialogTitle>
                  <BoxInfo.Root type={`primary`} className='mb-3'>
                    <BoxInfo.Icon icon={IoIosInformationCircleOutline} type={'primary'} />
                    <BoxInfo.Message>Inserir nova consulta - {moment().format("DD/MM/YYYY")}</BoxInfo.Message>
                  </BoxInfo.Root>
                </DialogTitle>

                <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 flex flex-col justify-between relative'>
                  <div>
                    <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm'>
                      <h2 className='font-semibold text-allintra-gray-700'>Preencha os dados da consulta</h2>
                      <div className='flex gap-3 items-center'>
                        <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                          <MdModeEditOutline />
                        </button>
                        <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                          <IoMdPrint />
                        </button>
                      </div>
                    </div>

                    <form className="w-full" onSubmit={handleSubmit(inserirConsulta)}>
                      <div className="flex flex-wrap p-5 text-left justify-between">
                        <div className="w-full md:w-2/3 px-3 mb-6 md:mb-3">
                          <div className='mb-3'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                              paciente *
                            </label>
                            <select
                              {...register('prontuario')}
                              name="prontuario"
                              id="prontuario"
                              className={`shadow-sm block w-full bg-white text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`}>
                              <option value={''}>Selecione um paciente</option>
                              {agendaConsulta?.map((item: any, index: any) => <option value={item?.prontuario} key={index}>{item?.paciente}</option>)}
                            </select>
                            {
                              errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um colaborador</p>
                            }
                          </div>
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="descricao">
                              Informações da consulta
                            </label>
                            <textarea rows={10} {...register('descricao', { required: 'Por favor preencha este campo' })} placeholder='Preencha com as informações da consulta realizada.' id="descricao" name="descricao" className={`${errors.descricao && 'border-red-500'} shadow-sm block w-full bg-white text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`} />
                            {
                              errors.descricao && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full md:w-1/3 px-3 mb-6 md:mb-0">
                          <div className='mb-3'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="respTec">
                              Técnico responsável *
                            </label>
                            {decoded.name && (
                              <input {...register('respTec')} value={decoded.name} disabled id="respTec" className={`shadow-sm block w-full bg-allintra-success-50 text-gray-700 border border-allintra-success-500 rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`} type="text" />
                            )}
                            {
                              errors.respTec && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                          <div className='mb-3'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="role">
                              Cargo do responsável *
                            </label>
                            {role && (
                              <input {...register('role')} value={role} disabled id="role" className={`shadow-sm block w-full bg-allintra-success-50 text-gray-700 border border-allintra-success-500 rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`} type="text" />
                            )}
                            {
                              errors.respTec && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                          <div className='mb-3'>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="idRespTec">
                              ID do responsável *
                            </label>
                            {decoded && (
                              <input {...register('idRespTec')} value={decoded.id} disabled className={`shadow-sm block w-full bg-allintra-success-50 text-gray-700 border border-allintra-success-500 rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`} id="idRespTec" type="text" />
                            )}
                            {
                              errors.idRespTec && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>

                        {/* ADICIONAR MEDICAMENTOS */}
                        {criarMedicamentos?.map((item: any, index: any) => (
                          <div className='w-full flex flex-wrap my-4 relative' key={index}>
                            <div className="w-full sm:w-1/4 px-3 py-3 border-t md:mb-0">
                              <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="name">
                                Medicamento *
                              </label>
                              <select onChange={e => handleInputChange(index, 'name', e.target.value)} name="name" id="name" className={`${errors.quantidade && 'border-red-500'} shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`}>
                                <option value={''}>Selecione um paciente</option>
                                <option value={'rivotril'}>Rivotril</option>
                                <option value={'dipirona'}>Dipirona</option>
                              </select>
                              {
                                errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um colaborador</p>
                              }
                            </div>
                            <div className="w-full sm:w-1/4 px-3 py-3 border-t md:mb-0">
                              <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="manha">
                                  Manhã
                                </label>
                                <input
                                  onChange={e => handleInputChange(index, 'manha', e.target.value)}
                                  type='text'
                                  placeholder='10'
                                  id="manha"
                                  name="manha"
                                  className={`${errors.manha && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                                {
                                  errors.manha && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                }
                              </div>
                            </div>
                            <div className="w-full sm:w-1/4 px-3 py-3 border-t md:mb-0">
                              <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="tarde">
                                  Tarde
                                </label>
                                <input
                                  type='text'
                                  placeholder='10'
                                  id="tarde"
                                  name="tarde"
                                  onChange={(e) => handleInputChange(index, 'tarde', e.target.value)}
                                  className={`${errors.tarde && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                                {
                                  errors.tarde && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                }
                              </div>
                            </div>
                            <div className="w-full sm:w-1/4 px-3 py-3 border-t md:mb-0">
                              <div>
                                <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="noite">
                                  Noite
                                </label>
                                <input onChange={e => handleInputChange(index, 'noite', e.target.value)} type='text' placeholder='10' id="noite" name="noite" className={`${errors.noite && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                                {
                                  errors.noite && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                                }
                              </div>
                            </div>
                            <div className="w-full px-3 md:mb-0 py-1">
                              <button
                                type="button"
                                onClick={() => removerMedicamento(index)}
                                className="
                                  absolute top-2 right-3 p-1
                                  text-allintra-error-500 border border-allintra-error-500 bg-allintra-error-50 hover:bg-allintra-error-500 hover:text-white transition-all text-sm font-semibold shadow-sm rounded"
                              ><MdDelete /></button>
                            </div>
                          </div>
                        ))}
                        <div className="w-full px-3 mb-3 py-3 border-t md:mb-0">
                          <button type="button" onClick={adicionarMedicamento}>
                            <span className='flex gap-2 items-center text-allintra-gray-700 font-semibold'><IoMdAddCircleOutline /> Adicionar medicamentos</span>
                          </button>
                        </div>

                      </div>
                      <div className='flex sm:flex-row sm:justify-between flex-col-reverse justify-end items-center w-full gap-3 bg-allintra-gray-300 px-4 py-2 sticky bottom-0 left-0'>
                        <span className='text-allintra-gray-600 text-sm truncate w-full hidden sm:flex'>{moment().format("DD/MM/YYYY - HH:mm")}</span>
                        <div className='flex gap-3 w-full sm:w-[initial]'>
                          <button className='px-3 py-1 w-full sm:w-[120px] text-allintra-error-500 border border-allintra-error-500 bg-allintra-error-50 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => {
                            setDrawer(`fechar`)
                            setCriarMedicamentos([])
                            reset()
                          }}>Cancelar</button>
                          <button type='submit' className='px-3 py-1 w-full sm:w-[120px] text-allintra-primary-800 border border-allintra-primary-800 bg-allintra-primary-50 hover:bg-allintra-primary-500 hover:text-white transition-all  text-sm font-semibold shadow-md rounded-md'>Inserir</button>
                        </div>
                      </div>
                    </form>

                  </div >
                </div >
              </>
            ) : (
              <DialogTitle>
                <BoxInfo.Root type={`primary`} className='mb-3'>
                  <BoxInfo.Icon icon={IoIosInformationCircleOutline} type={'primary'} />
                  <BoxInfo.Message>Agenda de consulta vazia - {moment().format("DD/MM/YYYY")}</BoxInfo.Message>
                </BoxInfo.Root>
              </DialogTitle>
            )
          }
        </Drawer.Content >
      </Drawer.Root >

      {/* <CadastrarConsulta openModal={true} closeModal={setOpen} /> */}
    </>
  );
}
