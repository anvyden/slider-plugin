import './app.ts'

$('#slider1').sliderPlugin({
  isRange: true
})
$('#slider1').sliderPlugin('setValue', 'max', 100)
$('#slider1').sliderPlugin('setValue', 'min', -100)
const state = $('#slider1').sliderPlugin('getState')
console.log(state)
