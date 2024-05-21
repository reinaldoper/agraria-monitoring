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
    command: '',
    result: '',
    format: '',
    parameters: [{ name: '', description: '' }],
  }]);

  const handleAddCommand = () => {
    setCommands([...commands, {
      operation: '',
      description: '',
      command: '',
      result: '',
      format: '',
      parameters: [{ name: '', description: '' }],
    }]);
  };

  const handleCommandChange = (index, field, value) => {
    const newCommands = [...commands];
    newCommands[index][field] = value;
    setCommands(newCommands);
  };

  const handleParameterChange = (commandIndex, paramIndex, field, value) => {
    const newCommands = [...commands];
    newCommands[commandIndex].parameters[paramIndex][field] = value;
    setCommands(newCommands);
  };

  const handleAddParameter = (commandIndex) => {
    const newCommands = [...commands];
    newCommands[commandIndex].parameters.push({ name: '', description: '' });
    setCommands(newCommands);
  };

  const validateCommands = () => {
    return commands.every(command => 
      command.operation && command.description && command.command && command.result && command.format &&
      command.parameters.every(param => param.name && param.description)
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
      commands: commands.filter(command => command.operation && command.description && command.command && command.result && command.format)
    };

    const token = JSON.parse(localStorage.getItem('token'));
    const options = {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
        'Authorization': token,
      },
      body: JSON.stringify(deviceData)
    };

    const result = await fetchUsers('device', options);

    if (result.description === 'Requisição realizada com sucesso') {
      setIdentifier('');
      setDescription('');
      setManufacturer('');
      setUrl('');
      setCommands([{
        operation: '',
        description: '',
        command: '',
        result: '',
        format: '',
        parameters: [{ name: '', description: '' }],
      }]);
      setMsg(result.description);
    } else {
      setMsg(result.description);
    }
  };

  return (
    <form className="device-form" onSubmit={handleSubmit}>
      <h2>Registrar Device</h2>
      {msg && <p>{msg}</p>}
      <label>
        Identifier:
        <input type="text" value={identifier} required onChange={(e) => setIdentifier(e.target.value)} />
      </label>
      <label>
        Description:
        <input type="text" value={description} required onChange={(e) => setDescription(e.target.value)} />
      </label>
      <label>
        Manufacturer:
        <input type="text" value={manufacturer} required onChange={(e) => setManufacturer(e.target.value)} />
      </label>
      <label>
        URL:
        <input type="text" value={url} required onChange={(e) => setUrl(e.target.value)} />
      </label>

      {commands.map((command, commandIndex) => (
        <div key={commandIndex} className="command-section">
          <h3>Command {commandIndex + 1}</h3>
          <label>
            Operation:
            <input
              type="text"
              value={command.operation}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'operation', e.target.value)}
            />
          </label>
          <label>
            Description:
            <input
              type="text"
              value={command.description}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'description', e.target.value)}
            />
          </label>
          <label>
            Command:
            <input
              type="text"
              value={command.command}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'command', e.target.value)}
            />
          </label>
          <label>
            Result:
            <input
              type="text"
              value={command.result}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'result', e.target.value)}
            />
          </label>
          <label>
            Format:
            <input
              type="text"
              value={command.format}
              required
              onChange={(e) => handleCommandChange(commandIndex, 'format', e.target.value)}
            />
          </label>

          {command.parameters.map((param, paramIndex) => (
            <div key={paramIndex} className="parameter-section">
              <h4>Parameter {paramIndex + 1}</h4>
              <label>
                Name:
                <input
                  type="text"
                  value={param.name}
                  required
                  onChange={(e) => handleParameterChange(commandIndex, paramIndex, 'name', e.target.value)}
                />
              </label>
              <label>
                Description:
                <input
                  type="text"
                  value={param.description}
                  required
                  onChange={(e) => handleParameterChange(commandIndex, paramIndex, 'description', e.target.value)}
                />
              </label>
            </div>
          ))}

          <button type="button" onClick={() => handleAddParameter(commandIndex)}>Add Parametro</button>
        </div>
      ))}

      <button type="button" onClick={handleAddCommand}>Add Comando</button>
      <button type="submit">Registrar Device</button>
    </form>
  );
};

export default DeviceForm;
