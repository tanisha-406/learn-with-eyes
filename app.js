/**
 * Visual Learning Platform - Interactive Logic
 * Class 5 Science (EVS) for Deaf Students
 */

document.addEventListener('DOMContentLoaded', () => {
  initNavigation();
  initTabs();
  initScrollEffects();
  initQuiz();
  initDragAndDrop();
  initISLCards();
});

/* ===========================
   NAVIGATION & SIDEBAR
   =========================== */
function initNavigation() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('.sidebar__link:not(.disabled)');
  const pages = document.querySelectorAll('.page');
  const unitCards = document.querySelectorAll('.unit-card:not([style*="opacity"])');

  // Toggle mobile menu
  menuBtn.addEventListener('click', () => {
    sidebar.classList.toggle('open');
  });

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024) {
      if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    }
  });

  // Handle navigation links
  const navigateTo = (pageId) => {
    // Hide all pages
    pages.forEach(page => {
      page.style.display = 'none';
    });

    // Remove active class from all links
    navLinks.forEach(l => l.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
      targetPage.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Set active class on corresponding link
    const targetLink = document.getElementById(`nav-${pageId}`);
    if (targetLink) {
      targetLink.classList.add('active');
    }

    // Close mobile menu if open
    if (window.innerWidth <= 1024) {
      sidebar.classList.remove('open');
    }
  };

  navLinks.forEach(link => {
    link.addEventListener('click', (e) => {
      e.preventDefault();
      const pageId = link.getAttribute('data-page');
      navigateTo(pageId);
    });
  });

  // Handle unit cards on homepage
  unitCards.forEach(card => {
    card.addEventListener('click', () => {
      const pageId = card.getAttribute('data-page');
      navigateTo(pageId);
    });
  });
}

/* ===========================
   SECTION TABS
   =========================== */
function initTabs() {
  const tabs = document.querySelectorAll('.section-tab');
  const sections = document.querySelectorAll('.lesson-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      // Remove active class from all tabs and sections
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      // Add active class to clicked tab
      tab.classList.add('active');

      // Show corresponding section
      const sectionId = tab.getAttribute('data-section');
      const targetSection = document.getElementById(`section-${sectionId}`);
      if (targetSection) {
        targetSection.classList.add('active');
        
        // Trigger animations for elements in this section
        const animatedElements = targetSection.querySelectorAll('.fade-in');
        animatedElements.forEach(el => {
          el.classList.remove('visible');
          // small timeout to restart animation
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }
    });
  });
}

/* ===========================
   SCROLL EFFECTS
   =========================== */
function initScrollEffects() {
  const header = document.getElementById('header');
  const fadeElements = document.querySelectorAll('.fade-in');

  // Header shadow on scroll
  window.addEventListener('scroll', () => {
    if (window.scrollY > 20) {
      header.classList.add('scrolled');
    } else {
      header.classList.remove('scrolled');
    }
    
    checkFadeIn();
  });

  // Intersection Observer for fade-in elements
  const checkFadeIn = () => {
    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      
      // If element is in viewport
      if (rect.top <= windowHeight * 0.85) {
        el.classList.add('visible');
      }
    });
  };

  // Initial check
  setTimeout(checkFadeIn, 100);
}

/* ===========================
   QUIZ LOGIC
   =========================== */
