import { expect } from '@open-wc/testing';
import * as sinon from 'sinon';
import {
  handleKeydown, type ViewTransitionAPI, type TestViewState,
} from '../keydown.js';
import { LogLevel } from '../../utils/logger.js';
import type { CitadelConfig } from '../../CitadelCli.js';

const createMockViewState = (isVisible = false): TestViewState => ({
  isVisible,
  setVisible: sinon.stub(),
  toggleVisibilityClasses: sinon.stub(),
});

const defaultConfig: CitadelConfig = {
  activationKey: '.',
  deactivationKey: 'Escape',
  logLevel: LogLevel.WARN,
};

describe('handleKeydown', () => {
  it('shows citadel when activation key is pressed and not visible', async () => {
    const viewState = createMockViewState(false);
    const event = new KeyboardEvent('keydown', { key: '.' });

    await handleKeydown(event, defaultConfig, viewState);

    expect(viewState.setVisible.calledOnceWith(true)).to.be.true;
    expect(viewState.toggleVisibilityClasses.calledOnce).to.be.true;
  });

  it('hides citadel when deactivation key is pressed and visible', async () => {
    const viewState = createMockViewState(true);
    const event = new KeyboardEvent('keydown', { key: 'Escape' });

    await handleKeydown(event, defaultConfig, viewState);

    expect(viewState.setVisible.calledOnceWith(false)).to.be.true;
    expect(viewState.toggleVisibilityClasses.calledOnce).to.be.true;
  });

  it('does nothing when activation key is pressed but already visible', async () => {
    const viewState = createMockViewState(true);
    const event = new KeyboardEvent('keydown', { key: '.' });

    await handleKeydown(event, defaultConfig, viewState);

    expect(viewState.setVisible.notCalled).to.be.true;
    expect(viewState.toggleVisibilityClasses.notCalled).to.be.true;
  });

  it('uses view transitions when available', async () => {
    const viewState = createMockViewState(false);
    const event = new KeyboardEvent('keydown', { key: '.' });
    const startViewTransition = sinon.stub().callsFake((callback) => {
      callback();
      return { finished: Promise.resolve() };
    });
    const viewTransitionAPI: ViewTransitionAPI = { startViewTransition };

    await handleKeydown(event, defaultConfig, viewState, viewTransitionAPI);

    expect(startViewTransition.calledOnce).to.be.true;
    expect(viewState.setVisible.calledOnceWith(true)).to.be.true;
    expect(viewState.toggleVisibilityClasses.calledOnce).to.be.true;
  });
});
