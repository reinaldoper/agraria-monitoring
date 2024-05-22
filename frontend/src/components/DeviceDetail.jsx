import { useState, useEffect } from 'react';
import { useParams } from 'react-router-dom';
import '../styles/sendCommands.css';
import { fetchUsers } from '../service/fetchApi';

const DeviceDetail = () => {
  const { id } = useParams();
  const [device, setDevice] = useState(null);
  const [loading, setLoading] = useState(true);
  const [command, setCommand] = useState('');
  const [deviceUrl, setDeviceUrl] = useState('');
  const [response, setResponse] = useState('');
  const [error, setError] = useState('');

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
        const { description, device } = await fetchUsers(`device/${Number(id)}`, options);
        if (description === 'Requisição realizada com sucesso') {
          setDevice(device);
          setLoading(false);
        } else {
          setError('Erro ao carregar o dispositivo');
        }
      } catch (error) {
        console.error('Erro ao buscar o dispositivo:', error);
        setError('Erro ao buscar o dispositivo');
      } finally {
        setLoading(false);
      }
    };

    fetchDevice();
  }, [id]);

  const handleSubmit = async (e) => {
    e.preventDefault();

    if (!command || !deviceUrl) {
      setError('Por favor, preencha todos os campos.');
      return;
    }

    try {
      const token = JSON.parse(localStorage.getItem('token'));
      const options = {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': token,
        },
        body: JSON.stringify({
          command,
          url: device.url,
        })
      };
      const { description } = await fetchUsers('commands/send', options);
      setResponse(description);
      setError('');
    } catch (err) {
      setResponse('');
      setError('Erro ao enviar o comando');
    }
  };

  if (loading) {
    return <div>Carregando...</div>;
  }

  if (!device) {
    return <div>Dispositivo não encontrado.</div>;
  }

  return (
    <div className="container">
      <h1>Detalhes do Dispositivo</h1>
      <div className="device-detail">
        <p><strong>ID:</strong> {device.id}</p>
        <p><strong>Identifier:</strong> {device.identifier}</p>
        <p><strong>Descrição:</strong> {device.description}</p>
        <p><strong>Fabricante:</strong> {device.manufacturer}</p>
        <p><strong>URL:</strong> {device.url}</p>
      </div>

      <h2>Enviar Comando</h2>
      <form onSubmit={handleSubmit} className="send-command-form">
        <div className="form-group">
          <label htmlFor="command">Comando:</label>
          <input
            type="text"
            id="command"
            value={command}
            onChange={(e) => setCommand(e.target.value)}
          />
        </div>
        <div className="form-group">
          <label htmlFor="deviceUrl">URL do Dispositivo:</label>
          <input
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
          <pre>{response}</pre>
        </div>
      )}
    </div>
  );
};

export default DeviceDetail;
