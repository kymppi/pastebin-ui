import { inspect } from '@xstate/inspect';
import { assign, createMachine, interpret } from 'xstate';

export const searchMachine = createMachine(
  {
    /** @xstate-layout N4IgpgJg5mDOIC5QAoC2BDAxgCwJYDswBKAOgBcBPABwKgGIBlAUQEEAlAYQAkBtABgC6iUFQD2sXGVyj8wkAA9EARgBsJACwAmABzaA7NoDM2gJwnDh9SoA0IConUWSew3xNWArJZNL1HjwC+AbZoWHiEpJQ0+FAkAE5g+BBgcXQAkgByzGwAKgD63Oz8QkggYhJSMnKKCHqatvYIqnwk2nx8ltoq6nx6WgZBIRg4BMTxcACuADZksIw57Pk5AJoACpkA4sVy5ZLSsqU1riYkJnzq5iYefDp9hg2IbRpXekq+PYZ63YMgoSMRJFgYHQcX+9GY7G4eQAIgB5DJMbalXaVA6gGqqdQkfweTQeFy9TR+bT1OyIFRKTTYpR8JQmbS+QxXQyBH74UTJeClP7hYg7cR7KqHRAAWkMSmxr0pqhpfBUKg86geCBFvhISnx9LaeLqbRuPx5o0i1Fo-Iq+2qiCJypcJEMmjeBhx5i6egNw15xuisQSSRSZsFaIUiBMVMM3U1538mk0Jj0yodak0KmMKaJ6jenndYSNgOBoPCUADqMtTSese0Hl0FxM8osyouEp0ycVDppVyU2f+YwSsGms2LFuFCAsWP8Fj0N183Un9zJCA8Sm0JBjtZp-m6DpMQSCQA */
    initial: 'typing',
    context: {
      query: '',
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
          SEARCH_DONE: 'results',
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
        query: (ctx, e) => e.value,
      }),
      search: async (ctx) => {
        // do some search
        console.log('searching for', ctx.query);
        await new Promise((r) => setTimeout(r, 1000));

        searchService.send('SEARCH_DONE');
      },
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
