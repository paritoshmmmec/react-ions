import React from 'react'
import ButtonGroup from 'react-conventions/lib/ButtonGroup/ButtonGroup'
import Button from 'react-conventions/lib/Button'
import Input from 'react-conventions/lib/Input'
import style from './style'

class ExampleButtonGroupStyles extends React.Component {
  constructor(props) {
    super(props);
  }

  state = {
    buttonStyle: 'info'
  }

  updateButtons = () => {
    this.setState({ buttonStyle: this._buttonStyle.state.value });
  }

  render() {
    const options = [
      {
        value: 'Option 1',
        label: 'Option 1'
      },{
        value: 'Option 2',
        label: 'Option 2'
      },{
        value: 'Option 3',
        label: 'Option 3'
      }
    ];

    return(
      <div>
        <div className={style.update}>
          <Input value='info' placeholder='default' ref={(c) => this._buttonStyle = c} />
          <Button onClick={this.updateButtons}>Update Buttons</Button>
        </div>
        <small>You can test with any of the button styles (ex 'default', 'danger', 'success', 'info')</small>
        <ButtonGroup
          name="button-group-styles"
          options={options}
          buttonStyle={this.state.buttonStyle}
          defaultOption={0}>
        </ButtonGroup>
      </div>
    )
  }
}

export default ExampleButtonGroupStyles