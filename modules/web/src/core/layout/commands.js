import PropTypes from 'prop-types';
import { COMMANDS } from './constants';

/**
 * Provides command definitions of layout manager plugin.
 *
 * @returns {Object[]} command definitions.
 *
 */
export function getCommandDefinitions() {
    return [
        {
            id: COMMANDS.SHOW_VIEW,
            argTypes: {
                id: PropTypes.string.isRequired,
                region: PropTypes.string.isRequired,
                viewProps: PropTypes.Object,
            },
        },
        {
            id: COMMANDS.HIDE_VIEW,
            argTypes: {
                id: PropTypes.string.isRequired,
            },
        },
    ];
}