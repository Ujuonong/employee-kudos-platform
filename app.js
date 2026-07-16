const STORAGE_KEY = "kudos-board-state-v1";
const currentUser = { id: "me", name: "You" };
const recipients = [
  { id: "alex", name: "Alex Chen" },
  { id: "maria", name: "Maria Gomez" },
  { id: "david", name: "David Kim" },
  { id: "sophia", name: "Sophia Patel" },
];

const initialKudos = [
  {
    id: "seed-1",
    senderUserId: currentUser.id,
    senderName: currentUser.name,
    recipientUserId: "alex",
    recipientName: "Alex Chen",
    message: "Thank you for stepping up and helping the team hit the launch milestone.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 5).toISOString(),
    is_visible: true,
  },
  {
    id: "seed-2",
    senderUserId: currentUser.id,
    senderName: currentUser.name,
    recipientUserId: "maria",
    recipientName: "Maria Gomez",
    message: "Your thoughtful support made a big difference this week.",
    createdAt: new Date(Date.now() - 1000 * 60 * 60 * 24).toISOString(),
    is_visible: true,
  },
];

let kudosEntries = loadKudos();
const form = document.getElementById("kudosForm");
const recipientSelect = document.getElementById("recipient");
const messageInput = document.getElementById("message");
const feedList = document.getElementById("feedList");
const adminHiddenSection = document.getElementById("adminHiddenSection");
const adminModeCheckbox = document.getElementById("adminMode");

function loadKudos() {
  try {
    const stored = localStorage.getItem(STORAGE_KEY);
    if (!stored) {
      return initialKudos;
    }

    const parsed = JSON.parse(stored);
    return Array.isArray(parsed) && parsed.length > 0 ? parsed : initialKudos;
  } catch (error) {
    console.error("Unable to read kudos data", error);
    return initialKudos;
  }
}

function saveKudos() {
  localStorage.setItem(STORAGE_KEY, JSON.stringify(kudosEntries));
}

function populateRecipients() {
  recipientSelect.innerHTML = '<option value="">Select a colleague</option>';
  recipients.forEach((recipient) => {
    const option = document.createElement("option");
    option.value = recipient.id;
    option.textContent = recipient.name;
    recipientSelect.appendChild(option);
  });
}

function formatTimestamp(dateString) {
  return new Date(dateString).toLocaleString([], {
    dateStyle: "medium",
    timeStyle: "short",
  });
}

function renderFeed() {
  const visibleEntries = [...kudosEntries]
    .filter((entry) => entry.is_visible)
    .sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));

  if (visibleEntries.length === 0) {
    feedList.innerHTML = '<div class="empty-state">No visible kudos yet. Be the first to share appreciation.</div>';
  } else {
    feedList.innerHTML = visibleEntries
      .map(
        (entry) => `
          <article class="kudos-card">
            <div class="meta">
              <strong>${entry.senderName} → ${entry.recipientName}</strong>
              <span>${formatTimestamp(entry.createdAt)}</span>
            </div>
            <div class="message">${entry.message}</div>
            ${adminModeCheckbox.checked ? `<div class="admin-actions"><button type="button" data-action="hide" data-id="${entry.id}">Hide</button></div>` : ""}
          </article>
        `
      )
      .join("");
  }

  renderAdminSection();
}

function renderAdminSection() {
  if (!adminModeCheckbox.checked) {
    adminHiddenSection.innerHTML = "";
    return;
  }

  const hiddenEntries = kudosEntries.filter((entry) => !entry.is_visible);

  if (hiddenEntries.length === 0) {
    adminHiddenSection.innerHTML = '<div class="empty-state">No hidden kudos to review.</div>';
    return;
  }

  adminHiddenSection.innerHTML = `
    <h3>Hidden for moderation</h3>
    ${hiddenEntries
      .map(
        (entry) => `
          <article class="kudos-card hidden-card">
            <div class="meta">
              <strong>${entry.senderName} → ${entry.recipientName}</strong>
              <span>${formatTimestamp(entry.createdAt)}</span>
            </div>
            <div class="message">${entry.message}</div>
            <div class="admin-actions">
              <button type="button" data-action="restore" data-id="${entry.id}">Restore</button>
              <button type="button" data-action="delete" data-id="${entry.id}">Delete</button>
            </div>
          </article>
        `
      )
      .join("")}
  `;
}

form.addEventListener("submit", (event) => {
  event.preventDefault();

  const recipientId = recipientSelect.value;
  const message = messageInput.value.trim();

  if (!recipientId || !message) {
    return;
  }

  const selectedRecipient = recipients.find((recipient) => recipient.id === recipientId);
  const newEntry = {
    id: `kudos-${Date.now()}`,
    senderUserId: currentUser.id,
    senderName: currentUser.name,
    recipientUserId: selectedRecipient.id,
    recipientName: selectedRecipient.name,
    message,
    createdAt: new Date().toISOString(),
    is_visible: true,
  };

  kudosEntries = [newEntry, ...kudosEntries];
  saveKudos();
  form.reset();
  renderFeed();
});

adminModeCheckbox.addEventListener("change", renderFeed);

feedList.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;
  const entry = kudosEntries.find((item) => item.id === id);

  if (!entry) {
    return;
  }

  if (action === "hide") {
    entry.is_visible = false;
  }

  saveKudos();
  renderFeed();
});

adminHiddenSection.addEventListener("click", (event) => {
  const button = event.target.closest("button[data-action]");
  if (!button) {
    return;
  }

  const { action, id } = button.dataset;
  const entry = kudosEntries.find((item) => item.id === id);

  if (!entry) {
    return;
  }

  if (action === "restore") {
    entry.is_visible = true;
  } else if (action === "delete") {
    kudosEntries = kudosEntries.filter((item) => item.id !== id);
  }

  saveKudos();
  renderFeed();
});

populateRecipients();
renderFeed();
