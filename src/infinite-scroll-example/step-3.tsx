import { useEffect, useRef } from 'react';
import { useCallEndpoint } from '@spa-tools/api-client';
import classes from './styles.module.css';

export function InfiniteScrollExample() {
  // let's create a ref for our scroll target
  const scrollTargetRef = useRef<HTMLDivElement>(null);
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

  useEffect(() => {
    if (!isRecipesCallPending && !recipesResult) {
      getRecipes();
    }
  }, [getRecipes, isRecipesCallPending, recipesResult]);

  return (
    <div className={classes.rootContainer}>
      <h2>Infinite Scroll Example</h2>
      <div className={classes.toolbar}>
        <button onClick={clearRecipes}>Reset</button>
        <button>Disable/Enable Infinite Scroll</button>
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
        {/* let's add a scroll target to the end of our list */}
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
