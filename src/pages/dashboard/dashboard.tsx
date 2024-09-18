"use client"

import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { Briefcase, NotepadText, ScrollText, SearchCheck, UserPlus, Users } from "lucide-react";
import Link from "next/link";
import { useEffect } from "react";

export default function Dashboard() {
  useEffect(() => {
    const token = Cookie.get('accessToken');
    const decodedToken = jwtDecode(`${token}`);
    Cookie.set('addressToken', `${JSON.stringify(decodedToken)}`)
  }, [])

  return (
    <div className="flex justify-center items-center w-full h-full">

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-center items-center md:w-[50%]">
        <Link href={'/cadastrar_cidadao'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <UserPlus size={40} />
          <h2>Cadastrar Paciente</h2>
        </Link>
        <Link href={'#'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <Users size={40} />
          <h2>Lista de paciente</h2>
        </Link>
        <Link href={'#'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <NotepadText size={40} />
          <h2>Iniciar nova consulta</h2>
        </Link>
        <Link href={'#'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <Briefcase size={40} />
          <h2>Cadastrar colaborador</h2>
        </Link>
        <Link href={'#'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <ScrollText size={40} />
          <h2>Lista de colaboradores</h2>
        </Link>
        <Link href={'#'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <SearchCheck size={40} />
          <h2>Consultas realizadas</h2>
        </Link>
      </div>
    </div>
  )
}