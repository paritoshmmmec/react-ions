import React from 'react'
import { shallow, mount } from 'enzyme'
import Checkbox from '../src/components/Checkbox/Checkbox'
import Icon from '../src/components//Icon/Icon'

describe('Checkbox', () => {
  let wrapper, inst

  it('should shallow render itself', () => {
    wrapper = shallow(<Checkbox label='Test label'></Checkbox>)

    expect(wrapper.find('div')).to.have.length(3)
    expect(wrapper.find('input')).to.have.length(1)
    expect(wrapper.find('label')).to.have.length(1)

    expect(wrapper.hasClass('checkbox-component')).to.equal(true)
    expect(wrapper.childAt(1).childAt(0).hasClass('checkbox-input')).to.equal(true)
  })

  it('should be disabled', () => {
    wrapper = shallow(<Checkbox value={true} label='Test label' disabled></Checkbox>)
    expect(wrapper.hasClass('checkbox-component')).to.equal(true)
    expect(wrapper.hasClass('checkbox-disabled')).to.equal(true)

    wrapper = mount(<Checkbox value={false} label='Test label' disabled></Checkbox>)
    expect(wrapper.find('input').node.hasAttribute('disabled')).to.equal(true)
    expect(wrapper.find(Icon).props().fill).to.equal('#9198A0')
  })

  it('should be checked', () => {
    const checked = true
    wrapper = mount(<Checkbox value={checked} label='Test label'></Checkbox>)

    expect(wrapper.childAt(0).props().value).to.equal(checked)
    expect(wrapper.find(Icon).props().fill).to.equal('#3C97D3')
  })

  it('should be locked when value is true', () => {
    let checked = true
    const callback = function(event) {
      checked = event.target.checked
    }
    const event = {
      target: {
        checked: false
      },
      persist: sinon.spy()
    }

    wrapper = shallow(<Checkbox value={checked} locked={true} label='Test label' changeCallback={callback}/>)
    inst = wrapper.instance()

    inst.handleChange(event)
    expect(event.persist.calledOnce).to.be.true
    expect(wrapper.state().value).to.be.true
  })

  it('should not be locked when value is false', () => {
    let checked = false
    const callback = function(event) {
      checked = event.target.checked
    }
    const event = {
      target: {
        checked: true
      },
      persist: sinon.spy()
    }

    wrapper = shallow(<Checkbox value={checked} locked={true} label='Test label' changeCallback={callback}/>)
    inst = wrapper.instance()

    inst.handleChange(event)
    expect(event.persist.calledOnce).to.be.true
    expect(wrapper.state().value).to.be.true
  })

  it('should have an extra class', () => {
    wrapper = shallow(<Checkbox value={false} label='Test label' optClass='checkbox-error'></Checkbox>)

    expect(wrapper.hasClass('checkbox-component')).to.equal(true)
    expect(wrapper.hasClass('checkbox-error')).to.equal(true)
  })

  it('should call changeCallback function', () => {
    const spy = sinon.spy()

    wrapper = mount(<Checkbox value={false} label='Test label' changeCallback={spy}/>)
    wrapper.childAt(0).simulate('change')

    expect(spy.calledOnce).to.be.true
  })

  it('should update checked value via callback', () => {
    let checked = false
    const callback = function(event) {
      checked = event.target.checked
    }
    wrapper = mount(<Checkbox value={checked} label='Test label' changeCallback={callback}/>)

    wrapper.childAt(0).simulate('change', {target: { checked: true }})
    expect(checked).to.equal(true)
  })

  it('should not result in an error if the change callback is not defined', () => {
    let checked = false
    wrapper = mount(<Checkbox value={checked} label='Test label' />)

    wrapper.childAt(0).simulate('change', {target: { checked: true }})
    expect(checked).to.equal(false)
  })

  it('should update its state when the value property changes', () => {
    wrapper = mount(<Checkbox value={false} label='Test label'/>)

    expect(wrapper.state().value).to.be.false

    wrapper.setProps({ value: true })
    wrapper.update()

    expect(wrapper.state().value).to.be.true
  })

  it('should have a custom icon', () => {
    wrapper = shallow(<Checkbox label='Test label' iconName='icon-minus-2'></Checkbox>)

    expect(wrapper.find(Icon).props().name).to.equal('icon-minus-2')
  })

  it('should update the state when the iconName prop changes', () => {
    wrapper = shallow(<Checkbox label='Test label'></Checkbox>)

    expect(wrapper.state().iconName).to.equal('icon-check-1-1')

    wrapper.setProps({ iconName: 'icon-minus-2' })

    expect(wrapper.state().iconName).to.equal('icon-minus-2')
  })

  it('should return a description', () => {
    wrapper = shallow(<Checkbox label='Test label' description='This is a test'></Checkbox>)

    expect(wrapper.childAt(1).childAt(1).childAt(0).childAt(1).text()).to.equal('This is a test')
  })
})
