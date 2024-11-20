// Dummy data for emergency slots
const emergencySlots = [
  { name: 'Dr. Smith - Dentist', time: '10:00 AM', location: 'New York, NY' },
  { name: 'Dr. Johnson - General Practitioner', time: '10:30 AM', location: 'Brooklyn, NY' },
  { name: 'Dr. Lee - Chiropractor', time: '11:00 AM', location: 'Queens, NY' },
];

// Function to populate emergency slots
const populateSlots = () => {
  const slotsContainer = document.getElementById('slots-container');
  emergencySlots.forEach(slot => {
    const slotCard = document.createElement('div');
    slotCard.classList.add('slot-card');
    slotCard.innerHTML = `
      <h3>${slot.name}</h3>
      <p>${slot.time}</p>
      <p>${slot.location}</p>
    `;
    slotsContainer.appendChild(slotCard);
  });
};

// Call the function to populate the slots
populateSlots();

// Placeholder for AI chat functionality
document.getElementById('ai-chat-box').innerHTML = 'AI Assistant is ready to help!';
