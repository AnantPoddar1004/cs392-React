const { getDataConnect, validateArgs } = require('firebase/data-connect');

const connectorConfig = {
  connector: 'default',
  service: 'cs392-React',
  location: 'us-central1'
};
exports.connectorConfig = connectorConfig;

