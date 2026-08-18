// Lógica da Calculadora na Landing Page
const carTypeSelect = document.getElementById('car-type');
const serviceCheckboxes = document.querySelectorAll('.service');
const totalPriceElement = document.getElementById('total-price');
const whatsappBtn = document.getElementById('whatsapp-btn');

function calculateTotal() {
  let baseTotal = 0;
  serviceCheckboxes.forEach(checkbox => {
    if (checkbox.checked) {
      baseTotal += parseFloat(checkbox.value);
    }
  });

  const carMultiplier = parseFloat(carTypeSelect.value);
  const finalTotal = baseTotal * carMultiplier;

  totalPriceElement.textContent = finalTotal.toLocaleString('pt-BR', {
    style: 'currency',
    currency: 'BRL'
  });

  return finalTotal;
}

if (carTypeSelect) {
  carTypeSelect.addEventListener('change', calculateTotal);
  serviceCheckboxes.forEach(cb => cb.addEventListener('change', calculateTotal));

  whatsappBtn.addEventListener('click', () => {
    const total = calculateTotal();
    if (total === 0) {
      alert('Por favor, selecione ao menos um serviço.');
      return;
    }

    const selectedCarName = carTypeSelect.options[carTypeSelect.selectedIndex].text;
    const selectedServices = [];
    serviceCheckboxes.forEach(cb => {
      if (cb.checked) {
        selectedServices.push(cb.parentElement.textContent.trim());
      }
    });

    const message = `Olá! Gostaria de agendar um serviço:%0A` +
      `🚗 *Veículo:* ${selectedCarName}%0A` +
      `🛠️ *Serviços:* %0A- ${selectedServices.join('%0A- ')}%0A%0A` +
      `💰 *Valor Estimado:* ${totalPriceElement.textContent}`;

    window.open(`https://wa.me/5511999999999?text=${message}`, '_blank');
  });
}