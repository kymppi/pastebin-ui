import { useEffect, useState } from 'preact/hooks';
import { searchService } from '../data/search.state';

const SearchBar = (props) => {
  const [state, setState] = useState(searchService.getSnapshot());

  useEffect(() => {
    return searchService.subscribe((state) => {
      if (state.changed) {
        setState(state);
      }
    }).unsubscribe;
  }, []);

  return (
    <div className="form-control">
      <form
        className="input-group"
        onSubmit={(e) => {
          e.preventDefault();
          searchService.send('SEARCH');
        }}
      >
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered"
          value={state.context.query}
          onInput={(e) => {
            if (state.value === 'results') searchService.send('START_TYPING');

            searchService.send('INSERT_CHAR', { value: e.target.value });
          }}
          onClick={() => searchService.send('START_TYPING')}
        />
        <button
          className="btn btn-square btn-accent"
          type="submit"
          disabled={state.value === 'searching'}
        >
          {state.value === 'searching' ? props.loading : props.search}
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
