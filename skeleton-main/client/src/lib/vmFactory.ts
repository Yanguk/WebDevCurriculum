/* eslint-disable @typescript-eslint/no-empty-function */
import { Option } from 'uk-fp';
import { customDebounce } from '.';

export const vmFactory = () => {
  const _states: any[] = [];
  let _stateIdx = 0;
  let root: Option<Element> = Option.wrap(null);
  let realRender = () => {};

  let _component = () => '';

  const realRendering = customDebounce(() => {
    realRender();
  }, 50);

  type _mountAfterFn = (a: typeof _selector) => void;
  const _mountAfterFns: _mountAfterFn[] = [];

  function _selector<
    T extends boolean,
    R extends (U extends { all?: infer Z } ? Z : false) extends true
      ? NodeListOf<Element>
      : Element,
    U extends { selector?: string; all?: T },
  >(className: string, option: U = { selector: 'class', all: false } as U): R {
    const selectName = option.selector === 'id' ? `#${className}` : `.${className}`;

    const selectElement = (el: any) =>
      option.all
        ? Option.wrap(el.querySelectorAll(selectName))
        : Option.wrap(el.querySelector(selectName));

    return root.andThen(selectElement).expect('존재하지 않는 Dom 접근');
  }

  function _runMountAfter() {
    _mountAfterFns.forEach((f) => f(_selector));
  }

  function _addMountAfterFn(f: _mountAfterFn) {
    _mountAfterFns.push(f);
  }

  function useState<T>(initialState: T): [T, typeof setState] {
    const state = _states[_stateIdx] ?? initialState;
    const curIdx = _stateIdx;

    const setState = (newState: any): void => {
      _states[curIdx] = newState;

      _render();
    };

    _stateIdx++;

    return [state, setState];
  }

  function _render() {
    if (root.isSome()) {
      realRender = () => {
        _stateIdx = 0;
        _mountAfterFns.length = 0;

        root.unwrap().innerHTML = _component();

        _runMountAfter();
      };

      realRendering();
    }
  }

  function makeComponent(f: () => string) {
    _component = f;

    const createRoot = (el: Element) => {
      root = Option.wrap(el);

      _render();
    };

    return {
      createRoot,
    };
  }

  function useEffect(callback: () => void, depArray: any[]) {
    const oldDeps = Option.wrap(_states[_stateIdx]);

    const hasChangedDeps = oldDeps.isSomeAnd((oldDeps) =>
      depArray.some((dep, i) => !Object.is(dep, oldDeps[i])),
    );

    const hasChanged = oldDeps.isSome() ? hasChangedDeps : true;

    if (hasChanged) {
      callback();
    }

    _states[_stateIdx] = depArray;
    _stateIdx++;
  }

  return {
    useState,
    makeComponent,
    afterRender: _addMountAfterFn,
    useEffect,
  };
};
