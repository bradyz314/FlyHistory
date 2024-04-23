
//Price buttons
const priceFilterDiv = document.getElementById('price-filter');
const showPriceFilterButton = document.getElementById('show-price-filter');
const priceSlider = document.getElementById('price-slider');
const priceValue = document.getElementById('price-value');

//Stops button
const stopsFilterDiv = document.getElementById('stops-filter');
const showStopsFilterButton = document.getElementById('show-stops-filter');
const stopsSlider = document.getElementById('stops-slider');
const stopsValue = document.getElementById('stops-value');


//Price Functions
function updatePriceValue() {
    priceValue.textContent = `${priceSlider.value}`;
}

showPriceFilterButton.addEventListener('click', () => {
    priceFilterDiv.style.display = priceFilterDiv.style.display === 'none' ? 'block' : 'none';
});

priceSlider.addEventListener('input', updatePriceValue);

priceSlider.addEventListener('input', () => {
    updatePriceValue();
    renderFlights(priceSlider.value, stopsSlider.value); // Re-render flights when slider value changes
});

priceSlider.addEventListener('change', () => {
    renderFlights(priceSlider.value, stopsSlider.value); // Re-render flights when slider input is finished (for better performance)
});

updatePriceValue(); 

//Stops Functions
function updateStopsValue() {
    stopsValue.textContent = `${stopsSlider.value}`;
}

showStopsFilterButton.addEventListener('click', () => {
    stopsFilterDiv.style.display = stopsFilterDiv.style.display === 'none' ? 'block' : 'none';
});

stopsSlider.addEventListener('input', updateStopsValue);

stopsSlider.addEventListener('input', () => {
    updateStopsValue();
    renderFlights(priceSlider.value, stopsSlider.value); // Re-render flights when slider value changes
});

stopsSlider.addEventListener('change', () => {
    renderFlights(priceSlider.value, stopsSlider.value); // Re-render flights when slider input is finished (for better performance)
});



updateStopsValue(); 

const sortSelect = document.getElementById('sort-select');
sortSelect.addEventListener('change', () => updateOrder(priceSlider.value, stopsSlider.value, sortSelect.value));
