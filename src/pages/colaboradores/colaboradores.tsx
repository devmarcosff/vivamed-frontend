"use client"

import ModalColaborador from '@/components/cadastrar_colaboradores.modal';
import axios from "axios";
import Cookie from 'js-cookie';
import moment from 'moment';
import 'moment/locale/pt';
import { useEffect, useState } from "react";
import { BsClipboardPlusFill } from "react-icons/bs";

export default function ListaColaboradores() {
  const [cidadao, setCidadao] = useState<any>([])
  const [senhaCidadao, setSenhaCidadao] = useState<any>([])
  const [open, setOpen] = useState(false)

  const token = Cookie.get('accessToken');

  useEffect(() => {
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => setCidadao(e.data)).catch(e => console.log(e))
    }
    fetchData()
  }, [open == false]);

  return (
    <>
      <div className="bg-white my-2 shadow-md rounded-md p-5 w-full max-h-full overflow-auto">
        <div className="flex flex-col lg:flex-row justify-between items-center w-full top-0 pb-3 gap-3">
          <h2 className='font-semibold'>Consultas realizadas</h2>
          <button
            onClick={() => {
              setOpen(true)
              setSenhaCidadao(Math.floor(1000 + Math.random() * 9000))
            }}
            className="bg-cyan-800 hover:bg-cyan-700 text-white transition-all shadow-md font-medium px-3 py-1 rounded-lg flex items-center gap-2">
            <BsClipboardPlusFill size={20} />
            Novo colaborador
          </button>
        </div>

        {
          cidadao.length ? (
            <table className="table-auto w-full shadow rounded overflow-auto sm:overflow-hidden">
              <thead className='bg-cyan-50 border-b-2 border-white'>
                <tr>
                  <th className='py-5 px-2'>Nome</th>
                  <th className='py-5 px-2'>Usuário</th>
                  <th className='py-5 px-2'>Ultima ativação</th>
                  {/* <th></th> */}
                </tr>
              </thead>
              <tbody className='text-sm h-[120px] text-center'>
                {
                  cidadao && cidadao.map((item: any, index: any) => {
                    moment.locale('pt')
                    return (
                      <tr className="border-b border-slate-300 last:border-0 hover:underline hover:bg-cyan-50 transition-all cursor-pointer" key={index}>
                        <th className="text-center max-w-44 truncate underline cursor-pointer">{item.name}</th>
                        <td className="text-center">{item.username}</td>
                        <td className="text-center">{item.active ? 'A menos de 8 horas' : '2 dias ou mais'}</td>
                        {/* <td className="flex items-center justify-center gap-2 py-5">
                            <Link href={`/colaboradores/${item.cpf}`} className="bg-cyan-500 hover:bg-cyan-400 text-white transition-all shadow-md font-medium h-7 w-7 rounded-lg flex justify-center items-center gap-2">
                              <Eye size={15} />
                            </Link>
                          </td> */}
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
      </div >

      <ModalColaborador openModal={open} closeModal={setOpen} senhaCidadao={senhaCidadao} />
    </>
  );
}
