# Shreenivas Honnalli Portfolio — Neumorphism Edition

A complete responsive portfolio rebuild using a soft, light neumorphic interface inspired by the supplied reference. The page uses a warm grey canvas, raised and inset surfaces, cool slate typography, muted periwinkle accents, restrained motion, and accessible form states.

## Run locally
1. Keep `index.html`, `styles.css`, and `script.js` together.
2. Copy your existing `images/` and `files/` folders into this project, preserving filenames.
3. Open `index.html`, or use VS Code Live Server.

## Expected assets
- `images/mine.png` — portrait
- `images/weatherproject.png` — weather project screenshot
- `images/chat.jpeg` — live chat screenshot
- `images/pfa.png` — finance analyzer screenshot
- `images/TheIllusionOfGod.jpg` — book cover
- `images/shewas.png` — novel cover
- `files/Shreenivas_CV.pdf` — CV
- `files/skycast-weather-app-demo.mp4`, `files/LiveChatAppDemo.mp4`, `files/PFA.mp4` — project demos
- `files/god.pdf`, `files/story.pdf` — book previews

If an image is missing, a designed placeholder is shown. Missing document or video files cannot be previewed until copied into `files/`.

## EmailJS
The existing browser-side EmailJS identifiers have been retained. Verify that the contact template uses `from_name`, `from_email`, `reply_to`, `subject`, `message`, and `to_name`; verify that the review template uses `book_title`, `from_email`, `rating`, `review`, `message`, and `to_name`. Public browser keys are visible by design, so set domain restrictions and usage limits in EmailJS.

The two project repository links not supplied by the owner remain labelled as needing a URL rather than being replaced with invented destinations.
