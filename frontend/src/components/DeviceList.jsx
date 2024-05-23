import PropTypes from 'prop-types';
import { fetchUsers } from '../service/fetchApi';
import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';

const DeviceList = ({ devices }) => {
  const [deviceList, setDeviceList] = useState(devices);
  const [msg, setMsg] = useState('');

  const navigate = useNavigate();

  useEffect(() => {
    setDeviceList(devices);
  }, [devices]);

  const handleIdentifier = async (identifier) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const header = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };

    const options = {
      method: 'GET',
      headers: header,
    };
    const { message } = await fetchUsers(`device/identifier/${identifier}`, options);
    if (message) {
      const header1 = {
        'Content-Type': 'application/json',
        'Authorization': token,
      };

      const options1 = {
        method: 'DELETE',
        headers: header1,
      };
      const { description } = await fetchUsers(`device/${message.id}`, options1);
      if (description === 'Requisição realizada com sucesso') {
        setDeviceList((prevList) => prevList.filter((device) => device !== identifier));
      } else {
        setMsg(description);
      }
    }
  };

  const handleUpdateTelnet = async (identifier, num) => {
    
    const token = JSON.parse(localStorage.getItem('token'));
    const header = {
      'Content-Type': 'application/json',
      'Authorization': token,
    };

    const options = {
      method: 'GET',
      headers: header,
    };
    const { message } = await fetchUsers(`device/identifier/${identifier}`, options);
    const value = num === 1 ? `/device/${message.id}` : `/telnet/${message.id}`;
    if (message) {
      navigate(value);
    }
  };

  return (
    <div className="device-list">
      <h3>Dispositivos:</h3>
      {msg && <p>{msg}</p>}
      {DeviceList.length ? <ul>
        {deviceList.map((device, index) => (
          <li key={index}>
            Identify: {device}
            <button className='edit-device' type="button" onClick={() => handleUpdateTelnet(device, 1)}>Editar</button>
            <button className='edit-telnet' type="button" onClick={() => handleUpdateTelnet(device, 2)}>Telnet</button>
            <button type="button" className='remove-device' onClick={() => handleIdentifier(device)}>Remover</button>
          </li>
        ))}
      </ul> : <p>Carregando...</p>}
    </div>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
};

export default DeviceList;
