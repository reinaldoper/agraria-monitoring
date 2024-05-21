import PropTypes from 'prop-types';
import { fetchUsers } from '../service/fetchApi';
import { useState, useEffect } from 'react';

const DeviceList = ({ devices }) => {
  const [deviceList, setDeviceList] = useState(devices);
  const [msg, setMsg] = useState('');

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

  return (
    <div className="device-list">
      <h3>Devices</h3>
      {msg && <p>{msg}</p>}
      <ul>
        {deviceList.map((device, index) => (
          <li key={index}>
            Identifier: {device}
            <button type="button" onClick={() => handleIdentifier(device)}>Remover</button>
          </li>
        ))}
      </ul>
    </div>
  );
};

DeviceList.propTypes = {
  devices: PropTypes.array.isRequired,
};

export default DeviceList;
