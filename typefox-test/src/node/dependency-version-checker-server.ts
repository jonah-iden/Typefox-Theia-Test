import { JsonRpcServer, logger, Logger } from "@theia/core";
import { FileSearchService } from "@theia/file-search/lib/common/file-search-service";
import { inject, injectable } from "@theia/core/shared/inversify";
import { IDependencyVersionCheckServer } from "../common/dependency-version-checker-protocoll";
import * as fs from 'fs';
import * as toml from 'toml'
import { FileUri } from '@theia/core/lib/node/file-uri';
import URI from "@theia/core/lib/common/uri";


@injectable()
export class DependencyVersionCheckerServer implements IDependencyVersionCheckServer {
    
    constructor(@inject(FileSearchService) private fileSearchService: FileSearchService) {}

    /**
     * analyzes the dependencies from the cargo.toml and returns a list of mismatches
     */
    async analyzeDependencies(rootPaths: string[]): Promise<string[]> {
        const cargoTomlFiles: string[] = await this.fileSearchService.find("cargo.toml", {rootUris: rootPaths.map(r => this.uriToStringPath(r))});
        const allDependencies: Dependency[] = []
        for(let path of cargoTomlFiles) {
            const tomlData = toml.parse(await this.getFileContent(path));
            Object.entries(tomlData.dependencies).forEach((key,value) => {
                console.log(key[0] + " " + key[1])
                allDependencies.push({name: key[0], version: "" + key[1]})
            });
        }


        return this.validateDependencyVersions(allDependencies);
    }

    private async getFileContent(path: string): Promise<string> {
        return new Promise((resolve, reject) => {
            fs.readFile(new URL(decodeURIComponent(path)), "utf8", (err, data) => {
                if(err) {
                    console.log("error reading file " + err) // needs of course better error handling when fully developed
                    reject("error reading file")
                } else {
                    resolve(data)
                }
            })
        })
    }

    /**
     * goes through the given dependencies and checks for duplicates with different version
     * returns mismatches
     * @param dependencies the dependencies to check
     */
    private validateDependencyVersions(dependencies: Dependency[]): string[] {
        const searchMap = new Map<string, string>();
        const mismatches = [];
        for(let dep of dependencies) {
            if(searchMap.has(dep.name)) {
                if(dep.version != searchMap.get(dep.name)) {
                    mismatches.push("mismatch in " + dep.name + " versions: " + dep.version + "!=" + searchMap.get(dep.name))
                }
            } else {
                searchMap.set(dep.name, dep.version);
            }
        }
        return mismatches;
    }

    private uriToStringPath(uri: string): string {
        let uriPath = new URI(uri).path.toString();
        if(uriPath.startsWith("/")) {
            uriPath = uriPath.substring(1);
        }
        return uriPath;
    }


}


interface Dependency {
    name: string;
    version: string;
} 

