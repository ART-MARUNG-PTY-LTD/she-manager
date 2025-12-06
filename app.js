// In-memory inspection tasks
let inspections = [];

// Form elements
const form = document.getElementById('inspection-form');
const titleInput = document.getElementById('title');
const typeInput = document.getElementById('type');
const tbody = document.getElementById('inspections-tbody');
const reportsLog = document.getElementById('reports-log');

// Render inspection table
function renderInspections() {
  tbody.innerHTML = '';
  inspections.forEach((insp, index) => {
    const tr = document.createElement('tr');
    tr.innerHTML = `
      <td>${insp.title}</td>
      <td>${insp.type}</td>
      <td>${insp.status}</td>
      <td>
        ${insp.status === 'pending' ? `<button onclick="completeInspection(${index})">Complete</button>` : ''}
      </td>
    `;
    tbody.appendChild(tr);
  });
}

// Complete an inspection
function completeInspection(index) {
  inspections[index].status = 'completed';
  generateReport(inspections[index]);
  renderInspections();
}

// Generate a mock report
function generateReport(task) {
  const report = {
    id: Date.now(),
    title: task.title,
    type: task.type,
    status: task.status,
    timestamp: new Date().toISOString()
  };
  reportsLog.textContent += JSON.stringify(report, null, 2) + '\n';
}

// Handle form submission
form.addEventListener('submit', (e) => {
  e.preventDefault();
  const newTask = {
    title: titleInput.value.trim(),
    type: typeInput.value,
    status: 'pending'
  };
  inspections.push(newTask);
  titleInput.value = '';
  renderInspections();
});

// Initial render
renderInspections();
