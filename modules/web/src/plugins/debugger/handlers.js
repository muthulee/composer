import { COMMANDS } from './constants';

/**
 * Provides command handler definitions of debugger plugin.
 * @param {debugger} debugger plugin instance
 * @returns {Object[]} command handler definitions.
 *
 */
export function getHandlerDefinitions(debuggerInstance) {
    return [
        {
            cmdID: COMMANDS.DEBUG,
            handler: () => {
                // TODO
            },
        },
        {
            cmdID: COMMANDS.STOP,
            handler: () => {
                // TODO
            },
        },
    ];
}