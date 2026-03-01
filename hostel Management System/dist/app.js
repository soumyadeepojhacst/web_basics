import { hostelService } from "./services/hostelService.js";
const service = new hostelService();
// Elements
const searchInput = document.getElementById("searchInput");
const searchMessage = document.getElementById("searchMessage");
const form = document.getElementById("residentForm");
const tableBody = document.getElementById("residentTableBody");
const residentIdInput = document.getElementById("residentId");
const formTitle = document.getElementById("formTitle");
const cancelEditBtn = document.getElementById("cancelEdit");
// Render Residents
function renderResidents(filteredResidents = service.getResidents, query = "") {
    tableBody.innerHTML = "";
    searchMessage.textContent = "";
    if (service.getResidents.length === 0) {
        searchMessage.textContent = "Resident list is empty";
        return;
    }
    if (filteredResidents.length === 0) {
        searchMessage.textContent = "Nothing matched";
        return;
    }
    filteredResidents.forEach((resident) => {
        const row = document.createElement("tr");
        row.innerHTML = `
            <td>${highlightText(resident.name, query)}</td>
            <td>${highlightText(resident.age.toString(), query)}</td>
            <td>${highlightText(resident.phone, query)}</td>
            <td>${highlightText(resident.roomNumber.toString(), query)}</td>
            <td>${highlightText(resident.checkIndate, query)}</td>
            <td>
                <button class="editBtn" data-id="${resident.id}">Edit</button>
                <button class="deleteBtn" data-id="${resident.id}">Delete</button>
            </td>
        `;
        tableBody.appendChild(row);
    });
}
//serach eventListner
searchInput.addEventListener("input", () => {
    const query = searchInput.value.trim().toLowerCase();
    const filtered = service.getResidents.filter(resident => resident.name.toLowerCase().includes(query) ||
        resident.age.toString().includes(query) ||
        resident.phone.includes(query) ||
        resident.roomNumber.toString().includes(query) ||
        resident.checkIndate.includes(query));
    renderResidents(filtered, query);
});
// Handle Form Submit (Add + Edit)
form.addEventListener("submit", (e) => {
    e.preventDefault();
    const id = residentIdInput.value;
    const name = document.getElementById("name").value;
    const age = Number(document.getElementById("age").value);
    const phone = document.getElementById("phone").value;
    const roomNumber = Number(document.getElementById("roomNumber").value);
    const checkInDate = document.getElementById("checkInDate").value;
    try {
        if (id) {
            // Update
            service.updateResident(id, { name, age, phone, roomNumber, checkIndate: checkInDate });
            formTitle.textContent = "Add Resident";
            cancelEditBtn.style.display = "none";
        }
        else {
            // Add
            service.addResident(name, age, phone, roomNumber, checkInDate);
        }
        form.reset();
        residentIdInput.value = "";
        renderResidents();
        populateRoomDropdown();
    }
    catch (error) {
        alert(error.message);
    }
});
// Table Click (Edit / Delete)
tableBody.addEventListener("click", (e) => {
    const target = e.target;
    const id = target.getAttribute("data-id");
    if (!id)
        return;
    // Delete
    if (target.classList.contains("deleteBtn")) {
        if (confirm("Are you sure you want to delete?")) {
            service.removeResident(id);
            renderResidents();
            populateRoomDropdown();
        }
    }
    // Edit
    if (target.classList.contains("editBtn")) {
        const resident = service.getResidents.find(r => r.id === id);
        if (!resident)
            return;
        residentIdInput.value = resident.id;
        document.getElementById("name").value = resident.name;
        document.getElementById("age").value = resident.age.toString();
        document.getElementById("phone").value = resident.phone;
        populateRoomDropdown(resident.roomNumber);
        document.getElementById("checkInDate").value = resident.checkIndate;
        formTitle.textContent = "Edit Resident";
        cancelEditBtn.style.display = "inline";
    }
});
function populateRoomDropdown(selectedRoom) {
    const roomSelect = document.getElementById("roomNumber");
    roomSelect.innerHTML = `<option value="">Select Room</option>`;
    const vacantRooms = service.getVaccentRooms();
    vacantRooms.forEach(room => {
        const option = document.createElement("option");
        option.value = room.roomNumber.toString();
        option.textContent = `Room ${room.roomNumber}`;
        roomSelect.appendChild(option);
    });
    // 🔥 If editing, also show currently assigned room
    if (selectedRoom !== undefined) {
        const option = document.createElement("option");
        option.value = selectedRoom.toString();
        option.textContent = `Room ${selectedRoom}`;
        roomSelect.appendChild(option);
        roomSelect.value = selectedRoom.toString();
    }
}
//highlighted function
function highlightText(text, query) {
    if (!query)
        return text;
    // Escape special characters
    const escapedQuery = query.replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
    const regex = new RegExp(`(${escapedQuery})`, "gi");
    return text.replace(regex, `<span class="highlight">$1</span>`);
}
// Cancel Edit
cancelEditBtn.addEventListener("click", () => {
    // Reset form fields
    form.reset();
    // Clear hidden resident ID
    residentIdInput.value = "";
    // Reset title
    formTitle.textContent = "Add Resident";
});
// Initial Render
renderResidents();
populateRoomDropdown();
