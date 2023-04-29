import { ServiceType } from "../model/service";

import { serviceRegistry } from "../registry/service.registry";

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
  callback(serviceRegistry.filter((v) => v.role === "Proposer"));
}

export function getAcceptors(callback: (service: ServiceType[]) => void) {
  callback(serviceRegistry.filter((v) => v.role === "Acceptor"));
}

export function getLearners(callback: (service: ServiceType[]) => void) {
  callback(serviceRegistry.filter((v) => v.role === "Learner"));
}

export function updateService(service: ServiceType, callback: () => void) {
  let index = serviceRegistry.findIndex(
    (serviceObj) => serviceObj.id == service.id
  );

  if (index != -1) {
    serviceRegistry.splice(index, 1, service);
  }
}
