import React from 'react'
import classNames from 'classnames/bind'
import ButtonToggle from './ButtonToggle'
import style from './style.scss'

/**
 * The ButtonGroup component.
 */
class ButtonGroup extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    checkedOption: this.props.defaultOption !== undefined ? this.props.options[this.props.defaultOption][this.props.valueProp] : ''
  }

  static defaultProps = {
    disabled: false,
    required: false,
    displayProp: 'label',
    valueProp: 'value'
  }

  static propTypes = {
    /**
     * Text shown above the button group.
     */
    label: React.PropTypes.string,
    /**
     * The name that will be applied to all radio buttons inside it.
     */
    name: React.PropTypes.string.isRequired,
    /**
     * Whether the button group is required.
     */
    required: React.PropTypes.bool,
    /**
     * Whether the button group is disabled.
     */
    disabled: React.PropTypes.bool,
    /**
     * A list of options for the button group.
     */
    options: React.PropTypes.array.isRequired,
    /**
     * The property to be used as the display property
     */
    displayProp: React.PropTypes.string,
    /**
     * The property to be used as the value property
     */
    valueProp: React.PropTypes.string,
    /**
     * Which option is checked by default.
     */
    defaultOption: React.PropTypes.number,
    /**
     * A callback function to be called when an option is changed.
     */
    changeCallback: React.PropTypes.func,
    /**
     * The style for the buttons in the group.
     */
    buttonStyle: React.PropTypes.string
  }

  componentWillMount = () => {
    if (typeof this.props.defaultOption !== 'undefined') {
      this.props.options[this.props.defaultOption].checked = true
    }
  }

  componentWillReceiveProps = (nextProps) => {
    if (typeof nextProps.defaultOption !== 'undefined' && nextProps.options[nextProps.defaultOption][nextProps.valueProp] !== this.state.checkedOption) {
      nextProps.options[nextProps.defaultOption].checked = true
      this.setState({checkedOption: nextProps.options[nextProps.defaultOption][nextProps.valueProp]})
    }
  }

  handleChange = (event, value) => {
    event.persist()
    this.setState({checkedOption: value}, () => {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback(event, value)
      }
    })
  }

  getOptions = () => {
    const groupName = this.props.name
    const buttonStyle = this.props.buttonStyle
    const { options, label, name, value, required, defaultOption, changeCallback, ...other } = this.props

    return this.props.options.map((buttonToggle, index) =>
      <ButtonToggle
        key={buttonToggle[this.props.valueProp]}
        value={buttonToggle[this.props.valueProp]}
        label={buttonToggle[this.props.displayProp]}
        name={groupName}
        checked={this.state.checkedOption === buttonToggle[this.props.valueProp]}
        optClass={this.state.checkedOption === buttonToggle[this.props.valueProp] ? buttonStyle : 'secondary'}
        changeCallback={this.handleChange}
        {...other} />
    )
  }

  render = () => {
    const cx = classNames.bind(style)
    var buttonGroupClass = cx(style['button-group'], this.props.optClass)

    return (
      <div className={buttonGroupClass}>
        {this.props.required ? <span className={style.asterisk}>*</span> : null}
        {this.props.label ? <label className={style['button-group-label']}>{this.props.label}</label> : null}
        <div className={style.options}>
          {this.getOptions()}
        </div>
      </div>
    )
  }
}

export default ButtonGroup
