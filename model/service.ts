export type ServiceType = {
  id: string;
  uri: string;
  role: string;
  status: string;
};

export class Service implements ServiceType {
  id: string;
  uri: string;
  role: string;
  status: string;

  constructor(id: string, uri: string, role: string, status: string) {
    this.id = id;
    this.uri = uri;
    this.role = role;
    this.status = status;
  }
}
