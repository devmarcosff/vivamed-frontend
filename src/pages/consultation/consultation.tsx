"use client"

import CadastrarConsulta from '@/components/cadastrar_consulta.modal';
import { isNotCaps } from '@/components/types/routes.t';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";
import { FiAlertTriangle } from 'react-icons/fi';
import './style.css';

export default function Consultation() {
  const router = useRouter();
  const pathname = usePathname();
  const [cidadao, setCidadao] = useState<any>([])
  const [open, setOpen] = useState(false)
  const token = Cookie.get('accessToken')

  const handleNavigate = (id: any) => {
    router.push(`/consultas/${id}`);
  };

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consulta`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => setCidadao(e.data)).catch(e => console.log(e))
  }

  useEffect(() => {
    fetchData()
    isNotCaps(`${pathname}`)
  }, []);

  return (
    <>
      <div className="bg-white my-2 shadow-md rounded-md p-5 w-full max-h-full overflow-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full top-0 pb-3 gap-3">
          <h2 className='font-semibold'>Consultas realizadas</h2>
          <div className='flex gap-3 w-full md:w-[500px] h-[40px]'>
            <button
              onClick={() => {
                setOpen(true)
              }}
              className="bg-orange-500 hover:bg-orange-400 capitalize text-white transition-all shadow-md font-semibold px-3 py-1 rounded-lg flex items-center gap-2 w-full text-center justify-center">
              <FiAlertTriangle size={20} />
              <span className='hidden md:flex'>Consulta de urgência</span>
              <span className='flex md:hidden'>urgência</span>
            </button>
            <button
              onClick={() => {
                setOpen(true)
              }}
              className="bg-cyan-800 hover:bg-cyan-700 text-white transition-all shadow-md font-semibold px-3 py-1 rounded-lg flex items-center gap-2 w-full text-center justify-center">
              <BsClipboardPlusFill size={20} />
              <span className='hidden md:block'>Agendar consulta</span>
              <span className='block md:hidden'>Agendar</span>
            </button>
          </div>
        </div>

        {
          cidadao.length ? (
            <table className="table-auto w-full shadow rounded overflow-auto sm:overflow-hidden">
              <thead className='bg-cyan-50 border-b-2 border-white'>
                <tr>
                  <th className='py-5 px-2'>Prontuário</th>
                  <th className='py-5 px-2'>Paciente</th>
                  <th className='py-5 px-2 text-wrap'>Data da consulta</th>
                  <th className='py-5 px-2'>Resp. Técnico</th>
                </tr>
              </thead>
              <tbody className='text-sm h-[50px] text-center'>
                {
                  cidadao.map((item: any, index: any) => {
                    moment.locale('pt')
                    return (
                      <tr className="border-b border-slate-300 last:border-0 hover:underline hover:bg-cyan-50 transition-all cursor-pointer" onClick={() => handleNavigate(item.id)} key={index}>
                        <th className="text-center max-w-44 truncate underline cursor-pointer">{item.prontuario || "-"}</th>
                        <td className="text-center">{item.paciente || "-"}</td>
                        <td className="text-center max-w-44 truncate">{!!item.createAt && moment(item.createAt).format("DD/MM/YYYY - HH:mm") || "-"}</td>
                        <td className="text-center max-w-44 truncate">{item.respTec || "-"}</td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          ) : (
            <div className='bg-cyan-50 py-6 border-white text-center'>
              <span className='font-semibold text-gray-600'>Não existe consultas cadastrada</span>
            </div>
          )
        }
      </div>

      <CadastrarConsulta openModal={open} closeModal={setOpen} />
    </>
  );
}
