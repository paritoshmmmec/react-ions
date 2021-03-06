import React from 'react'
import PropTypes from 'prop-types'
import SortableItem from './SortableItem'
import Badge from '../Badge'
import Toggle from '../Toggle'
import classNames from 'classnames/bind'
import style from './style.scss'

class SortableItemPreview extends React.Component {
  constructor(props) {
    super(props)
  }

  static propTypes = {
    item: PropTypes.object.isRequired,
    count: PropTypes.number.isRequired
  }

  render = () => {
    const cx = classNames.bind(style)
    const previewClasses = cx(style['sortable-item'], style.preview, !this.props.item.active ? 'inactive' : '')
    const badgeOpacity = this.props.count > 1 ? 1 - ((0.6 / (this.props.count - 1)) * this.props.item.index) : 1

    return (
      <div className={previewClasses}>
        <div style={{ opacity: badgeOpacity }}><Badge text={this.props.item.index + 1} theme='sky' optClass={style['sortable-item-badge']} /></div>
        <span>{this.props.item.text}</span>
        <div className={style.actions}>
          <Toggle value={this.props.item.active} optClass={style.toggle} />
          <div className={style.handle}><span></span><span></span><span></span><span></span></div>
        </div>
      </div>
    )
  }
}

export default SortableItemPreview
