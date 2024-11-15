import { SidebarTrue } from "@/components/Sidebar";
import { Metadata } from "next";

export const metadata: Metadata = {
    title: 'Nota Fiscal - Vivamed'
}

export default function NotaFiscal() {


    return (
        <div className="flex">
            <SidebarTrue />
            <div className="bg-white m-3 w-full rounded-md flex gap-5 justify-center items-center">
                Nota Fiscal
            </div>
        </div>
    );
}
