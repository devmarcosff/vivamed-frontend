"use client"

import getCookie from "@/components/getCookie";
import { BriefcaseMedical, Package, SearchCheck, Users } from "lucide-react";
import Link from "next/link";
import { useEffect, useState } from "react";

export default function Dashboard() {
  const [role, setRole] = useState<any>();
  // Capturando o cookie authRole
  useEffect(() => {
    const isGetCookie = getCookie()

    setRole(isGetCookie)
  }, []);

  const verBotoes = (role: any) => {
    if (role === 'coordenadorfarmacia' || role === 'administrativofarmacia' || role === 'medicofarmacia' || role === 'enfermeirofarmacia' || role === 'enfermeirofarmacia') {
      return (
        <>
          <Link href={'/cadastrar_cidadao'}
            className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
            <Users size={40} />
            <h2 className="text-xl uppercase font-semibold">Pacientes</h2>
          </Link>
          <Link href={'/estoque'}
            className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
            <SearchCheck size={40} />
            <h2 className="text-xl uppercase font-semibold">Estoque</h2>
          </Link>
          <Link href={'/colaboradores'}
            className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
            <BriefcaseMedical size={40} />
            <h2 className="text-xl uppercase font-semibold">Colaboradores</h2>
          </Link>
        </>
      )
    } else if (role === 'coordenadorcaps' || role === 'administrativocaps' || role === 'medicocaps' || role === 'enfermeirocaps' || role === 'enfermeirocaps') {
      return (
        <>
          <Link href={'/cadastrar_cidadao'}
            className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
            <Users size={40} />
            <h2 className="text-xl uppercase font-semibold">Pacientes</h2>
          </Link>
          <Link href={'/consultas'}
            className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
            <SearchCheck size={40} />
            <h2 className="text-xl uppercase font-semibold">Consultas</h2>
          </Link>
          <Link href={'/colaboradores'}
            className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
            <BriefcaseMedical size={40} />
            <h2 className="text-xl uppercase font-semibold">Colaboradores</h2>
          </Link>
        </>
      )
    }
    return (
      <>
        <Link href={'/cadastrar_cidadao'}
          className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <Users size={40} />
          <h2 className="text-base uppercase font-semibold">Pacientes</h2>
        </Link>
        <Link href={'/consultas'}
          className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <SearchCheck size={40} />
          <h2 className="text-base uppercase font-semibold">Consultas</h2>
        </Link>
        <Link href={'/estoque'}
          className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <Package size={40} />
          <h2 className="text-base uppercase font-semibold">Estoque</h2>
        </Link>
        <Link href={'/colaboradores'}
          className="bg-cyan-800 text-center hover:bg-cyan-700 w-full h-56 md:h-80 hover:scale-95 hover:shadow-none transition-all p-5 text-white flex flex-col justify-center items-center gap-5 rounded shadow-lg">
          <BriefcaseMedical size={40} />
          <h2 className="text-base uppercase font-semibold">Colaboradores</h2>
        </Link>
      </>
    )
  }

  return (
    <div className={`flex justify-center items-center w-full h-full`}>
      <div className={`w-[90%] grid grid-cols-2 ${role === 'admin' ? 'md:grid-cols-2' : 'md:grid-cols-3'} gap-3 justify-center items-center`}>
        {verBotoes(role)}
      </div>
    </div>
  )
}