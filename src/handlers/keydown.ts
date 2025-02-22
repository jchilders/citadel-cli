import type sinon from 'sinon';
import type { CitadelConfig } from '../CitadelCli.js';

export interface ViewState {
  isVisible: boolean;
  setVisible: (visible: boolean) => void;
  toggleVisibilityHandler: () => void;
}

export interface TestViewState {
  isVisible: boolean;
  setVisible: sinon.SinonStub;
  toggleVisibilityHandler: sinon.SinonStub;
}

export interface ViewTransitionAPI {
  startViewTransition?: (callback: () => void) => { finished: Promise<void> };
}

export async function handleKeydown(
  event: KeyboardEvent,
  config: CitadelConfig,
  viewState: ViewState,
  viewTransitionAPI: ViewTransitionAPI = document,
) {
  const { isVisible, setVisible, toggleVisibilityHandler: toggleVisibilityClasses } = viewState;

  if (!isVisible && event.key === config.activationKey) {
    if (viewTransitionAPI.startViewTransition) {
      await viewTransitionAPI.startViewTransition(() => {
        setVisible(true);
        toggleVisibilityClasses();
      }).finished;
    } else {
      setVisible(true);
      toggleVisibilityClasses();
    }
  } else if (isVisible && event.key === config.deactivationKey) {
    if (viewTransitionAPI.startViewTransition) {
      await viewTransitionAPI.startViewTransition(() => {
        setVisible(false);
        toggleVisibilityClasses();
      }).finished;
    } else {
      setVisible(false);
      toggleVisibilityClasses();
    }
  }
}