function initQuiz() {
  const options = document.querySelectorAll('.quiz-option');
  const checkBtn = document.getElementById('checkQuizBtn');
  const retryBtn = document.getElementById('retryQuizBtn');
  const scoreContainer = document.getElementById('quizScore');
  const scoreNum = document.getElementById('quizScoreNum');
  const scoreStars = document.getElementById('quizStars');
  
  let userAnswers = {};
  const totalQuestions = 7;

  // Option selection
  options.forEach(option => {
    option.addEventListener('click', () => {
      // Don't allow changing answer after checking
      if (checkBtn.disabled) return;

      const qId = option.getAttribute('data-q');
      const siblings = document.querySelectorAll(`.quiz-option[data-q="${qId}"]`);
      
      // Deselect siblings
      siblings.forEach(sib => sib.classList.remove('selected'));
      
      // Select this option
      option.classList.add('selected');
      
      // Save answer
      userAnswers[qId] = option;
    });
  });

  // Check answers
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      let correctCount = 0;
      
      // Check if all questions are answered
      if (Object.keys(userAnswers).length < totalQuestions) {
        alert('Please answer all questions before checking! 😊');
        return;
      }

      // Evaluate answers
      Object.keys(userAnswers).forEach(qId => {
        const selectedOption = userAnswers[qId];
        const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
        const feedbackEl = document.getElementById(`${qId}-feedback`);
        
        if (isCorrect) {
          selectedOption.classList.add('correct');
          correctCount++;
          if(feedbackEl) {
            feedbackEl.textContent = '✅ Correct! Great job!';
            feedbackEl.className = 'quiz-feedback show correct';
          }
        } else {
          selectedOption.classList.add('incorrect');
          
          // Show correct answer
          const correctOption = document.querySelector(`.quiz-option[data-q="${qId}"][data-correct="true"]`);
          correctOption.classList.add('correct');
          
          if(feedbackEl) {
            feedbackEl.textContent = '❌ Oops! See the correct answer above.';
            feedbackEl.className = 'quiz-feedback show incorrect';
          }
        }
      });

      // Show score
      checkBtn.style.display = 'none';
      scoreContainer.classList.add('show');
      scoreNum.textContent = `${correctCount} / ${totalQuestions}`;
      
      // Set stars based on score
      const percentage = correctCount / totalQuestions;
      if (percentage === 1) scoreStars.textContent = '🌟🌟🌟';
      else if (percentage >= 0.7) scoreStars.textContent = '⭐⭐';
      else if (percentage >= 0.4) scoreStars.textContent = '⭐';
      else scoreStars.textContent = '👍';

      // Update progress bar on home page if passed
      if (percentage >= 0.7) {
        const progressFill = document.querySelector('#unit-card-1 .progress-bar__fill');
        if(progressFill) progressFill.style.width = '100%';
        
        const navProgress = document.querySelector('#nav-ch1 .sidebar__progress');
        if(navProgress) {
          navProgress.classList.add('completed');
          navProgress.textContent = '✓';
        }
      }
    });
  }

  // Retry quiz
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      userAnswers = {};
      
      // Reset options
      options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
      });
      
      // Hide feedback
      document.querySelectorAll('.quiz-feedback').forEach(el => {
        el.classList.remove('show', 'correct', 'incorrect');
      });
      
      // Reset UI
      checkBtn.style.display = 'inline-flex';
      scoreContainer.classList.remove('show');
      
      // Scroll to top of quiz
      document.getElementById('section-quiz').scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* ===========================
   DRAG AND DROP ACTIVITY
   =========================== */
function initDragAndDrop() {
  const draggables = document.querySelectorAll('.drag-item');
  const dropZones = document.querySelectorAll('.drop-zone');
  
  if (draggables.length === 0 || dropZones.length === 0) return;

  let draggedItem = null;

  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', (e) => {
      draggedItem = draggable;
      setTimeout(() => draggable.style.opacity = '0.5', 0);
    });

    draggable.addEventListener('dragend', () => {
      setTimeout(() => {
        draggedItem.style.opacity = '1';
        draggedItem = null;
      }, 0);
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      zone.classList.add('drag-over');
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      
      if (draggedItem) {
        const expectedMatch = zone.getAttribute('data-accept');
        const itemMatch = draggedItem.getAttribute('data-match');
        
        if (expectedMatch === itemMatch) {
          // Success! Append to drop zone
          zone.appendChild(draggedItem);
          draggedItem.setAttribute('draggable', 'false');
          draggedItem.style.cursor = 'default';
          draggedItem.style.border = '2px solid var(--color-primary)';
          draggedItem.style.background = '#eafaf1';
          
          zone.classList.add('filled');
          
          // Play success animation/sound (optional)
          draggedItem.style.transform = 'scale(1.1)';
          setTimeout(() => draggedItem.style.transform = 'scale(1)', 200);
        } else {
          // Failure feedback
          draggedItem.style.transform = 'translateX(-10px)';
          draggedItem.style.border = '2px solid var(--color-accent-red)';
          setTimeout(() => {
            draggedItem.style.transform = 'translateX(10px)';
            setTimeout(() => {
              draggedItem.style.transform = 'translateX(0)';
              draggedItem.style.border = '2px solid #dfe6e9';
            }, 100);
          }, 100);
        }
      }
    });
  });
}

/* ===========================
   ISL CARDS (Indian Sign Language)
   =========================== */
function initISLCards() {
  const islCards = document.querySelectorAll('.isl-card');
  
  islCards.forEach(card => {
    card.addEventListener('click', () => {
      const word = card.getAttribute('data-isl');
      // For now, we just show a simple alert since we don't have videos yet
      // In a real app, this would open a modal with a video player
      alert(`ISL video for "${word.toUpperCase()}" will be played here! 🤟\n\nYou can add real YouTube/video links in the future.`);
    });
  });
}
