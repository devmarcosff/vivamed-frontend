"use client"

import CadastrarConsulta from '@/components/cadastrar_consulta.modal';
import { isNotCaps } from '@/components/types/routes.t';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import Link from 'next/link';
import { usePathname, useRouter } from 'next/navigation';
import { useEffect, useState } from "react";
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
                    <th className='py-5 px-2'>Resp. Técnico</th>
                  </tr>
                </thead>
                <tbody className='text-sm h-[120px] text-center py-5'>
                  {
                    cidadao.map((item: any, index: any) => {
                      moment.locale('pt')
                      return (
                        <tr className="group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer" key={index}>
                          <th className="py-3 text-center max-w-44 truncate cursor-pointer">{item.prontuario || "-"}</th>
                          <Link href={`/consultas/${item.id}`}>
                            <td className="py-3 text-center group-hover/item:underline group-hover/item:text-cyan-500">{item.paciente || "-"}</td>
                          </Link>
                          <td className="py-3 text-center max-w-44 truncate">{!!item.createAt && moment(item.createAt).format("DD/MM/YYYY - HH:mm") || "-"}</td>
                          <td className="py-3 text-center max-w-44 truncate">{item.respTec || "-"}</td>
                        </tr>
                      )
                    })
                  }
                </tbody>
              </table>
            </div>
          ) : (
            <div className='bg-cyan-50 py-6 border-white text-center'>
              <span className='font-semibold text-gray-600'>Não existe consultas realizadas</span>
            </div>
          )
        }
      </div >

      <CadastrarConsulta openModal={open} closeModal={setOpen} />
    </>
  );
}
