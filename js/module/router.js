import PageCommon from '../page/common.js';
import PageIndex from '../page/index.js';

export default class Router {
  constructor() {
    this.initialize();
  }

  initialize() {
    const $body = $('body');

    this.pageCommon = new PageCommon();

    if ($body.hasClass('page-index')) {
      this.pageIndex = new PageIndex();
    }
  }
}
