
const tabs = document.querySelectorAll('.sidebar li');
const sections = document.querySelectorAll('.tab-content');

tabs.forEach(tab => {
  tab.addEventListener('click', () => {
    sections.forEach(section => section.classList.remove('active'));
    document.getElementById(tab.dataset.tab).classList.add('active');
  });
});


const observer = new IntersectionObserver((entries) => {
  entries.forEach(entry => {
    if (entry.isIntersecting) {
      entry.target.classList.add('visible');
    }
  });
}, { threshold: 0.1 });

document.querySelectorAll('.timeline-event').forEach(el => observer.observe(el));


const certs = document.querySelectorAll('.cert-item');
let currentCert = 0;

setInterval(() => {
  certs[currentCert].classList.remove('active');
  currentCert = (currentCert + 1) % certs.length;
  certs[currentCert].classList.add('active');
}, 2000);


const quotes = [

  "Not just achievements, but stories they hold,<br>A journey of growth, brave and bold.",
  "With every badge, a chapter earned,<br>In fires of challenge, these skills were learned.",
  "Each cert a symbol, each badge a spark,<br>Lighting the way through paths once dark."
];

const certQuote = document.getElementById("certQuote");
const randomIndex = Math.floor(Math.random() * quotes.length);
certQuote.innerHTML = quotes[randomIndex];

function renderAttachment(filePath) {
  const ext = filePath.split('.').pop().toLowerCase();
  if (['jpg', 'jpeg', 'png', 'gif'].includes(ext)) {
    return `<img src="${filePath}" alt="attachment">`;
  } else if (ext === 'pdf') {
    return `<embed src="${filePath}" type="application/pdf" />`;
  } else {
    return `<a href="${filePath}" target="_blank">📎 Download Attachment</a>`;
  }
}

async function loadPegaQAs() {
  try {
    const res = await fetch('assets/data.json');
    const data = await res.json();
    const list = document.getElementById('qa-list');
    list.innerHTML = '';

    data.forEach(item => {
      const div = document.createElement('div');
      div.className = 'qa-item';
      div.innerHTML = `
        <h3>❓ ${item.question}</h3>
        <p class="answer">💬 ${item.answer}</p>
        ${item.attachment ? renderAttachment(item.attachment) : ''}
        <span class="timestamp">🕒 ${item.timestamp}</span>
      `;
      list.appendChild(div);
    });
  } catch (error) {
    console.error("Error loading data.json:", error);
    document.getElementById('qa-list').innerHTML = "<p>⚠️ Unable to load Q&A data.⚠️</p>";
  }
}

// ⏳ Load when Pega tab is clicked
document.querySelector('[data-tab="pega"]').addEventListener('click', loadPegaQAs);


// type writing

const quoteWords = [
  "I", "am", "not", "just", "a", "developer, I", "am", "a", "strategic", "craftsman,",
  "Bridging", "business", "with", "technology,", "blending", "structure", "with", "imagination.",
  "Ever-curious,", "ever-evolving,", "I", "rise", "with", "every", "challenge,",
  "Fueling", "the", "future", "with", "Pega powered", "precision", "and", "purpose."
];

const quoteElement = document.getElementById("typewriter-text");

let index = 0;
function typeNextWord() {
  if (index < quoteWords.length) {
    quoteElement.innerHTML += quoteWords[index] + " ";
    index++;
    setTimeout(typeNextWord, 250); // typing speed
  }
}

window.addEventListener("load", typeNextWord); // or trigger on tab show
