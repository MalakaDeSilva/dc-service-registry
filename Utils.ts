import { registerService } from "./api/registry.service";
import { Service } from "./model/service";

export function setUpDummyServices() {
  registerService(
    new Service("1111", "uri: Learner", "Learner", "UP"),
    () => {}
  );
  registerService(
    new Service("2222", "uri: Acceptor", "Acceptor", "UP"),
    () => {}
  );
  registerService(
    new Service("3333", "uri: Acceptor", "Acceptor", "UP"),
    () => {}
  );
  registerService(
    new Service("4444", "uri: Proposer", "Proposer", "UP"),
    () => {}
  );
  registerService(
    new Service("5555", "uri: Proposer", "Proposer", "UP"),
    () => {}
  );
  registerService(
    new Service("6666", "uri: Proposer", "Proposer", "UP"),
    () => {}
  );
}
