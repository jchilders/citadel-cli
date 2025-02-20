import { html } from 'lit';
import { fixture, expect } from '@open-wc/testing';
import { CitadelCli } from '../src/CitadelCli.js';
import '../src/citadel-cli.js';

describe('CitadelCli', () => {
  it('has a default header "Hey there" and counter 5', async () => {
    const el = await fixture<CitadelCli>(html`<citadel-cli></citadel-cli>`);

    expect(el.header).to.equal('Hey there');
    expect(el.counter).to.equal(5);
  });

  it('increases the counter on button click', async () => {
    const el = await fixture<CitadelCli>(html`<citadel-cli></citadel-cli>`);
    el.shadowRoot!.querySelector('button')!.click();

    expect(el.counter).to.equal(6);
  });

  it('can override the header via attribute', async () => {
    const el = await fixture<CitadelCli>(
      html`<citadel-cli header="attribute header"></citadel-cli>`,
    );

    expect(el.header).to.equal('attribute header');
  });

  it('passes the a11y audit', async () => {
    const el = await fixture<CitadelCli>(html`<citadel-cli></citadel-cli>`);

    await expect(el).shadowDom.to.be.accessible();
  });
});
