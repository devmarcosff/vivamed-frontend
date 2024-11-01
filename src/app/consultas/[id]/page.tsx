"use client"

import { SidebarTrue } from "@/components/Sidebar";
import {
  Accordion,
  AccordionBody,
  AccordionHeader,
} from "@material-tailwind/react";
import axios from "axios";
import Cookie from 'js-cookie';
import moment from "moment";
import { useEffect, useState } from "react";

interface cidadao {
  createAt: string,
  descricao: string,
  id: string,
  paciente: string,
  prontuario: string,
  respTec: string,
  role: string,
  medicamentos: []
}

const ItemPage = ({ params }: any) => {
  const { id } = params
  const [cidadao, setCidadao] = useState<cidadao>()
  const [consulta, setConsulta] = useState('')
  const [medicamentos, setMedicamentos] = useState<any>([])
  const [open, setOpen] = useState(0);
  const token = Cookie.get('accessToken')

  const handleOpen = (value: any) => setOpen(open === value ? 0 : value);

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
    const fetchData = async () => {
      await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consulta/${id}`, {
        headers: {
          Authorization: `Bearer ${token}`
        }
      }).then(e => {
        setCidadao(e.data)
        setConsulta(e.data.descricao)
        setMedicamentos(e.data.medicamentos)
      }).catch(e => console.log(e))
    }

    fetchData()
  }, [])

  return (
    <div className="flex">
      <SidebarTrue />
      <div className="w-full md:py-5 py-20 px-5 h-screen z-0">
        <div className="bg-white p-5 rounded-md shadow-md my-5">
          <div className="grid p-3 gap-5 grid-cols-2 md:grid-cols-4 md:text-center rounded-md md:gap-10 mb-5 md:bg-cyan-50 text-gray-700">
            <div className="p-2 bg-cyan-50 text-gray-700 md:bg-white rounded shadow-md">
              <h2 className="font-semibold text-sm md:text-base">Prontuário:</h2>
              <span>{cidadao?.prontuario}</span>
            </div>
            <div className="p-2 bg-cyan-50 text-gray-700 md:bg-white rounded shadow-md">
              <h2 className="font-semibold text-sm md:text-base">Paciente:</h2>
              <span>{cidadao?.paciente}</span>
            </div>
            <div className="p-2 bg-cyan-50 text-gray-700 md:bg-white rounded shadow-md">
              <h2 className="font-semibold text-sm md:text-base">Responsável técnico:</h2>
              <span>{cidadao?.respTec}</span>
            </div>
            <div className="p-2 bg-cyan-50 text-gray-700 md:bg-white rounded shadow-md">
              <h2 className="font-semibold text-sm md:text-base">Função técnica:</h2>
              <span>{cidadao?.role}</span>
            </div>
          </div>

          <div className="bg-cyan-50 text-gray-700 p-3 rounded-md shadow">
            <h2 className="font-semibold">Descrição da consulta:</h2>
            <div className="bg-white p-5 rounded shadow-sm">
              {consulta.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>

          {medicamentos.length == 0 ? '' : (
            <div className="bg-cyan-50 text-gray-700 p-3 mt-5 rounded-md shadow lg:w-1/3 w-full">
              <h2 className="font-semibold">Medicamentos:</h2>
              {medicamentos.map((item: any, index: any) => (
                <Accordion placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} key={index} className="bg-white my-3 rounded-md px-5 shadow-md relative z-0" open={open === item.id} icon={<Icon id={item.id} open={open} />}>
                  <AccordionHeader placeholder="" onPointerEnterCapture={() => { }} onPointerLeaveCapture={() => { }} onClick={() => handleOpen(item.id)} className="text-sm font-semibold border-none capitalize">{item.prescricao}</AccordionHeader>
                  <AccordionBody>
                    <p className="capitalize"><span className="font-semibold">Nome:</span> {item.prescricao}</p>
                    <p><span className="font-semibold">Quantidade:</span> {item.quantidade}</p>
                    <p><span className="font-semibold">Tempo de uso:</span> {item.use || '8/8 horas - Uso oral'}</p>
                  </AccordionBody>
                </Accordion>
              ))}
            </div>
          )}

          <div className="bg-cyan-50 text-gray-700 p-3 mt-5 rounded-md shadow w-full lg:w-1/3">
            <h2 className="font-semibold">Data da consulta realizada:</h2>
            <span className="text-gray-500">{moment(cidadao?.createAt).format("DD/MM/YYYY - HH:mm")}</span>
            <p className="font-thin text-sm text-gray-500">{cidadao?.id}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ItemPage;