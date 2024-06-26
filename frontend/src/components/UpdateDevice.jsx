import { useState, useEffect } from 'react';
import { fetchUsers } from '../service/fetchApi';
import '../styles/DeviceForm.css';
import { useParams, useNavigate } from 'react-router-dom';

const UpdateDevice = () => {
  const [identifier, setIdentifier] = useState('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  const [commands, setCommands] = useState([]);
  const [log, setLog] = useState(false);

  const navigate = useNavigate();
  const { id } = useParams();

  useEffect(() => {
    const getDeviceById = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const header = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };
      const options = {
        method: 'GET',
        headers: header,
      };
      const device = await fetchUsers(`device/${Number(id)}`, options);
      if (device) {
        setLog(true);
        setIdentifier(device.identifier);
        setDescription(device.description);
        setManufacturer(device.manufacturer);
        setUrl(device.url);
        setCommands(device.commands.map(cmd => ({
          ...cmd,
          command: {
            ...cmd.command,
            parameters: cmd.command.parameters.map(param => ({ ...param }))
          }
        })));
      }
    };
    getDeviceById();
  }, [id]);

  const handleAddCommand = () => {
    setCommands([...commands, {
      operation: '',
      description: '',
      command: {
        command: '',
        parameters: [{ name: '', description: '' }]
      },
      format: '',
      result: ''
    }]);
  };

  const handleCommandChange = (index, field, value) => {
    const newCommands = [...commands];
    if (field === 'command') {
      newCommands[index].command.command = value;
    } else {
      newCommands[index][field] = value;
    }
    setCommands(newCommands);
  };

  const handleParameterChange = (commandIndex, paramIndex, field, value) => {
    const newCommands = [...commands];
    newCommands[commandIndex].command.parameters[paramIndex][field] = value;
    setCommands(newCommands);
  };

  const handleAddParameter = (commandIndex) => {
    const newCommands = [...commands];
    newCommands[commandIndex].command.parameters.push({ name: '', description: '' });
    setCommands(newCommands);
  };

  const validateCommands = () => {
    return commands.every(command =>
      command.operation && command.description && command.command.command && command.result && command.format &&
      command.command.parameters.every(param => param.name && param.description)
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    if (!validateCommands()) {
      setMsg('Todos os campos devem ser preenchidos.');
      return;
    }

    const deviceData = {
      id: Number(id),
      identifier,
      description,
      manufacturer,
      url,
      commands: commands.filter(command =>
        command.operation && command.description && command.command.command && command.result && command.format)
    };

    const token = JSON.parse(localStorage.getItem('token'));
    const header = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };
    const options = {
      method: 'PUT',
      headers: header,
      body: JSON.stringify(deviceData)
    };
    const result = await fetchUsers(`device/${Number(id)}`, options);
    if (result) {
      setIdentifier('');
      setDescription('');
      setManufacturer('');
      setUrl('');
      setCommands([]);
      setMsg('Requisição realizada com sucesso');
      navigate('/dashboard');
    } else {
      setMsg(result.description);
    }
  };

  return (
    <>
      {log ? <form className="device-form" onSubmit={handleSubmit}>
        <h2>Atualizar Device</h2>
        {msg && <p>{msg}</p>}
        <label>
          Identificador:
          <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        </label>
        <label>
          Descrição:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Manufatura:
          <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
        </label>
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>

        {commands.map((command, commandIndex) => (
          <div key={commandIndex} className="command-section">
            <h3>Comando {commandIndex + 1}</h3>
            <label>
              Operação:
              <input
                type="text"
                value={command.operation}
                onChange={(e) => handleCommandChange(commandIndex, 'operation', e.target.value)}
              />
            </label>
            <label>
              Descrição:
              <input
                type="text"
                value={command.description}
                onChange={(e) => handleCommandChange(commandIndex, 'description', e.target.value)}
              />
            </label>
            <label>
              Comando:
              <input
                type="text"
                value={command.command.command}
                onChange={(e) => handleCommandChange(commandIndex, 'command', e.target.value)}
              />
            </label>
            <label>
              Resultado:
              <input
                type="text"
                value={command.result}
                onChange={(e) => handleCommandChange(commandIndex, 'result', e.target.value)}
              />
            </label>
            <label>
              Formato:
              <input
                type="text"
                value={command.format}
                onChange={(e) => handleCommandChange(commandIndex, 'format', e.target.value)}
              />
            </label>

            {command.command.parameters.map((param, paramIndex) => (
              <div key={paramIndex} className="parameter-section">
                <h4>Parametro {paramIndex + 1}</h4>
                <label>
                  Nome:
                  <input
                    type="text"
                    value={param.name}
                    onChange={(e) => handleParameterChange(commandIndex, paramIndex, 'name', e.target.value)}
                  />
                </label>
                <label>
                  Descrição:
                  <input
                    type="text"
                    value={param.description}
                    onChange={(e) => handleParameterChange(commandIndex, paramIndex, 'description', e.target.value)}
                  />
                </label>
              </div>
            ))}

            <button type="button" onClick={() => handleAddParameter(commandIndex)}>Parametro</button>
          </div>
        ))}

        <button type="button" onClick={handleAddCommand}>Comando</button>
        <button type="submit">Atualizar Device</button>
      </form> : <h2 className='loading'>Carregando...</h2>}
    </>
  );
};

export default UpdateDevice;
