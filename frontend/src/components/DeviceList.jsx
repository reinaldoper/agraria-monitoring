import PropType from 'prop-types';
import { fetchUsers } from '../service/fetchApi';
import { useNavigate } from 'react-router-dom';
import { useState } from 'react';

const DeviceList = ({ devices }) => {
  const [msg, setMsg] = useState('')
  const navigate = useNavigate();

  const handleIdentifier = async (identifier) => {
    const token = JSON.parse(localStorage.getItem('token'));
    const header = {
      'Content-Type': 'application/json',
      'Authorization': token
    }

    const options = {
      method: 'GET',
      headers: header,
    }
    const { message } = await fetchUsers(`device/identifier/${identifier}`, options);
    if(message){
      const header1 = {
        'Content-Type': 'application/json',
        'Authorization': token
      }
  
      const options1 = {
        method: 'DELETE',
        headers: header1,
      }
      const { description } = await fetchUsers(`device/${message.id}`, options1)
      if(description === 'Requisição realizada com sucesso'){ 
        navigate('/device');
      } else {
        setMsg(description);
      }
    }
  }

  return (
    <div className="device-list">
      <h3>Devices</h3>
      {msg && <p>{msg}</p>}
      <ul>
        {devices.map((device, index) => (
          <li key={index}>
            <strong>Identifier</strong>: {device}
            <button type='button' onClick={() => handleIdentifier(device)}></button>
          </li>
        ))}
      </ul>
    </div>
  );
}

DeviceList.propTypes = {
  devices: PropType.array.isRequired
}

export default DeviceList
