import React from 'react';
import { shallow, mount } from 'enzyme';
import { Link } from 'react-router'
import timeString from '../src/components/internal/TimeString'
import Icon from '../src/components/Icon'
import ActivityFeed from '../src/components/ActivityFeed/ActivityFeed';
import ActivityFeedItem from '../src/components/ActivityFeed/ActivityFeedItem';

describe('ActivityFeedItem', () => {

  const data = [
    {
      name: 'The Badge Component',
      title: 'is pretty awesome.',
      profileUrl: '/components/badge',
      text: 'Beef ribs shoulder bresaola hamburger brisket filet mignon turkey kevin frankfurter andouille spare ribs shankle chicken swine ham hock. Ham pork belly alcatra venison.',
      timestamp: '2016-05-06T18:19:08.936',
      badge: {
        text: '9',
        theme: 'success'
      }
    }, {
      name: 'The Nav Component',
      title: 'is really great, actually.',
      profileUrl: '/components/nav',
      text: 'Bacon ipsum dolor amet venison bresaola kevin chuck. Pig turkey alcatra beef ribs salami pork.',
      timestamp: '2016-05-05T18:19:08.936',
      actions: [
        {
          type: 'reply',
          icon: 'icon-back',
          callback: () => {
            alert('reply')
          }
        }, {
          type: 'reply',
          icon: 'icon-arrow-68',
          callback: () => {
            alert('reply')
          }
        }
      ],
      badge: {
        text: '7',
        theme: 'warning'
      }
    }
  ];

  it('should render a name', () => {
    const wrapper = shallow(<ActivityFeedItem name={data[0].name} />);
    const nameWrapper = wrapper.childAt(0);
    expect(nameWrapper.props().className).to.equal('title-wrapper');
    expect(nameWrapper.childAt(0).type()).to.equal('h3');
    expect(nameWrapper.childAt(0).text()).to.equal(data[0].name + ' ');
  });

  it('should render a title', () => {
    const wrapper = shallow(<ActivityFeedItem title={data[0].title} />);
    const titleWrapper = wrapper.childAt(0);
    expect(titleWrapper.childAt(0).text()).to.equal(' ' + data[0].title);
  });

  it('should render a profile url', () => {
    const wrapper = shallow(<ActivityFeedItem name={data[0].name} profileUrl={data[0].profileUrl} />);
    const titleWrapper = wrapper.childAt(0);
    const linkWrapper = titleWrapper.childAt(0).childAt(0);
    expect(linkWrapper.type()).to.equal(Link);
    expect(linkWrapper.props().to).to.equal(data[0].profileUrl);
    expect(linkWrapper.childAt(0).text()).to.equal(data[0].name);
  });

  it('should render text', () => {
    const wrapper = shallow(<ActivityFeedItem text={data[0].text} />);
    const textWrapper = wrapper.childAt(1);
    expect(textWrapper.text()).to.equal(data[0].text);
  });

  // Skip until we've created a test for timeStamp
  it.skip('should render the time', () => {
    const wrapper = shallow(<ActivityFeedItem time={data[0].timestamp} />);
    const timeWrapper = wrapper.childAt(0);
    const timeStamp = timeString(data[0].timestamp);
    expect(timeWrapper.text()).to.equal(timeStamp);
  });

  it('should render an action block', () => {
    const wrapper = shallow(<ActivityFeedItem actions={data[1].actions} />);
    const actionWrapper = wrapper.childAt(0).childAt(1);
    expect(actionWrapper.find(Icon)).to.have.length(2);
    expect(actionWrapper.childAt(0).props().name).to.equal(data[1].actions[0].icon);
    expect(actionWrapper.childAt(1).props().name).to.equal(data[1].actions[1].icon);
  });

  it('should run an onClick callback', () => {
    var spy = sinon.spy();
    data[1].actions[0].callback = spy;
    const wrapper = mount(<ActivityFeedItem actions={data[1].actions} />);
    const actionWrapper = wrapper.childAt(0).childAt(1);
    expect(typeof actionWrapper.childAt(0).props().onClick).to.equal('function');
    actionWrapper.childAt(0).simulate('click');
    expect(spy.calledOnce).to.be.true;
  });

  it('should not render anything', () => {
    const wrapper = shallow(<ActivityFeedItem />);
    const nameWrapper = wrapper.childAt(0);
    expect(nameWrapper.childAt(0).text()).to.equal(' ');

    const titleWrapper = wrapper.childAt(0);
    expect(titleWrapper.childAt(0).text()).to.equal(' ');

    const linkWrapper = titleWrapper.childAt(0).childAt(0);
    expect(linkWrapper.childAt(0).text()).to.equal('');

    const textWrapper = wrapper.childAt(1);
    expect(textWrapper.text()).to.equal('');

    const actionWrapper = wrapper.childAt(0).childAt(1);
    expect(actionWrapper.find(Icon)).to.have.length(0);
  });

});