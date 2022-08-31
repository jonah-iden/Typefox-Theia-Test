import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry} from '@theia/core/lib/common';
import { WorkspaceService } from '@theia/workspace/lib/browser'
import { CommonMenus, FrontendApplication, FrontendApplicationContribution } from '@theia/core/lib/browser';
import { IDependencyVersionCheckServer } from "../common/dependency-version-checker-protocoll";
import URI from '@theia/core/lib/common/uri';


export const dependencyVersionCheckCommand: Command = {
    id: 'dependencyVersionCheck.command',
    label: "check dependency versions"
};

@injectable()
export class TypefoxTestCommandContribution implements CommandContribution {

    @inject(IDependencyVersionCheckServer) depCheckServer: IDependencyVersionCheckServer;
    @inject(WorkspaceService) workspaceService: WorkspaceService;

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(dependencyVersionCheckCommand, {
            execute: async () => {
                const rootPaths = await this.workspaceService.tryGetRoots().map(r => decodeURIComponent(r.resource.toString()));
                console.log(rootPaths)
                const mismatches = await this.depCheckServer.analyzeDependencies(rootPaths);
                console.log("mismatches recieved");
                console.log(mismatches);
            }
        });
    }
}

@injectable()
export class TypefoxTestMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: dependencyVersionCheckCommand.id,
            label: dependencyVersionCheckCommand.label
        });
    }
}