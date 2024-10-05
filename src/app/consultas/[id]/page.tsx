"use client"

import { SidebarTrue } from "@/components/Sidebar";
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
  role: string
}

const ItemPage = ({ params }: any) => {
  const { id } = params
  const [cidadao, setCidadao] = useState<cidadao>()
  const [consulta, setConsulta] = useState('')
  const token = Cookie.get('accessToken')

  const fetchData = async () => {
    await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consulta/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`
      }
    }).then(e => {
      setCidadao(e.data)
      setConsulta(e.data.descricao)
    }).catch(e => console.log(e))
  }

  useEffect(() => {
    fetchData()
  }, [])

  return (
    <div className="flex">
      <SidebarTrue />
      <div className="w-full md:py-5 py-20 px-5 h-screen">
        {/* <div className="flex w-full gap-5 overflow-x-auto">
          <div className="bg-white md:w-1/5 w-full p-5 rounded-md shadow-md">
            <h2 className="font-semibold">Consulta realizada dia:</h2>
            <span className="text-gray-500">{moment(cidadao?.createAt).format("DD/MM/YYYY - HH:mm")}</span>
            <p className="font-thin text-sm text-gray-500">{cidadao?.id}</p>
          </div>
        </div> */}
        <div className="bg-white p-5 rounded-md shadow-md my-5">
          <div className="grid gap-2 grid-cols-2 md:grid-cols-4 md:text-center rounded-md md:gap-10 mb-5 md:bg-gray-100">
            <div className="md:m-5 p-2 bg-gray-100 md:bg-white rounded">
              <h2 className="font-semibold text-sm md:text-base">Prontuário:</h2>
              <span>{cidadao?.prontuario}</span>
            </div>
            <div className="md:m-5 p-2 bg-gray-100 md:bg-white rounded">
              <h2 className="font-semibold text-sm md:text-base">Paciente:</h2>
              <span>{cidadao?.paciente}</span>
            </div>
            <div className="md:m-5 p-2 bg-gray-100 md:bg-white rounded">
              <h2 className="font-semibold text-sm md:text-base">Responsável técnico:</h2>
              <span>{cidadao?.respTec}</span>
            </div>
            <div className="md:m-5 p-2 bg-gray-100 md:bg-white rounded">
              <h2 className="font-semibold text-sm md:text-base">Função técnica:</h2>
              <span>{cidadao?.role}</span>
            </div>
          </div>
          <div className="bg-gray-100 p-5 rounded-md shadow">
            <h2 className="font-semibold">Descrição da consulta:</h2>
            <div className="bg-white p-5 rounded">
              {consulta.split('\n').map((line, index) => (
                <p key={index}>{line}</p>
              ))}
            </div>
          </div>
          <div className="bg-gray-100 p-5 mt-5 rounded-md shadow">
            <h2 className="font-semibold">Medicamentos:</h2>
            <p className="bg-white p-5 rounded mt-3"></p>
          </div>
          <div className="bg-gray-100 p-5 mt-5 rounded-md shadow md:w-1/5">
            <h2 className="font-semibold">Consulta realizada:</h2>
            <span className="text-gray-500">{moment(cidadao?.createAt).format("DD/MM/YYYY - HH:mm")}</span>
            <p className="font-thin text-sm text-gray-500">{cidadao?.id}</p>
          </div>
        </div>

      </div>
    </div>
  );
};

export default ItemPage;