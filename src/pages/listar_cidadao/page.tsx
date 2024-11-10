"use client"

import ModalCidadao from '@/components/cadastrar_cidadao.modal';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import { useEffect, useState } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";

export default function ListarCidadao() {
  const token = Cookie.get('accessToken');
  const [cidadao, setCidadao] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [senhaCidadao, setSenhaCidadao] = useState<number>()

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => setCidadao(e.data)).catch(e => console.log(e))
  }

  useEffect(() => {
    fetchData()
  }, [cidadao]);

  return (
    <>
      <div className="bg-white my-2 shadow-md rounded-md p-5 w-full max-h-full overflow-auto">
        <div className="flex justify-between items-center w-full top-0 pb-3">
          <h2 className='font-semibold'>Pacientes cadastrados</h2>

          <button
            onClick={() => {
              setOpen(true)
              setSenhaCidadao(Math.floor(1000 + Math.random() * 9000))
            }}
            className="bg-cyan-800 hover:bg-cyan-700 text-white transition-all shadow-md font-semibold px-3 py-1 rounded-lg flex items-center gap-2">
            <BsClipboardPlusFill size={20} />
            Novo paciente
          </button>
        </div>

        {
          cidadao.length ? (
            <table className="table-auto w-full shadow rounded overflow-auto sm:overflow-hidden">
              <thead className='bg-cyan-50 border-b-2 border-white'>
                <tr>
                  <th className='py-5 px-2'>Prontuário</th>
                  <th className='py-5 px-2'>Nome</th>
                  <th className='py-5 px-2 text-wrap'>Data de nascimento</th>
                  <th className='py-5 px-2'>CAPS</th>
                </tr>
              </thead>
              <tbody className='text-sm h-[100px]'>
                {
                  cidadao.map((item: any, index: any) => {
                    moment.locale('pt')
                    return (
                      <tr className="border-b border-slate-300 last:border-0 hover:underline hover:bg-cyan-50 transition-all cursor-pointer" key={index}>
                        <th className="text-center">{item.prontuario || "-"}</th>
                        <td className="text-center text-wrap max-w-44 truncate">{item.nome || "-"}</td>
                        <td className="text-center">{!!item.nascimento && moment(item.nascimento).format("MM/DD/YYYY") || "-"}</td>
                        <td className="text-center">{item.caps == false ? 'Não' : 'Sim'}</td>
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

      <ModalCidadao openModal={open} closeModal={setOpen} senhaCidadao={senhaCidadao} />
    </>
  );
}
