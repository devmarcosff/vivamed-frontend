"use client"

import { BoxInfo } from '@/components/stylesComponents/molecules/BoxInfo';
import { Drawer } from '@/components/stylesComponents/organisms/Drawer';
import { IDetalhesPaciente } from '@/components/types/types.all';
import { Accordion, AccordionBody, AccordionHeader } from '@material-tailwind/react';
import { DialogTitle } from '@radix-ui/react-dialog';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import Link from 'next/link';
import { useEffect, useState } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";
import { FaCheckCircle, FaClock } from 'react-icons/fa';
import { FaCalendarXmark } from "react-icons/fa6";
import { IoMdCheckmark, IoMdPrint } from 'react-icons/io';
import { MdModeEditOutline, MdOutlineError } from 'react-icons/md';
import ModalCidadao from '../../components/cadastrar_cidadao.modal';

export default function ListarCidadao() {
  const token = Cookie.get('accessToken');
  const [drawer, setDrawer] = useState(false)
  const [open, setOpen] = useState(false)
  const [openConsultas, setOpenConsultas] = useState(false)
  const [openAgenda, setOpenAgenda] = useState(false)
  const [cidadao, setCidadao] = useState<any>([])
  const [detalhes, setDetalhes] = useState<IDetalhesPaciente>()
  const [senhaCidadao, setSenhaCidadao] = useState<number>()

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => setCidadao(e.data)).catch(e => console.log(e))
  }

  const handleOpenConsulta = (value: any) => setOpenConsultas(openConsultas === value ? 0 : value);

  const handleOpenAgenda = (value: any) => setOpenAgenda(openAgenda === value ? 0 : value);

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
    fetchData()
  }, [open == false]);

  return (
    <>
      <div className="bg-white my-3 shadow-md rounded-md w-full max-h-full overflow-auto relative">
        <div className="flex lg:flex-row justify-between items-center w-full top-0 p-5 gap-3 sticky bg-white shadow-sm z-10">
          <h2 className='font-semibold'>Pacientes cadastrados</h2>
          <div className='flex gap-3 w-full sm:w-[initial]'>
            <button
              onClick={() => {
                setOpen(true)
                setSenhaCidadao(Math.floor(1000 + Math.random() * 9000))
              }}
              className='px-3 py-2 text-allintra-primary-50 bg-allintra-primary-800 hover:bg-cyan-700 transition-all text-sm font-semibold shadow-md rounded-md flex gap-3 items-center justify-center'>
              <BsClipboardPlusFill size={20} />
              <span>Realizar consulta</span>
            </button>
          </div>
        </div>

        {
          cidadao.length ? (
            <div className='overflow-auto rounded-md shadow-sm m-3 mb-10'>
              <table className="table-auto w-full">
                <thead className='bg-allintra-primary-50 border-b-2 border-white'>
                  <tr>
                    <th className='py-5 px-2'>Prontuário</th>
                    <th className='py-5 px-2'>Paciente</th>
                    <th className='py-5 px-2 text-wrap'>Data de nascimento</th>
                    <th className='py-5 px-2 text-wrap'>Agendamentos</th>
                    <th className='py-5 px-2'>Consultas</th>
                    <th className='py-5 px-2'>Técnico Responsável</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-center'>
                  {
                    cidadao.map((item: IDetalhesPaciente, index: any) => {
                      moment.locale('pt')
                      return (
                        <tr key={index} className={`animate-fadeIn group/item border-b border-allintra-primary-50 hover:bg-allintra-primary-50 transition-all cursor-pointer`}
                          onClick={() => {
                            setDrawer(true)
                            setDetalhes(item)
                          }}>
                          <th className="py-3 text-center max-w-44 truncate cursor-pointer">{item.prontuario || "-"}</th>
                          <td className="py-3 text-center group-hover/item:underline group-hover/item:text-allintra-primary-500">{item.nome || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{!!item.createAt && moment(item.createAt).format("DD/MM/YYYY - HH:mm") || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate"><span className={`rounded-full p-2 border ${item.agendaConsultas.length == item.consultas.length ? 'bg-allintra-success-50 border-allintra-success-500' : 'bg-allintra-attention-50 border-allintra-attention-500'}`}>{`${item.agendaConsultas.length}`}</span></td>
                          <td className="py-3 text-center max-w-44 truncate"><span className={`rounded-full p-2 border ${item.agendaConsultas.length == item.consultas.length ? 'bg-allintra-success-50 border-allintra-success-500' : 'bg-allintra-attention-50 border-allintra-attention-500'}`}>{`${item.consultas.length}`}</span></td>
                          <td className="py-3 text-center max-w-44 truncate">{item.tecResponsavel || "-"}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <div className='bg-cyan-50 py-6 border-white text-center'>
              <span className='font-semibold text-gray-600'>Não existe pacientes cadastrados</span>
            </div>

          )
        }
      </div>

      {/* Drawer Detalhes da Consulta */}
      <Drawer.Root open={drawer} onOpenChange={() => setDrawer(false)}>
        <Drawer.Content>
          <DialogTitle>
            <BoxInfo.Root type={`success`} className='mb-3'>
              <BoxInfo.Icon icon={IoMdCheckmark} type={'success'} />
              <BoxInfo.Message>Detalhes do paciente - {detalhes?.nome}</BoxInfo.Message>
            </BoxInfo.Root>
          </DialogTitle>

          <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 h-[88%] flex flex-col justify-between relative'>
            <div>
              <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm z-10'>
                <div className='flex flex-col'>
                  <h2 className='text-allintra-gray-700'>Detalhes do paciente</h2>
                  <p className='text-allintra-gray-500'>Criado em {moment(detalhes?.createAt).format("DD/MM/YYYY - HH:mm")}</p>
                </div>
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
                <div className='border-b w-full flex flex-wrap'>
                  <div className="w-full md:w-1/2 px-3 my-2">
                    <span className='text-allintra-gray-700 text-sm'>Paciente</span>
                    <div className='text-gray-800'>
                      <span>{detalhes?.nome}</span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3 my-2">
                    <span className='text-allintra-gray-700 text-sm'>Data de nascimento</span>
                    <div className='text-gray-800'>
                      <span>{moment(detalhes?.nascimento).format("DD/MM/YYYY")}</span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3 my-2">
                    <span className='text-allintra-gray-700 text-sm'>Responsável Técnico</span>
                    <div className='text-gray-800 flex flex-col'>
                      <span>{detalhes?.tecResponsavel}</span>
                      <span className='text-allintra-gray-600'>@{detalhes?.tecResponsavel}</span>
                    </div>
                  </div>
                  <div className="w-full md:w-1/2 px-3 my-2">
                    <span className='text-allintra-gray-700 text-sm'>Hora realizada</span>
                    <div className='text-gray-800'>
                      <span>{moment(detalhes?.createAt).format("HH:mm")}</span>
                    </div>
                  </div>
                </div>

                {
                  detalhes?.consultas.length > 0 ? (
                    <div className="w-1/2 p-3 my-2">
                      <div className='flex justify-between items-center'>
                        <span className="text-allintra-gray-700 text-sm">Consultas realizadas</span>
                        <Link href={'/consultas'} className='px-3 py-1 bg-allintra-primary-50 border-allintra-primary-500 hover:bg-allintra-primary-500 hover:border-allintra-primary-50 border transition-all text-sm font-semibold shadow-sm rounded-md text-allintra-gray-700 hover:text-white'>+</Link>
                      </div>
                      {detalhes?.consultas.map((item: any, index: any) => (
                        <Accordion placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} key={index} className={`bg-allintra-success-50 border-allintra-success-500 border shadow-sm px-3 my-3 text-allintra-gray-700 animate-scaleIn rounded hover:border-allintra-primary-500 hover:bg-allintra-primary-50 w-full break-words whitespace-pre-line`} open={openConsultas === item.id} icon={<Icon id={item.id} open={openConsultas} />}>
                          <AccordionHeader placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} onClick={() => handleOpenConsulta(item.id)} className="text-sm font-semibold border-none capitalize"><span className='flex items-center gap-3'><FaCheckCircle className='text-allintra-success-500' /> Consulta realizada - {moment(item?.dataconsulta).format("DD/MM/YYYY")}</span></AccordionHeader>
                          <AccordionBody style={{ paddingTop: '0' }}>
                            <p className="capitalize"><span className="font-semibold">Nome:</span> {item.status}</p>
                            <p><span className="font-semibold">Quantidade:</span> {item.quantidade}</p>
                            <p><span className="font-semibold">Tempo de uso:</span> {item.use || '8/8 horas - Uso oral'}</p>
                          </AccordionBody>
                        </Accordion>
                      ))}
                    </div>
                  ) : (
                    <div className="w-1/2 p-3 my-2">
                      <div className='flex justify-between items-center'>
                        <span className="text-allintra-gray-700 text-sm">Nenhuma consulta realizada</span>
                        <Link href={'/consultas'} className='px-3 py-1 bg-allintra-primary-50 border-allintra-primary-500 hover:bg-allintra-primary-500 hover:border-allintra-primary-50 border transition-all text-sm font-semibold shadow-sm rounded-md text-allintra-gray-700 hover:text-white'>+</Link>
                      </div>
                    </div>
                  )
                }
                {
                  detalhes?.agendaConsultas.length > 0 ? (
                    <div className="w-1/2 p-3 my-2 md:border-l">
                      <div className='flex justify-between items-center'>
                        <span className="text-allintra-gray-700 text-sm">Consultas agendadas</span>
                        <Link href={'/agendar'} className='px-3 py-1 bg-allintra-primary-50 border-allintra-primary-500 hover:bg-allintra-primary-500 hover:border-allintra-primary-50 border transition-all text-sm font-semibold shadow-sm rounded-md text-allintra-gray-700 hover:text-white'>+</Link>
                      </div>
                      {detalhes?.agendaConsultas.map((item: any, index: any) => (
                        <Accordion placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} key={index} className={`${item.status == 'Agendado' ? 'bg-allintra-primary-50 border-allintra-primary-500' : item.status == 'Remarcado' ? 'bg-allintra-attention-50 border-allintra-attention-500' : item.status == 'Realizado' ? 'bg-allintra-success-50 border-allintra-success-500' : 'bg-allintra-error-50 border-allintra-error-500'} border shadow-sm px-3 my-3 text-allintra-gray-700 animate-scaleIn rounded hover:border-allintra-primary-500 hover:bg-allintra-primary-50 w-full break-words whitespace-pre-line`} open={openAgenda === item.id} icon={<Icon id={item.id} open={openAgenda} />}>
                          <AccordionHeader placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} onClick={() => handleOpenAgenda(item.id)} className="text-sm font-semibold border-none capitalize">{item.status == 'Agendado' ? <span className='flex items-center gap-3'><FaClock className='text-allintra-primary-500' /> Consulta pendente - {moment(item?.dataconsulta).format("DD/MM/YYYY")}</span> : item.status == 'Remarcado' ? <span className='flex items-center gap-3'><FaCalendarXmark className='text-allintra-attention-500' /> Consulta pendente - {moment(item?.dataconsulta).format("DD/MM/YYYY")}</span> : item.status == 'Realizado' ? <span className='flex items-center gap-3'><FaCheckCircle className='text-allintra-success-500' /> Consulta realizada - {moment(item?.dataconsulta).format("DD/MM/YYYY")}</span> : <span className='flex items-center gap-3'><MdOutlineError className='text-allintra-error-500' /> Consulta cancelada - {moment(item?.dataconsulta).format("DD/MM/YYYY")}</span>}</AccordionHeader>
                          <AccordionBody style={{ paddingTop: '0' }}>
                            <p className="capitalize"><span className="font-semibold">Nome:</span> {item.status}</p>
                            <p><span className="font-semibold">Quantidade:</span> {item.quantidade}</p>
                            <p><span className="font-semibold">Tempo de uso:</span> {item.use || '8/8 horas - Uso oral'}</p>
                          </AccordionBody>
                        </Accordion>
                      ))}
                    </div>
                  ) : (
                    <div className="w-1/2 p-3 my-2 border-l">
                      <div className='flex justify-between items-center'>
                        <span className="text-allintra-gray-700 text-sm">Nenhuma consulta agendada</span>
                        <Link href={'/agendar'} className='px-3 py-1 bg-allintra-primary-50 border-allintra-primary-500 hover:bg-allintra-primary-500 hover:border-allintra-primary-50 border transition-all text-sm font-semibold shadow-sm rounded-md text-allintra-gray-700 hover:text-white'>+</Link>
                      </div>
                    </div>
                  )
                }
              </div>
            </div>

            <div className='flex justify-between items-center w-full gap-3 bg-allintra-gray-300 px-4 py-2 sticky bottom-0 left-0'>
              <span className='text-allintra-gray-500 text-sm truncate w-full hidden sm:flex'>{detalhes?.id}</span>
              {/* <div className='flex gap-3 w-full sm:w-[initial]'>
                <button className='px-3 py-1 w-full sm:w-[120px] text-allintra-error-50 bg-red-400 hover:bg-red-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => deletarConsulta(consulta?.id)}>Deletar</button>
                <button className='px-3 py-1 w-full sm:w-[120px] text-allintra-attention-50 bg-orange-400 hover:bg-orange-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Editar Consulta')}>Deletar usuario</button>
              </div> */}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root >

      <ModalCidadao openModal={open} closeModal={setOpen} senhaCidadao={senhaCidadao} />
    </>
  );
}
