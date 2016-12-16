import React from 'react'
import { Alert } from 'react-ions/lib/Alerts'
import style from './style.scss'

const ExampleAlertDefault = () => (
  <div>
    <Alert type="success">Success! Lorem ipsum dolor sit amet, sed do tempor labore.</Alert>
    <Alert type="warning">Warning! Lorem ipsum dolor sit amet, sed do tempor labore.</Alert>
    <Alert type="info">Info! Lorem ipsum dolor sit amet, sed do tempor labore.</Alert>
    <Alert type="danger">Danger! Lorem ipsum dolor sit amet, sed do tempor labore.</Alert>
  </div>
)

export default ExampleAlertDefault
