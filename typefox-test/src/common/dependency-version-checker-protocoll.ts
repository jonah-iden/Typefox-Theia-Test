import { JsonRpcServer } from "@theia/core"

export const IDependencyVersionCheckServer = Symbol.for("DependencyVersionCheckerServer")
export interface IDependencyVersionCheckServer extends JsonRpcServer<IDependencyVersionCheckerClient> {
    analyzeDependencies(): Promise<string[]>;
}

export const IDependencyVersionCheckerClient = Symbol.for("DependencyVersionCheckerClient")
export interface IDependencyVersionCheckerClient {
    showDependencyMismatches(mismatches: string[]): Promise<void>;
}