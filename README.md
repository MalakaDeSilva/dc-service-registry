# service-registry

## Prerequisites

This project uses [***pnpm***](https://pnpm.io/) project manager to manage node modules.

## How to run

Service Registry needs to be started first. When new processes are created, they will be able to register themselves on the registry. By default Service Registry will be started on port 8000. 

### Start Service Registry

Service Registry can be simply started by double clicking on ***start.cmd*** file inside Service Registry project or executing,
```
pnpm start
```
command on terminal/command prompt opened inside Service Registry project directory. By default, port **8000** will be selected to run the Service Registry.

To select a different port, below command can be used.
```
pnpm start {PORT}
```
 Service Registry: [https://{host}:{port}/get-services](https://{host}:{port}/get-services)

## .env format
>PORT={PORT}