import React from 'react'
import PropsList from 'private/modules/PropsList';
import docs from '!!docgen!react-conventions/lib/ActivityFeed/ActivityFeed';
import CodeExample from 'private/modules/CodeExample'
import styles from 'private/css/content'
import ExampleActivityFeed from './ExampleActivityFeed'
import exampleActivityFeedCode from '!raw!./ExampleActivityFeed'

const description = {
  activityFeed: 'This is the `activity feed component`.'
};

const ActivityFeedPage = () => (
  <div>
    <div className={styles.content}>
      <div className={styles.block}>
        <CodeExample
          title='Example Activity Feed'
          description={description.activityFeed}
          markup={exampleActivityFeedCode}>
          <ExampleActivityFeed />
        </CodeExample>
      </div>
      <div className={styles.block}>
        <h3>Props</h3>
        <PropsList list={docs[0].props} />
      </div>
    </div>
  </div>
)

export default ActivityFeedPage