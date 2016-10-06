import React from 'react'
import Clipboard from 'clipboard'
import style from './style.scss'
import classNames from 'classnames/bind'
import Icon from '../Icon'
import Spinner from '../Spinner'
import Tooltip from '../Tooltip'

class InlineEdit extends React.Component {
  constructor(props) {
    super(props)
  }

  static defaultProps = {
    isEditing: false,
    placeholder: 'Click to edit',
    loading: false,
    readonly: false,
    error: '',
    value: '',
    tooltipPlacement: 'right'
  }

  static propTypes = {
    /**
     * Name of the input.
     */
    name: React.PropTypes.string,
    /**
     * A callback function to be called when save is clicked.
     */
    changeCallback: React.PropTypes.func,
    /**
     * Value of the input.
     */
    value: React.PropTypes.oneOfType([
      React.PropTypes.number,
      React.PropTypes.string,
      React.PropTypes.array
    ]),
    /**
     * Boolean used to show/hide the input vs formatted display.
     */
    isEditing: React.PropTypes.bool,
    /**
     * Optional styles to add to the inline-edit.
     */
    optClass: React.PropTypes.string,
    /**
     * Optional placeholder string for empty submission.
     */
    placeholder: React.PropTypes.string,
    /**
     * Whether the inline-edit is readonly.
     */
    readonly: React.PropTypes.bool,
    /**
     * Boolean used to show/hide the loader.
     */
    loading: React.PropTypes.bool,
    /**
     * Error to display under the field.
     */
    error: React.PropTypes.string,
    /**
     * Boolean used to display the copy to clipboard icon.
     */
    copyToClipboard: React.PropTypes.bool,
    /**
     * A label to display next to the component.
     */
    label: React.PropTypes.string,
    /**
     * An icon to display next to the component.
     */
    icon: React.PropTypes.string,
    /**
     * Text to display inside the tooltip.
     */
    tooltipText: React.PropTypes.string,
    /**
     * The placement of the tooltip.
     */
    tooltipPlacement: React.PropTypes.oneOf(['left', 'right', 'top', 'bottom']),
    /**
     * An optional class to add to the tooltip.
     */
    tooltipClass: React.PropTypes.string
  }

  state = {
    isEditing: this.props.isEditing,
    value: this.props.value || '',
    loading: this.props.loading,
    error: this.props.error,
    copied: false
  }

  componentWillReceiveProps = (nextProps) => {
    if (nextProps.isEditing) {
      this.showButtons()
    }

    let newState = {}
    if (nextProps.loading !== this.state.loading) {
      newState.loading = nextProps.loading
    }
    if (nextProps.error !== this.state.error) {
      newState.error = nextProps.error
    }
    if (nextProps.error !== '') {
      this.showButtons()
    }

    if (Object.keys(newState).length > 0) {
      this.setState(newState)
    }
  }

  componentDidMount = () => {
    this.attachKeyListeners()
    this.activateCopyToClipboard()
    this.getStyles()
  }

  shouldComponentUpdate = (nextProps, nextState) => {
    return this.state.isEditing !== nextState.isEditing
        || this.state.loading !== nextState.loading
        || this.state.error !== nextState.error
        || this.state.copied !== nextState.copied
        || this.state.inlineEditMaxWidth !== nextState.inlineEditMaxWidth
        || this.props.tooltipText !== nextProps.tooltipText
        || this.props.tooltipPlacement !== nextProps.tooltipPlacement
  }

  handleSave = () => {
    const inputText = this._textValue.textContent
    const shouldTriggerCallback = inputText !== this.state.value
    const previousValue = this.state.value
    const isEditing = this.state.error !== '' ? true : false

    this.setState({ isEditing: isEditing, value: inputText }, () => {
      if (!isEditing) {
        this.activateCopyToClipboard()
        this._textValue.blur()
        this._textValue.scrollLeft = 0
      }

      if (typeof this.props.changeCallback === 'function' && shouldTriggerCallback) {
        const event = {
          target: {
            name: this.props.name,
            value: this.state.value
          }
        }

        this.props.changeCallback(event)
      }
    })
  }

  handleCancel = () => {
    let newState = { isEditing: false }
    let shouldTriggerCallback = false

    if (this.state.error !== '' && this.props.value !== this.state.value) {
      newState.error = ''
      newState.value = this.props.value
      shouldTriggerCallback = true
    }

    this.setState(newState, () => {
      this.activateCopyToClipboard()
      this._textValue.blur()
      this._textValue.scrollLeft = 0

      if (typeof this.props.changeCallback === 'function' && shouldTriggerCallback) {
        const event = {
          target: {
            name: this.props.name,
            value: this.state.value,
            canceled: true
          }
        }

        this.props.changeCallback(event)
      }
    })
  }

  showButtons = () => {
    if (!this.props.readonly) {
      this.setState({ isEditing: true }, () => {
        this.selectElementContents(this._textValue)
      })
    }
  }

