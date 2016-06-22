import React from 'react'
import ReactDOM from 'react-dom'
import { shallow, mount } from 'enzyme'
import Loader from 'react-loader'
import Input from '../src/components/Input/Input'
import Typeahead from '../src/components/Typeahead/Typeahead'

describe('Typeahead', () => {
  let wrapper, typeahead
  const options = [
    {value: 'AT', display: 'Austria'},
    {value: 'BM', display: 'Bermuda'}
  ]

  it.skip('should shallow render itself', () => {
    wrapper = shallow(<Typeahead options={options} valueProp='value' displayProp='display' />)
    expect(!!wrapper.find('.typeahead-component')).to.equal(true)
    expect(wrapper.find(Loader)).to.have.length(0)
  })

  it('should have placeholder text', () => {
    wrapper = shallow(<Typeahead options={options} valueProp='value' displayProp='display' placeholder='test' />)
    expect(wrapper.props().placeholder).to.equal('test')
  })

  it('should be disabled', () => {
    wrapper = shallow(<Typeahead options={options} valueProp='value' displayProp='display' disabled={true} />)
    expect(wrapper.props().disabled).to.be.true
  })

  it('should have an extra class', () => {
    wrapper = shallow(<Typeahead options={options} valueProp='value' displayProp='display' optClass='test-class' />)
    expect(!!wrapper.find('.test-class')).to.equal(true)
  })

  it('should display a list when the user types a letter', () => {
    wrapper = mount(<Typeahead options={options} valueProp='value' displayProp='display' />)
    wrapper.find('input').simulate('change', {target: {value: 'a'}})
    expect(!!wrapper.find('.typeahead-list')).to.equal(true)
    expect(wrapper.childAt(1).find('li')).to.have.length(2)
  })

  it('should display a loader', () => {
    wrapper = mount(<Typeahead options={options} valueProp='value' displayProp='display' loading={true} />)
    expect(wrapper.childAt(1).type()).to.equal(Loader)
  })

  it.skip('should take a change callback', () => {
    const spy = sinon.spy()
    wrapper = mount(<Typeahead options={options} valueProp='value' displayProp='display' changeCallback={spy} />)
    wrapper.find('input').simulate('click')
    expect(spy.calledOnce).to.be.true
  })

  it.skip('should take a search callback', () => {
    const spy = sinon.spy()
    wrapper = mount(<Typeahead options={options} valueProp='value' displayProp='display' searchCallback={spy} />)
    wrapper.childAt(0).childAt(0).simulate('change', {target: {value: 'a'}})
    expect(spy.calledOnce).to.be.true
  })
})
