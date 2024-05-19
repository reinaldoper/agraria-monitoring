const { Telnet } = require('telnet-client');

const sendCommand = async (deviceUrl, command) => {
  const connection = new Telnet();
  const params = {
    host: deviceUrl,
    port: 23,
    shellPrompt: '/ # ',
    timeout: 1500,
  };

  try {
    await connection.connect(params);
    const res = await connection.exec(command);
    return res;
  } catch (err) {
    console.error(err);
    return 'Error sending command';
  } finally {
    connection.end();
  }
};

module.exports = { sendCommand };
