import { injectable, inject } from '@theia/core/shared/inversify';
import { Command, CommandContribution, CommandRegistry, MenuContribution, MenuModelRegistry, MessageService } from '@theia/core/lib/common';
import { CommonMenus } from '@theia/core/lib/browser';

export const TypefoxTestCommand: Command = {
    id: 'TypefoxTest.command',
    label: 'Say Hello'
};

@injectable()
export class TypefoxTestCommandContribution implements CommandContribution {

    constructor(
        @inject(MessageService) private readonly messageService: MessageService,
    ) { }

    registerCommands(registry: CommandRegistry): void {
        registry.registerCommand(TypefoxTestCommand, {
            execute: () => this.messageService.info('Hello World!')
        });
    }
}

@injectable()
export class TypefoxTestMenuContribution implements MenuContribution {

    registerMenus(menus: MenuModelRegistry): void {
        menus.registerMenuAction(CommonMenus.EDIT_FIND, {
            commandId: TypefoxTestCommand.id,
            label: TypefoxTestCommand.label
        });
    }
}
