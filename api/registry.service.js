const registry = require("../registry/service.registry");

function registerService(serviceName, serviceUri, callback) {
  registry[serviceName] = serviceUri;
  callback();
}

function unregisterService(serviceName, callback) {
  delete registry[serviceName];
  callback();
}

function getService(serviceName, callback) {
  callback(registry[serviceName]);
}

module.exports = {
  registerService,
  unregisterService,
  getService,
};
