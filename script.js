// Doctor data
const doctors = [
    {
        id: 1,
        name: "Dr. Emily Carter",
        specialty: "Cardiology",
        availability: ["Monday", "Wednesday", "Friday"]
    },
    {
        id: 2,
        name: "Dr. Michael Rodriguez",
        specialty: "Pediatrics",
        availability: ["Tuesday", "Thursday", "Saturday"]
    },
    {
        id: 3,
        name: "Dr. Sarah Thompson",
        specialty: "Dermatology",
        availability: ["Monday", "Wednesday", "Saturday"]
    }
];

// Populate doctors list
function populateDoctorsList() {
    const doctorsList = document.getElementById('doctors-list');
    const doctorSelect = document.getElementById('doctor-select');

    doctors.forEach(doctor => {
        // Doctor card in list
        const doctorCard = document.createElement('div');
        doctorCard.classList.add('doctor-card', 'p-4', 'border', 'rounded-md', 'flex', 'justify-between', 'items-center');
        doctorCard.innerHTML = `
            <div>
                <h3 class="font-semibold">${doctor.name}</h3>
                <p class="text-gray-600">${doctor.specialty}</p>
            </div>
            <span class="text-green-500">Available</span>
        `;
        doctorsList.appendChild(doctorCard);

        // Doctor option in select
        const option = document.createElement('option');
        option.value = doctor.id;
        option.textContent = `${doctor.name} - ${doctor.specialty}`;
        doctorSelect.appendChild(option);
    });
}

// Handle appointment booking
function handleAppointmentBooking(event) {
    event.preventDefault();
    
    const doctorId = document.getElementById('doctor-select').value;
    const appointmentDate = document.getElementById('appointment-date').value;
    const appointmentTime = document.getElementById('appointment-time').value;

    if (!doctorId || !appointmentDate || !appointmentTime) {
        alert('Please fill in all fields');
        return;
    }

    const selectedDoctor = doctors.find(doc => doc.id === parseInt(doctorId));

    alert(`Appointment Booked Successfully!\n
Doctor: ${selectedDoctor.name}
Date: ${appointmentDate}
Time: ${appointmentTime}`);

    // Reset form
    event.target.reset();
}

// Initialize page
document.addEventListener('DOMContentLoaded', () => {
    populateDoctorsList();
    
    const appointmentForm = document.getElementById('appointment-form');
    appointmentForm.addEventListener('submit', handleAppointmentBooking);
});
