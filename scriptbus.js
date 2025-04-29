const buses = [
  { id: 1, type: "City Bus", location: "Station SNDT", timing: "9:00 AM" },
  { id: 2, type: "Tourist Bus", location: "Station Deccan", timing: "11:00 AM" },
  { id: 3, type: "Intercity Bus", location: "Station NDA", timing: "3:00 PM" }
];

function registerUser() {
  const userName = document.getElementById("userName").value;
  const userContact = document.getElementById("userContact").value;

  if (userName && userContact) {
      alert(`Welcome, ${userName}! You've successfully registered.`);
      document.getElementById("user-registration").style.display = "none";
      document.getElementById("bus-options").style.display = "block";
  } else {
      alert("Please fill out all fields.");
  }
}

function chooseBus() {
  const selectedBusId = parseInt(document.getElementById("busSelect").value);
  const selectedBus = buses.find(bus => bus.id === selectedBusId);

  if (selectedBus) {
      document.getElementById("bus-info").style.display = "block";
      document.getElementById("busLocation").textContent = `Current Location: ${selectedBus.location}`;
      document.getElementById("busTiming").textContent = `Timing: ${selectedBus.timing}`;
  } else {
      alert("Bus not found!");
  }
}
