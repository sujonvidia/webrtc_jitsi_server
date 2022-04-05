// @flow

import { translate } from '../../base/i18n';
// import icc from '../../base/icons';
import { IconLobby } from '../../base/icons';
import { connect } from '../../base/redux';
import { AbstractButton, type AbstractButtonProps } from '../../base/toolbox/components';

/**
 * The type of the React {@code Component} props of {@link LobbyIconButton}.
 */
type Props = AbstractButtonProps & {

    /**
     * External handler for click action.
     */
    handleClick: Function
};

/**
 * Implementation of a button for accessing participants pane.
 */
class LobbyIconButton extends AbstractButton<Props, *> {
    accessibilityLabel = 'toolbar.accessibilityLabel.lobbyIcon';
    icon = IconLobby;
    label = 'toolbar.lobbyIcon';
    tooltip = 'toolbar.lobbyIcon';

    /**
     * Handles clicking / pressing the button, and opens the appropriate dialog.
     *
     * @protected
     * @returns {void}
     */
    _handleClick() {
        this.props.handleClick();
    }
}

export default translate(connect()(LobbyIconButton));
