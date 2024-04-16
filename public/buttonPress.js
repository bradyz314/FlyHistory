const priceFilterDiv = document.getElementById('price-filter');
const showPriceFilterButton = document.getElementById('show-price-filter');
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');

function updatePriceValue() {
    priceValue.textContent = `$${priceSlider.value}`;
}

showPriceFilterButton.addEventListener('click', () => {
    priceFilterDiv.style.display = priceFilterDiv.style.display === 'none' ? 'block' : 'none';
});

priceSlider.addEventListener('input', updatePriceValue);

priceSlider.addEventListener('input', () => {
    updatePriceValue();
    renderFlightsByPrice(priceSlider.value); // Re-render flights when slider value changes
});

priceSlider.addEventListener('change', () => {
    renderFlightsByPrice(priceSlider.value); // Re-render flights when slider input is finished (for better performance)
});

updatePriceValue(); 

