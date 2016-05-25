import React from 'react'
import style from './style.scss'
import classNames from 'classnames/bind'

class FormGroup extends React.Component {
  constructor(props) {
    super(props);
  }

  static propTypes = {
    /**
     * A configuration object of name/value pairs
     * that correspond to the form fields names.
     */
     schema: React.PropTypes.object,
     /**
      * A callback function to be called when a form value changes.
      */
     changeCallback: React.PropTypes.func,
     /**
      * A callback function to be called when the form is submitted.
      */
     submitCallback: React.PropTypes.func,
     /**
      * An optional CSS class to be used for local styles
      */
     optClass: React.PropTypes.string
  }

  componentWillReceiveProps(nextProps) {
    this.state.schema = nextProps.schema;
  }

  componentWillMount = () => {
    this.setInitialState();
  }

  setInitialState = () => {
    let fields = {};
    let value = null;
    let schema = this.props.schema;

    for (value in schema) {
      fields[value] = schema[value];
    }

    this.setState({fields: fields});
  }

  handleSubmit = (event) => {
    if (typeof this.props.submitCallback === 'function') {
      this.props.submitCallback(event, this.state.fields);
    }
  }

  handleChange = (event) => {
    let val;

    if (event.target.type === 'checkbox') {
      val = (event.target.value === 'false') ? false : true;
    } else {
      val = event.target.value
    }

    var newField = Object.assign({}, this.state.fields[event.target.name], {value: val});
    var previousState = Object.assign({}, this.state);
    var newState = previousState.fields[event.target.name] = newField;

    this.setState(newState, function() {
      if (typeof this.props.changeCallback === 'function') {
        this.props.changeCallback(this.state.fields);
      }
    });
  }

  getElements(children) {
    return React.Children.map(children, child => {
      let childProps = {};
      if (child.props) {
        const name = child.props.name;
        const fields = this.state.fields;

        if (name in fields) {
          if (React.isValidElement(child)) {
            childProps = {
              changeCallback: this.handleChange,
              value: fields[name].value
            };
          }
        }

        childProps.children = this.getElements(child.props.children);
        return React.cloneElement(child, childProps);
      }
      return child;
    });
  }

  render() {
    const cx = classNames.bind(style);
    var formGroupClass = cx(style['form-group'], this.props.optClass);

    const elements = this.getElements(this.props.children);

    return (
      <form className={formGroupClass} onSubmit={this.handleSubmit}>
        <fieldset className={style.fieldset}>
          {elements}
        </fieldset>
      </form>
    )
  }
}

export default FormGroup