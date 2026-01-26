import React from 'react';

import { render, screen, fireEvent } from '@testing-library/react';
import { perf, wait } from 'react-performance-testing';
import ButtonSubmit from './page'
const { renderCount } = perf(React);
fireEvent.click(screen.getByRole('button', { name: /count/i }));
await wait(() => {
    //expect(renderCount.current.IOComponent.value).toBe(2);
    expect(renderCount.current.ButtonSubmit.value).toBe(2);
  });