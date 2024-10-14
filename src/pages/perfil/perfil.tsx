"use client"

import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ChevronRight } from "lucide-react";
import moment from "moment";

interface IUser {
  active: string
  address: string
  birthday: string
  cpf: string
  idProf: string
  name: string
  orders: string
  role: string
  username: string
}

export default function Consultation() {
  const token = Cookie.get('accessToken');
  const decoded = jwtDecode<IUser>(`${token}`)

  return (
    <div>
      <div className="mb-3">
        <h2 className="font-semibold text-lg flex items-center">Perfil de usuário <ChevronRight className="w-4" /> {decoded.name}</h2>
      </div>
      <div className="bg-white p-3 rounded-md shadow-md">
        <div className="bg-[#B4E1FA] p-5 rounded-md shadow-md flex gap-4">
          <img alt="Perfil" className="w-36 h-36 rounded-md shadow-sm" src={`${`https://ui-avatars.com/api/?name=${decoded.name}&background=1E3A56&color=B4E1FA&bold=true`}`} />
          <div className="flex flex-col justify-between font-semibold">
            <h2 className="text-xl md:text-3xl">{decoded.name}</h2>
            <p>Função: {decoded.role}</p>
            <p>Identificação do técnico: {decoded.idProf}</p>
            <p>Data de nascimento: {moment(decoded.birthday).format("DD/MM/YYYY")}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
