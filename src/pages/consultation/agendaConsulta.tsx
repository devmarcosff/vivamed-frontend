"use client"

import AgendarConsulta from '@/components/agendar_consulta.modal';
import { Drawer } from '@/components/stylesComponents/organisms/Drawer';
import { isNotCaps } from '@/components/types/routes.t';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";
import './style.css';

interface IConsulta {
  createAt?: string
  dataconsulta: string
  horaconsulta: string
  id: string
  idTecResponsavel: any
  paciente: string
  prontuario: string
  recorrente: boolean
  tecResponsavel: string
  status: string
}

export default function agendarConsulta() {
  const router = useRouter();
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

  console.log(consulta)

  return (
    <>
      <div className="bg-white my-2 shadow-md rounded-md p-5 w-full max-h-full">
        <div className="flex flex-col lg:flex-row justify-between items-start sm:items-center w-full top-0 pb-3 gap-3">
          <h2 className='font-semibold'>Consultas agendadas</h2>
          <div className='flex gap-3 h-[40px] w-full sm:w-[initial]'>
            <button
              onClick={() => {
                setAgenda(true)
              }}
              className="bg-cyan-800 hover:bg-cyan-700 text-white transition-all shadow-md font-semibold px-3 py-1 rounded-lg flex items-center gap-2 w-full text-center justify-center">
              <BsClipboardPlusFill size={20} />
              <span className='hidden md:block'>Agendar consulta</span>
              <span className='block md:hidden'>Agendar</span>
            </button>
          </div>
        </div>

        {
          agendaConsulta.length ? (
            <div className='overflow-auto rounded-md shadow-sm'>
              <table className="table-auto w-full">
                <thead className='bg-cyan-50 border-b-2 border-white'>
                  <tr>
                    {/* <th className='py-5 px-2'>Prontuário</th> */}
                    <th className='py-5 px-2'>Paciente</th>
                    <th className='py-5 px-2 text-wrap'>Data da consulta</th>
                    <th className='py-5 px-2 text-wrap'>Hora da consulta</th>
                    {/* <th className='py-5 px-2'>Recorrente</th> */}
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
                          {/* <th className="py-3 text-center max-w-44 truncate cursor-pointer">{item.prontuario || "-"}</th> */}
                          <td className="px-3 py-3 text-center group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[120px]">{!!item.paciente && item.paciente || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{!!item.dataconsulta && moment(item.dataconsulta).format("DD/MM/YYYY") || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.horaconsulta || "-"}</td>
                          <td className={`py-3 text-white text-center max-w-44 truncate`}>
                            <span className={`rounded-full px-3 py-1 shadow ${item.status == "Agendado" ? 'bg-blue-50 text-blue-500 border-white' :
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
            <div className='bg-cyan-50 py-6 border-white text-center'>
              <span className='font-semibold text-gray-600'>Não existe consultas agendadas</span>
            </div>
          )
        }
      </div >
      <Drawer.Root open={drawer} onOpenChange={setDrawer}>
        <Drawer.Content>
          <div className='shadow-md bg-white rounded-md overflow-auto border h-full flex flex-col justify-between relative'>

            <div className='h-full'>
              <div className='flex justify-between items-center p-4'>
                <h2 className='font-semibold text-allintra-gray-700'>Informações da Consulta</h2>
                <span className={`rounded-full px-3 py-1 shadow ${consulta?.status == "Agendado" ? 'bg-blue-50 text-blue-500 border-white' :
                  consulta?.status == "Remarcado" ? 'bg-allintra-attention-50 text-allintra-attention-500' :
                    consulta?.status == "Realizado" ? 'bg-allintra-success-50 text-allintra-success-500' : 'bg-allintra-error-50 text-allintra-error-500'}`}>
                  {consulta?.status || "Não informado"}
                </span>
              </div>

              <div className="flex flex-wrap w-full my-16 sm:my-0 p-4">
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
                  <span className='text-allintra-gray-700 text-sm'>Responsável Técnico</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.tecResponsavel}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Status</span>
                  <div className='text-gray-800'>
                    <span>{consulta?.status}</span>
                  </div>
                </div>
              </div>

            </div>

            <div className='flex justify-between items-center w-full bg-allintra-gray-300 px-4 py-2 sticky bottom-0 left-0'>
              <span className='text-allintra-gray-500 text-sm'>{consulta?.id}</span>
              <div className='flex gap-3'>
                <button className='px-3 py-1 text-allintra-attention-50 bg-orange-400 hover:bg-orange-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Editar Consulta')}>Editar</button>
                <button className='px-3 py-1 text-allintra-error-50 bg-red-400 hover:bg-red-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Cancelar Consulta')}>Deletar</button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root>

      {/* <SelectSearch.Root
            list={[
              { label: 'Test', value: 'valueTest' },
              { label: 'Test2', value: 'valueTest2' },
              { label: 'Test3', value: 'valueTest3' },
              { label: 'Test4', value: 'valueTest4' },
            ]}
            onValueChange={(list) => console.log(list)}
            isLoading={false}
            emptyMessage="Paciente não encontrado"
          >
            <SelectSearch.Label>Paciente</SelectSearch.Label>
            <SelectSearch.Trigger
              placeholder="Selecione um paciente"
              isLoading={false}
              className={'text-allintra-black-500 !min-h-10 min-w-[200px]'}
            />
          </SelectSearch.Root> */}
      <AgendarConsulta openAgenda={agenda} closeAgenda={setAgenda} />
      {/* <EditarDrawer closeModal={setDrawer} openModal={drawer} consulta={consulta} /> */}
    </>
  );
}
