import AnalyticSignal from '../module/analytic-signal';

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    this.analyticSignal = new AnalyticSignal({
      elm: document.querySelector('.analytic-signal'),
      width: 375,
      height: 375,
    });

    console.log(this.analyticSignal);
  }
}