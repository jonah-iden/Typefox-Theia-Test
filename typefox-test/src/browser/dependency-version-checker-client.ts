import { injectable } from "@theia/core/shared/inversify";
import { IDependencyVersionCheckerClient } from "../common/dependency-version-checker-protocoll";

@injectable()
export class DependencyVersionCheckerClient implements IDependencyVersionCheckerClient {

    showDependencyMismatches(mismatches: string[]): Promise<void> {
        console.log(mismatches);
        return new Promise(r => r());
    }
}