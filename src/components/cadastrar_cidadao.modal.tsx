'use client'

import { Dialog, DialogBackdrop, DialogPanel } from '@headlessui/react';
import {
  CheckBadgeIcon,
  NumberedListIcon
} from "@heroicons/react/24/solid";
import {
  Tab,
  TabPanel,
  Tabs,
  TabsBody,
  TabsHeader
} from "@material-tailwind/react";
import nookies from 'nookies';
import { useState } from 'react';
import { useForm } from 'react-hook-form';

interface CadastroCidadao {
  nome?: string,
  nascimento?: string,
  mae?: string,
  prontuario?: string,
  cpf?: string,
  inicioTratamento?: string,
  escolaridade?: string,
  pai?: string,
  conjuge?: string,
  cns?: string,
  telContato?: string,
  cor?: string,
  genero?: string,
  motivoAcolhimento?: string,
  servicoEncaminhado?: string,
  drogas?: string,
  doenca?: string,
  usaMedicacao?: string,
  alergiaMedicamento?: string,
  cid?: string,
  familiaVuneravel?: string,
  beneficioSocial?: string,
  condutaImediata?: string,
  tecResponsavel?: string,
  frequencia?: string,
  caps?: boolean,
  password?: string

  // Address
  street?: string,
  city?: string,
  num?: string,
  cep?: string,
  state?: string
}

// const createCidadao = async (data: CadastroCidadao) => {
//   const token = nookies.get(null, "accessToken")

//   var cadastro = {
//     // "frequencia": data.frequencia || "NAO-INTENSIVO",
//     "nome": data.nome,
//     "nascimento": data.nascimento,
//     "cpf": data.cpf,
//     "mae": data.mae,
//     "pai": data.pai,
//     "conjuge": data.conjuge,
//     "cor": data.cor,
//     "genero": data.genero,
//     "password": "smsbj"
//   }

//   await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/cidadao`, cadastro, {
//     headers: {
//       'Content-Type': 'application/json',
//       'Authorization': `Bearer ${token}`
//     },
//   }).then(e => {
//     // setIsRegistro(cadastro)
//     // reset()
//     resetar
//   }).catch(e => console.log(e))
// }

export default function CadastrarCidadaoModal({ openModal, closeModal }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();
  const token = nookies.get(null, "accessToken")
  const [isRegistro, setIsRegistro] = useState<any>()
  const [isAddress, setIsAddress] = useState<any>()
  const [activeTab, setActiveTab] = useState('pessoal');

  const [preRegistro, setPreRegistro] = useState<CadastroCidadao>()

  const data = [
    {
      label: "Detalhe Pessoal",
      value: "pessoal",
      icon: NumberedListIcon
    },
    {
      label: "Detalhe Social",
      value: "social",
      icon: NumberedListIcon
    },
    {
      label: "Finalização",
      value: "final",
      icon: CheckBadgeIcon
    }
  ];

  // const createAddress = async (data: any) => {
  //   try {
  //     const token = Cookie.get('accessToken')
  //     var address = {
  //       "street": data.street,
  //       "city": data.city,
  //       "num": data.num,
  //       "cep": data.cep,
  //       "state": "RJ",
  //       "userId": isRegistro.prontuario
  //     }

  //     await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/address/cidadao`, address, {
  //       headers: {
  //         'Content-Type': 'application/json',
  //         'Authorization': `Bearer ${token}`
  //       },
  //     }).then(e => {
  //       closeModal(false)
  //       setIsAddress('')
  //       setIsRegistro('')
  //       reset()
  //     }).catch(e => console.log(e.message))
  //   } catch (error) {
  //     console.error('Erro ao criar endereço', error);
  //   }
  // }

  return (
    <Dialog open={openModal} onClose={closeModal} className="relative z-10">
      <DialogBackdrop
        transition
        className="fixed inset-0 backdrop-blur-sm bg-gray-500 bg-opacity-75 transition-opacity data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in"
      />

      <div className="fixed inset-0 z-10 w-screen overflow-y-auto">
        <div className="flex min-h-full justify-center p-4 text-center items-center sm:p-0">
          <DialogPanel
            transition
            className={`relative transform overflow-hidden rounded-lg bg-white min-h-[600px] w-full text-left shadow-xl transition-all data-[closed]:translate-y-40 data-[closed]:opacity-0 data-[enter]:duration-300 data-[leave]:duration-200 data-[enter]:ease-out data-[leave]:ease-in sm:my-8 sm:w-full ${isRegistro ? 'sm:max-w-[40%]' : 'sm:max-w-[80%]'} data-[closed]:sm:translate-y-10 data-[closed]:sm:scale-95`}>

            <Tabs value={activeTab} onChange={(e: any, newValue: any) => setActiveTab(newValue)}>
              <TabsHeader className='shadow-md bg-cyan-800'>
                {data.map(({ label, value, icon }) => (
                  <Tab key={value} value={value} className='p-3'>
                    <div className="flex items-center gap-3">
                      {/* {React.createElement(icon, { className: "w-5 h-5" })} */}
                      <span className='rounded-full border-2 shadow-md border-cyan-900 h-8 w-8 flex items-center justify-center'>
                        {
                          value == 'pessoal' ? 1 : value == 'social' ? 2 : 3
                        }
                      </span>
                      <b>{label}</b>
                    </div>
                  </Tab>
                ))}
              </TabsHeader>
              <TabsBody>
                {data.map(({ value }) => (
                  <TabPanel key={value} value={value}>
                    {value == 'pessoal' && DadosPessoais({
                      setPreRegistro,
                      preRegistro
                    })}
                    {value == 'social' && DadosSociais({
                      setPreRegistro,
                      preRegistro
                    })}
                    {value == 'final' && Final()}
                  </TabPanel>
                ))}
              </TabsBody>
            </Tabs>

          </DialogPanel>
        </div>
      </div >
    </Dialog >
  )
}

