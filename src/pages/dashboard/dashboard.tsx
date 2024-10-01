"use client"

import { BriefcaseMedical, SearchCheck, Users } from "lucide-react";
import Link from "next/link";

export default function Dashboard() {

  return (
    <div className="flex justify-center items-center w-full h-full">

      <div className="grid grid-cols-2 md:grid-cols-3 gap-5 justify-center items-center md:w-[50%]">
        <Link href={'/cadastrar_cidadao'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <Users size={40} />
          <h2>Lista de paciente</h2>
        </Link>
        <Link href={'/consultas'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <SearchCheck size={40} />
          <h2>Consultas realizadas</h2>
        </Link>
        <Link href={'/colaboradores'}
          className="bg-indigo-500 text-center hover:bg-indigo-400 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <BriefcaseMedical size={40} />
          <h2>Lista de colaboradores</h2>
        </Link>
      </div>
    </div>
  )
}