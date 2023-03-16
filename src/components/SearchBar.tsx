import { useEffect, useState } from 'preact/hooks';
import { searchService } from '../data/search.state';

const SearchBar = () => {
  const x = searchService;

  const [state, setState] = useState(x.getSnapshot());

  useEffect(() => {
    return x.subscribe((state) => {
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
          x.send('SEARCH');
        }}
      >
        <input
          type="text"
          placeholder="Search…"
          className="input input-bordered"
          value={state.context.query}
          onInput={(e) => x.send('INSERT_CHAR', { value: e.target.value })}
          onClick={() => x.send('START_TYPING')}
        />
        <button
          className="btn btn-square btn-accent"
          type="submit"
          disabled={state.value === 'searching'}
        >
          <svg
            xmlns="http://www.w3.org/2000/svg"
            className="h-6 w-6"
            fill="none"
            viewBox="0 0 24 24"
            stroke="currentColor"
          >
            <path
              strokeLinecap="round"
              strokeLinejoin="round"
              strokeWidth="2"
              d="M21 21l-6-6m2-5a7 7 0 11-14 0 7 7 0 0114 0z"
            />
          </svg>
        </button>
      </form>
    </div>
  );
};

export default SearchBar;
