import ns from '../module/ns';
import AnalyticSignal from '../module/AnalyticSignal';

export default class Index {
  constructor(opts = {}) {
    this.initialize();
  }

  initialize() {
    this.analyticSignal = new AnalyticSignal({
      elm: document.querySelector('.analytic-signal'),
      width: 465,
      height: 465,
    });
  }
}