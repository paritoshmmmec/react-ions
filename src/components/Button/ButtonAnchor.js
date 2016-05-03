import React from 'react'
import { Link } from 'react-router'
import style from './style.scss'
import classNames from 'classnames/bind'

const ButtonAnchor = (props) => {
  const cx = classNames.bind(style);
  const btnAnchorClasses = cx(style.btn, props.optClass, props.size);

  let buttonAnchor;

  if (props.internal) {
    buttonAnchor = <Link to={props.path} className={btnAnchorClasses} {...props}>{props.children}</Link>;
  } else {
    buttonAnchor = <a href={props.path} className={btnAnchorClasses} {...props}>{props.children}</a>;
  }
  return buttonAnchor;
}

ButtonAnchor.propTypes = {
  /**
   * Optional styles to add to the button.
   */
  optClass: React.PropTypes.string,
  /**
   * The size of button.
   */
  size: React.PropTypes.string,
  /**
   * Whether the button is disabled.
   */
  disabled: React.PropTypes.bool,
  /**
   * A path to pass to the anchor tag.
   */
  path: React.PropTypes.string,
  /**
   * Whether the link it to an internal page, or external (default)
   */
  internal: React.PropTypes.bool
}

export default ButtonAnchor