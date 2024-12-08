let calculation = getCalculation() || '';

displayCalculation();

function calculateTotal(value){
  calculation += value;
  console.log(calculation);
  displayCalculation();
  saveCalculation();
}

function saveCalculation(){
  localStorage.setItem('calculation', calculation)
}

function getCalculation(){
  return localStorage.getItem('calculation')
}

function removeCalculation(){
  localStorage.removeItem('calculation')
}

function displayCalculation(){
  const displayElement = document.querySelector('.js-display-calculation');
  displayElement.innerHTML = calculation || '0';
}