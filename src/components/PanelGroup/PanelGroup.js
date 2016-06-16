import React from 'react'
import style from './style.scss'
import optclass from '../internal/OptClass'

class PanelGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    /**
     * The panel(s) to be open by default
     */
    activePanels: React.PropTypes.array,
    /**
     * Whether the panelGroup should allow only one panel to be open at a time
     * Note: if accordion is set to true, the activePanels array will respect
     * only the first item.
     */
    accordion: React.PropTypes.bool,
    /**
     * Optional CSS class(es) to be used for local styles (string or array of strings)
     */
    optClass: React.PropTypes.oneOfType([
      React.PropTypes.array,
      React.PropTypes.string
    ]),
    /**
     * A callback that gets triggered when a panel is toggled (when a panel header gets clicked)
     */
    onPanelToggle: React.PropTypes.func
  }

  static defaultProps = {
    activePanels: []
  }

  state = {
    panels: []
  }

  componentWillMount = () => {
    this.setInitialState();
  }

  activatePanels = (activePanels) => {
    var panels = this.getPanels();
    var initialPanels = [];

    panels.forEach((panel, index) => {
      if (activePanels) {
        initialPanels = [...initialPanels, {active: !!activePanels.includes(index)}];
      } else {
        initialPanels = [...initialPanels, {active: false}];
      }
    });

    this.setState({panels: initialPanels});
  }

  setInitialState = () => {
    this.activatePanels(this.props.activePanels);
  }

  componentWillReceiveProps = (nextProps) => {
    this.activatePanels(nextProps.activePanels);
  }

  collapsePanels = () => {
    var panels = this.getPanels();
    var collapsedPanels = [];

    panels.forEach((panel, index) => {
      collapsedPanels = [...collapsedPanels, {active: false}];
    });

    return collapsedPanels;
  }

  getPanels = () => {
    const panels = [];
    React.Children.forEach(this.props.children, (panel) => {
      if (React.isValidElement(panel)) {
        panels.push(panel);
      }
    });
    return panels;
  }

  handlePanelClick = (panel) => {
    let panelIndex = panel.props.panelIndex;
    let state = this.state.panels;

    if (!this.props.accordion) {
      state[panelIndex] = {active: !this.state.panels[panelIndex].active};
      this.setState({panels: state}, function() {
        this.onPanelToggle();
      });
    } else {
      var resetState = this.collapsePanels();
      resetState[panelIndex] = {active: !this.state.panels[panelIndex].active};
      this.setState({panels: resetState}, function() {
        this.onPanelToggle();
      });
    }
  }

  onPanelToggle = () => {
    let activePanels = [];
    this.state.panels.map((panel, index) => {
      if (panel.active) {
        activePanels.push(index);
      }
    });

    if (this.props.onPanelToggle) {
      this.props.onPanelToggle(activePanels);
    }
  }

  render() {
    const panelGroupClass = optclass(style['panel-group'], this.props.optClass)
    console.log(panelGroupClass);

    const panels = this.getPanels().map((panel, index) => {
      return React.cloneElement(panel, {
        key: index,
        panelIndex: index,
        active: this.state.panels[index].active,
        onPanelClick: this.handlePanelClick
      });
    });

    return (
      <div className={panelGroupClass}>
        {panels}
      </div>
    );
  }
}

export default PanelGroup
