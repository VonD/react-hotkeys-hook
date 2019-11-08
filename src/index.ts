import hotkeys, {HotkeysEvent} from 'hotkeys-js';
import {useCallback, useEffect} from "react";

type CallbackFn = (event: KeyboardEvent, handler: HotkeysEvent) => void;

export function useHotkeys(keys: string, callback: CallbackFn, deps: any[] = []) {
  const memoisedCallback = useCallback(callback, deps);

  useEffect(() => {
    hotkeys(keys, memoisedCallback);

    hotkeys.filter = function filter(event) {
  const target = event.target || event.srcElement;
  const { tagName } = target;
  let flag = true;
  // ignore: isContentEditable === 'true', <input> and <textarea> when readOnly state is false, <select>
  if (
    target.isContentEditable ||
    tagName === 'TEXTAREA'
  ) {
    flag = false;
  }
  return flag;
}

    return () => hotkeys.unbind(keys, memoisedCallback);
  }, [memoisedCallback]);
}
