import { SidebarTrue } from "@/components/Sidebar";
import ListaColaboradores from "@/pages/colaboradores/colaboradores";
import { Metadata } from "next";


export const metadata: Metadata = {
  title: 'Colaboradores CAPS - SMSBJ'
}

export default function Colaboradores() {

  return (
    <div className="flex">
      <SidebarTrue />
      <div className="w-full md:py-5 py-20 px-5 h-screen">
        <ListaColaboradores />
      </div>
    </div>
  );
}
