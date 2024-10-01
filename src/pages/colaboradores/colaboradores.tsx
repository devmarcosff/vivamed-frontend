"use client"

import ModalColaborador from '@/components/cadastrar_colaborador.modal';
import axios from "axios";
import Cookie from 'js-cookie';
import { CircleFadingPlus, Eye } from "lucide-react";
import moment from 'moment';
import 'moment/locale/pt';
import Link from 'next/link';
import { useEffect, useState } from "react";

export default function ListaColaboradores() {
  const [cidadao, setCidadao] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [senhaCidadao, setSenhaCidadao] = useState<number>()

  const token = Cookie.get('accessToken');

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/user`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => setCidadao(e.data)).catch(e => console.log(e))
  }

  useEffect(() => {
    fetchData()
  }, [open == false]);

  return (
    <>
      <div className="bg-white my-2 shadow-md rounded-md p-5 w-full max-h-full overflow-auto">
        <div className="flex justify-between items-center w-full border-b-[1px] pb-3">
          <h2>Lista de colaboradores</h2>

          <button
            onClick={() => {
              setOpen(true)
              setSenhaCidadao(Math.floor(1000 + Math.random() * 9000))
            }}
            className="bg-indigo-800 hover:bg-indigo-700 text-white transition-all shadow-md font-medium px-3 py-1 rounded-lg flex items-center gap-2">
            <CircleFadingPlus size={20} />
            Cadastrar novo
          </button>
        </div>

        <div className="py-3">
          <div className="overflow-x-auto py-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Nome</th>
                  <th>Usuário</th>
                  <th>Ultima ativação</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='text-sm h-[100px]'>
                {
                  cidadao.map((item: any, index: any) => {
                    moment.locale('pt')
                    return (
                      <tr className="border-b border-slate-300" key={index}>
                        <th className="text-center max-w-44 truncate">{item.name}</th>
                        <td className="text-center">{item.username}</td>
                        <td className="text-center">{item.active ? 'A menos de 8 horas' : '2 dias ou mais'}</td>
                        <td className="flex items-center justify-center gap-2 py-5">
                          <Link href={`/colaborador/${item.cpf}`} className="bg-blue-500 hover:bg-blue-400 text-white transition-all shadow-md font-medium h-7 w-7 rounded-lg flex justify-center items-center gap-2">
                            <Eye size={15} />
                          </Link>
                        </td>
                      </tr>
                    )
                  })
                }
              </tbody>
            </table>
          </div>
        </div>
      </div>

      <ModalColaborador openModal={open} closeModal={setOpen} senhaCidadao={senhaCidadao} />
    </>
  );
}