function DadosPessoais({ setPreRegistro }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const DadoPessoal = (data: any) => {
    setPreRegistro(data)
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(DadoPessoal)}>
      <h2 className='font-bold text-left'>Informações pessoais</h2>
      <div className="flex flex-wrap -mx-3 my-3 text-left">
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="nome">
            Nome completo *
          </label>
          <input {...register('nome', { required: 'Por favor preencha este campo' })} className={`${errors.nome && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="nome" type="text" placeholder="Informe o nome do paciente" />
          {
            errors.nome && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="birthday">
            Data de nascimento *
          </label>
          <input {...register('birthday', { required: 'Por favor preencha este campo' })} className={`${errors.birthday && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="birthday" type="date" />
          {
            errors.birthday && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cpf">
            CPF *
          </label>
          <input {...register('cpf', { required: 'Por favor preencha este campo' })} className={`${errors.cpf && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="cpf" type="text" placeholder="000.000.000.00" />
          {
            errors.cpf && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="mae">
            Nome da mãe *
          </label>
          <input {...register('mae', { required: 'Por favor preencha este campo' })} className={`${errors.mae && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="mae" type="text" placeholder="Mãe do paciente" />
          {
            errors.mae && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="pai">
            Nome do pai <span className='text-cyan-700 font-semibold text-[10px]'>(não é obrigatório)</span>
          </label>
          <input {...register('pai', { required: 'Por favor preencha este campo' })} className={`${errors.pai && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="pai" type="text" placeholder="Mãe do paciente" />
          {
            errors.pai && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="conjuge">
            Conjuge *
          </label>
          <input {...register('conjuge', { required: 'Por favor preencha este campo' })} className={`${errors.conjuge && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="conjuge" type="text" placeholder="Mãe do paciente" />
          {
            errors.conjuge && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
      </div>
      <div className="flex flex-wrap -mx-3 my-3 text-left">
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="genero">
            Gênero *
          </label>
          <select {...register('genero')} name="genero" id="genero" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="N">Gênero Neutro</option>
            <option value="Outro">Outro</option>
          </select>
          {
            errors.genero && <p className="text-red-500 text-xs italic">Por favor selecione um gênero</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cor">
            Raça/Cor *
          </label>
          <select {...register('cor')} name="cor" id="cor" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="branco">Branco</option>
            <option value="preto">Preto</option>
            <option value="pardo">Pardo</option>
            <option value="amarelo">Amarelo</option>
            <option value="indigena">Indígena</option>
          </select>
          {
            errors.cor && <p className="text-red-500 text-xs italic">Por favor selecione uma cor</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="frequencia">
            Frequencia do usuário *
          </label>
          <select {...register('frequencia')} name="frequencia" id="frequencia" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="INTENSIVO">INTENSIVO</option>
            <option value="SEMI-INTENSIVO">SEMI-INTENSIVO</option>
            <option value="NAO-INTENSIVO">NAO-INTENSIVO</option>
          </select>
          {
            errors.frequencia && <p className="text-red-500 text-xs italic">Por favor selecione uma frequencia</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="caps">
            Usuário do caps? *
          </label>
          <select {...register('caps')} name="caps" id="caps" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value={`${true}`}>SIM</option>
            <option value={`${false}`}>NÃO</option>
          </select>
          {
            errors.caps && <p className="text-red-500 text-xs italic">Por favor preencha o campo caps</p>
          }
        </div>
      </div>

      <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        >
          Avançar
        </button>
        <button
          type="button"
          onClick={() => {
            reset()
          }}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Limpar
        </button>
      </div>
    </form>
  )
}

function DadosSociais({ setPreRegistro }: any) {
  const { register, handleSubmit, formState: { errors }, reset } = useForm();

  const DadosSocial = (data: any) => {
    setPreRegistro({ ...data, data })
  }

  return (
    <form className="w-full" onSubmit={handleSubmit(DadosSocial)}>
      <h2 className='font-bold text-left'>Informações sociais</h2>
      <div className="flex flex-wrap -mx-3 my-3 text-left">
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
            Prontuario *
          </label>
          <input {...register('prontuario', { required: 'Por favor preencha este campo' })} className={`${errors.prontuario && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="prontuario" type="text" placeholder="Informe o nome do paciente" />
          {
            errors.prontuario && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
            cns *
          </label>
          <input {...register('prontuario', { required: 'Por favor preencha este campo' })} className={`${errors.prontuario && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="prontuario" type="text" placeholder="Informe o nome do paciente" />
          {
            errors.prontuario && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="prontuario">
            cid *
          </label>
          <input {...register('prontuario', { required: 'Por favor preencha este campo' })} className={`${errors.prontuario && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="prontuario" type="text" placeholder="Informe o nome do paciente" />
          {
            errors.prontuario && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="inicioTratamento">
            Inicio do tratamento *
          </label>
          <input {...register('inicioTratamento', { required: 'Por favor preencha este campo' })} className={`${errors.inicioTratamento && 'border-red-500'} appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border border-gray-200 rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white focus:border-gray-500`} id="inicioTratamento" type="date" />
          {
            errors.inicioTratamento && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="drogas">
            Alcool/Drogas *
          </label>
          <select {...register('drogas')} name="drogas" id="drogas" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.drogas && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="doenca">
            Doença *
          </label>
          <select {...register('doenca')} name="doenca" id="doenca" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.doenca && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="doenca">
            Usa Medicacao? *
          </label>
          <select {...register('doenca')} name="doenca" id="doenca" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.doenca && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="alergiaMedicamento">
            Alergia Medicamento? *
          </label>
          <select {...register('alergiaMedicamento')} name="alergiaMedicamento" id="alergiaMedicamento" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.alergiaMedicamento && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="familiaVuneravel">
            Familia Vuneravel? *
          </label>
          <select {...register('familiaVuneravel')} name="familiaVuneravel" id="familiaVuneravel" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.familiaVuneravel && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="beneficioSocial">
            Beneficio Social *
          </label>
          <select {...register('beneficioSocial')} name="beneficioSocial" id="beneficioSocial" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="N">NÃO</option>
            <option value="S">SIM</option>
          </select>
          {
            errors.beneficioSocial && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>
        <div className="w-full md:w-1/2 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="escolaridade">
            Escolaridade *
          </label>
          <select {...register('escolaridade')} name="escolaridade" id="escolaridade" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="Analfabeto">Analfabeto</option>
            <option value="FIncompleto">Ensino Fundamental Incompleto</option>
            <option value="FCompleto">Ensino Fundamental Competo</option>
            <option value="MIncompleto">Ensino Médio Incompleto</option>
            <option value="MCompleto">Ensino Médio Competo</option>
            <option value="SIncompleto">Ensino Superior Incompleto</option>
            <option value="SCompleto">Ensino Superior Competo</option>
            <option value="NTecnico">Nível Técnico</option>
          </select>
          {
            errors.escolaridade && <p className="text-red-500 text-xs italic">Por favor selecione este campo</p>
          }
        </div>

        <div className="w-full md:w-1/3 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="motivoAcolhimento">
            Motivo do Acolhimento *
          </label>
          <textarea rows={4} {...register('motivoAcolhimento', { required: 'Por favor preencha este campo' })} className={`${errors.motivoAcolhimento && 'border-red-500'} resize-none appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="motivoAcolhimento" placeholder="Informe o nome do paciente" />
          {
            errors.motivoAcolhimento && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>

        <div className="w-full md:w-1/3 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="servicoEncaminhado">
            Servico Encaminhado *
          </label>
          <textarea rows={4} {...register('servicoEncaminhado', { required: 'Por favor preencha este campo' })} className={`${errors.servicoEncaminhado && 'border-red-500'} resize-none appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="servicoEncaminhado" placeholder="Informe o nome do paciente" />
          {
            errors.servicoEncaminhado && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>

        <div className="w-full md:w-1/3 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="condutaImediata">
            Conduta Imediata *
          </label>
          <textarea rows={4} {...register('condutaImediata', { required: 'Por favor preencha este campo' })} className={`${errors.condutaImediata && 'border-red-500'} resize-none appearance-none shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`} id="condutaImediata" placeholder="Informe o nome do paciente" />
          {
            errors.condutaImediata && <p className="text-red-500 text-xs italic">Por favor preencha este campo.</p>
          }
        </div>
      </div>
      {/* <div className="flex flex-wrap -mx-3 my-3 text-left">
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="genero">
            Gênero *
          </label>
          <select {...register('genero')} name="genero" id="genero" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="M">Masculino</option>
            <option value="F">Feminino</option>
            <option value="N">Gênero Neutro</option>
            <option value="Outro">Outro</option>
          </select>
          {
            errors.genero && <p className="text-red-500 text-xs italic">Por favor selecione um gênero</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="cor">
            Raça/Cor *
          </label>
          <select {...register('cor')} name="cor" id="cor" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="branco">Branco</option>
            <option value="preto">Preto</option>
            <option value="pardo">Pardo</option>
            <option value="amarelo">Amarelo</option>
            <option value="indigena">Indígena</option>
          </select>
          {
            errors.cor && <p className="text-red-500 text-xs italic">Por favor selecione uma cor</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="frequencia">
            Frequencia do usuário *
          </label>
          <select {...register('frequencia')} name="frequencia" id="frequencia" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value="INTENSIVO">INTENSIVO</option>
            <option value="SEMI-INTENSIVO">SEMI-INTENSIVO</option>
            <option value="NAO-INTENSIVO">NAO-INTENSIVO</option>
          </select>
          {
            errors.frequencia && <p className="text-red-500 text-xs italic">Por favor selecione uma frequencia</p>
          }
        </div>
        <div className="w-full md:w-1/4 px-3 my-3">
          <label className="block uppercase tracking-wide text-gray-700 text-xs font-bold mb-2" htmlFor="caps">
            Usuário do caps? *
          </label>
          <select {...register('caps')} name="caps" id="caps" className={`shadow-md block w-full bg-gray-200 text-gray-700 border rounded py-3 px-4 leading-tight focus:outline-none focus:bg-white`}>
            <option value={`${true}`}>SIM</option>
            <option value={`${false}`}>NÃO</option>
          </select>
          {
            errors.caps && <p className="text-red-500 text-xs italic">Por favor preencha o campo caps</p>
          }
        </div>
      </div> */}

      <div className="border-t-[1px] px-4 py-3 sm:flex sm:flex-row-reverse sm:px-6">
        <button
          type="submit"
          className="inline-flex w-full justify-center rounded-md bg-green-600 px-3 py-2 text-sm font-semibold text-white shadow-sm hover:bg-green-500 sm:ml-3 sm:w-auto"
        >
          Avançar
        </button>
        <button
          type="button"
          onClick={() => {
            reset()
          }}
          className="mt-3 inline-flex w-full justify-center rounded-md bg-white px-3 py-2 text-sm font-semibold text-gray-900 shadow-sm ring-1 ring-inset ring-gray-300 hover:bg-gray-50 sm:mt-0 sm:w-auto"
        >
          Limpar
        </button>
      </div>
    </form>
  )
}

function Final() {
  return (
    <>
      <h2>Finalização</h2>
    </>
  )
}