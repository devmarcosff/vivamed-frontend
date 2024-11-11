import { SidebarTrue } from "@/components/Sidebar";
import ListarCidadao from '@/pages/listar_cidadao/page';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Vivamed - Painel de controle'
}

export default function Home() {


  return (
    <div className="flex">
      <SidebarTrue />
      <div className="flex flex-wrap w-full mt-16 sm:my-0 px-3 overflow-hidden h-screen">
        <ListarCidadao />
      </div>
    </div>
  );
}
