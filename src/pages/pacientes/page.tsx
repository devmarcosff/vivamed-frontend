import { CircleFadingPlus, Edit, Eye, Trash } from "lucide-react";

export default function Pacientes() {
  return (
    <>
      <div className="bg-white my-2 shadow-md rounded-md p-5 w-full h-full">
        <div className="flex justify-between items-center w-full border-b-[1px] pb-3">
          <h2>Dashboard / Pacientes cadastrados</h2>

          <button className="bg-indigo-800 hover:bg-indigo-700 text-white transition-all shadow-md font-medium px-3 py-1 rounded-lg flex items-center gap-2">
            <CircleFadingPlus size={20} />
            Cadastrar novo
          </button>
        </div>

        <div className="py-3">
          <div className="overflow-hidden overflow-x-auto py-3">
            <table className="table-auto w-full">
              <thead>
                <tr>
                  <th>#</th>
                  <th>Pedido</th>
                  <th>Data do pedido</th>
                  <th>Prazo de entrega</th>
                  <th>Orçamento</th>
                  <th></th>
                </tr>
              </thead>
              <tbody>
                <tr>
                  <td className="text-center">1</td>
                  <td className="text-center max-w-44 truncate">Lampada LED RGB</td>
                  <td className="text-center">25/08/2024</td>
                  <td className="text-center">05/09/2024</td>
                  <td className="text-center">R$ 739,90</td>
                  <td className="flex items-center justify-center gap-2">
                    <button className="bg-blue-500 hover:bg-blue-400 text-white transition-all shadow-md font-medium h-7 w-7 rounded-lg flex justify-center items-center gap-2">
                      <Eye size={15} />
                    </button>
                    <button className="bg-orange-500 hover:bg-orange-400 text-white transition-all shadow-md font-medium h-7 w-7 rounded-lg flex justify-center items-center gap-2">
                      <Edit size={15} />
                    </button>
                    <button className="bg-red-500 hover:bg-red-400 text-white transition-all shadow-md font-medium h-7 w-7 rounded-lg flex justify-center items-center gap-2">
                      <Trash size={15} />
                    </button>
                  </td>
                </tr>
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </>
  );
}
