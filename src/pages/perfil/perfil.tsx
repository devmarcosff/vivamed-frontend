"use client"

import Cookie from "js-cookie";
import { jwtDecode } from "jwt-decode";
import { ChevronRight } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";

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
  const [user, setUser] = useState<IUser | any>()

  useEffect(() => {
    const token = Cookie.get('accessToken');
    const decoded = jwtDecode(`${token}`)
    setUser(decoded)
  }, [])

  return (
    <div>
      <div className="bg-white text-gray-700 p-3 rounded-md shadow-md">
        <div className="mb-3">
          <h2 className="font-semibold text-lg flex items-center">Perfil de usuário <ChevronRight className="w-4" /> {user?.name || 'Usuário desconectado...'}</h2>
        </div>
        <div className="py-3 flex gap-4">
          <img alt="Perfil" className="w-36 h-36 rounded-md shadow-sm" src={`${`https://ui-avatars.com/api/?name=${user?.name}&background=e0f7fa&color=00838f&bold=true`}`} />
          <div className="flex flex-col justify-between font-semibold">
            <h2 className="text-xl md:text-3xl">{user?.name || 'Usuário desconectado...'}</h2>
            <p>Função: {user?.role || 'Usuário desconectado...'}</p>
            <p>Identificação do técnico: {user?.idProf || 'Usuário desconectado...'}</p>
            <p>Data de nascimento: {moment(user?.birthday).format("DD/MM/YYYY") || 'Usuário desconectado...'}</p>
          </div>
        </div>
      </div>
    </div>
  );
}
