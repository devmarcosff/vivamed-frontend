"use client"
import Cookie from 'js-cookie';
import { jwtDecode } from 'jwt-decode';
import { BriefcaseMedical, ChevronDown, ChevronFirst, ChevronLast, ChevronUp, LayoutDashboard, Package, Stethoscope, Users } from 'lucide-react';
import Image from "next/image";
import Link from "next/link";
import { createContext, useContext, useEffect, useState } from "react";
import { ImProfile } from 'react-icons/im';
import logo from '../assets/vivamed.svg';
import Dropdown from "./Dropdown";
import getCookie from './getCookie';
import types from './types/roles.t';

const SidebarContext = createContext<any>(true)
export const SidebarDropdown = createContext<any>(null)

interface CadastroCidadao {
  name: string,
  role: string,
  idProf: string
}

// SIDEBAR
export function Sidebar({ children }: string | any) {
  const [expanded, setExpanded] = useState<boolean>(true)
  const [user, setUser] = useState<CadastroCidadao | undefined>()

  useEffect(() => {
    const isDesktop = window.innerWidth >= 858;
    setExpanded(isDesktop)
    // Verifica se está no lado do cliente
    if (typeof window !== 'undefined') {
      const token = Cookie.get('accessToken');
      if (token) {
        const decoded = jwtDecode<CadastroCidadao>(`${token}`)
        Cookie.set('authRole', decoded.role);
        setUser(decoded);
      }
    }
  }, []);

  return (
    <aside className={`z-20`} >
      <nav className={`flex flex-col overflow-hidden absolute transition-all duration-500 border-r shadow-sm bg-white md:h-full
          ${expanded ? 'h-full w-full md:relative md:w-64' : 'h-16 w-full md:relative md:w-[66px]'}
        `}>
        <div className="p-4 pb-2 flex justify-between items-center">
          <div className={`flex items-center gap-2 overflow-hidden duration-500 transition-all ${expanded ? 'w-28' : ''}`}>
            <Image src={logo} className={`w-8`} alt="" />
            <span className="font-semibold text-cyan-800">Vivamed</span>
          </div>
          <button
            onClick={() => setExpanded(click => !click)}
            className="p-1.5 rounded-lg bg-gray-300 hover:bg-gray-200 transition-all">
            {expanded ? <ChevronFirst /> : <ChevronLast />}
          </button>
        </div>
        <SidebarContext.Provider value={{ expanded, setExpanded }}>
          <ul className={`flex-1 px-3 ${expanded ? 'py-5' : 'hidden md:block'}`}>{children}</ul>
          {user && (
            <SidebarDropdown.Provider value={{ name: user?.name, idEnf: user.role, expanded }}>
              <div className={`border-t flex p-3 ${expanded ? '' : 'hidden md:block'}`}>
                <Dropdown />
              </div>
            </SidebarDropdown.Provider>
          )}
        </SidebarContext.Provider>

      </nav>
    </aside>
  );
}

// SIDEBAR ITEM
export function SidebarItem({ icon, text, active, alert, subMenu, children, url }: any) {
  const { expanded, setExpanded }: any = useContext(SidebarContext)
  const [clickMenu, setClickMenu] = useState<boolean>(false)

  return (
    <Link href={`${url ? url : '#'}`}>
      <li onClick={() => {
        if (subMenu == true && expanded == false) {
          setExpanded(!expanded)
        }
        if (subMenu) setClickMenu(!clickMenu)
      }} className={`
    relative py-2 px-3 my-2 font-medium rounded-md border-l-4 border-cyan-200 shadow cursor-pointer hover:translate-x-2 transition-all group text-gray-600
    ${clickMenu ? 'bg-gradient-to-tl from-cyan-200 to-cyan-100 text-cyan-800 hover:-translate-x-0' : ''}
    ${active ? 'bg-gradient-to-tl from-cyan-200 to-cyan-100 text-cyan-800' : 'hover:bg-cyan-50 hover:shadow-lg '}
    `}>
        <div className="flex items-center">
          {icon}
          <span className={`overflow-hidden transition-all ${expanded ? 'w-52 ml-3' : 'w-0'}`}>{text}</span>
          {subMenu && <div className={`${expanded ? '' : 'hidden'} mr-2 transition-all`}>{!clickMenu ? <ChevronDown /> : <ChevronUp />}</div>}

          {alert && <div className={`absolute right-2 w-2 h-2 rounded bg-cyan-400 animate-pulse duration-1000 ${expanded ? '' : 'top-2'}`} />}

          {!expanded && <div className={`absolute left-full rounded-md px-2 py-1 ml-6 bg-cyan-100 text-cyan-800 text-sm invisible opacity-20 -translate-x-3 transition-all group-hover:visible group-hover:opacity-100 group-hover:translate-x-0`}>{text}</div>}
        </div>
        {expanded && <div className={`${clickMenu ? 'flex py-2 my-1' : 'hidden'} mr-2 transition-all`}>{children}</div>}
      </li>
    </Link>
  )
}

