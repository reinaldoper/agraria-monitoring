import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/SendCommands.css';
import { fetchUsers } from '../service/fetchApi';
import ansiRegex from 'ansi-regex';

const DeviceDetail = () => {
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [command, setCommand] = useState('');
  const [deviceUrl, setDeviceUrl] = useState('');
  const [params, setParams] = useState('');
  const [response, setResponse] = useState(null);
  const [error, setError] = useState('');

  const { id } = useParams();

  useEffect(() => {
    const fetchDevice = async () => {
      try {
        const token = JSON.parse(localStorage.getItem('token'));
        const options = {
          method: 'GET',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': token,
          },
        };
        const device = await fetchUsers(`device/${Number(id)}`, options);
        if (device) {
          setDevice(device);
          setLoading(false);
        } else {
          setError(device.description);
        }
      } catch (error) {
        setError('Erro ao buscar o dispositivo');
      }
    };

    fetchDevice();
  }, [id]);

  const removeANSIEscapeSequences = (text) => {
      return text.replace(ansiRegex(), '');
  };

  const parseTelnetResponse = (response) => {
    const cleanedResponse = removeANSIEscapeSequences(response);
    const lines = cleanedResponse.split('\n');
    const nonEmptyLines = lines.filter((line) => line.trim() !== '');
    const filesArray = [];
    nonEmptyLines.forEach((line) => {
      const words = line.split(' ');
      const cleanedWords = words.filter((word) => word.trim() !== '' && word.trim() !== '$');
      cleanedWords.forEach((word) => {
        const cleanedWord = word.replace(/[$.]/g, '');
        filesArray.push(cleanedWord);
      });
    });

    return filesArray;
  };


  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!command || !deviceUrl || params.length === 0) {
      setError('Por favor, preencha todos os campos.');
      return;
    }
    const token = JSON.parse(localStorage.getItem('token'));
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify({
        command,
        url: deviceUrl,
        params: params.split(',').map(param => param.trim()),
      })
    };
    const { description } = await fetchUsers('commands/send', options);
    setResponse(description);
    setError('')
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!device) {
    return <div>Dispositivo não encontrado.</div>;
  }

  return (
    <div className="container">
      <h1 className='form-command'>Detalhes do Dispositivo</h1>
      <div className="device-detail" key={device.id}>
        <div>
          <h4>Device</h4>
          <li><strong>Identifier:</strong> {device.identifier}</li>
          <li><strong>Descrição:</strong> {device.description}</li>
          <li><strong>Fabricante:</strong> {device.manufacturer}</li>
          <li><strong>URL:</strong> {device.url}</li>
        </div>
        {device.commands.length && device.commands.map(cmd => (
          <div key={cmd.id}>
            <h4>Comandos</h4>
            <li>Comando: {cmd.command.command}</li>
            <li>Descricao: {cmd.description}</li>
            <li>Formato: {cmd.format}</li>
            <li>Resultado: {cmd.result}</li>
            <div>
              <h4>Parametros</h4>
              {cmd.command.parameters.length && cmd.command.parameters.map((param, index) => (
                <div key={index}>
                  <li>{param.description}</li>
                  <li>{param.name}</li>
                </div>
              ))}
            </div>
          </div>
        ))}
      </div>

      <h2 className='form-command'>Enviar Comando</h2>
      <form onSubmit={handleSubmit} className="send-command-form">
        <div className="form-group">
          <label htmlFor="command">Comando:</label>
          <input
            className='input-form'
            type="text"
            id="command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="params">Parâmetros (separados por vírgula):</label>
          <input
            className='input-form'
            type="text"
            id="params"
            value={params}
            onChange={(e) => setParams(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deviceUrl">URL do Dispositivo:</label>
          <input
            className='input-form'
            type="text"
            id="deviceUrl"
            value={deviceUrl}
            onChange={(e) => setDeviceUrl(e.target.value)}
          />
        </div>
        <button type="submit">Enviar</button>
        {error && <div className="error">{error}</div>}
      </form>

      {response && (
        <div className="response">
          <h3>Resposta do Envio:</h3>
          <ul>
            {parseTelnetResponse(response).map((file, index) => (
              <li key={index}>{file}</li>
            ))}
          </ul>
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;
