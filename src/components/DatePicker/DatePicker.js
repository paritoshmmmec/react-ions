import React from 'react'
import moment from 'moment'
import SelectField from '../SelectField/SelectField'
import style from './style.scss'
import classNames from 'classnames/bind'


/**
 * The DatePicker component.
 */
class DatePicker extends React.Component {
  constructor(props) {
    super(props)
  }

  state = {
    year: {
      min: 0,
      value: 0,
      max: 0,
      options: []
    },
    month: {
      min: 0,
      value: 0,
      max: 0,
      options: []
    },
    day: {
      min: 0,
      value: 0,
      max: 0,
      options: []
    }
  }

  static defaultProps = {
    min: { month: '-0', day: '-0', year: '-10'},
    max: { month: '+0', day: '+0', year: '+10'},
    format: 'YYYY-MM-DD'
  }

  static propTypes = {
    /**
     * Max date - object with month, day, year.
     */
    max: React.PropTypes.object,
    /**
     * Min date - object with month, day, year.
     */
    min: React.PropTypes.object,
    /**
     * Date string.
     */
    value: React.PropTypes.string,
    /**
     * Date format - any valid Moment.js format string.
     */
    format: React.PropTypes.string,
    /**
     * A callback function to be called when the value changes.
     */
    changeCallback: React.PropTypes.func
  }

  _initDate = (date, format) => {
    console.log('_initDate: ')
    console.log(date)
    console.log(format)

    let dateObj = {
      year: {
        min: 0,
        value: 0,
        max: 0,
        options: []
      },
      month: {
        min: 0,
        value: 0,
        max: 0,
        options: []
      },
      day: {
        min: 0,
        value: 0,
        max: 0,
        options: []
      },
      value: ''
    }

    let mDate = date === undefined ? moment() : moment(date, format)
    console.log(mDate.format(format))

    // selected date values
    dateObj.year.value = mDate.year()
    dateObj.month.value = mDate.month()
    dateObj.day.value = mDate.date()

    dateObj.value = mDate.format(format)

    // min & max values
    dateObj.year.min = this._getMinOrMax(dateObj.value, this.props.min, 'year')
    dateObj.year.max = this._getMinOrMax(dateObj.value, this.props.max, 'year')
    dateObj.month.min = this._getMinOrMax(dateObj.value, this.props.min, 'month')
    dateObj.month.max = this._getMinOrMax(dateObj.value, this.props.max, 'month')
    dateObj.day.min = this._getMinOrMax(dateObj.value, this.props.min, 'day')
    dateObj.day.max = this._getMinOrMax(dateObj.value, this.props.max, 'day')

    // options
    dateObj.year.options = this._getYears(dateObj.year.min, dateObj.year.max)
    dateObj.month.options = this._getMonths(dateObj)
    dateObj.day.options = this._getDays(dateObj)

    this.setState(dateObj)
  }

  _getMinOrMax = (date, minOrMax, type) => {
    console.log('_getMinOrMax')
    let momentDate
    let value
    if (minOrMax[type] === 'current') {
      momentDate = moment(date, this.props.format)
    } else if (minOrMax[type].indexOf('+') !== -1) {
      momentDate = moment(date, this.props.format).add(Math.abs(minOrMax[type]), type)
    } else if (minOrMax[type].indexOf('-') !== -1) {
      momentDate = moment(date, this.props.format).subtract(Math.abs(minOrMax[type]), type)
    } else {
      value = minOrMax[type]
    }

    if (momentDate) {
      switch (type) {
        case 'year':
          value = momentDate.year()
          break;
        case 'month':
          value = momentDate.month()
          break;
        case 'day':
          value = momentDate.date()
          break;
      }
    }

    console.log(type + ': ' + value)

    return parseInt(value)
  }

  _getYears = (min, max) => {
    let yearOptions = []

    for (var i=min; i<=max; i++) {
      yearOptions.push({value: i.toString()})
    }

    return yearOptions
  }

