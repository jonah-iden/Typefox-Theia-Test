import { ConnectionHandler, JsonRpcConnectionHandler } from '@theia/core';
import { ContainerModule } from 'inversify';
import { IDependencyVersionCheckServer, servicePath } from '../common/dependency-version-checker-protocoll';
import { DependencyVersionCheckerServer } from './dependency-version-checker-server';

export default new ContainerModule(bind => {
    bind(IDependencyVersionCheckServer).to(DependencyVersionCheckerServer).inSingletonScope();
    bind(ConnectionHandler).toDynamicValue(ctx => {
        return new JsonRpcConnectionHandler(servicePath, () => {
            const depChekerServer = ctx.container.get<IDependencyVersionCheckServer>(IDependencyVersionCheckServer);
            return depChekerServer;
        });
    }).inSingletonScope()
});