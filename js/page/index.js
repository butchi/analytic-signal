import AnalyticSignal from '../module/analytic-signal.js';

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    $("body").on("click", _evt => {
      this.analyticSignal = new AnalyticSignal({
        elm: document.querySelector('.analytic-signal'),
        width: 375,
        height: 375,
      });
    });
  }
}