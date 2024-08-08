let debug = false;

export namespace Logger {

    export function enableDebug() {
        debug = true;
    }

    export function disableDebug() {
        debug = false;
    }

    export function LogDebug(msg) {
        if (debug) {
            console.debug(msg);
        }
    }

    export function LogInfo(msg) {
        console.info(msg);
    }

    export function LogWarn(msg) {
        console.warn(msg);
    }

    export function LogError(msg) {
        console.error(msg);
    }
}