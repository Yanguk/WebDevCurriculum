/* eslint-disable @typescript-eslint/no-empty-function */
import { go, Option, pipe } from 'uk-fp';

type ReactType = ReturnType<typeof simpleReact>;

export default function simpleReact() {
  const _states: any[] = [];
  let _stateIdx = 0;

  let rootEl: Element;
  let component: () => string;
  let _render = () => {};

  const _mountAfterFns: ((a: typeof _selector) => void)[] = [];

  function _selector(className: string) {
    return Option.wrap(rootEl.querySelector(`.${className}`)).expect('존재하지 않는 Dom 접근');
  }

  function _runMountAfter() {
    this._mountAfterFns.forEach(_selector);
  }

  function useState<T>(initialState: T): [T, typeof setState] {
    const state = _states[_stateIdx] || initialState;
    const curIdx = _stateIdx;

    const setState = (newState: T): void => {
      _states[curIdx] = newState;

      _render();
    };

    _stateIdx++;

    return [state, setState];
  }

  _render = () => {
    _stateIdx = 0;

    rootEl.innerHTML = component();

    _mountAfterFns();
  };

  function makeComponent(a) {
    component = a;

    const belongTo = (parent: ReactType) => {
      parent.combine(a);

      return;
    };

    return {
      render: (root: Element) => {
        rootEl = root;

        _render();
      },

      belongTo,
    };
  }

  function afterRender(f: (a: typeof selector) => void) {
    _mountAfterFns = pipe(_mountAfterFns, f);
  }

  interface Combine {
    _states: any[];
    _mountAfter: () => void;
  }

  function combine(childReact: Combine) {}

  function _getRoot() {
    return rootEl;
  }

  function _getRender() {
    return _render;
  }

  return {
    _render,
    useState,
    afterRender,
    makeComponent,
    combine,
    _getRoot,
    _getRender,
  };
}
