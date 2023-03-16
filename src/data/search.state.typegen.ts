// This file was automatically generated. Edits will be overwritten

export interface Typegen0 {
  '@@xstate/typegen': true;
  internalEvents: {
    'xstate.init': { type: 'xstate.init' };
  };
  invokeSrcNameMap: {};
  missingImplementations: {
    actions: never;
    delays: never;
    guards: never;
    services: never;
  };
  eventsCausingActions: {
    changeQuery: 'INSERT_CHAR';
    saveResults: 'SEARCH_DONE';
    search: 'SEARCH';
  };
  eventsCausingDelays: {};
  eventsCausingGuards: {};
  eventsCausingServices: {};
  matchesStates:
    | 'results'
    | 'searching'
    | 'typing'
    | 'typing.render'
    | { typing?: 'render' };
  tags: never;
}