// SIDEBAR SUBMENU
export const SidebarSubmenu = ({ name, url, icon }: any) => {
  return (
    <>
      <ul className="py-1 w-full space-y-2">
        <li className="hover:translate-x-2 bg-white rounded-lg border-cyan-200 border-l-4 shadow-md transition-all">
          <Link href={url} className="flex items-center gap-3 w-full p-2 transition duration-75">
            {icon}
            {name}
          </Link>
        </li>
      </ul>
    </>
  )
}

// SIDEBAR MOUNT
export const SidebarTrue = () => {
  const [role, setRole] = useState<any>();
  const typeRole = types()
  // Capturando o cookie authRole
  useEffect(() => {
    const isRole = getCookie()

    setRole(isRole)
  }, []);

  return (
    // PARA ADICIONAR UM SUBMENU, VOCÊ DEVE PASSAR O SEU COMPONENTE COMO CHILDREN(FILHO)
    // JUNTO COM OS SEUS PARAMETROS => params: { name, url, icon }
    <Sidebar>
      {/* Funções Geral - Qualquer um pode acessar */}
      <SidebarItem icon={<LayoutDashboard size={20} />} text="Dashboard" url={'/'} />
      <SidebarItem icon={<Users size={20} />} text="Pacientes" url={'/cadastrar_cidadao'} />

      {/* Funções Caps - Só o caps acessa*/}
      {(role === "admin" || role === "coordenadorfarmacia" || role === "farmaceuticofarmacia" || role === "administrativofarmacia") && <hr className="my-3" />}
      {(role === "admin" || role === "medicocaps" || role === "enfermeirocaps" || role === "farmaceuticocaps" || role === "coordenadorcaps" || role === "administrativocaps") && <SidebarItem icon={<Stethoscope size={20} />} text="Consultar" url={'/consultas'} />}
      {(role === "admin" || role === "medicocaps" || role === "enfermeirocaps" || role === "farmaceuticocaps" || role === "coordenadorcaps" || role === "administrativocaps") && <SidebarItem icon={<Stethoscope size={20} />} text="Agendar" url={'/agendar'} />}

      {/* Funções Farmacia - Só a farmácia acessa */}
      {(role === "admin" || role === "coordenadorfarmacia" || role === "farmaceuticofarmacia" || role === "administrativofarmacia") && <hr className="my-3" />}
      {(role === "admin" || role === "medicofarmacia" || role === "farmaceuticofarmacia" || role === "coordenadorfarmacia" || role === "farmaceuticofarmacia" || role === "administrativofarmacia") && <SidebarItem icon={<Package size={20} />} text="Estoque" url={'/estoque'} />}

      {/* Separação entre linha - Qualquer um pode acessar */}
      <hr className="my-3" />
      {(role === "admin" || role === "coordenadorcaps" || role === "coordenadorfarmacia" || role === "administrativo") && <SidebarItem icon={<BriefcaseMedical size={20} />} text="Colaboradores" url={'/colaboradores'} />}
      <SidebarItem icon={<ImProfile size={20} />} text="Perfil" url={'/perfil'} />

      {/* <SidebarItem icon={<UserCircle size={20} />} text="Estatística" />
      <SidebarItem icon={<Package size={20} />} text="Estoque" /> */}
      {/* <SidebarItem icon={<Boxes size={20} />} text="Farmácia" subMenu>
        <div className="flex-col">
          <SidebarSubmenu name="Cadastrar medicamentos" url="/cadastrar_medicamento" icon={<CirclePlus size={20} />} />
          <SidebarSubmenu name="Listar medicamentos" url="/listar_medicamento" icon={<CirclePlus size={20} />} />
        </div>
      </SidebarItem> */}
      {/* <SidebarItem icon={<Receipt size={20} />} text="Pagamentos" /> */}
      {/* <hr className="my-3" />
      <SidebarItem icon={<Settings size={20} />} text="Configuração" url={'/config'} /> */}
      {/* <SidebarItem icon={<LifeBuoy size={20} />} text="Ajuda" /> */}
      {/* <SidebarItem icon={<Boxes size={20} />} text="Farmácia" subMenu>
        <div className="flex-col">
        </div> */}
      {/* <div className="flex-col">
          <SidebarSubmenu name="Listar medicamentos" url="/listar_medicamento" icon={<CirclePlus size={20} />} />
        </div> */}
      {/* </SidebarItem> */}
    </Sidebar>
  )
}
