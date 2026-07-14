const revealItems = document.querySelectorAll('.reveal');
const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add('visible');
        observer.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.15 }
);

revealItems.forEach((item) => observer.observe(item));

const form = document.getElementById('contact-form');
const status = document.getElementById('form-status');
const backTopButton = document.querySelector('.back-top');

if (form && status) {
  form.addEventListener('submit', (event) => {
    event.preventDefault();

    const formData = new FormData(form);
    const submission = {
      name: formData.get('name')?.toString().trim() || 'Anonymous',
      email: formData.get('email')?.toString().trim() || '',
      subject: formData.get('subject')?.toString().trim() || '',
      message: formData.get('message')?.toString().trim() || '',
      timestamp: new Date().toISOString()
    };

    const previous = JSON.parse(localStorage.getItem('portfolio-submissions') || '[]');
    previous.push(submission);
    localStorage.setItem('portfolio-submissions', JSON.stringify(previous));

    status.textContent = `Thanks, ${submission.name}! Your message has been saved locally.`;
    form.reset();
  });
}

if (backTopButton) {
  backTopButton.addEventListener('click', () => {
    window.scrollTo({ top: 0, behavior: 'smooth' });
  });
}
