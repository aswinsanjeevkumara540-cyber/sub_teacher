// Load data from server
async function loadFromServer() {
  const res = await fetch('/data');
  const data = await res.json();

  let container = document.getElementById("output");

  if (!container) {
    console.error("❌ output div not found");
    return;
  }

  let html = "<h3>Students</h3><ul>";
  data.students.forEach(s => {
    html += `<li>${s.name}</li>`;
  });
  html += "</ul>";

  html += "<h3>Teachers</h3><ul>";
  data.teachers.forEach(t => {
    html += `<li>${t.name}</li>`;
  });
  html += "</ul>";

  html += "<h3>Coordinators</h3><ul>";
  data.coordinators.forEach(c => {
    html += `<li>${c.name}</li>`;
  });
  html += "</ul>";

  html += "<h3>Admins</h3><ul>";
  data.admins.forEach(a => {
    html += `<li>${a.name}</li>`;
  });
  html += "</ul>";

  container.innerHTML = html;
}

// Add Student
async function addStudent() {
  let name = prompt("Enter student name:");
  if (!name) return;

  await fetch('/add-student', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  alert("✅ Student added");
  loadFromServer();
}

// Add Teacher
async function addTeacher() {
  let name = prompt("Enter teacher name:");
  if (!name) return;

  await fetch('/add-teacher', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  alert("✅ Teacher added");
  loadFromServer();
}

// Add Coordinator
async function addCoordinator() {
  let name = prompt("Enter coordinator name:");
  if (!name) return;

  await fetch('/add-coordinator', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  alert("✅ Coordinator added");
  loadFromServer();
}

// Add Admin
async function addAdmin() {
  let name = prompt("Enter admin name:");
  if (!name) return;

  await fetch('/add-admin', {
    method: 'POST',
    headers: { 'Content-Type': 'application/json' },
    body: JSON.stringify({ name })
  });

  alert("✅ Admin added");
  loadFromServer();
}

// AUTO LOAD ON PAGE OPEN
window.onload = loadFromServer;