import React from 'react'
import TabTemplate from './TabTemplate';
import style from './style.scss'
import classNames from 'classnames/bind'

class TabWrapper extends React.Component {
  constructor(props) {
    super(props);

    this.state = {
      selectedIndex: this.props.initialSelectedIndex && this.props.initialSelectedIndex < this.props.children.length ? this.props.initialSelectedIndex : 0
    }
  }

  static defaultProps = {
    initialSelectedIndex: 0
  }

  static propTypes = {
    /**
     * Specify initial visible tab index. If initialSelectedIndex is set but larger than the total amount of specified tabs, it will revert back to default.
     */
    initialSelectedIndex: React.PropTypes.number,
    /**
     * Called when a tab is selected.
     */
    onSelect: React.PropTypes.func,
    /**
     * Optional styles to add to the tab wrapper component.
     */
    optClass: React.PropTypes.string
  };

  componentWillMount = () => {
    this.getTabs().map((tab, index) => {
      if (tab.props.active) {
        this.setState({selectedIndex: index});
      }
    });
  }

  getTabs = () => {
    const tabs = [];
    React.Children.forEach(this.props.children, (tab) => {
      if (React.isValidElement(tab)) {
        tabs.push(tab);
      }
    });
    return tabs;
  }

  isActive = (index) => {
    return this.state.selectedIndex === index;
  }

  handleClick = (event, tab) => {
    const tabIndex = tab.props.tabIndex;

    if (this.state.selectedIndex !== tabIndex) {
      this.setState({selectedIndex: tabIndex});
      tab.active = true;
    }

    if (this.props.onSelect) {
      this.props.onSelect(tabIndex);
    }
  }

  render() {
    const cx = classNames.bind(style);
    const tabWrapperClasses = cx(style['tab-wrapper'], this.props.optClass);
    const tabContent = [];

    const tabs = this.getTabs().map((tab, index) => {
      tabContent.push(tab.props.children ?
        React.createElement(TabTemplate, {
          key: index,
          active: this.isActive(index),
          class: tab.props.optTabContentClass
        }, tab.props.children) : undefined);

      return React.cloneElement(tab, {
        key: index,
        active: this.isActive(index),
        tabIndex: index,
        onClick: this.handleClick
      });
    });

    return (
      <div className={tabWrapperClasses}>
        <div className={style['tab-headers']}>
          {tabs}
        </div>
        <div className={style['tab-content']}>
          {tabContent}
        </div>
      </div>
    )
  }
}

export default TabWrapper