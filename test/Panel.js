import React from 'react'
import { shallow } from 'enzyme'
import { PanelGroup, Panel, PanelHeader, PanelContent } from '../src/components/PanelGroup'

describe('Panel', () => {
  let panel, panelHeader, panelContent

  it('should shallow render itself', () => {
    panel = shallow(<Panel optClass={'test'}><PanelHeader title='Rating' contextIcon='icon-star-1' /><PanelContent optClass='test-class'>Test Content</PanelContent></Panel>)
    panelHeader = panel.childAt(0).childAt(0)
    panelContent = panel.childAt(0).childAt(1)

    expect(panel.hasClass('panel test')).to.equal(true)
    expect(panelHeader.props().title).to.equal('Rating')
    expect(panelHeader.props().contextIcon).to.equal('icon-star-1')
    expect(panelContent.props().optClass).to.equal('test-class')
    expect(panelContent.childAt(0).text()).to.equal('Test Content')
  })
})
