const { Telnet } = require('telnet-client');

const sendCommand = async (deviceUrl, command, params) => {
  const connection = new Telnet();


  if (!deviceUrl.startsWith('telnet://')) {
    deviceUrl = `telnet://${deviceUrl}`;
  }


  const parsedUrl = new URL(deviceUrl);


  const host = parsedUrl.hostname === 'localhost' ? '127.0.0.1' : parsedUrl.hostname;
  const port = parsedUrl.port || 23;
  const username = parsedUrl.username;
  const password = parsedUrl.password;

  const fullCommand = `${command} ${params.join(' ')}`.trim();



  const telnetParams = {
    host: host,
    port: port,
    shellPrompt: '/ $ ',
    disableLogon: true,
    timeout: 3000,
    negotiationMandatory: false,
    debug: true,
  };

  try {
    await connection.connect(telnetParams).then(() => console.log('Conectado'));
    await connection.send('', { waitfor: 'login: ' })

    await connection.send(username, { waitfor: 'Password: ' });

    await connection.send(password, { waitfor: telnetParams.shellPrompt })
    const response = await connection.send(fullCommand);
  
    const result = response.split('\n').filter(line => line.trim() !== fullCommand);
    

    return result.toString("utf-8");
  } catch (err) {
    return `Erro no envio do comando: ${err.message}`;
  } finally {
    connection.end();
  }
};

module.exports = { sendCommand };