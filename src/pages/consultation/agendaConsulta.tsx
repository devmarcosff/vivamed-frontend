"use client"

import AgendarConsulta from '@/components/agendar_consulta.modal';
import { isNotCaps } from '@/components/types/routes.t';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";
import './style.css';

export default function agendarConsulta() {
  const router = useRouter();
  const pathname = usePathname();
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
            <div className='overflow-auto'>
              <table className="table-auto w-full shadow rounded ">
                <thead className='bg-cyan-50 border-b-2 border-white'>
                  <tr>
                    {/* <th className='py-5 px-2'>Prontuário</th> */}
                    <th className='py-5 px-2'>Paciente</th>
                    <th className='py-5 px-2 text-wrap'>Data da consulta</th>
                    <th className='py-5 px-2 text-wrap'>Hora da consulta</th>
                    <th className='py-5 px-2'>Recorrente</th>
                    <th className='py-5 px-2'>Téc. de Referência</th>
                  </tr>
                </thead>
                <tbody className='text-sm text-center'>
                  {
                    agendaConsulta.map((item: any, index: any) => {
                      moment.locale('pt')
                      return (
                        <tr key={index} className='group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer'>
                          {/* <th className="py-3 text-center max-w-44 truncate cursor-pointer">{item.prontuario || "-"}</th> */}
                          <Link href={`/consultas/${item.id}`}>
                            <td className="py-3 text-center group-hover/item:underline group-hover/item:text-cyan-500">{!!item.paciente && item.paciente || "-"}</td>
                          </Link>
                          <td className="py-3 text-center max-w-44 truncate">{!!item.dataconsulta && moment(item.dataconsulta).format("DD/MM/YYYY") || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.horaconsulta || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.recorrente == true ? 'Sim' : 'Não'}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.tecResponsavel || "Não informado"}</td>
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
      </div>
      <AgendarConsulta openAgenda={agenda} closeAgenda={setAgenda} />
    </>
  );
}
