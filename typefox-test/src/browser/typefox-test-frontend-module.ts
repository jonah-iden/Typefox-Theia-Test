/**
 * Generated using theia-extension-generator
 */
import { TypefoxTestCommandContribution, TypefoxTestMenuContribution } from './typefox-test-contribution';
import { CommandContribution, MenuContribution } from '@theia/core/lib/common';
import { ContainerModule } from '@theia/core/shared/inversify';
import { IDependencyVersionCheckServer, servicePath } from '../common/dependency-version-checker-protocoll';
import { WebSocketConnectionProvider } from '@theia/core/lib/browser';

export default new ContainerModule(bind => {
    bind(IDependencyVersionCheckServer).toDynamicValue(ctx => {
        const connection = ctx.container.get(WebSocketConnectionProvider);
        const proxy = connection.createProxy<IDependencyVersionCheckServer>(servicePath);
        return proxy;
    }).inSingletonScope();

    bind(CommandContribution).to(TypefoxTestCommandContribution);
    bind(MenuContribution).to(TypefoxTestMenuContribution);
});
