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
      <div className="w-full md:py-5 py-20 px-5">
        <ListarCidadao />
      </div>
    </div>
  );
}
