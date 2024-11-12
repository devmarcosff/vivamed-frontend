"use client"

import AgendarNovaConsulta from '@/components/agendar_consulta.modal';
import { BoxInfo } from '@/components/stylesComponents/molecules/BoxInfo';
import { Drawer } from '@/components/stylesComponents/organisms/Drawer';
import { isNotCaps } from '@/components/types/routes.t';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from "react";
import { FiAlertCircle } from 'react-icons/fi';
import { IoMdPrint } from 'react-icons/io';
import { MdDateRange, MdModeEditOutline } from 'react-icons/md';
import { toast } from 'react-toastify';
import './style.css';



interface IConsulta {
  createAt?: string
  dataconsulta: string
  horaconsulta: string
  id: string
  idTecResponsavel: any
  paciente: string
  prontuario: string
  recorrente: boolean | any
  tecResponsavel: string
  status: string
}

export default function AgendarConsulta() {
  const pathname = usePathname();
  const [drawer, setDrawer] = useState(false)
  const [consulta, setConsulta] = useState<IConsulta>()
  const [agendaConsulta, setAgendaConsulta] = useState<any>([])
  const [agenda, setAgenda] = useState(false)
  const token = Cookie.get('accessToken')

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/agendasconsulta`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => {
        setAgendaConsulta(e.data)
      }).catch(e => console.log(e))
    }
    fetchData()
    isNotCaps(`${pathname}`)
  }, [agenda == false]);

  const detalhesConsulta = (detalheconsulta: any) => {
    setDrawer(!drawer)
    setConsulta(detalheconsulta)
  }

  const cancelarAgendamento = async (id: string) => {
    await axios.delete(`${process.env.NEXT_PUBLIC_API_URL}/agendasconsulta/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => {
      setDrawer(!drawer)
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
    }
    )
  }

  return (
    <>
      <div className="bg-white my-3 shadow-md rounded-md w-full max-h-full overflow-auto relative">
        <div className="flex lg:flex-row justify-between items-center w-full top-0 p-5 gap-3 sticky bg-white shadow-sm z-10">
          <h2 className='font-semibold w-full sm:w-[initial]'>Consultas agendadas</h2>
          <div className='flex gap-3 w-full sm:w-[initial]'>
            <button
              onClick={() => {
                setAgenda(true)
              }}
              className='px-3 py-2 w-full text-allintra-primary-50 bg-allintra-primary-800 hover:bg-cyan-700 transition-all text-sm font-semibold shadow-md rounded-md flex gap-3 items-center justify-center'>
              <MdDateRange size={20} />
              <span>Agendar consulta</span>
            </button>
          </div>
        </div>

        {
          agendaConsulta.length ? (
            <div className='overflow-auto rounded-md shadow-sm m-3 mb-10'>
              <table className="table-auto w-full">
                <thead className='bg-cyan-50 border-b-2 border-white'>
                  <tr>
                    <th className='py-5 px-2'>Prontuário</th>
                    <th className='py-5 px-2'>Paciente</th>
                    <th className='py-5 px-2 text-wrap'>Data da consulta</th>
                    <th className='py-5 px-2 text-wrap'>Hora da consulta</th>
                    <th className='py-5 px-2'>Status</th>
                    <th className='py-5 px-2'>Téc. de Referência</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-center'>
                  {
                    agendaConsulta.map((item: any, index: any) => {
                      moment.locale('pt')
                      return (
                        <tr key={index} className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`} onClick={() => detalhesConsulta(item)}>
                          <th className="py-3 text-center max-w-44 truncate cursor-pointer">{item.prontuario || "-"}</th>
                          <td className="px-3 py-3 text-center group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[120px]">{!!item.paciente && item.paciente || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{!!item.dataconsulta && moment(item.dataconsulta).format("DD/MM/YYYY") || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.horaconsulta || "-"}</td>
                          <td className={`py-3 text-white text-center truncate`}>
                            <span className={`rounded px-3 w-8 py-1 shadow ${item.status == "Agendado" ? 'bg-blue-50 text-blue-500 border-white' :
                              item.status == "Remarcado" ? 'bg-allintra-attention-50 text-allintra-attention-500' :
                                item.status == "Realizado" ? 'bg-allintra-success-50 text-allintra-success-500' : 'bg-allintra-error-50 text-allintra-error-500'}`}>
                              {item.status || "Não informado"}
                            </span></td>
                          <td className="py-3 text-center max-w-44 truncate">{item.tecResponsavel || "Não informado"}</td>
                          {/* <td className="py-3 text-center max-w-44 truncate">{item.recorrente == true ? 'Sim' : 'Não'}</td> */}
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <div className='bg-cyan-50 py-5 border-white text-center m-3 rounded-md shadow-sm'>
              <span className='font-semibold text-gray-600'>Não existe consultas agendadas</span>
            </div>
          )
        }
      </div >
      {/* Drawer Detalhes da Consulta */}
      <Drawer.Root open={drawer} onOpenChange={setDrawer}>
        <Drawer.Content>

          <BoxInfo.Root type={`${consulta?.status == 'Agendado' ? 'primary' : consulta?.status == 'Realizado' ? 'success' : consulta?.status == 'Remarcado' ? 'attention' : 'error'}`} className='mb-3'>
            <BoxInfo.Icon icon={FiAlertCircle} type={`${consulta?.status == 'Agendado' ? 'primary' : consulta?.status == 'Realizado' ? 'success' : consulta?.status == 'Remarcado' ? 'attention' : 'error'}`} />
            <BoxInfo.Message>Consulta {consulta?.status}(a)</BoxInfo.Message>
          </BoxInfo.Root>

          <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 h-[85%] flex flex-col justify-between relative'>
            <div className='h-full'>
              <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm'>
                <h2 className='font-semibold text-allintra-gray-700'>Informações da Consulta</h2>
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
                  <span className='text-allintra-gray-700 text-sm'>Data e Hora</span>
                  <div className='flex gap-1 text-gray-800'>
                    <span>{moment(consulta?.dataconsulta).format("DD/MM/YYYY")},</span>
                    <span>{moment(consulta?.horaconsulta, 'HH:mm:ss').format("HH:mm")}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Paciente</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.paciente}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Status</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.status}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Responsável Técnico</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.tecResponsavel}</span>
                  </div>
                </div>

                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Recorrente</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.recorrente == true ? 'Sim' : 'Não'}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Data realizada</span>
                  <div className='text-gray-800'>
                    <span>{moment(consulta?.createAt).format("DD/MM/YYYY - HH:mm")}</span>
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center w-full gap-3 bg-allintra-gray-300 px-4 py-2 sticky bottom-0 left-0'>
              <span className='text-allintra-gray-500 text-sm truncate w-full'>{consulta?.id}</span>
              <div className='flex gap-3'>
                <button className='px-3 py-1 text-allintra-error-50 bg-red-400 hover:bg-red-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => cancelarAgendamento(`${consulta?.id}`)}>Deletar</button>
                <button className='px-3 py-1 text-allintra-attention-50 bg-orange-400 hover:bg-orange-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Editar Consulta')}>Remarcar</button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root>

      <AgendarNovaConsulta openAgenda={agenda} closeAgenda={setAgenda} />
    </>
  );
}
