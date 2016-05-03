import React from 'react'
import PropsList from 'private/modules/PropsList'
import docs from '!!docgen!react-conventions/lib/Textarea/Textarea'
import CodeExample from 'private/modules/CodeExample'
import styles from 'private/css/content'
import ExampleTextareaDefault from './ExampleTextareaDefault'
import exampleTextareaDefaultCode from '!raw!./ExampleTextareaDefault'
import ExampleTextareaPlaceholder from './ExampleTextareaPlaceholder'
import exampleTextareaPlaceholderCode from '!raw!./ExampleTextareaPlaceholder'
import ExampleTextareaLabel from './ExampleTextareaLabel'
import exampleTextareaLabelCode from '!raw!./ExampleTextareaLabel'
import ExampleTextareaDisabled from './ExampleTextareaDisabled'
import exampleTextareaDisabledCode from '!raw!./ExampleTextareaDisabled'
import ExampleTextareaError from './ExampleTextareaError'
import exampleTextareaErrorCode from '!raw!./ExampleTextareaError'
import ExampleTextareaCallback from './ExampleTextareaCallback'
import exampleTextareaCallbackCode from '!raw!./ExampleTextareaCallback'

const description = {
  textareaDefault: 'This is the textarea component as it appears by default.',
  textareaPlaceholder: 'This is the textarea component with placeholder text.',
  textareaLabel: 'This is the textarea component with a label.',
  textareaDisabled: 'This is the disabled textarea component.',
  textareaError: 'This is the textarea component with error.',
  textareaCallback: 'This is the textarea component with a callback function. __Note__: _the `style import` and `code` tag is for display purposes only._'
};

const TextareaPage = () => (
  <div>
    <div className={styles.content}>
      <div className={styles.block}>
        <CodeExample
          title='Default Textarea'
          description={description.textareaDefault}
          markup={exampleTextareaDefaultCode}>
          <ExampleTextareaDefault />
        </CodeExample>
        <CodeExample
          title='Textarea with Placeholder text'
          description={description.textareaPlaceholder}
          markup={exampleTextareaPlaceholderCode}>
          <ExampleTextareaPlaceholder />
        </CodeExample>
        <CodeExample
          title='Textarea with a label'
          description={description.textareaLabel}
          markup={exampleTextareaLabelCode}>
          <ExampleTextareaLabel />
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
        <CodeExample
          title='Textarea with callback function'
          description={description.textareaCallback}
          markup={exampleTextareaCallbackCode}>
          <ExampleTextareaCallback />
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