import '../src/app.ts'
import './demo-page.scss'

$('#slider1').sliderPlugin({
  isRange: false
})

$('#slider2').sliderPlugin({
  isRange: true
})


// TODO нужно почистить весь плагин от лишних файлов (assets, static и др.)
// Также нужно поудалять комменты, рефактануть все файлы prettier'ом.
