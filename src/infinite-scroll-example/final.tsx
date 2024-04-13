import { useEffect, useRef, useState } from 'react';
import { useCallEndpoint } from '@spa-tools/api-client';
import { useInfiniteScroll } from '@spa-tools/interaction-hooks';
import classes from './styles.module.css';

export function InfiniteScrollExample() {
  const scrollTargetRef = useRef<HTMLDivElement>(null);
  const [disableScroll, setDisableScroll] = useState(false);
  const isScrolling = useInfiniteScroll(scrollTargetRef, disableScroll);

  const [getRecipes, recipesResult, isRecipesCallPending, clearRecipes] = useCallEndpoint<Recipe[]>(
    'https://dummyjson.com/recipes',
    {
      requestOptions: { recordLimit: 10 },
      serverModelOptions: { jsonDataDotPath: 'recipes' },
    },
    true
  );

  const count = recipesResult?.data?.length ?? -1;
  const total = recipesResult?.total ?? 0;

  const toggleDisableScroll = () => {
    setDisableScroll((prev) => !prev);
  };

  useEffect(() => {
    if ((isScrolling && !isRecipesCallPending && count < total) || (!isRecipesCallPending && !recipesResult)) {
      getRecipes();
    }
  }, [count, getRecipes, isRecipesCallPending, isScrolling, recipesResult, total]);

  return (
    <div className={classes.rootContainer}>
      <h2>Infinite Scroll Example</h2>
      <div className={classes.toolbar}>
        <button onClick={clearRecipes}>Reset</button>
        <button onClick={toggleDisableScroll}>{disableScroll ? 'ENABLE' : 'DISABLE'} Infinite Scroll</button>
      </div>
      <div className={classes.resultFeedback}>
        {count && total ? `${count === total ? `All ${count}` : `${count} of ${total}`} recipes retrieved!` : ''}
        {count && total && count < total ? ' (scroll recipe list to load more)' : ''}
      </div>
      <div className={classes.scrollContainer}>
        <ul>
          {recipesResult?.data?.map((recipe) => (
            <li key={recipe.id}>{`${recipe.name} (${recipe.difficulty})`}</li>
          ))}
        </ul>
        <div className={classes.scrollTarget} ref={scrollTargetRef} />
      </div>
      {isRecipesCallPending && <div className={classes.progressFeedback}>Loading recipes...</div>}
    </div>
  );
}

//
//
// local types
//
//

interface Recipe {
  difficulty: string;
  id: number;
  name: string;
}
