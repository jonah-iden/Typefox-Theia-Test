import { JsonRpcServer, logger, Logger } from "@theia/core";
import { injectable } from "@theia/core/shared/inversify";
import { IDependencyVersionCheckerClient, IDependencyVersionCheckServer } from "../common/dependency-version-checker-protocoll";


@injectable()
export class DependencyVersionCheckerServer implements IDependencyVersionCheckServer {
    private client: IDependencyVersionCheckerClient | undefined;

    constructor() {}

    /**
     * analyzes the dependencies from the cargo.toml and returns a list of mismatches
     */
    async analyzeDependencies(): Promise<string[]> {
        console.log("called analyze dependencies")
        //const cargoTomlFiles: string[] = await this.fileSearch.find("cargo.toml", {});
        //console.log(cargoTomlFiles);

        return ["test 1", "test 2"];
    }

    dispose(): void {}
    
    setClient(client: IDependencyVersionCheckerClient | undefined): void {
        this.client = client 
        
    }

}