  getSpan = () => {
    if (this.state.isEditing) {
      return <span id='span_id' contentEditable className={style['inline-text-wrapper']} dangerouslySetInnerHTML={{__html: this.state.value}} ref={(c) => this._textValue = c} />
    }

    return (
      <span id='span_id' onClick={this.showButtons} className={style['inline-text-wrapper-hover']} ref={(c) => this._textValue = c}>
        {this.props.tooltipText
          ? <Tooltip content={this.props.tooltipText} tooltipPlacement={this.props.tooltipPlacement} appendToBody={true} className={style['value-tooltip']} optClass={this.props.tooltipClass || ''}>{this.state.value || this.props.placeholder }</Tooltip>
          : <span>{this.state.value || this.props.placeholder }</span>
        }
      </span>
    )
  }

  getCopyIcon = () => {
    if (this.state.copied) {
      return 'copied!'
    }

    const copyIconFill = this.state.value === '' ? '#9198A0' : '#3C97D3'
    return <Icon name='icon-clipboard-1' height='14' width='14' fill={copyIconFill} />
  }

  getIcon = () => {
    if (this.props.icon) {
      return <span className={style['inline-icon']} ref={(c) => this._inlineIcon = c}><Icon name={this.props.icon} height='14' width='14' fill='#9198A0' /></span>
    }
  }

  getLabel = () => {
    if (this.props.label) {
      return <label className={style['inline-label']} ref={(c) => this._inlineLabel = c}>{this.props.label}</label>
    }
  }

  selectElementContents = (element) => {
    const range = document.createRange()
    range.selectNodeContents(element)

    const selection = window.getSelection()
    selection.removeAllRanges()
    selection.addRange(range)
    element.focus()
  }

  attachKeyListeners = () => {
    const saveEvent = this.handleSave
    this._textValue.addEventListener("keypress", (event) => {
      // Grabs the character code, even in FireFox
      const charCode = event.keyCode ? event.keyCode : event.which
      if (charCode === 13) {
        event.preventDefault()
        saveEvent()
      }
    })

    const cancelEvent = this.handleCancel
    this._textValue.addEventListener("keyup", (event) => {
      // Grabs the character code, even in FireFox
      const charCode = event.keyCode ? event.keyCode : event.which
      if (charCode === 27) {
        event.preventDefault()
        cancelEvent()
      }
    })
  }

  activateCopyToClipboard = () => {
    if (!this.props.copyToClipboard) {
      return
    }

    const clipboard = new Clipboard(this._copyTrigger)
    clipboard.on('success', () => {
      this.handleCopy()
    })
  }

  handleCopy = () => {
    this.setState({ copied: true }, () => {
      setTimeout(() => {
        this.setState({ copied: false })
      }, 1800)
    })
  }

  getStyles = () => {
    let offset = 0

    if (this._inlineIcon) {
      // Add width and margin to the offset
      offset += this._inlineIcon.getBoundingClientRect().width + 5
    }
    if (this._inlineLabel) {
      // Add width and margin to the offset
      offset += this._inlineLabel.getBoundingClientRect().width + 10
    }

    this.setState({ inlineEditMaxWidth: `calc(100% - ${offset}px)` })
  }

  render = () => {
    const cx = classNames.bind(style)
    const readonlyClass = this.props.readonly ? 'readonly' : ''
    const errorClass = this.state.error !== '' ? 'error' : ''
    const placeholderClass = this.state.value === '' ? 'placeholder' : ''
    const copyDisabledClass = this.state.value === '' ? 'disabled' : ''
    const copyIconClass = cx(style['copy-icon'], copyDisabledClass)
    const inlineEditClass = cx(style['inline-edit-wrapper'], this.props.optClass, readonlyClass, errorClass, placeholderClass)

    return (
      <div className={inlineEditClass}>
        <div className={style['inline-edit-wrapper-inner']}>
          {this.getIcon()}
          {this.getLabel()}
          <div className={style['inline-text-overflow-wrapper']} style={{ maxWidth: this.state.inlineEditMaxWidth }}>
            {this.getSpan()}
            {this.state.isEditing && !this.state.loading
              ? <div className={style['inline-button-wrapper']}>
                  <Icon name='icon-check-2-1' onClick={this.handleSave} height='20' width='20' className={style['save-button']}>Save</Icon>
                  <Icon name='icon-delete-1-1' onClick={this.handleCancel} height='20' width='20' className={style['cancel-button']}>Cancel</Icon>
                </div>
              : null
            }
            {this.props.copyToClipboard && !this.state.isEditing && !this.state.loading
              ? <span ref={(c) => this._copyTrigger = c} data-clipboard-text={this.state.value}>
                  <span className={copyIconClass}>{this.getCopyIcon()}</span>
                </span>
              : null
            }
            <div className={style['loader-wrapper']}>
              <Spinner loading={this.state.loading} optClass={style['spinner']} type='spinner-bounce' color='#9198A0' />
            </div>
          </div>
        </div>
        {this.state.error && this.state.error !== ''
          ? <div className={style['error-text']}>{this.state.error}</div>
          : null
        }
      </div>
    )
  }
}

export default InlineEdit
