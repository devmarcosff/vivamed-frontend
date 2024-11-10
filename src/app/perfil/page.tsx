import { SidebarTrue } from "@/components/Sidebar";
import Perfil from '@/pages/perfil/perfil';
import { Metadata } from "next";

export const metadata: Metadata = {
  title: 'Perfil de usuário'
}

export default function Profile() {

  return (
    <div className="flex h-screen">
      <SidebarTrue />
      <div className="w-full md:py-5 py-20 px-5">
        <Perfil />
      </div>
    </div>
  );
}
