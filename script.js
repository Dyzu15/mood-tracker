let selectedMood = null;

document.querySelectorAll('.mood-btn').forEach(button => {
  button.addEventListener('click', () => {
    selectedMood = button.dataset.mood;
    document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));
    button.classList.add('selected');
  });
});

document.getElementById('saveBtn').addEventListener('click', () => {
  const journalText = document.getElementById('journal').value;
  const today = new Date().toLocaleDateString();

  if (!selectedMood || !journalText.trim()) {
    alert("Please select a mood and write something.");
    return;
  }

  const entry = {
    mood: selectedMood,
    text: journalText,
    date: today
  };

  let entries = JSON.parse(localStorage.getItem('moodEntries')) || [];
  entries.unshift(entry); // newest first
  localStorage.setItem('moodEntries', JSON.stringify(entries));

  document.getElementById('journal').value = '';
  selectedMood = null;
  document.querySelectorAll('.mood-btn').forEach(btn => btn.classList.remove('selected'));

  renderEntries();
});

function renderEntries() {
  const container = document.getElementById('entries');
  container.innerHTML = '';
  const entries = JSON.parse(localStorage.getItem('moodEntries')) || [];

  entries.forEach(entry => {
    const div = document.createElement('div');
    div.className = 'entry';
    div.innerHTML = `<strong>${entry.date}</strong> - ${emojiForMood(entry.mood)}<br>${entry.text}`;
    container.appendChild(div);
  });
}

function emojiForMood(mood) {
  const map = {
    happy: '😄',
    neutral: '😐',
    sad: '😢',
    angry: '😠',
    tired: '😴'
  };
  return map[mood] || '';
}

// Load entries on page load
renderEntries();
