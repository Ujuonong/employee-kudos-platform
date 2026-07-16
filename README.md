<!DOCTYPE html>
<html lang="en">
  <head>
    <meta charset="UTF-8" />
    <meta name="viewport" content="width=device-width, initial-scale=1.0" />
    <title>Kudos Board</title>
    <link rel="stylesheet" href="styles.css" />
  </head>
  <body>
    <div class="app-shell">
      <header class="hero">
        <div>
          <p class="eyebrow">Internal Recognition</p>
          <h1>Give kudos to a colleague</h1>
          <p class="hero-text">
            Share appreciation with your team and keep the public feed professional.
          </p>
        </div>
        <label class="admin-toggle">
          <input type="checkbox" id="adminMode" />
          <span>Admin moderation</span>
        </label>
      </header>

      <main class="content-grid">
        <section class="panel form-panel">
          <h2>Send a kudos</h2>
          <form id="kudosForm">
            <div class="field-group">
              <label for="recipient">Recognize</label>
              <select id="recipient" required>
                <option value="">Select a colleague</option>
              </select>
            </div>

            <div class="field-group">
              <label for="message">Message</label>
              <textarea
                id="message"
                maxlength="280"
                placeholder="Write a short note of appreciation..."
                required
              ></textarea>
              <small id="messageHint">Maximum 280 characters</small>
            </div>

            <button type="submit">Submit kudos</button>
          </form>
        </section>

        <section class="panel feed-panel">
          <div class="panel-header">
            <h2>Recent kudos</h2>
            <p>Only visible messages appear in the public dashboard feed.</p>
          </div>
          <div id="feedList" class="feed-list"></div>
          <div id="adminHiddenSection" class="admin-section"></div>
        </section>
      </main>
    </div>

    <script src="app.js"></script>
  </body>
</html>
