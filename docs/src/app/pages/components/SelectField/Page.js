import React from 'react'
import PropsList from 'private/modules/PropsList';
import docs from '!!docgen!react-conventions/lib/SelectField/SelectField'
import CodeExample from 'private/modules/CodeExample'
import ExampleSelectFieldDefault from './ExampleSelectFieldDefault'
import exampleSelectFieldDefaultCode from '!raw!./ExampleSelectFieldDefault'
import ExampleSelectFieldPlaceholder from './ExampleSelectFieldPlaceholder'
import exampleSelectFieldPlaceholderCode from '!raw!./ExampleSelectFieldPlaceholder'
import ExampleSelectFieldDisabled from './ExampleSelectFieldDisabled'
import exampleSelectFieldDisabledCode from '!raw!./ExampleSelectFieldDisabled'
import ExampleSelectFieldError from './ExampleSelectFieldError'
import exampleSelectFieldErrorCode from '!raw!./ExampleSelectFieldError'
import ExampleSelectFieldSelected from './ExampleSelectFieldSelected'
import exampleSelectFieldSelectedCode from '!raw!./ExampleSelectFieldSelected'
import ExampleSelectFieldCallback from './ExampleSelectFieldCallback'
import exampleSelectFieldCallbackCode from '!raw!./ExampleSelectFieldCallback'
import styles from 'private/css/content'

const description = {
  selectFieldDefault: 'This is the `select field component` as it appears by default.',
  selectFieldPlaceholder: 'This is the `select field component` with a placeholder.',
  selectFieldDisabled: 'This is the disabled `select field component`.',
  selectFieldError: 'This is the `select field component` with an error.',
  selectFieldSelected: 'This is the `select field component` with a default option selected.',
  selectFieldCallback: 'This is the `select field component` with a callback function. __Note__: the `style import` and `code` tag is for display purposes only.'
};

const SelectFieldPage = () => (
  <div>
    <div className={styles.content}>
      <div className={styles.block}>
        <h3>Examples</h3>
          <CodeExample
            title='Default Select Field'
            description={description.selectFieldDefault}
            markup={exampleSelectFieldDefaultCode}>
            <ExampleSelectFieldDefault />
          </CodeExample>
          <CodeExample
            title='Select Field with Placeholder'
            description={description.selectFieldPlaceholder}
            markup={exampleSelectFieldPlaceholderCode}>
            <ExampleSelectFieldPlaceholder />
          </CodeExample>
          <CodeExample
            title='Disabled Select Field'
            description={description.selectFieldDisabled}
            markup={exampleSelectFieldDisabledCode}>
            <ExampleSelectFieldDisabled />
          </CodeExample>
          <CodeExample
            title='Error Select Field'
            description={description.selectFieldError}
            markup={exampleSelectFieldErrorCode}>
            <ExampleSelectFieldError />
          </CodeExample>
          <CodeExample
            title='Select Field with Default Option Selected'
            description={description.selectFieldSelected}
            markup={exampleSelectFieldSelectedCode}>
            <ExampleSelectFieldSelected />
          </CodeExample>
          <CodeExample
            title='Select Field with Callback'
            description={description.selectFieldCallback}
            markup={exampleSelectFieldCallbackCode}>
            <ExampleSelectFieldCallback />
          </CodeExample>
          <div className={styles.block}>
            <h3>Props</h3>
            <PropsList list={docs[0].props} />
          </div>
      </div>
    </div>
  </div>
)

export default SelectFieldPage