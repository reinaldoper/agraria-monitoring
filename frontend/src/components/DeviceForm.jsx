import { useState } from 'react';
import { fetchUsers } from '../service/fetchApi';
import '../styles/DeviceForm.css';

const DeviceForm = () => {
  const [identifier, setIdentifier] = useState('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  const [commands, setCommands] = useState([{
    operation: '',
    description: '',
    command: {
      command: '',
      parameters: [{ name: '', description: '' }]
    },
    result: '',
    format: '',
  }]);

  const handleAddCommand = () => {
    setCommands([...commands, {
      operation: '',
      description: '',
      command: {
        command: '',
        parameters: [{ name: '', description: '' }]
      },
      result: '',
      format: '',
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
      setMsg('Todos os campos dos comandos e parâmetros devem ser preenchidos.');
      return;
    }

    const deviceData = {
      identifier,
      description,
      manufacturer,
      url,
      commands: commands.filter(command =>
        command.operation && command.description && command.command.command && command.result && command.format)
    };

    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify(deviceData)
    };

    try {
      await fetchUsers('device', options);
      setIdentifier('');
      setDescription('');
      setManufacturer('');
      setUrl('');
      setCommands([{
        operation: '',
        description: '',
        command: {
          command: '',
          parameters: [{ name: '', description: '' }]
        },
        result: '',
        format: '',
      }]);
      setMsg('Adicionado Device com sucesso');
    } catch (error) {
      setMsg(error.message);
    }
  };

  return (
    <form className="device-form" onSubmit={handleSubmit}>
      <h2>Registrar Device</h2>
      {msg && <p>{msg}</p>}
      <label>
        Identificador:
        <input type="text" value={identifier} required onChange={(e) => setIdentifier(e.target.value)} />
      </label>
      <label>
        Descrição:
        <input type="text" value={description} required onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Manufatura:
        <input type="text" value={manufacturer} required onChange={(e) => setManufacturer(e.target.value)} />
      </label>
      <label>
        URL:
        <input type="text" value={url} required onChange={(e) => setUrl(e.target.value)} />
      </label>

      {commands.map((command, commandIndex) => (
        <div key={commandIndex} className="command-section">
          <h3>Comando {commandIndex + 1}</h3>
          <label>
            Operação:
            <input
              type="text"
              value={command.operation}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'operation', e.target.value)}
            />
          </label>
          <label>
            Descrição:
            <input
              type="text"
              value={command.description}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'description', e.target.value)}
            />
          </label>
          <label>
            Comando:
            <input
              type="text"
              value={command.command.command}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'command', e.target.value)}
            />
          </label>
          <label>
            Resultado:
            <input
              type="text"
              value={command.result}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'result', e.target.value)}
            />
          </label>
          <label>
            Formato:
            <input
              type="text"
              value={command.format}
              required
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
                  required
                  onChange={(e) => handleParameterChange(commandIndex, paramIndex, 'name', e.target.value)}
                />
              </label>
              <label>
                Descrição:
                <input
                  type="text"
                  value={param.description}
                  required
                  onChange={(e) => handleParameterChange(commandIndex, paramIndex, 'description', e.target.value)}
                />
              </label>
            </div>
          ))}

          <button type="button" onClick={() => handleAddParameter(commandIndex)}>Parametros</button>
        </div>
      ))}

      <button type="button" onClick={handleAddCommand}>Comando</button>
      <button type="submit">Registrar Device</button>
    </form>
  );
};

export default DeviceForm;
