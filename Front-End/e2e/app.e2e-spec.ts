import { SWEDesignerAppPage } from './app.po';

describe('swedesigner-app App', () => {
  let page: SWEDesignerAppPage;

  beforeEach(() => {
    page = new SWEDesignerAppPage();
  });

  it('should display message saying app works', () => {
    page.navigateTo();
    expect(page.getParagraphText()).toEqual('app works!');
  });
});
