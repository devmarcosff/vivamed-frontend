"use client"

import CadastrarConsulta from '@/components/cadastrar_consulta.modal';
import axios from "axios";
import Cookie from 'js-cookie';
import { CircleFadingPlus, Eye } from "lucide-react";
import moment from 'moment';
import 'moment/locale/pt';
import { useEffect, useState } from "react";

export default function Consultation() {
  const [cidadao, setCidadao] = useState<any>([])
  const [open, setOpen] = useState(false)

  const token = Cookie.get('accessToken');

  const fetchData = async () => {
    await axios.get('http://138.186.72.20:3000/consulta', {
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
      <div className="bg-white my-2 shadow-md rounded-md p-5 w-full max-h-[700px] overflow-auto">
        <div className="flex justify-between items-center w-full top-0 border-b-[1px] pb-3">
          <h2>Lista de consultas</h2>

          <button
            onClick={() => {
              setOpen(true)
            }}
            className="bg-indigo-800 hover:bg-indigo-700 text-white transition-all shadow-md font-medium px-3 py-1 rounded-lg flex items-center gap-2">
            <CircleFadingPlus size={20} />
            Realizar consulta
          </button>
        </div>

        <div className="py-3 pb-10">
          <div className="overflow-x-auto overflow-y-auto py-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>Prontuário / CNS</th>
                  <th>Paciente</th>
                  <th>Resp. Técnico</th>
                  <th>Data da consulta</th>
                  <th></th>
                </tr>
              </thead>
              <tbody className='text-sm h-[100px]'>
                {
                  cidadao.map((item: any, index: any) => {
                    moment.locale('pt')
                    return (
                      <tr className="border-b border-slate-300" key={index}>
                        <th className="text-center max-w-44 truncate">{item.prontuario}</th>
                        <td className="text-center">{item.paciente}</td>
                        <td className="text-center max-w-44 truncate">{item.respTec}</td>
                        <td className="text-center max-w-44 truncate">{moment(item.createAt).format("DD/MM/YYYY - HH:mm")}</td>
                        <td className="flex items-center justify-center gap-2 py-5">
                          <button className="bg-blue-500 hover:bg-blue-400 text-white transition-all shadow-md font-medium h-7 w-7 rounded-lg flex justify-center items-center gap-2">
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

      <CadastrarConsulta openModal={open} closeModal={setOpen} />
    </>
  );
}
