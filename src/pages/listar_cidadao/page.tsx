"use client"

import ModalCidadao from '@/components/cadastrar_cidadao.modal';
import FormatCPF from '@/components/FormatCpf';
import axios from "axios";
import Cookie from 'js-cookie';
import { CircleFadingPlus, Eye } from "lucide-react";
import moment from 'moment';
import 'moment/locale/pt';
import { useEffect, useState } from "react";

export default function ListarCidadao() {
  const [cidadao, setCidadao] = useState<any>([])
  const [open, setOpen] = useState(false)
  const [senhaCidadao, setSenhaCidadao] = useState<number>()

  const token = Cookie.get('accessToken');

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, {
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
        <div className="flex justify-between items-center w-full top-0 border-b-[1px] pb-3">
          <h2>Pacientes cadastrados</h2>

          <button
            onClick={() => {
              setOpen(true)
              setSenhaCidadao(Math.floor(1000 + Math.random() * 9000))
            }}
            className="bg-cyan-800 hover:bg-cyan-700 text-white transition-all shadow-md font-medium px-3 py-1 rounded-lg flex items-center gap-2">
            <CircleFadingPlus size={20} />
            Cadastrar novo
          </button>
        </div>

        <div className="py-3">
          <div className="overflow-x-auto py-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Prontuário</th>
                  <th>Nome</th>
                  <th>Data de nascimento</th>
                  <th>CPF</th>
                  <th>CAPS</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='text-sm h-[100px]'>
                {
                  cidadao.map((item: any, index: any) => {
                    moment.locale('pt')
                    return (
                      <tr className="border-b border-slate-300" key={index}>
                        <th className="text-center">{item.prontuario}</th>
                        <td className="text-center max-w-44 truncate">{item.name}</td>
                        <td className="text-center">{moment(item.birthday).format("MM/DD/YYYY")}</td>
                        <td className="text-center">{FormatCPF(item.cpf)}</td>
                        <td className="text-center">{item.caps == false ? 'Não' : 'Sim'}</td>
                        <td className="flex items-center justify-center gap-2 py-5">
                          <button className="bg-cyan-500 hover:bg-cyan-400 text-white transition-all shadow-md font-medium h-7 w-7 rounded-lg flex justify-center items-center gap-2">
                            <Eye size={15} />
                          </button>
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

      <ModalCidadao openModal={open} closeModal={setOpen} senhaCidadao={senhaCidadao} />
    </>
  );
}
