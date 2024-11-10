import { Menu, MenuButton, MenuItem, MenuItems } from '@headlessui/react'
import { ChevronUpIcon } from 'lucide-react'
import Link from 'next/link'
import { useRouter } from 'next/navigation'
import { destroyCookie } from 'nookies'
import { useContext } from 'react'
import { ImProfile } from 'react-icons/im'
import { MdLogout } from 'react-icons/md'
import { SidebarDropdown } from './Sidebar'

export default function Dropdown() {
  const { push } = useRouter()
  const { name, idEnf, expanded } = useContext(SidebarDropdown)

  const roleUser = (role: any) => {
    if (role === 'coordenadorfarmacia' || role === 'coordenadorcaps') {
      return 'Coordenador'
    } else if (role === 'administrativofarmacia' || role === 'administrativocaps') {
      return 'Administrativo'
    } else if (role === 'farmaceuticofarmacia' || role === 'farmaceuticocaps') {
      return 'Farmaceutico'
    } else if (role === 'farmaceuticofarmacia' || role === 'farmaceuticocaps') {
      return 'Farmaceutico'
    } else if (role === 'medicofarmacia' || role === 'medicocaps') {
      return 'Médico'
    }
    return 'Admin'
  }

  return (
    <Menu as="div" className="relative w-full inline-block text-left">

      <MenuButton className={`inline-flex w-full justify-center gap-x-1.5 rounded-md ${expanded ? 'px-3 py-2 hover:bg-cyan-100' : 'px-0'} text-sm font-semibold text-gray-900 transition-all`}>
        <div className={`flex gap-3 justify-between items-center overflow-hidden transition-all`}>
          <img src={`https://ui-avatars.com/api/?name=${name}&background=e0f7fa&color=00838f&bold=true`} className="w-10 h-10 rounded-md hover:-translate-y-1 transition-all" alt="" />
          <div>
            <h4 className="font-semibold capitalize">{name}</h4>
            <span className="text-xs text-gray-600 capitalize">Função: {roleUser(idEnf)}</span>
          </div>
          <ChevronUpIcon aria-hidden="true" className="h-5 w-5 text-gray-600" />
        </div>
      </MenuButton>

      <MenuItems
        transition
        className={`absolute ${expanded ? 'right-0' : 'left-0'} bottom-16 z-20 mt-2 w-40 origin-bottom-right divide-y divide-gray-100 rounded-md bg-white shadow-lg ring-1 ring-black ring-opacity-5 transition focus:outline-none data-[closed]:scale-95 data-[closed]:transform data-[closed]:opacity-0 data-[enter]:duration-150 data-[leave]:duration-75 data-[enter]:ease-out data-[leave]:ease-in"`}>
        <div className="py-1">
          <MenuItem>
            <Link href={'/perfil'}
              className="flex gap-2 px-2 py-2 text-sm text-gray-600 data-[focus]:bg-cyan-50 data-[focus]:text-gray-900"
            >
              <ImProfile aria-hidden="true" className="h-5 w-5 text-gray-600" />
              Perfil
            </Link>
          </MenuItem>
        </div>
        <div className="py-1">
          <MenuItem>
            <button
              onClick={() => {
                destroyCookie(null, 'accessToken')
                destroyCookie(null, 'authRole')
                push('/login')
              }}
              className="flex gap-2 px-2 py-2 w-full text-sm text-gray-600 data-[focus]:bg-cyan-50 data-[focus]:text-gray-900"
            >
              <MdLogout aria-hidden="true" className="h-5 w-5 text-gray-600" />
              Sair
            </button>
          </MenuItem>
        </div>
      </MenuItems>
    </Menu>
  )
}
