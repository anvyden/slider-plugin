import '../src/app.ts';
import DemoBlock from './components/demo-block/Demo-block';
import './demo-page.scss';

// ------------------------------- singleSLider -------------------------------------------

const demoBlock1 = <HTMLDivElement>(
  document.querySelector('[data-id="demoBlock1"]')
);
const $slider1 = $('#slider1');
$slider1.sliderPlugin({
  isRange: false,
});

new DemoBlock(demoBlock1, $slider1);

// ------------------------------- rangeSLider -------------------------------------------

const demoBlock2 = <HTMLDivElement>(
  document.querySelector('[data-id="demoBlock2"]')
);
const $slider2 = $('#slider2');
$slider2.sliderPlugin({
  max: 200,
  min: -200,
  step: 20,
  from: -100,
  to: 120,
  isRange: true,
  orientation: 'vertical',
  color: 'purple',
  hasTooltips: true,
  hasProgressBar: true,
  labels: {
    addLabels: true,
    countOfLabels: 6,
  },
});

new DemoBlock(demoBlock2, $slider2);
