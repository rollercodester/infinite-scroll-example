import classes from './styles.module.css';

export function InfiniteScrollExample() {
  return (
    <div className={classes.rootContainer}>
      <h2>Infinite Scroll Example</h2>
      <div className={classes.toolbar}>
        <button>Reset</button>
        <button>Disable/Enable Infinite Scroll</button>
      </div>
      <div className={classes.resultFeedback}>TODO: Result feedback goes here</div>
      <div className={classes.scrollContainer}>
        <ul>
          <li>TODO: Results go here</li>
        </ul>
      </div>
      <div className={classes.progressFeedback}>TODO: Progress feedback goes here</div>
    </div>
  );
}
