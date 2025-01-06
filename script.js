const studySessions = [];

// Add a new session
document.getElementById('addSessionForm').addEventListener('submit', (e) => {
  e.preventDefault();

  const topic = document.getElementById('topic').value;
  const sessionTimeInput = document.getElementById('sessionTime').value;
  const duration = parseInt(document.getElementById('duration').value, 10);

  try {
    const sessionTime = new Date(sessionTimeInput);

    if (!topic || isNaN(duration) || duration <= 0 || isNaN(sessionTime.getTime())) {
      throw new Error("Invalid input. Ensure the topic, date, and positive duration are provided.");
    }

    const session = { topic, sessionTime, duration };
    studySessions.push(session);
    console.log(`Session added: ${topic} at ${sessionTime} for ${duration} minutes.`);
    startCountdown(session);
    document.getElementById('addSessionForm').reset();
  } catch (error) {
    console.error(error.message);
  }
});

// List today's sessions
document.getElementById('listToday').addEventListener('click', () => {
  const sessionList = document.getElementById('sessionList');
  sessionList.innerHTML = '';
  const today = new Date().toISOString().split('T')[0];

  const todaySessions = studySessions.filter(
    session => session.sessionTime.toISOString().split('T')[0] === today
  );

  todaySessions.forEach(session => {
    const listItem = document.createElement('li');
    listItem.textContent = `${session.topic} at ${session.sessionTime.toLocaleString()} for ${session.duration} minutes`;
    sessionList.appendChild(listItem);
  });

  if (todaySessions.length === 0) {
    sessionList.textContent = 'No sessions scheduled for today.';
  }
});

// Session countdown
function startCountdown(session) {
  const delay = session.sessionTime.getTime() - Date.now();
  if (delay > 0) {
    setTimeout(() => {
      console.log(`Session on "${session.topic}" starts now!`);
    }, delay);
  }
}

// Fetch study materials
async function fetchStudyMaterials(topic) {
  const materials = new Promise((resolve, reject) => {
    setTimeout(() => {
      if (topic) {
        resolve(`Materials for "${topic}" fetched successfully.`);
      } else {
        reject("Failed to fetch materials.");
      }
    }, 2000);
  });

  try {
    const result = await materials;
    console.log(result);
    document.getElementById('materials').textContent = result;
  } catch (error) {
    console.error(error);
  }
}

// Fetch study materials on click (Example usage)
document.getElementById('sessionList').addEventListener('click', (e) => {
  const topic = e.target.textContent.split(' at')[0];
  if (topic) {
    fetchStudyMaterials(topic);
  }
});
