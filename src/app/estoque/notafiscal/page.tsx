"use client"

import CadastrarNotaFiscal from "@/components/cadastrar_notafiscal.modal";
import { SidebarTrue } from "@/components/Sidebar";
import { BoxInfo } from "@/components/stylesComponents/molecules/BoxInfo";
import { Drawer } from "@/components/stylesComponents/organisms/Drawer";
import { DialogTitle } from "@radix-ui/react-dialog";
import axios from "axios";
import Cookie from 'js-cookie';
import { ScrollText } from "lucide-react";
import moment from "moment";
import { useEffect, useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdAddCircleOutline, IoMdCheckmark, IoMdMedical, IoMdPrint } from "react-icons/io";
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

export default function NotaFiscal() {
  const token = Cookie.get('accessToken')
  const [receipts, setReceipts] = useState([]);
  const [drawer, setDrawer] = useState(false);
  const [modal, setModal] = useState(false);
  const [drawerDetails, setDrawerDetails] = useState(false);
  const [DFornecedor, setDFornecedor] = useState<any>([]);
  const [isFornecedor, setIsFornecedor] = useState<any>([]);
  const { register, handleSubmit, control, reset, formState: { errors, isSubmitting } } = useForm()
  var isFornecedorTrue = isFornecedor.length

  useEffect(() => {
    axios.get(`${process.env.NEXT_PUBLIC_API_URL}/v2/receipts`, {
      headers: {
        'Content-Type': 'application/json',
        'Authorization': `Bearer ${token}`
      }
    }).then((res) => {
      setReceipts(res.data.items)
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
        <div className="flex items-center">
          <button type="submit" onClick={() => setDrawer(true)} className="flex w-full gap-3 group/firm sm:w-36 justify-center items-center rounded-xl bg-cyan-800 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3">
            <ScrollText className="h-4 w-4 transition-all" />
            Nota Fiscal
          </button>
          <button type="submit" onClick={() => setModal(true)} className="flex w-full gap-3 group/firm sm:w-36 justify-center items-center rounded-xl bg-cyan-800 transition-all px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-cyan-700 sm:ml-3">
            <IoMdMedical className="h-4 w-4 transition-all" />
            Medicamento
          </button>
        </div>
      </div>
      <div className="px-6 pb-6">
        {children}
      </div>
    </div>
  );

  const detalhesConsulta = async (DFornecedor: any) => {
    setDrawerDetails(true)
    setDFornecedor(DFornecedor)
    // await axios.get(`${process.env.NEXT_PUBLIC_API_URL}/consulta/${detalheconsulta.id}`, {
    //   headers: {
    //     Authorization: `Bearer ${token}`
    //   }
    // }).then(e => {
    //   setMedicamentos(e.data.medicamentos)
    // }).catch(e => console.log(e))
  }

  const handleReceipt = async (data: any) => {
    const receipt = {
      invoiceNumber: "123456789101133", // Número da nota
      invoiceSeries: "A1", // Série da nota
      issueDateTime: "2024-11-27T12:00:00", // Emissão Data e Hora
      issuerCnpj: "123456789101133", // Emissão do CNPJ
      recipientCnpj: "98765432000176", // CNPJ do destinatário
      totalValue: 1500.5, // Valor total da nota
      icmsBase: 1000, // ICMS Base
      icmsValue: 150, // Valor da ICMS
      ipiValue: 50, // Valor da IPI
      issValue: 100, // Valor do iss
      icmsRate: 18, // Taxa ICMS
      ipiRate: 10, // Taxa de IPI
      issRate: 5, // Taxa de ISS
      barcodeOrAuthCode: "12345678901234567890", // Código de barras ou código de autenticação
      nfeAccessKey: "351904123456789012345500100100001234567890123", // Chave de acesso nfe
      receiptProducts: [
        {
          productCode: "4B5NF", // Codigo do produto
          productBatch: "A001", // Lote de produto
          productExpirationDate: "2024-11-28", // Data de expiração do produto
          productManufacturingDate: "2024-01-15", // Data de fabricação do produto
          quantity: 50, // Quantidade
          unitPrice: 10 // Preço unitário
        }
      ]
    }

    console.log(receipt)

    await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/v2/receipts`, receipt, {
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
      toast.success("Nota fiscal cadastrada com sucesso.", {
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
            title="Lista de notas fiscais"
            description="Ver informações da nota fiscal"
          >
            {
              receipts.length ? (
                <div className='overflow-auto rounded-xl shadow-md'>
                  <table className="table-auto w-full bg-white">
                    <thead className='bg-cyan-50 border-b-2 border-white'>
                      <tr>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>N° Nota Fiscal</th>
                        <th className='py-5 px-2 text-left text-nowrap border-r-2 border-white'>N° de Série</th>
                        <th className='py-5 px-2 text-center text-nowrap border-r-2 border-white'>Emitido</th>
                        <th className='py-5 px-2 text-center text-nowrap border-r-2 border-white'>Data de emissão</th>
                        <th className='py-5 px-2 text-center text-nowrap border-r-2 border-white'>Valor da nota</th>
                        <th className='py-5 px-2 text-center text-nowrap border-r-2 border-white'>-</th>
                      </tr>
                    </thead>
                    <tbody className='text-sm'>
                      {
                        receipts?.map((item: any, index: any) => {
                          moment.locale('pt')
                          return (
                            <tr key={index} className={`animate-fadeIn group/item border-b border-slate-300 last:border-0 hover:bg-cyan-50 transition-all cursor-pointer`} onClick={() => detalhesConsulta(item)}>
                              <th className="px-3 py-3 text-left group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[200px]">{item.invoiceNumber || "-"}</th>
                              <th className="px-3 py-3 text-left group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[120px]">{item.invoiceSeries || "-"}</th>
                              <td className="py-3 text-center max-w-44 truncate cursor-pointer">{item.issuerCnpj || "-"}</td>
                              <td className="py-3 text-center max-w-44 truncate cursor-pointer">{moment(item.issueDateTime).format('DD/MM/YYYY - HH:mm') || "-"}</td>
                              <td className="py-3 text-center max-w-44 truncate cursor-pointer">R$ {item.totalValue || "-"}</td>
                              <th className="px-3 py-3 text-center group-hover/item:underline group-hover/item:text-cyan-500 text-nowrap truncate max-w-[200px]">Ver nota</th>
                            </tr>
                          )
                        })
                      }
                    </tbody>
                  </table>
                </div>
              ) : (
                <div className='bg-cyan-50 py-5 border-white text-center m-3 rounded-xl shadow-sm'>
                  <span className='font-semibold text-gray-600'>Não existe notas fiscais cadastradas</span>
                </div>
              )
            }
          </Card>
        </div>
      </div>

      {/* Drawer Inserir Notal Fiscal */}
      <Drawer.Root open={drawer == true} onOpenChange={() => setDrawer(false)} >
        <Drawer.Content className="2xl:w-[85%]">
          <>
            <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 flex flex-col justify-between relative'>
              <div>
                <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm'>
                  <h2 className='font-semibold text-allintra-gray-700'>Preencha os dados da nota fiscal</h2>
                </div>

                <form className="w-full"
                  onSubmit={handleSubmit(handleReceipt)}
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
        </Drawer.Content>
      </Drawer.Root>
      {/* Drawer Detalhes do Fornecedor */}
      <Drawer.Root open={drawerDetails == true} onOpenChange={() => setDrawerDetails(false)}>
        <Drawer.Content className="2xl:w-[85%]">
          <DialogTitle>
            <BoxInfo.Root type={`success`} className='mb-3'>
              <BoxInfo.Icon icon={IoMdCheckmark} type={'success'} />
              <BoxInfo.Message>Fornecedor encontra-se ativo</BoxInfo.Message>
            </BoxInfo.Root>
          </DialogTitle>

          <div className='shadow-md bg-white rounded-md overflow-auto border mb-3 h-[88%] flex flex-col justify-between relative'>
            <div>
              <div className='flex justify-between items-center p-4 sticky top-0 bg-allintra-white-50 shadow-sm z-10'>
                <h2 className='font-semibold text-allintra-gray-700'>Consulta inserida</h2>
                <div className='flex gap-3 items-center'>
                  <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <MdModeEditOutline />
                  </button>
                  <button className={`rounded p-2 shadow-sm border text-allintra-gray-700 hover:bg-allintra-gray-300`}>
                    <IoMdPrint />
                  </button>
                </div>
              </div>

              <div className="flex flex-wrap w-full my-0 p-4">
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Fornecedor / Razão Social</span>
                  <div className='text-gray-800'>
                    <span>{DFornecedor?.businessName}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Telefone / Contato</span>
                  <div className='text-gray-800'>
                    <span>{DFornecedor?.phone}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>Responsável Técnico</span>
                  <div className='text-gray-800 flex flex-col'>
                    <span>{DFornecedor?.email}</span>
                  </div>
                </div>
                <div className="w-full md:w-1/2 px-3 my-2">
                  <span className='text-allintra-gray-700 text-sm'>CNPJ</span>
                  <div className='text-gray-800 flex flex-col'>
                    <span>{DFornecedor?.cnpj}</span>
                  </div>
                </div>

                <div className="w-full p-3 my-2 border-t">
                  <span className="text-allintra-gray-700 text-sm"><span className="font-medium text-allintra-gray-600">Endereço</span></span>
                  <div className="border shadow-sm p-5 text-gray-800 animate-scaleIn rounded bg-allintra-gray-300 hover:border-allintra-primary-500 w-full break-words whitespace-pre-line">
                    {DFornecedor?.descricao}
                  </div>
                </div>
              </div>
            </div>

            <div className='flex justify-between items-center w-full gap-3 bg-allintra-gray-300 px-4 py-4 sticky bottom-0 left-0'>
              {/* <span className='text-allintra-gray-500 text-sm truncate w-full hidden sm:flex'>{isFornecedor?.id}</span>
              <div className='flex gap-3 w-full sm:w-[initial]'>
                <button className='px-3 py-1 w-full sm:w-[120px] text-allintra-error-50 bg-red-400 hover:bg-red-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert(isFornecedor?.id)}>Deletar</button>
                <button className='px-3 py-1 w-full sm:w-[120px] text-allintra-attention-50 bg-orange-400 hover:bg-orange-300 transition-all text-sm font-semibold shadow-md rounded-md' onClick={() => alert('Editar Consulta')}>Remarcar</button>
              </div> */}
            </div>
          </div>
        </Drawer.Content>
      </Drawer.Root >

      <CadastrarNotaFiscal openModal={modal} closeModal={setModal} />
    </div>
  );
}