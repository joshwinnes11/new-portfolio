window.addEventListener('scroll', () => {
  const scrolled = window.pageYOffset;
  const parallaxSpeed = 0.3; 
  const homeImage = document.querySelector('.home_image');
  if (homeImage) {
      homeImage.style.transform = `translateY(${-1 * scrolled * parallaxSpeed}px)`;
  }
});

const nav_buttons = document.querySelectorAll('.nav__link');
nav_buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    console.log('entered');
    button.style.color = 'var(--cream)';
    button.style.background = 'var(--dark-blue)';
    button.style.transition = 'all 0.3s ease';
  });
  button.addEventListener('mouseleave', () => {
    console.log('left');
    button.style.color = 'var(--dark-blue)';
    button.style.background = 'transparent';
    button.style.transition = 'all 0.1s ease';
  });
});

const content_buttons = document.querySelectorAll('.content-button a');
content_buttons.forEach(button => {
  button.addEventListener('mouseenter', () => {
    button.style.color = 'var(--dark-brown)';
    button.style.background = 'var(--cream)';
    button.style.border = '2px solid var(--dark-brown)';
    button.style.transition = 'all 0.3s ease';
  });
  button.addEventListener('mouseleave', () => {
    button.style.color = 'var(--cream)';
    button.style.background = 'var(--dark-brown)';
    button.style.border = '2px solid var(--cream)';
    button.style.transition = 'all 0.1s ease';
  });
});