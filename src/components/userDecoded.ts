import Cookie from 'js-cookie';
import { jwtDecode } from "jwt-decode";

interface CadastroCidadao {
  id: string,
  name: string,
  role: string,
  idProf: string
}

export default function userDecoded(setUser: any) {
  // Verifica se está no lado do cliente
  if (typeof window !== 'undefined') {
    const token = Cookie.get('accessToken');
    if (token) {
      const decoded = jwtDecode<CadastroCidadao>(`${token}`)
      setUser(decoded);
    }
  }
}