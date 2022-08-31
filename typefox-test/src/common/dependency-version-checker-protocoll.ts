import { JsonRpcServer } from "@theia/core"

export const servicePath = "/services/dependencyVersionChecker";

export const IDependencyVersionCheckServer = Symbol.for("DependencyVersionCheckerServer")
export interface IDependencyVersionCheckServer {
    analyzeDependencies(rootPath: string[]): Promise<string[]>;
}