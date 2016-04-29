import React from 'react'
import ProgressBar from 'react-conventions/lib/ProgressBar'

const ExampleProgressBarDefault = () => (
  <ProgressBar label='This is a label' showPercentage={true} value={10} denominator={50} />
)

export default ExampleProgressBarDefault;