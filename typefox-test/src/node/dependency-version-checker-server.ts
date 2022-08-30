import { JsonRpcServer, logger, Logger } from "@theia/core";
import { FileSearchService } from "@theia/file-search/lib/common/file-search-service";
import { inject, injectable } from "@theia/core/shared/inversify";
import { IDependencyVersionCheckServer } from "../common/dependency-version-checker-protocoll";


@injectable()
export class DependencyVersionCheckerServer implements IDependencyVersionCheckServer {
    constructor(@inject(FileSearchService) private fileSearchService: FileSearchService) {}

    /**
     * analyzes the dependencies from the cargo.toml and returns a list of mismatches
     */
    async analyzeDependencies(): Promise<string[]> {
        console.log("called analyze dependencies")
        const cargoTomlFiles: string[] = await this.fileSearchService.find("cargo.toml", {});
        console.log(cargoTomlFiles);

        return ["test 1", "test 2"];
    }
}


