import React from 'react';
import PropTypes from 'prop-types';
import { Tab, Nav, NavItem } from 'react-bootstrap';
import ActivityBar from './ActivityBar';

const HISTORY = {
    ACTIVE_VIEW: 'active-left-view',
};

/**
 * React component for LeftPanel Region.
 *
 * @class LeftPanel
 * @extends {React.Component}
 */
class LeftPanel extends React.Component {

    /**
     * @inheritdoc
     */
    constructor(props, context) {
        super(props, context);
        this.state = {
            activeView: context.history.get(HISTORY.ACTIVE_VIEW) || '',
        };
    }

    /**
     * @inheritdoc
     */
    render() {
        const tabs = [];
        const panes = [];
        this.props.children.forEach((view) => {
            const {
                    props: {
                        definition: {
                            id,
                            regionOptions: {
                                activityBarIcon,
                                panelTitle,
                            },
                        },
                    },
                  } = view;
            tabs.push((
                <NavItem key={id} eventKey={id}>
                    <i className={`fw fw-${activityBarIcon} fw-lg`} />
                </NavItem>
            ));
            panes.push((
                <Tab.Pane key={id} eventKey={id}>
                    <div>
                        <div className="panel-title">{panelTitle}</div>
                        <div className="panel-content">{view}</div>
                    </div>
                </Tab.Pane>
            ));
        });
        return (
            <div className="left-panel">
                <div>
                    <Tab.Container
                        id="activity-bar-tabs"
                        activeKey={this.state.activeView}
                        onSelect={(key) => {
                            const activeView = this.state.activeView !== key ? key : '';
                            this.context.history.put(HISTORY.ACTIVE_VIEW, activeView);
                            this.setState({
                                activeView,
                            });
                        }}
                    >
                        <div>
                            <ActivityBar>
                                <Nav bsStyle="tabs">
                                    {tabs}
                                </Nav>
                            </ActivityBar>
                            <Tab.Content animation>
                                {panes}
                            </Tab.Content>
                        </div>
                    </Tab.Container>
                </div>
            </div>
        );
    }
}

LeftPanel.propTypes = {
    children: PropTypes.arrayOf(PropTypes.element),
};

LeftPanel.contextTypes = {
    history: PropTypes.shape({
        put: PropTypes.func,
        get: PropTypes.func,
    }).isRequired,
};

export default LeftPanel;