  _getMonths = (dateObj) => {
    console.log('_getMonths')
    let monthOptions = []
    const checkMin = dateObj.year.value === dateObj.year.min
    const checkMax = dateObj.year.value === dateObj.year.max
    console.log(checkMin)
    console.log(checkMax)
    let start = checkMin ? dateObj.month.min : 0
    let end = checkMax ? dateObj.month.max+1 : 12

    for (var i=start; i<end; i++) {
      monthOptions.push({value: i.toString(), display: moment(i+1, 'MM').format('MMMM')})
    }

    // if selected month is greater than max month, change it to max month
    if (checkMax) {
      if (dateObj.month.value > dateObj.month.max) {
        dateObj.month.value = dateObj.month.max
      }
    }

    // if selected month is lower than min month, change it to min month
    if (checkMin) {
      if (dateObj.month.value < dateObj.month.min) {
        dateObj.month.value = dateObj.month.min
      }
    }

    return monthOptions
  }

  _getDays = (dateObj) => {
    console.log('_getDays')
    let dayOptions = []
    console.log(dateObj.month.value)
    console.log(dateObj.month.min)
    console.log(dateObj.month.max)
    const checkMin = dateObj.year.value === dateObj.year.min && dateObj.month.value === dateObj.month.min
    const checkMax = dateObj.year.value === dateObj.year.max && dateObj.month.value === dateObj.month.max
    console.log(checkMin)
    console.log(checkMax)
    console.log(dateObj.value)
    console.log(dateObj.month.value)
    console.log(dateObj.year.value+'-'+(dateObj.month.value+1))
    const daysInMonth = moment(dateObj.year.value+'-'+(dateObj.month.value+1), 'YYYY-M').daysInMonth()

    let start = checkMin ? dateObj.day.min : 1
    let end = checkMax ? dateObj.day.max : daysInMonth
    console.log('_getDays: ' + start + ' / ' + end)
    for (var i=start; i<=end; i++) {
      dayOptions.push({value: i.toString()})
    }

    // if selected day is greater than max day in a month, change it to max day in a month
    if (dateObj.day.value > daysInMonth) {
      dateObj.day.value = daysInMonth
    }

    // if selected day is greater than max day, change it to max day
    if (checkMax) {
      if (dateObj.day.value > dateObj.day.max) {
        dateObj.day.value = dateObj.day.max
      }
    }

    // if selected day is lower than min day, change it to min day
    if (checkMin) {
      if (dateObj.day.value < dateObj.day.min) {
        dateObj.day.value = dateObj.day.min
      }
    }

    dateObj.value = this._getValue(dateObj)

    return dayOptions
  }

  _getValue = (state) => {
    return moment().year(state.year.value).month(state.month.value).date(state.day.value).format(this.props.format)
  }

  handleChangeYear = (event) => {
    console.log('handleChangeYear')
    let state = this.state
    console.log(state)
    state.year.value = parseInt(event.target.value)
    console.log(state.year.value)
    state.value = this._getValue(state)

    state.month.options = this._getMonths(state)
    state.day.options = this._getDays(state)
    console.log(state.month.options)
    this.setState({
      year: state.year,
      month: state.month,
      day: state.day,
      value: state.value
    })
  }

  handleChangeMonth = (event) => {
    console.log('handleChangeMonth')
    console.log(event.target.value)
    let state = this.state
    state.month.value = parseInt(event.target.value)
    state.value = this._getValue(state)
    state.day.options = this._getDays(state)
    console.log(state.month.options)
    this.setState({
      month: state.month,
      day: state.day,
      value: state.value
    })
  }

  handleChangeDay = (event) => {
    let state = this.state
    state.day.value = parseInt(event.target.value)
    state.value = this._getValue(state)
    this.setState({
      day: state.day,
      value: state.value
    })
  }

  componentWillMount = () => {
    console.log('componentWillMount')
    this._initDate(this.props.value, this.props.format)
  }

  render() {
    const cx = classNames.bind(style)
    const componentClass = cx(style['datepicker-component'], this.props.optClass)

    return (
      <div className={componentClass}>
        <SelectField
          options={this.state.month.options}
          valueProp='value'
          displayProp='display'
          value={this.state.month.value.toString()}
          changeCallback={this.handleChangeMonth}
        />
        <SelectField
          options={this.state.day.options}
          valueProp='value'
          displayProp='value'
          value={this.state.day.value.toString()}
          changeCallback={this.handleChangeDay}
        />
        <SelectField
          options={this.state.year.options}
          valueProp='value'
          displayProp='value'
          value={this.state.year.value.toString()}
          changeCallback={this.handleChangeYear}
        />
      </div>
    )
  }
}

export default DatePicker