/**
 * Generated using theia-extension-generator
 */
import { TypefoxTestCommandContribution, TypefoxTestMenuContribution } from './typefox-test-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { IDependencyVersionCheckerClient, IDependencyVersionCheckServer } from '../common/dependency-version-checker-protocoll';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser';
import { DependencyVersionCheckerClient } from './dependency-version-checker-client';

export default new ContainerModule(bind => {
    bind(IDependencyVersionCheckerClient).to(DependencyVersionCheckerClient).inSingletonScope();
    bind(IDependencyVersionCheckServer).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const client = ctx.container.get<IDependencyVersionCheckerClient>(IDependencyVersionCheckerClient);
        const proxy = connection.createProxy<IDependencyVersionCheckServer>("/services/dependencyVersionChecker");
        proxy.setClient(client)
        return proxy;
    }).inSingletonScope();

    bind(CommandContribution).to(TypefoxTestCommandContribution);
    bind(MenuContribution).to(TypefoxTestMenuContribution);
});
