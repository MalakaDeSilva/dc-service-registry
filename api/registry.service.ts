import axios from "axios";
import { ServiceType } from "../model/service";
import { serviceRegistry } from "../registry/service.registry";
import { ACCEPTOR, HEALTH_CHECK_ROUTE, LEARNER, PROPOSER } from "../Constants";

export function registerService(service: ServiceType, callback: () => void) {
  serviceRegistry.push(service);

  callback();
}

export function unregisterService(serviceId: string, callback: () => void) {
  serviceRegistry.forEach((v) => {
    if (v.id === serviceId) {
      serviceRegistry.splice(serviceRegistry.indexOf(v), 1);
    }
  });

  callback();
}

export function getServices(callback: (services: ServiceType[]) => void) {
  callback(serviceRegistry);
}

export function getService(
  serviceId: string,
  callback: (service: ServiceType) => void
) {
  callback(serviceRegistry.filter((v) => v.id === serviceId)[0]);
}

export function getProposers(callback: (service: ServiceType[]) => void) {
  callback(serviceRegistry.filter((v) => v.role === PROPOSER));
}

export function getAcceptors(callback: (service: ServiceType[]) => void) {
  callback(serviceRegistry.filter((v) => v.role === ACCEPTOR));
}

export function getLearners(callback: (service: ServiceType[]) => void) {
  callback(serviceRegistry.filter((v) => v.role === LEARNER));
}

export function updateService(service: ServiceType, callback: () => void) {
  let index = serviceRegistry.findIndex(
    (serviceObj) => serviceObj.id == service.id
  );

  if (index != -1) {
    serviceRegistry.splice(index, 1, service);
  }

  callback();
}

export function refreshRegistry() {
  getServices((services) => {
    let promises: any[] = [];

    services.forEach((service) => {
      promises.push(axios.get(service.uri + HEALTH_CHECK_ROUTE));
    });

    Promise.all(promises)
      .then(axios.spread((...responses) => {}))
      .catch((error) => {
        services.forEach((service) => {
          if (service.uri == error.config.url.replace(HEALTH_CHECK_ROUTE, "")) {
            unregisterService(service.id, () => {});
          }
        });
      });
  });
}
