import { SidebarTrue } from "@/components/Sidebar";
import { Metadata } from "next";
import Link from "next/link";

export const metadata: Metadata = {
  title: 'Estoque - Vivamed | Bom Jesus do Itabapoana'
}

export default function Stock() {
  return (
    <div className="flex">
      <SidebarTrue />
      {/* <div className="flex flex-wrap w-full mt-16 sm:my-0 px-3 overflow-hidden h-screen bg-white my-3 w-full rounded-md"> */}
      <div className="bg-gradient-to-br from-allintra-primary-800/35 to-allintra-primary-50 to-80% m-3 w-full rounded-xl flex gap-5 justify-center items-center">
        <Link href={'/estoque/fornecedor'} className="bg-allintra-primary-800 hover:bg-allintra-primary-700 transition-all h-[300px] w-[300px] flex items-center justify-center text-white font-semibold text-xl rounded-xl shadow-sm hover:scale-95">
          Fornecedor
        </Link>
        <Link href={'/estoque/notafiscal'} className="bg-allintra-primary-800 hover:bg-allintra-primary-700 transition-all h-[300px] w-[300px] flex items-center justify-center text-white font-semibold text-xl rounded-xl shadow-sm hover:scale-95">
          Notas Fiscais
        </Link>
        <Link href={'/estoque/medicamentos'} className="bg-allintra-primary-800 hover:bg-allintra-primary-700 transition-all h-[300px] w-[300px] flex items-center justify-center text-white font-semibold text-xl rounded-xl shadow-sm hover:scale-95">
          Estoque
        </Link>
      </div>
    </div>
  );
}
