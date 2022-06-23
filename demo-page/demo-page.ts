import '../src/app.ts'
import './demo-page.scss'
import DemoBlock from "./components/demo-block/Demo-block";

const demoBlock1 = <HTMLDivElement>document.querySelector('[data-id="demoBlock1"]')
const slider1 = $('#slider1')
slider1.sliderPlugin({
  isRange: false,
})

new DemoBlock(demoBlock1, slider1)


const demoBlock2 = <HTMLDivElement>document.querySelector('[data-id="demoBlock2"]')
const slider2 = $('#slider2')
slider2.sliderPlugin({
  isRange: true
})

new DemoBlock(demoBlock2, slider2)


// TODO нужно почистить весь плагин от лишних файлов (assets, static и др.)
// Также нужно поудалять комменты, рефактануть все файлы prettier'ом.
