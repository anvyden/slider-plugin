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

// ------------------------------- singleSLiderWithFloatValues -------------------------------------------

const demoBlock3 = <HTMLDivElement>(
  document.querySelector('[data-id="demoBlock3"]')
);
const $slider3 = $('#slider3');
$slider3.sliderPlugin({
  max: 1.5,
  min: -1.5,
  step: 0.1,
  from: 0,
  to: 1,
  isRange: false,
  orientation: 'horizontal',
  color: 'green',
  hasTooltips: true,
  hasProgressBar: true,
  labels: {
    addLabels: true,
    countOfLabels: 6,
  },
});

new DemoBlock(demoBlock3, $slider3);

// ------------------------------- rangeSLiderWithFloatValues -------------------------------------------

const demoBlock4 = <HTMLDivElement>(
  document.querySelector('[data-id="demoBlock4"]')
);
const $slider4 = $('#slider4');
$slider4.sliderPlugin({
  max: 3.93,
  min: -3.33,
  step: 0.33,
  from: -1.35,
  to: 1.29,
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

new DemoBlock(demoBlock4, $slider4);
