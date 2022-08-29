import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core';
import { ContainerModule } from 'inversify';
import { IDependencyVersionCheckerClient as IDependencyVersionCheckClient, IDependencyVersionCheckServer } from '../common/dependency-version-checker-protocoll';
import { DependencyVersionCheckerServer } from './dependency-version-checker-server';

export default new ContainerModule(bind => {
    bind(IDependencyVersionCheckServer).to(DependencyVersionCheckerServer);
    bind(ConnectionHandler).toDynamicValue(ctx => {
        return new JsonRpcConnectionHandler<IDependencyVersionCheckClient>("/services/dependencyVersionChecker", client => {
            const depChekerServer = ctx.container.get<IDependencyVersionCheckServer>(IDependencyVersionCheckServer);
            depChekerServer.setClient(client);
            return depChekerServer;
        });
    }).inSingletonScope()
});