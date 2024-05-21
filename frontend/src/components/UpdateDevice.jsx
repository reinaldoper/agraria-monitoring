import { useState, useEffect } from 'react';
import { fetchUsers } from '../service/fetchApi';
import '../styles/DeviceForm.css';
import { useParams } from 'react-router-dom';

const UpdateDevice = () => {
  const [identifier, setIdentifier] = useState('');
  const [description, setDescription] = useState('');
  const [manufacturer, setManufacturer] = useState('');
  const [url, setUrl] = useState('');
  const [msg, setMsg] = useState('');
  const [commands, setCommands] = useState([]);
  const [log, setLog] = useState(false);

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
      }
      const { device } = await fetchUsers(`device/${Number(id)}`, options);
      if (device) {
        setLog(true);
        setIdentifier(device.identifier);
        setDescription(device.description);
        setManufacturer(device.manufacturer);
        setUrl(device.url);
        setCommands(device.commands.map(cmd => ({
          ...cmd,
          command: {
            command: cmd.command,
            parameters: cmd.parameters.map(param => ({ ...param }))
          }
        })));
      }

    }
    getDeviceById();
  }, [id]);

  const handleAddCommand = () => {
    setCommands([...commands, {
      operation: '',
      description: '',
      command: { command: '', parameters: [{ name: '', description: '' }] },
      result: '',
      format: ''
    }]);
  };

  const handleCommandChange = (index, field, value) => {
    const newCommands = [...commands];
    newCommands[index][field] = value;
    setCommands(newCommands);
  };

  const handleCommandDetailsChange = (index, field, value) => {
    const newCommands = [...commands];
    newCommands[index].command[field] = value;
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

  const handleSubmit = async (e) => {
    e.preventDefault();
    const deviceData = {
      identifier,
      description,
      manufacturer,
      url,
      commands
    };
    const token = JSON.parse(localStorage.getItem('token'));
    const header = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };
    const options = {
      method: 'POST',
      headers: header,
      body: JSON.stringify(deviceData)
    }
    const result = await fetchUsers('device', options);
    if (result.description === 'Requisição realizada com sucesso') {
      setIdentifier('');
      setDescription('');
      setManufacturer('');
      setUrl('');
      setCommands([]);
      setMsg(result.description);
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
          Identifier:
          <input type="text" value={identifier} onChange={(e) => setIdentifier(e.target.value)} />
        </label>
        <label>
          Description:
          <input type="text" value={description} onChange={(e) => setDescription(e.target.value)} />
        </label>
        <label>
          Manufacturer:
          <input type="text" value={manufacturer} onChange={(e) => setManufacturer(e.target.value)} />
        </label>
        <label>
          URL:
          <input type="text" value={url} onChange={(e) => setUrl(e.target.value)} />
        </label>

        {commands.map((command, commandIndex) => (
          <div key={commandIndex} className="command-section">
            <h3>Command {commandIndex + 1}</h3>
            <label>
              Operation:
              <input
                type="text"
                value={command.operation}
                onChange={(e) => handleCommandChange(commandIndex, 'operation', e.target.value)}
              />
            </label>
            <label>
              Description:
              <input
                type="text"
                value={command.description}
                onChange={(e) => handleCommandChange(commandIndex, 'description', e.target.value)}
              />
            </label>
            <label>
              Command:
              <input
                type="text"
                value={command.command.command}
                onChange={(e) => handleCommandDetailsChange(commandIndex, 'command', e.target.value)}
              />
            </label>
            <label>
              Result:
              <input
                type="text"
                value={command.result}
                onChange={(e) => handleCommandChange(commandIndex, 'result', e.target.value)}
              />
            </label>
            <label>
              Format:
              <input
                type="text"
                value={command.format}
                onChange={(e) => handleCommandChange(commandIndex, 'format', e.target.value)}
              />
            </label>

            {command.command.parameters.map((param, paramIndex) => (
              <div key={paramIndex} className="parameter-section">
                <h4>Parameter {paramIndex + 1}</h4>
                <label>
                  Name:
                  <input
                    type="text"
                    value={param.name}
                    onChange={(e) => handleParameterChange(commandIndex, paramIndex, 'name', e.target.value)}
                  />
                </label>
                <label>
                  Description:
                  <input
                    type="text"
                    value={param.description}
                    onChange={(e) => handleParameterChange(commandIndex, paramIndex, 'description', e.target.value)}
                  />
                </label>
              </div>
            ))}

            <button type="button" onClick={() => handleAddParameter(commandIndex)}>Add Parameter</button>
          </div>
        ))}

        <button type="button" onClick={handleAddCommand}>Add Command</button>
        <button type="submit">Registrar Device</button>
      </form> : <h2 className='loading'>Carregando...</h2>}
    </>

  );
};


export default UpdateDevice;