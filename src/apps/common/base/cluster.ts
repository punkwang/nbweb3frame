import * as node_cluster from "cluster";
import * as os from "os";
import {range} from "lodash";

interface NodeCluster {
    isPrimary: boolean,

    fork(): any,
}

const cluster: NodeCluster = node_cluster as any

export const clusterMaxThreadCount = () => {
    return os.cpus().length;
};
export const clusterIsPrimary = () => {
    return cluster.isPrimary
};

export const supportCluster = () => {
    if ('fork' in cluster) {
        return true;
    }
    return false
}

export const clusterFork = () => {
    return cluster.fork()
    // Bun.spawn(process.argv, {
    //     cwd: process.cwd(),
    //     stdio: ["inherit", "inherit", "inherit"],
    //     env: {...process.env, isChildProcess: 1},
    // })
}

export const mainRunner = async (enable: boolean, threadCount: number, mainCallback: Function) => {
    if (!enable) {
        return mainCallback()
    }
    if (threadCount) {
        threadCount = clusterMaxThreadCount();
    }
    return clusterRunner(threadCount, mainCallback);
}

export const clusterRunner = async (threadCount: number, mainCallback: Function) => {
    if (!clusterIsPrimary() || !supportCluster()) {
        await mainCallback();
        return;
    }
    range(threadCount).forEach((i) => {
        clusterFork();
    })
}