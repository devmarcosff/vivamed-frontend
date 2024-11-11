import getCookie from "../getCookie";
import types from "./roles.t";

const routes = () => {
  const allRoutes = {
    public: {
      dashboard: '/'
    },
    private: {
      consultas: '/consultas'
    }
  }

  return allRoutes;
}

export default routes;

export function isNotCaps({ pathname }: any) {
  const role = getCookie()
  const typeRole = types()
  const url = routes()

  pathname === url.private.consultas && role !== (typeRole.adm, typeRole.caps.coordenador, typeRole.caps.enfermeiro, typeRole.caps.farmaceutico, typeRole.caps.medico) && (window.location.href = "/")
}

export function isNotFarmacia({ pathname }: any) {
  const role = getCookie()
  const typeRole = types()
  const url = routes()

  pathname === url.private.consultas && role !== (typeRole.adm, typeRole.farmacia.coordenador, typeRole.farmacia.enfermeiro, typeRole.farmacia.farmaceutico, typeRole.farmacia.medico) && (window.location.href = "/")
}