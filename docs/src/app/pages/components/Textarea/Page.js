import React from 'react'
import PropsList from 'private/modules/PropsList'
import docs from '!!docgen!react-conventions/lib/Textarea/Textarea'
import CodeExample from 'private/modules/CodeExample'
import styles from 'private/css/content'
import ExampleTextareaDefault from './ExampleTextareaDefault'
import exampleTextareaDefaultCode from '!raw!./ExampleTextareaDefault'
import ExampleTextareaDisabled from './ExampleTextareaDisabled'
import exampleTextareaDisabledCode from '!raw!./ExampleTextareaDisabled'
import ExampleTextareaError from './ExampleTextareaError'
import exampleTextareaErrorCode from '!raw!./ExampleTextareaError'

const description = {
  textareaDefault: 'This is the `textarea component` as it appears by default.',
  textareaDisabled: 'This is the disabled `textarea component`.',
  textareaError: 'This is the `textarea component` with error.'
};

const TextareaPage = () => (
  <div>
    <div className={styles.content}>
      <div className={styles.block}>
        <h3>Examples</h3>
        <CodeExample
          title='Default Textarea'
          description={description.textareaDefault}
          markup={exampleTextareaDefaultCode}>
          <ExampleTextareaDefault />
        </CodeExample>
        <CodeExample
          title='Disabled Textarea'
          description={description.textareaDisabled}
          markup={exampleTextareaDisabledCode}>
          <ExampleTextareaDisabled />
        </CodeExample>
        <CodeExample
          title='Error Textarea'
          description={description.textareaError}
          markup={exampleTextareaErrorCode}>
          <ExampleTextareaError />
        </CodeExample>
        <div className={styles.block}>
          <h3>Props</h3>
          <PropsList list={docs[0].props} />
        </div>
      </div>
    </div>
  </div>
)

export default TextareaPage