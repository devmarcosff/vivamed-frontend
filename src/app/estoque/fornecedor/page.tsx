"use client"

import { SidebarTrue } from "@/components/Sidebar";
import { BoxInfo } from "@/components/stylesComponents/molecules/BoxInfo";
import { Drawer } from "@/components/stylesComponents/organisms/Drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import Cookie from 'js-cookie';
import { Plus } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { BsFillTelephoneFill } from "react-icons/bs";
import { FaLink, FaWhatsapp } from "react-icons/fa";
import { IoIosInformationCircleOutline, IoMdAddCircleOutline, IoMdPrint } from "react-icons/io";
import { MdDelete, MdModeEditOutline } from "react-icons/md";
import { toast } from "react-toastify";

interface IFirm {
  // Firm
  businessName?: string;
  cnpj?: string;
  email?: string;
  phone?: string;
  // tradeName:
  // stateRegistration:
  // municipalRegistration:

  // Firm Address
  street?: string;
  city?: string;
  neighborhood?: string;
  number: number;
  zipcode?: string
  state?: string;
  complement?: string;
  latitude?: string;
  longitude?: string;
  firmId?: string;
}

export default function Fornecedor() {
  const token = Cookie.get('accessToken')
  const [fornecedores, setFornecedores] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [isFornecedor, setIsFornecedor] = useState<any>([]);
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm()
  var isFornecedorTrue = isFornecedor.length

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v2/firms`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setFornecedores(res.data.items)
    }).catch(e => alert(e))

  }, [drawer == false])

  const removerMedicamento = (indexToRemove: any) => {
    setIsFornecedor((prevState: any) => prevState.filter((_: any, index: any) => index !== indexToRemove));
  };

  const adicionarMedicamento = () => {
    const novoMedicamento = {};
    setIsFornecedor((prevState: any) => [...prevState, novoMedicamento]);
  };

  const Card = ({ title, description, children }: any) => (
    <div className="bg-white rounded-xl shadow-sm border border-allintra-primary-50 h-full">
      <div className="p-6 flex items-center justify-between">
        <div>
          <h2 className="text-xl font-semibold text-allintra-black-500">{title}</h2>
          <p className="mt-1 text-sm text-allintra-gray-700">{description}</p>
        </div>
        <div>
          <button type="submit" onClick={() => setDrawer(true)} className="flex w-full group/firm sm:w-36 justify-center items-center rounded-xl bg-cyan-800 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3">
            Fornecedor
            <Plus className="ml-2 h-4 w-4 transition-all group-hover/firm:rotate-90" />
          </button>
        </div>
      </div>
      <div className="px-6 pb-6">
        {children}
      </div>
    </div>
  );

  const inserirFirm = async (data: any) => {
    const firm = {
      businessName: data.businessName,
      cnpj: data.cnpj,
      email: data.email,
      phone: data.phone
    }

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v2/firms`, firm, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      },
    }).then(e => {
      const id = e.data.id;
      const firmAddress = {
        street: data.street,
        city: data.city,
        neighborhood: data.neighborhood,
        number: data.number,
        zipcode: data.zipcode,
        state: data.state,
        complement: data.complement,
        latitude: data.latitude,
        longitude: data.longitude,
        firmId: id
      }

      reset()
      setDrawer(false)

      if (data.street) {
        axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v2/address`, firmAddress, {
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${token}`
          },
        }).then().catch(e => {
          toast.error("Erro ao adicionar endereço", {
            position: "bottom-right",
            autoClose: 5000,
            hideProgressBar: false,
            closeOnClick: true,
            pauseOnHover: true,
            draggable: true,
            progress: undefined,
            theme: "light",
          });
        })
      }

      toast.success("Fornecedor cadastrado com sucesso.", {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      });

    }).catch(e =>
      toast.error(`${e.response.data.message}`, {
        position: "bottom-right",
        autoClose: 5000,
        hideProgressBar: false,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "light",
      }))
  }

  return (
    <div className="flex">
      <SidebarTrue />

      <div className="bg-gradient-to-br from-allintra-primary-800/35 to-allintra-primary-50 to-80% p-4 flex flex-col gap-4 w-full md:mt-0 mt-16">
        <div className="w-full h-full">
          <Card
            title="Lista de Fornecedores"
            description="Ver informações do fornecedor"
          >
            {
              fornecedores.length ? (
                <div className='overflow-auto rounded-xl shadow-md'>
                  <table className="table-auto w-full bg-white">
                    <thead className='bg-cyan-50 border-b-2 border-white'>
                      <tr>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>Nome da Empresa / Razão Social</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>CNPJ</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>E-mail</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>Telefone</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>Data de cadastro</th>
                        <th className='py-5 px-2 text-center text-nowrap border-r-2 border-white'>Entrar em contato</th>
                      </tr>
                    </thead>
                    <tbody className='text-sm'>
                      {
                        fornecedores && Array.isArray(fornecedores) ? fornecedores?.map((item: any, index: any) => {
                          moment.locale('pt')
                          return (
                            <tr key={index} className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`} onClick={() => console.log(item)}>
                              <td className="px-3 py-3 group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[200px]">{item.businessName}</td>
                              <td className="px-3 py-3 text-left group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[120px]">{item.cnpj}</td>
                              <th className="py-3 text-left max-w-44 truncate cursor-pointer">{item.email || "-"}</th>
                              <th className="py-3 text-left max-w-44 truncate cursor-pointer">{item.phone || "-"}</th>
                              <th className="py-3 text-left max-w-44 truncate cursor-pointer">{moment(item.createAt).format('DD/MM/YYYY - HH:mm') || "-"}</th>
                              <th className="py-3 text-left max-w-44 truncate cursor-pointer">
                                <div className="flex gap-2 items-center justify-center">
                                  <FaWhatsapp className="h-7 w-7 bg-allintra-success-500 p-1 rounded-xl shadow-sm text-white transition-all text-xl flex items-center justify-center" />
                                  <BsFillTelephoneFill className="h-7 w-7 bg-allintra-gray-700 p-1 rounded-xl shadow-sm text-white transition-all text-xl flex items-center justify-center" />
                                  <FaLink className="h-7 w-7 bg-allintra-gray-700 p-1 rounded-xl shadow-sm text-white transition-all text-xl flex items-center justify-center" />
                                </div>
                              </th>
                            </tr>
                          )
                        }) :
                          <tr className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`}>
                            <td className="px-3 py-3 group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[200px]"></td>
                            <td className="px-3 py-3 text-left group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[120px]"></td>
                            <th className="py-3 text-left max-w-44 truncate cursor-pointer"><span className='font-semibold text-gray-600'>Não existe fornecedores cadastrados</span></th>
                            <th className="py-3 text-left max-w-44 truncate cursor-pointer"></th>
                            <th className="py-3 text-left max-w-44 truncate cursor-pointer"></th>
                            <th className="py-3 text-left max-w-44 truncate cursor-pointer"></th>
                          </tr>
                      }
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='bg-cyan-50 py-5 border-white text-center m-3 rounded-xl shadow-sm'>
                  <span className='font-semibold text-gray-600'>Não existe fornecedores cadastrados</span>
                </div>
              )
            }
          </Card>
        </div>
      </div>

      {/* Drawer Inserir Consulta */}
      <Drawer.Root open={drawer == true} onOpenChange={() => setDrawer(false)} >
        <Drawer.Content className="2xl:w-[85%]">
          <>
            <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 flex flex-col justify-between relative'>
              <div>
                <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm'>
                  <h2 className='font-semibold text-allintra-gray-700'>Preencha os dados do fornecedor</h2>
                </div>

                <form className="w-full"
                  onSubmit={handleSubmit(inserirFirm)}
                >
                  <div className="flex flex-wrap p-5 text-left justify-between">
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="businessName">
                        Nome da Empresa / Razão Social*
                      </label>
                      <input {...register('businessName')} id="businessName" placeholder="Stevanini LTDA" className={`shadow-sm block w-full bg-white text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`} type="text" />
                      {
                        errors.businessName && <p className="text-red-500 text-xs italic">Por favor selecione um colaborador</p>
                      }
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                        CNPJ*
                      </label>
                      <input {...register('cnpj')} id="cnpj" placeholder="XX.XXX.XXX/0001-XX" className={`shadow-sm block w-full bg-white text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`} type="text" />
                      {
                        errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um colaborador</p>
                      }
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                        Email*
                      </label>
                      <input {...register('email')} id="email" placeholder="email@email.com" className={`shadow-sm block w-full bg-white text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`} type="text" />
                      {
                        errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um colaborador</p>
                      }
                    </div>
                    <div className="w-full md:w-1/2 px-3 mb-6 md:mb-3">
                      <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
                        Telefone*
                      </label>
                      <input {...register('phone')} id="phone" placeholder="(00) 00000-0000" className={`shadow-sm block w-full bg-white text-gray-700 border rounded py-2 px-4 leading-tight focus:outline-none focus:border-allintra-primary-500`} type="text" />
                      {
                        errors.paciente && <p className="text-red-500 text-xs italic">Por favor selecione um colaborador</p>
                      }
                    </div>

                    {/* ADICIONAR MEDICAMENTOS */}
                    {!isFornecedorTrue && (
                      <div className="w-full px-3 mb-3 py-3 border-t md:mb-0">
                        <button type="button" onClick={adicionarMedicamento}>
                          <span className='flex gap-2 items-center text-allintra-gray-700 font-semibold'><IoMdAddCircleOutline /> Adicionar endereço</span>
                        </button>
                      </div>
                    )}
                    {isFornecedor?.map((item: any, index: any) => (
                      <div className='w-full flex flex-wrap my-4 relative' key={index}>
                        <div className="w-full sm:w-1/2 px-3 py-3 border-t md:mb-0">
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="street">
                              Rua / Logadouro
                            </label>
                            <input
                              // onChange={e => handleInputChange(index, 'street', e.target.value)}
                              type='text'
                              placeholder='Rua da empresa'
                              {...register('street')}
                              id="street"
                              name="street"
                              className={`${errors.street && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                            {
                              errors.street && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3 py-3 border-t md:mb-0">
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="city">
                              Cidade
                            </label>
                            <input
                              // onChange={e => handleInputChange(index, 'cidade', e.target.value)}
                              type='text'
                              placeholder='Cidade da empresa'
                              {...register('city')}
                              id="city"
                              name="city"
                              className={`${errors.city && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                            {
                              errors.city && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3 py-3 border-t md:mb-0">
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="neighborhood">
                              Bairro
                            </label>
                            <input
                              // onChange={e => handleInputChange(index, 'cidade', e.target.value)}
                              type='text'
                              placeholder='Cidade da empresa'
                              {...register('neighborhood')}
                              id="neighborhood"
                              name="neighborhood"
                              className={`${errors.neighborhood && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                            {
                              errors.neighborhood && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3 py-3 md:mb-0">
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="number">
                              Número
                            </label>
                            <input
                              // onChange={e => handleInputChange(index, 'number', e.target.value)}
                              type='text'
                              placeholder='60'
                              {...register('number')}
                              id="number"
                              name="number"
                              className={`${errors.number && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                            {
                              errors.number && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3 py-3 md:mb-0">
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="zipcode">
                              CEP
                            </label>
                            <input
                              // onChange={e => handleInputChange(index, 'zipcode', e.target.value)}
                              type='text'
                              placeholder='28360-000'
                              {...register('zipcode')}
                              id="zipcode"
                              name="zipcode"
                              className={`${errors.zipcode && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                            {
                              errors.zipcode && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full sm:w-1/2 px-3 py-3 md:mb-0">
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="state">
                              UF
                            </label>
                            <input
                              // onChange={e => handleInputChange(index, 'state', e.target.value)}
                              type='text'
                              placeholder='Estado da empresa'
                              {...register('state')}
                              id="state"
                              name="state"
                              className={`${errors.state && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                            {
                              errors.state && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full px-3 py-3 md:mb-0">
                          <div>
                            <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="complement">
                              Complemento
                            </label>
                            <textarea id="complement" {...register('complement')} className={`${errors.complement && 'border-red-500'} appearance-none shadow-sm block w-full  text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-allintra-primary-500`} />
                            {
                              errors.complement && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
                            }
                          </div>
                        </div>
                        <div className="w-full px-3 md:mb-0 py-1">
                          <button
                            type="button"
                            onClick={() => removerMedicamento(index)}
                            className="
                                  absolute top-2 right-3 p-1
                                  text-allintra-error-500 border border-allintra-error-500 bg-allintra-error-50 hover:bg-allintra-error-500 hover:text-white transition-all text-sm font-semibold shadow-sm rounded"
                          ><MdDelete /></button>
                        </div>
                      </div>
                    ))}

                  </div>
                  <div className='flex sm:flex-row sm:justify-between flex-col-reverse justify-end items-center w-full gap-3 bg-allintra-gray-300 px-4 py-2 sticky bottom-0 left-0'>
                    <span className='text-allintra-gray-600 text-sm truncate w-full hidden sm:flex'>{moment().format("DD/MM/YYYY - HH:mm")}</span>
                    <div className='flex gap-3 w-full sm:w-[initial]'>
                      <button className='px-3 py-1 w-full sm:w-[120px] text-allintra-error-500 border border-allintra-error-500 bg-allintra-error-50 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => {
                        setDrawer(false)
                        setIsFornecedor([])
                        reset()
                      }}>Cancelar</button>
                      <button type='submit' className='px-3 py-1 w-full sm:w-[120px] text-allintra-primary-800 border border-allintra-primary-800 bg-allintra-primary-50 hover:bg-allintra-primary-500 hover:text-white transition-all  text-sm font-semibold shadow-md rounded-md'>Inserir</button>
                    </div>
                  </div>
                </form>

              </div >
            </div >
          </>
        </Drawer.Content >
      </Drawer.Root >
    </div>
  );
}