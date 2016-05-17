import React from 'react';
import { shallow, mount, render } from 'enzyme';
import ButtonGroup from '../src/components/ButtonGroup/ButtonGroup';

describe('ButtonGroup', () => {
  let wrapper;
  let options = [
    {
      value: 'option_1',
      label: 'Option 1'
    },{
      value: 'option_2',
      label: 'Option 2'
    }
  ];

  it('should shallow render itself', () => {
    wrapper = shallow(<ButtonGroup name="test-group" options={options} label="Test label"/>);

    expect(wrapper.hasClass('button-group')).to.equal(true);
    expect(wrapper.find('label')).to.have.length(1);
    expect(wrapper.find('ButtonToggle')).to.have.length(2);

    console.log(wrapper.html());
    expect(wrapper.childAt(1).childAt(0).props().value).to.be.equal('option_1');
    expect(wrapper.childAt(1).childAt(0).props().label).to.be.equal('Option 1');
    expect(wrapper.childAt(1).childAt(0).props().name).to.be.equal('test-group');
    expect(wrapper.childAt(1).childAt(0).props().checked).to.be.equal(false);
    expect(wrapper.childAt(1).childAt(0).props().optClass).to.be.equal('secondary');
    expect(wrapper.childAt(1).childAt(0).props().disabled).to.be.equal(false);

    expect(wrapper.childAt(1).childAt(1).props().value).to.be.equal('option_2');
    expect(wrapper.childAt(1).childAt(1).props().label).to.be.equal('Option 2');
    expect(wrapper.childAt(1).childAt(1).props().name).to.be.equal('test-group');
    expect(wrapper.childAt(1).childAt(1).props().checked).to.be.equal(false);
    expect(wrapper.childAt(1).childAt(1).props().optClass).to.be.equal('secondary');
    expect(wrapper.childAt(1).childAt(1).props().disabled).to.be.equal(false);
  });

  it('should have disabled buttons', () => {
    wrapper = shallow(<ButtonGroup name="test-group" options={options} label="Test label" disabled/>);

    expect(wrapper.childAt(1).childAt(0).props().disabled).to.be.equal(true);
    expect(wrapper.childAt(1).childAt(1).props().disabled).to.be.equal(true);
  });

  it('should be required', () => {
    wrapper = shallow(<ButtonGroup name="test-group" options={options} label="Test label" required={true}/>);

    expect(wrapper.childAt(0).hasClass('asterisk')).to.be.true;
    expect(wrapper.childAt(0).html()).to.be.equal('<span class="asterisk">*</span>');
  });

  it('should have an option selected', () => {
    wrapper = mount(<ButtonGroup name="test-group" options={options} label="Test label" defaultOption={0}/>);

    expect(wrapper.childAt(1).childAt(0).props().checked).to.be.equal(true);
    expect(wrapper.childAt(1).childAt(1).props().checked).to.be.equal(false);
  });

  it('should have an extra class', () => {
    wrapper = shallow(<ButtonGroup name="test-group" options={options} label="Test label" optClass="extra-class"/>);

    expect(wrapper.hasClass('extra-class')).to.be.true;
  });

  it('should have buttons with specific styling', () => {
    wrapper = shallow(<ButtonGroup name="test-group" options={options} label="Test label" buttonStyle='info' defaultOption={1}/>);

    expect(wrapper.childAt(1).childAt(0).props().optClass).to.be.equal('secondary');
    expect(wrapper.childAt(1).childAt(1).props().optClass).to.be.equal('info');

    wrapper.setProps({ buttonStyle: 'danger' });
    wrapper.update();

    expect(wrapper.childAt(1).childAt(0).props().optClass).to.be.equal('secondary');
    expect(wrapper.childAt(1).childAt(1).props().optClass).to.be.equal('danger');

    wrapper.setProps({ buttonStyle: '' });
    wrapper.update();

    expect(wrapper.childAt(1).childAt(0).props().optClass).to.be.equal('secondary');
    expect(wrapper.childAt(1).childAt(1).props().optClass).to.be.equal('');
  });

  it('should call changeCallback function', () => {
    const spy = sinon.spy();

    wrapper = mount(<ButtonGroup name="test-group" options={options} label="Test label" changeCallback={spy}/>);
    wrapper.childAt(1).childAt(0).find('input').simulate('change');

    expect(spy.calledOnce).to.be.true;
  });

  it('should update selected value via callback', () => {
    let selected = false;
    const callback = function(event, value) {
      selected = value;
    };
    wrapper = mount(<ButtonGroup name="test-group" options={options} label="Test label" changeCallback={callback}/>);

    wrapper.childAt(1).childAt(0).find('input').simulate('change');
    expect(selected).to.be.equal('option_1');

    wrapper.childAt(1).childAt(1).find('input').simulate('change');
    expect(selected).to.be.equal('option_2');
  });
});