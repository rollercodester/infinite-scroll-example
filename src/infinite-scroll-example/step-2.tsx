import { useEffect } from 'react';
import { useCallEndpoint } from '@spa-tools/api-client';
import classes from './styles.module.css';

export function InfiniteScrollExample() {
  // useCallEndpoint is a React hook from the @spa-tools/api-client package
  // that we will use to cumulatively fetch recipes
  const [getRecipes, recipesResult, isRecipesCallPending, clearRecipes] = useCallEndpoint<Recipe[]>(
    'https://dummyjson.com/recipes',
    {
      // we only want to retrieve 10 records at a time
      requestOptions: { recordLimit: 10 },
      // the JSON result that we want is nested under the 'recipes' key
      serverModelOptions: { jsonDataDotPath: 'recipes' },
    },
    // we want to append new results to previous results to make data cumulative
    true
  );

  // let's create a couple of variables to keep track of recipe metrics
  const count = recipesResult?.data?.length ?? -1;
  const total = recipesResult?.total ?? 0;

  // let's setup a useEffect hook to fetch an initial batch of recipes
  useEffect(() => {
    if (!isRecipesCallPending && !recipesResult) {
      getRecipes();
    }
  }, [getRecipes, isRecipesCallPending, recipesResult]);

  return (
    <div className={classes.rootContainer}>
      <h2>Infinite Scroll Example</h2>
      <div className={classes.toolbar}>
        {/* let's use the clearRecipes method as our reset handler */}
        <button onClick={clearRecipes}>Reset</button>
        <button>Disable/Enable Infinite Scroll</button>
      </div>
      <div className={classes.resultFeedback}>
        {/* let's display some feedback about the recipes we've retrieved */}
        {count && total ? `${count === total ? `All ${count}` : `${count} of ${total}`} recipes retrieved!` : ''}
        {count && total && count < total ? ' (scroll recipe list to load more)' : ''}
      </div>
      <div className={classes.scrollContainer}>
        <ul>
          {/* let's display the recipes we've retrieved */}
          {recipesResult?.data?.map((recipe) => (
            <li key={recipe.id}>{`${recipe.name} (${recipe.difficulty})`}</li>
          ))}
        </ul>
      </div>
      {/* let's display loading feedback while we're fetching recipes */}
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
