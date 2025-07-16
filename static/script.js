/* -----------------------------------------
  Have focus outline only for keyboard users 
 ---------------------------------------- */

 const handleFirstTab = (e) => {
    if(e.key === 'Tab') {
      document.body.classList.add('user-is-tabbing')
  
      window.removeEventListener('keydown', handleFirstTab)
      window.addEventListener('mousedown', handleMouseDownOnce)
    }
  
  }
  
  const handleMouseDownOnce = () => {
    document.body.classList.remove('user-is-tabbing')
  
    window.removeEventListener('mousedown', handleMouseDownOnce)
    window.addEventListener('keydown', handleFirstTab)
  }
  
  window.addEventListener('keydown', handleFirstTab)
  
  const backToTopButton = document.querySelector(".back-to-top");
  let isBackToTopRendered = false;
  
  let alterStyles = (isBackToTopRendered) => {
    backToTopButton.style.visibility = isBackToTopRendered ? "visible" : "hidden";
    backToTopButton.style.opacity = isBackToTopRendered ? 1 : 0;
    backToTopButton.style.transform = isBackToTopRendered
      ? "scale(1)"
      : "scale(0)";
  };
  
  // Navigation scroll behavior
  const nav = document.querySelector('.nav');
  const navItems = document.querySelectorAll('.nav__item');
  const headerText = document.querySelector('.header__text');
  let isNavSticky = false;

  const handleNavScroll = () => {
    const scrollY = window.scrollY;
    const maxScroll = 500; // Maximum scroll distance for full expansion
    const fadeStart = 200; // When to start fading Josh Winnes text
    const fadeEnd = 400; // When to complete the fade
    
    // Calculate expansion progress (0 to 1)
    const expansionProgress = Math.min(scrollY / maxScroll, 1);
    
    // Calculate spacing based on scroll progress
    // Start with 1rem, expand to 3rem at full scroll
    const baseSpacing = 1; // rem
    const maxSpacing = 3; // rem
    const currentSpacing = baseSpacing + (maxSpacing - baseSpacing) * expansionProgress;
    
    // Apply spacing to nav items
    navItems.forEach(item => {
      item.style.margin = `0 ${currentSpacing}rem`;
    });
    
    // Fade out Josh Winnes text as it approaches nav bar
    if (scrollY >= fadeStart) {
      const fadeProgress = Math.min((scrollY - fadeStart) / (fadeEnd - fadeStart), 1);
      const opacity = 1 - fadeProgress;
      headerText.style.opacity = opacity;
    } else {
      headerText.style.opacity = 1;
    }
    
    // Make nav sticky when scrolling down past 300px
    if (scrollY > 300 && !isNavSticky) {
      nav.classList.add('sticky');
      isNavSticky = true;
    } else if (scrollY <= 300 && isNavSticky) {
      nav.classList.remove('sticky');
      isNavSticky = false;
    }
  };

  window.addEventListener("scroll", () => {
    // Handle back to top button
    if (window.scrollY > 700) {
      isBackToTopRendered = true;
      alterStyles(isBackToTopRendered);
    } else {
      isBackToTopRendered = false;
      alterStyles(isBackToTopRendered);
    }
    
    // Handle navigation scroll behavior
    handleNavScroll();
  });