"use strict";
import { deepFreeze } from '../../deep-freeze';
import { querySelectorAll } from '../../extend-query-selector-all';
import { currentScript } from '../current-script';

describe('currentScript', () => {
  let originalCurrentScript: PropertyDescriptor | undefined;

  beforeAll(() => {
    originalCurrentScript = Object.getOwnPropertyDescriptor(document, 'currentScript');
  });

  afterAll(() => {
    if (originalCurrentScript) {
      Object.defineProperty(document, 'currentScript', originalCurrentScript);
    }
  });

  beforeEach(() => {
    document.head.innerHTML = '';
    currentScript();
    querySelectorAll();
    jest.useFakeTimers();
  });

  afterEach(() => {
    jest.useRealTimers();
  });

  it('currentScript should return the executing script', () => {
    currentScript();
    const initialScript = document.createElement('script');
    initialScript.textContent = 'console.log("initial script is the current script running")';
    document.head.appendChild(initialScript);

    jest.advanceTimersByTime(0);
    expect(document.currentScript).toBe(initialScript);

    const additionalScript = document.createElement('script');
    additionalScript.textContent = 'console.log("additional script is the current script running")';
    document.head.appendChild(additionalScript);

    jest.advanceTimersByTime(0);

    additionalScript.onload?.(new Event('load'));
    expect(document.currentScript).toBe(additionalScript);
  });

  it('scripts array should be deeply frozen', () => {
    const script1 = document.createElement('script');
    script1.textContent = 'console.log("Script 1 executed")';
    document.head.appendChild(script1);

    const scripts = (document.querySelectorAll('script')).map((script) => deepFreeze(script));
    const immutableScripts = deepFreeze(scripts);

    const originalScript = immutableScripts[0].textContent;

    expect(() => {
      (immutableScripts[0] as any).textContent = 'console.log("Script 1 modified")';
    }).toThrow();

    expect(immutableScripts[0].textContent).toBe(originalScript);
    expect(() => {
      (immutableScripts as any).push(document.createElement('script'));
    }).toThrow();
  });

});