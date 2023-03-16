import { inspect } from '@xstate/inspect';
import { assign, createMachine, interpret } from 'xstate';
import type { Paste } from './paste.api';

export const searchMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBcBPABwKgGIBlAUQEEAlAYQAkBtABgC6iUFQD2sXGVyj8wkAA9EARgBsJACwAmABzaA7NoDM2gJwnDh9SoA0IConUWSew3xNWArJZNL1HjwC+AbZoWHiEpJQ0+FAkAE5g+BBgcXQAkgByzGwAKgD63Oz8QkggYhJSMnKKCHqatvYIqnwk2nx8ltoq6nx6WgZBIRg4BMTxcACuADZksIw57Pk5AJoACpkA4sVy5ZLSsqU1riYkJnzq5iYefDp9hg2IbRpXekq+PYZ63YMgoSMRJFgYHQcX+9GY7G4eQAIgB5DJMbalXaVA6gGqqdQkfweTQeFy9TR+bT1OyIFRKTTYpR8JQmbS+QxXQyBH74UTJeClP7hYg7cR7KqHRAAWkMSmxr0pqhpfBUKg86geCBFvhISnx9LaeLqbRuPx5o0i1Fo-Iq+2qiCJypcJEMmjeBhx5i6egNw15xuisQSSRSZsFaIUiBMVMM3U1538mk0Jj0yodak0KmMKaJ6jenndYSNgOBoPCUADqMtTSese0Hl0FxM8osyouEp0ycVDppVyU2f+YwSsGms2LFuFCAsWP8Fj0N183Un9zJCA8Sm0JBjtZp-m6DpMQSCQA */
    tsTypes: {} as import('./search.state.typegen').Typegen0,
    schema: {
      context: {} as { query: string; results: Paste[] },
      events: {} as
        | { type: 'SEARCH' }
        | { type: 'SEARCH_DONE'; results: Paste[] }
        | { type: 'INSERT_CHAR'; value: string }
        | { type: 'START_TYPING' },
    },
    initial: 'typing',
    context: {
      query: '',
      results: [],
    },
    states: {
      typing: {
        on: {
          SEARCH: {
            target: 'searching',
            actions: 'search',
          },
        },

        states: {
          render: {
            on: {
              INSERT_CHAR: {
                target: 'render',
                internal: true,
                actions: 'changeQuery',
              },
            },
          },
        },

        initial: 'render',
      },

      searching: {
        on: {
          SEARCH_DONE: {
            target: 'results',
            actions: 'saveResults',
          },
        },
      },

      results: {
        on: {
          START_TYPING: 'typing',
        },
      },
    },
  },
  {
    actions: {
      changeQuery: assign({
        query: (_ctx, e) => e.value,
      }),
      search: async (ctx) => {
        console.log('searching for', ctx.query);

        const res = await fetch(`/search?q=${ctx.query}`);
        const data = (await res.json()) as { data: Paste[] };

        console.log('search results', data);

        searchService.send('SEARCH_DONE', { results: data.data });
      },
      saveResults: assign({
        results: (_ctx, e) => e.results,
      }),
    },
  }
);

inspect({
  // options
  // url: 'https://stately.ai/viz?inspect', // (default)
});

export const searchService = interpret(searchMachine, {
  devTools: true,
})
  .onChange((l) => console.log(l))
  .start();
