"use client"
import moment from 'moment';
import { useEffect, useState } from 'react';
import io from 'socket.io-client';
import NovaSenha from './novaSenha.modal';

const socket = io('https://vivamedapi.stevanini.com.br'); // Substitua pela URL do seu backend

function PainelConsultas() {
  const [consultas, setConsultas] = useState([]);
  const [atendimentoAtual, setAtendimentoAtual] = useState(null);
  const [tempoDecorrido, setTempoDecorrido] = useState(''); // Tempo em tempo real para o atendimento em andamento
  const [setor, setSetor] = useState('geral');
  const [sala, setSala] = useState('');
  const [verNovaSenha, setVerNovaSenha] = useState(false);
  const [novaSenha, setNovaSenha] = useState('');

  useEffect(() => {
    // Solicita a lista de consultas quando a página carrega
    socket.emit('getTicketList', data => setConsultas(data));

    // Atualiza a lista de consultas em tempo real
    socket.on('ticketListUpdated', (data) => {
      // Ordena consultas por data de criação para exibir em ordem de chegada
      const consultasOrdenadas = data.sort((a, b) => new Date(a.createdAt) + new Date(b.createdAt));
      setConsultas(consultasOrdenadas);

      // Define o atendimento atual
      const atendimentoEmAndamento = consultasOrdenadas.find(
        consulta => consulta.inicioAtendimento && !consulta.finalAtendimento
      );

      setAtendimentoAtual(atendimentoEmAndamento);
    });

    return () => {
      socket.off('ticketListUpdated');
    };
  }, []);

  // Atualiza o tempo decorrido a cada segundo enquanto há um atendimento em andamento
  useEffect(() => {
    if (atendimentoAtual && atendimentoAtual.inicioAtendimento) {
      const interval = setInterval(() => {
        const inicio = new Date(atendimentoAtual.inicioAtendimento);
        const agora = new Date();
        const diff = agora - inicio;

        const minutos = Math.floor(diff / 60000);
        const segundos = ((diff % 60000) / 1000).toFixed(0);
        setTempoDecorrido(`${minutos}min ${segundos < 10 ? '0' : ''}${segundos}seg`);
      }, 1000);

      return () => clearInterval(interval); // Limpa o intervalo ao desmontar o componente ou mudar o atendimento atual
    } else {
      setTempoDecorrido(''); // Reseta o tempo decorrido se não houver atendimento em andamento
    }
  }, [atendimentoAtual]);

  const iniciarAtendimento = (id, sala) => {
    socket.emit('startAttendance', { id, sala });
  };

  const finalizarAtendimento = (id) => {
    socket.emit('finishAttendance', { id });
  };

  // Função para calcular a duração entre o início e o fim do atendimento
  const calcularDuracao = (inicio, fim) => {
    const diff = new Date(fim) - new Date(inicio); // diferença em milissegundos
    const minutos = Math.floor(diff / 60000);
    const segundos = ((diff % 60000) / 1000).toFixed(0);
    return `${minutos}m ${segundos < 10 ? '0' : ''}${segundos}s`;
  };

  const gerarSenha = () => {
    socket.emit('generateTicket', data => {
      setVerNovaSenha(!verNovaSenha)
      setNovaSenha(data)
    });
  };

  const consultorio = (sala) => {
    setSala(sala)
    setSetor('medico')
  };


  return (
    <div className='w-full bg-allintra-primary-50 p-5 overflow-hidden'>
      {
        setor == 'geral' && (
          <div className='flex w-full justify-center items-center h-screen'>
            <div className='grid grid-cols-1 sm:grid-cols-3 sm:w-1/2 gap-3'>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => setSetor('recepcao')}>Recepção</button>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => setSetor('atendimento')}>Atendimento</button>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => setSetor('escolherconsultorio')}>Médico</button>
            </div>
          </div>
        )
      }

      {
        setor == 'escolherconsultorio' && (
          <div className='flex w-full justify-center items-center h-screen'>
            <div className='grid grid-cols-1 sm:grid-cols-3 sm:w-1/2 gap-3'>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => consultorio('01')}>Consultório 01</button>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => consultorio('02')}>Consultório 02</button>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => consultorio('03')}>Consultório 03</button>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => consultorio('04')}>Consultório 04</button>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => consultorio('05')}>Consultório 05</button>
              <button className='p-3 transition-all bg-allintra-primary-800 font-bold text-xl uppercase hover:bg-allintra-primary-700 hover:border-allintra-primary-50 border-allintra-primary-500 border rounded-md text-allintra-white-50 h-40 sm:h-96' onClick={() => consultorio('06')}>Consultório 06</button>
            </div>
          </div>
        )
      }

      {
        setor == 'recepcao' ? (
          <div className='flex justify-center items-center w-full h-screen'>
            <div className='flex flex-col gap-7 w-1/3 h-1/3 justify-center items-center bg-white rounded-md shadow-sm'>
              <div className='border-b p-3 text-center flex flex-col gap-2'>
                <h1 className='text-5xl font-bold text-allintra-gray-700'>Gestão de Consultas</h1>
                <p>Clique no botão abaixo para agendar uma nova senha</p>
              </div>
              <div className='w-1/2'>
                <button className='p-3 bg-allintra-primary-50 border-allintra-primary-500 hover:bg-allintra-primary-50 hover:border-allintra-primary-50 transition-all border font-bold rounded-md text-allintra-black-500 w-full' onClick={gerarSenha}>Retirar Senha</button>
              </div>
            </div>
          </div>
        ) : (
          <div className='grid grid-cols-3 gap-5 h-[850px]'>
            {/* Lista de Consultas Aguardando Atendimento */}
            <div className='bg-allintra-white-50 rounded-md shadow-sm border border-allintra-primary-500 px-3 pb-5 h-full overflow-auto'>
              <h2 className='text-2xl font-bold text-allintra-black-500 border-b py-3 uppercase bg-white sticky top-0'>Consultas Aguardando Atendimento</h2>
              <ul className='py-3'>
                {consultas.filter(consulta => !consulta.inicioAtendimento).map(consulta => (
                  <li key={consulta.id} className='mb-3 h-36 bg-allintra-primary-800 text-white flex justify-between items-center p-3 rounded-md border border-allintra-primary-500'>
                    <div className='flex justify-evenly w-full font-semibold text-xl'>
                      <span className='flex flex-col text-center'>Data da chegada: <span>{moment(consulta?.createdAt).format("DD/MM/YYYY")}</span></span>
                      <span className='flex flex-col text-center border-l border-allintra-gray-500 px-3'>Hora da chegada: <span>{moment(consulta.createdAt).format("HH:mm")}</span></span>
                    </div>
                    <div className='flex flex-col gap-2 w-28'>
                      <div className='bg-allintra-primary-50 text-allintra-black-500 p-2 shadow-sm rounded-md text-center border border-allintra-primary-500'>
                        <span className='text-4xl font-black'>{consulta.senha}</span>
                      </div>
                      {setor == 'medico' && (
                        <div className='flex gap-2 w-full'>
                          <button className='p-2 shadow-sm rounded-md w-full bg-allintra-success-500/50 border-allintra-success-500 border' onClick={() => iniciarAtendimento(consulta.id, sala)}>Iniciar</button>
                          {/* <button className='p-2 shadow-sm rounded-md w-1/2 bg-allintra-error-500/60 border-allintra-error-500 border' onClick={() => finalizarAtendimento(consulta.id)}>X</button> */}
                        </div>
                      )}
                    </div>
                  </li>
                ))}
              </ul>
            </div>

            {/* Atendimento em Andamento */}
            <div className='bg-allintra-white-50 rounded-md shadow-sm border border-allintra-primary-500 px-3 pb-5 h-screen overflow-auto'>
              <h2 className='text-2xl font-semibold text-allintra-black-500 border-b py-3 uppercase sticky top-0 bg-white'>Em Atendimento</h2>
              {atendimentoAtual ? (
                <div className='py-3'>
                  <div className='mb-3 h-36 bg-allintra-primary-800 text-white flex justify-between items-center p-3 rounded-md border border-allintra-primary-500'>
                    <div className='flex justify-evenly w-full font-semibold text-xl'>
                      <span className='flex flex-col text-center'>Início do atendimento: <span>{moment(atendimentoAtual.inicioAtendimento).format("DD/MM/YYYY")}</span></span>
                      <span className='flex flex-col text-center border-l border-allintra-gray-500 px-3'>Paciente em atendimento: <span>{tempoDecorrido}</span></span>
                      <span className='flex flex-col text-center border-l border-allintra-gray-500 px-3'>Sala de atendimento: <span className='capitalize'>Consultorio {atendimentoAtual.sala}</span></span>
                    </div>
                    <div className='flex flex-col gap-2 w-28'>
                      <div className='bg-allintra-primary-50 text-allintra-black-500 p-2 shadow-sm rounded-md text-center border border-allintra-primary-500'>
                        <span className='text-4xl font-black'>{atendimentoAtual.senha}</span>
                      </div>
                      {setor == 'medico' && (
                        <div className='flex gap-2 w-full'>
                          <button className='p-2 shadow-sm rounded-md w-full font-semibold bg-allintra-error-500/60 border-allintra-error-500 border' onClick={() => finalizarAtendimento(atendimentoAtual.id)}>X</button>
                        </div>
                      )}
                    </div>
                  </div>
                </div>
              ) : (
                <p>Nenhum atendimento em andamento</p>
              )}
            </div>

            {/* Consultas Finalizadas */}
            <div className='bg-allintra-white-50 h-screen overflow-auto w-full rounded-md shadow-sm border border-allintra-primary-500 px-3 pb-5'>
              <h2 className='text-2xl font-bold text-allintra-black-500 border-b py-3 uppercase sticky top-0 bg-white'>Consultas Finalizadas</h2>
              <ul className='py-3 overflow-hidden'>
                {consultas.filter(consulta => consulta.finalAtendimento).map(consulta => (
                  <li key={consulta.id} className='mb-3 h-36 bg-allintra-primary-800 text-white flex justify-between items-center p-3 rounded-md border border-allintra-primary-500'>
                    <div className='flex justify-evenly w-full font-semibold text-xl'>
                      <span className='flex flex-col text-center px-3'>Início do atendimento: <span className='bg-white text-allintra-gray-700 rounded-md p-1'>{moment(consulta.inicioAtendimento).format("HH:mm")}</span></span>
                      <span className='flex flex-col text-center border-l border-allintra-gray-500 px-3'>Fim do atendimento: <span className='bg-white text-allintra-gray-700 rounded-md p-1'>{moment(consulta.finalAtendimento).format("HH:mm")}</span></span>
                      <span className='flex flex-col text-center border-l border-allintra-gray-500 px-3'>Tempo de atendimento: <span className='bg-white text-allintra-gray-700 rounded-md p-1'>{calcularDuracao(consulta.inicioAtendimento, consulta.finalAtendimento)}</span></span>
                    </div>
                    <div className='flex flex-col gap-2 w-28'>
                      <div className='bg-allintra-primary-50 text-allintra-black-500 p-2 shadow-sm rounded-md text-center border border-allintra-primary-500'>
                        <span className='text-4xl font-black'>{consulta.senha}</span>
                      </div>
                    </div>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        )
      }

      <NovaSenha openAgenda={verNovaSenha} closeAgenda={setVerNovaSenha} info={novaSenha} />
    </div>
  );
}

export default PainelConsultas;
