import '../styles/Dashboard.css';
import DeviceList from "../components/DeviceList";
import { useState, useEffect } from "react";
import { fetchUsers } from "../service/fetchApi";
import Header from '../components/Header';

const DashBoard = () => {
  const [devices, setDevices] = useState([]);
  const [msg, setMessage] = useState('');
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchDevices = async () => {
      const token = JSON.parse(localStorage.getItem('token'));
      const header = {
        'Content-Type': 'application/json',
        'Authorization': token,
      }
      const options = {
        method: 'GET',
        headers: header,
      }
      const devices = await fetchUsers('device', options);
      const condition = devices.length > 0
      if (condition) {
        setMessage('Lista de dispositivos cadastrados');
        setDevices(devices);
        setLoading(true);
      } else {
        setError("Você não tem dispositivos cadastrados");
        setLoading(false);
      }

    };
    fetchDevices();
  }, []);

  return (
    <>
      <Header />
      <div className="dashboard">
        <h2>Painel</h2>
        {devices.length > 0 && loading ? <div>
          <h2>{msg}</h2>
          <DeviceList devices={devices} />
        </div> : <div>
          <h2>{error}</h2>
        </div>}
      </div>
    </>

  );
}

export default DashBoard

