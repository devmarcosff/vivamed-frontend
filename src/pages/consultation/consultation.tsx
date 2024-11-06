"use client"

import CadastrarConsulta from '@/components/cadastrar_consulta.modal';
import { BoxInfo } from '@/components/stylesComponents/molecules/BoxInfo';
import { Drawer } from '@/components/stylesComponents/organisms/Drawer';
import { isNotCaps } from '@/components/types/routes.t';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { FiAlertCircle, FiAlertTriangle } from 'react-icons/fi';
import { IoMdPrint } from 'react-icons/io';
import { MdModeEditOutline } from 'react-icons/md';
import './style.css';

export default function Consultation() {
  const router = useRouter();
  const pathname = usePathname();
  const [consulta, setConsulta] = useState<any>()
  const [drawer, setDrawer] = useState(false)
  const [cidadao, setCidadao] = useState<any>([])
  const [open, setOpen] = useState(false)
  const token = Cookie.get('accessToken')

  const handleNavigate = (id: any) => {
    router.push(`/consultas/${id}`);
  };

  const detalhesConsulta = (detalheconsulta: any) => {
    setDrawer(!drawer)
    setConsulta(detalheconsulta)
  }

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setCidadao(e.data)).catch(e => console.log(e))
    }
    fetchData()
    isNotCaps(`${pathname}`)
  }, [open == false]);

  return (
    <>
      <div className="bg-white my-2 shadow-md rounded-md p-5 w-full">
        <div className="flex flex-col lg:flex-row justify-between items-start sm:items-center w-full top-0 pb-3 gap-3">
          <h2 className='font-semibold'>Consultas realizadas</h2>
          <div className='flex gap-3 h-[40px] w-full sm:w-[initial]'>
            <button
              onClick={() => {
                setOpen(true)
              }}
              className="bg-orange-500 hover:bg-orange-400 capitalize text-white transition-all shadow-md font-semibold px-3 py-1 rounded-lg flex items-center gap-2 w-full text-center justify-center">
              <FiAlertTriangle size={20} />
              <span className='hidden md:flex'>Consulta de urgência</span>
              <span className='flex md:hidden'>urgência</span>
            </button>
          </div>
        </div>

        {
          cidadao.length ? (
            <div className='overflow-auto'>
              <table className="table-auto w-full shadow rounded">
                <thead className='bg-cyan-50 border-b-2 border-white'>
                  <tr>
                    <th className='py-5 px-2'>Prontuário</th>
                    <th className='py-5 px-2'>Paciente</th>
                    <th className='py-5 px-2 text-wrap'>Data da consulta</th>
                    <th className='py-5 px-2 text-wrap'>Medicamento</th>
                    <th className='py-5 px-2'>Resp. Técnico</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-center py-5'>
                  {
                    cidadao.map((item: any, index: any) => {
                      moment.locale('pt')
                      return (
                        <tr key={index} className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`} onClick={() => detalhesConsulta(item)}>
                          <th className="py-3 text-center max-w-44 truncate cursor-pointer">{item.prontuario || "-"}</th>
                          <Link href={`/consultas/${item.id}`}>
                            <td className="py-3 text-center group-hover/item:underline group-hover/item:text-cyan-500">{item.paciente || "-"}</td>
                          </Link>
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
            <div className='bg-cyan-50 py-5 border-white text-center'>
              <span className='font-semibold text-gray-600'>Não existe consultas realizadas</span>
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
                    <span>Sim</span>
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
                <button className='px-3 py-1 text-allintra-error-50 bg-red-400 hover:bg-red-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Cancelar Consulta')}>Cancelar</button>
                <button className='px-3 py-1 text-allintra-attention-50 bg-orange-400 hover:bg-orange-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Editar Consulta')}>Remarcar</button>
              </div>
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root>

      <CadastrarConsulta openModal={open} closeModal={setOpen} />
    </>
  );
}
