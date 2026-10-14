/**
 * Visual Learning Platform - Interactive Logic
 * Class 5 Science (EVS) for Deaf Students — Anushruti Academy for the Deaf (IIT Roorkee)
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndAccessibility();
  initNavigation();
  initTabs();
  initScrollEffects();
  initISLModalSystem();
  initChapterPreviewModal();
  initMatchingGame();
  initInteractiveFlashcards();
  initQuiz();
  restoreSavedProgress();
});

/* =====================================================
   1. THEME & ACCESSIBILITY SYSTEM
   ===================================================== */
function initThemeAndAccessibility() {
  const themeBtn = document.getElementById('themeToggleBtn');
  const themeIcon = document.getElementById('themeToggleIcon');
  const fontBtn = document.getElementById('fontSizeBtn');
  const fontLabel = document.getElementById('fontSizeLabel');

  // Load saved theme
  const savedTheme = localStorage.getItem('lwe_theme') || 'light';
  applyTheme(savedTheme);

  // Load saved font size
  const savedFontSize = localStorage.getItem('lwe_font_size') || 'normal';
  applyFontSize(savedFontSize);

  if (themeBtn) {
    themeBtn.addEventListener('click', () => {
      const currentTheme = document.documentElement.getAttribute('data-theme') || 'light';
      let nextTheme = 'dark';
      if (currentTheme === 'dark') nextTheme = 'high-contrast';
      else if (currentTheme === 'high-contrast') nextTheme = 'light';
      applyTheme(nextTheme);
    });
  }

  function applyTheme(theme) {
    if (theme === 'light') {
      document.documentElement.removeAttribute('data-theme');
      if (themeIcon) themeIcon.textContent = '🌙';
    } else if (theme === 'dark') {
      document.documentElement.setAttribute('data-theme', 'dark');
      if (themeIcon) themeIcon.textContent = '☀️';
    } else if (theme === 'high-contrast') {
      document.documentElement.setAttribute('data-theme', 'high-contrast');
      if (themeIcon) themeIcon.textContent = '⚡';
    }
    localStorage.setItem('lwe_theme', theme);
  }

  if (fontBtn) {
    fontBtn.addEventListener('click', () => {
      const currentFont = document.documentElement.getAttribute('data-font-size') || 'normal';
      let nextFont = 'large';
      if (currentFont === 'large') nextFont = 'xlarge';
      else if (currentFont === 'xlarge') nextFont = 'normal';
      applyFontSize(nextFont);
    });
  }

  function applyFontSize(size) {
    if (size === 'normal') {
      document.documentElement.removeAttribute('data-font-size');
      if (fontLabel) fontLabel.textContent = 'A⁺';
    } else if (size === 'large') {
      document.documentElement.setAttribute('data-font-size', 'large');
      if (fontLabel) fontLabel.textContent = 'A⁺⁺';
    } else if (size === 'xlarge') {
      document.documentElement.setAttribute('data-font-size', 'xlarge');
      if (fontLabel) fontLabel.textContent = 'A⁻';
    }
    localStorage.setItem('lwe_font_size', size);
  }
}

/* =====================================================
   2. NAVIGATION & SIDEBAR
   ===================================================== */
function initNavigation() {
  const menuBtn = document.getElementById('menuBtn');
  const sidebar = document.getElementById('sidebar');
  const navLinks = document.querySelectorAll('.sidebar__link[data-page]');
  const pages = document.querySelectorAll('.page');
  const unitCards = document.querySelectorAll('.unit-card[data-page]');
  const headerLogo = document.getElementById('headerLogo');

  // Toggle mobile menu
  if (menuBtn && sidebar) {
    menuBtn.addEventListener('click', (e) => {
      e.stopPropagation();
      sidebar.classList.toggle('open');
    });
  }

  // Close sidebar when clicking outside on mobile
  document.addEventListener('click', (e) => {
    if (window.innerWidth <= 1024 && sidebar && menuBtn) {
      if (!sidebar.contains(e.target) && !menuBtn.contains(e.target) && sidebar.classList.contains('open')) {
        sidebar.classList.remove('open');
      }
    }
  });

  // Navigate to specific page
  const navigateTo = (pageId) => {
    if (!pageId) return;

    // Hide all pages
    pages.forEach(page => {
      page.style.display = 'none';
    });

    // Remove active state from nav links
    document.querySelectorAll('.sidebar__link').forEach(l => l.classList.remove('active'));

    // Show target page
    const targetPage = document.getElementById(`page-${pageId}`);
    if (targetPage) {
      targetPage.style.display = 'block';
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }

    // Set active nav link
    const targetLink = document.getElementById(`nav-${pageId}`);
    if (targetLink) {
      targetLink.classList.add('active');
    }

    // Close mobile sidebar
    if (sidebar && sidebar.classList.contains('open')) {
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

  unitCards.forEach(card => {
    card.addEventListener('click', () => {
      const pageId = card.getAttribute('data-page');
      navigateTo(pageId);
    });
  });

  if (headerLogo) {
    headerLogo.addEventListener('click', () => {
      navigateTo('home');
    });
  }
}

/* =====================================================
   3. SECTION TABS
   ===================================================== */
function initTabs() {
  const tabs = document.querySelectorAll('.section-tab');
  const sections = document.querySelectorAll('.lesson-section');

  tabs.forEach(tab => {
    tab.addEventListener('click', () => {
      tabs.forEach(t => t.classList.remove('active'));
      sections.forEach(s => s.classList.remove('active'));

      tab.classList.add('active');

      const sectionId = tab.getAttribute('data-section');
      const targetSection = document.getElementById(`section-${sectionId}`);
      if (targetSection) {
        targetSection.classList.add('active');

        // Trigger animations
        const animatedElements = targetSection.querySelectorAll('.fade-in');
        animatedElements.forEach(el => {
          el.classList.remove('visible');
          setTimeout(() => el.classList.add('visible'), 50);
        });
      }
    });
  });
}

/* =====================================================
   4. SCROLL EFFECTS
   ===================================================== */
function initScrollEffects() {
  const header = document.getElementById('header');
  const fadeElements = document.querySelectorAll('.fade-in');

  const checkScroll = () => {
    if (header) {
      if (window.scrollY > 20) {
        header.classList.add('scrolled');
      } else {
        header.classList.remove('scrolled');
      }
    }

    fadeElements.forEach(el => {
      const rect = el.getBoundingClientRect();
      const windowHeight = window.innerHeight || document.documentElement.clientHeight;
      if (rect.top <= windowHeight * 0.88) {
        el.classList.add('visible');
      }
    });
  };

  window.addEventListener('scroll', checkScroll, { passive: true });
  setTimeout(checkScroll, 100);
}

/* =====================================================
   5. INDIAN SIGN LANGUAGE (ISL) MODAL SYSTEM
   ===================================================== */
const ISL_DATA = [
  {
    id: 'seed',
    word: 'Seed',
    emoji: '🌰',
    graphic: '🌰🌱',
    gestureName: 'Pinch & Sow Gesture',
    step1: 'Hold your thumb and index finger close together to show the tiny size of a seed.',
    step2: 'Gently move your hand downward towards the ground as if planting the seed in soil.',
    meaning: 'A seed is the part of a plant that contains a baby plant and stored food.'
  },
  {
    id: 'plant',
    word: 'Plant',
    emoji: '🌿',
    graphic: '🌱🌳',
    gestureName: 'Growing Branch Gesture',
    step1: 'Rest your right elbow in your left palm.',
    step2: 'Open your right hand with fingers spread wide, gently raising it upwards like a growing sprout.',
    meaning: 'Living organisms that grow in soil and make food from sunlight and water.'
  },
  {
    id: 'water',
    word: 'Water',
    emoji: '💧',
    graphic: '🌊💧',
    gestureName: 'W-Hand Chin Tap',
    step1: 'Make a "W" shape with your three middle fingers upright.',
    step2: 'Tap the index finger gently against your chin twice.',
    meaning: 'Essential liquid needed by seeds to germinate and plants to make food.'
  },
  {
    id: 'sun',
    word: 'Sun / Sunlight',
    emoji: '☀️',
    graphic: '☀️✨',
    gestureName: 'Shining Circle Gesture',
    step1: 'Draw a circle in the air above your head with your index finger.',
    step2: 'Open both palms outwards and spread fingers down to represent warm sun rays.',
    meaning: 'Provides warmth and light energy for seeds to germinate and leaves to perform photosynthesis.'
  },
  {
    id: 'root',
    word: 'Root',
    emoji: '🌳',
    graphic: '🪨🌱',
    gestureName: 'Downwards Spreading Fingers',
    step1: 'Hold your left forearm horizontally representing ground soil level.',
    step2: 'Point right fingers downwards below the left arm, wiggling fingers to show spreading roots.',
    meaning: 'The underground anchor of a plant that absorbs water and dissolved minerals.'
  },
  {
    id: 'leaf',
    word: 'Leaf',
    emoji: '🍃',
    graphic: '🌿🍃',
    gestureName: 'Fluttering Leaf Gesture',
    step1: 'Touch the base of your right palm to the left wrist.',
    step2: 'Gently sway your right hand like a leaf fluttering in a pleasant breeze.',
    meaning: 'The green food factory of the plant, containing chlorophyll.'
  },
  {
    id: 'flower',
    word: 'Flower',
    emoji: '🌸',
    graphic: '🌷🌸',
    gestureName: 'Blooming Fingers Gesture',
    step1: 'Bring all five fingertips of one hand together like a closed bud.',
    step2: 'Slowly blossom the fingers outwards like petals opening in the morning sun.',
    meaning: 'The reproductive part of flowering plants that attracts pollinators and produces seeds.'
  },
  {
    id: 'fruit',
    word: 'Fruit',
    emoji: '🍎',
    graphic: '🍎🥭',
    gestureName: 'Twist at Cheek Gesture',
    step1: 'Make an "F" or pinched handshape touching your right cheek.',
    step2: 'Twist the hand slightly back and forth with a cheerful smile.',
    meaning: 'The sweet or fleshy product of a tree or plant that contains seeds.'
  },
  {
    id: 'soil',
    word: 'Soil',
    emoji: '🏔️',
    graphic: '🪨🌱',
    gestureName: 'Crumbling Soil Gesture',
    step1: 'Rub your thumb and fingers together near ground level.',
    step2: 'Simulate feeling rich, soft garden loam between your fingertips.',
    meaning: 'The top layer of earth in which plants grow, consisting of organic matter and rock particles.'
  },
  {
    id: 'farmer',
    word: 'Farmer',
    emoji: '👨‍🌾',
    graphic: '🚜🌾',
    gestureName: 'Plough & Person Gesture',
    step1: 'Hold two hands together moving forward as if guiding a plough across a field.',
    step2: 'Drop both flat hands downward along the sides to indicate "person / worker".',
    meaning: 'A person who cultivates land and grows crops for our food.'
  },
  {
    id: 'wind',
    word: 'Wind',
    emoji: '🌬️',
    graphic: '💨🍃',
    gestureName: 'Swaying Wave Gesture',
    step1: 'Raise both open palms in front of your chest facing outwards.',
    step2: 'Wave hands gently side to side while blowing a soft visual breath.',
    meaning: 'Moving air that carries lightweight, winged, or hairy seeds far away.'
  },
  {
    id: 'animal',
    word: 'Animal',
    emoji: '🐦',
    graphic: '🐾🐦',
    gestureName: 'Curved Paws Gesture',
    step1: 'Place fingertips of both curved hands on your chest near shoulders.',
    step2: 'Move elbows in and out gently like animal breathing or paws.',
    meaning: 'Living creatures that eat fruits and help disperse seeds in nature.'
  }
];

let currentIslIndex = 0;

function initISLModalSystem() {
  const islCards = document.querySelectorAll('.isl-card');
  const modal = document.getElementById('islModal');
  const closeBtn = document.getElementById('closeIslModal');
  const prevBtn = document.getElementById('islPrevBtn');
  const nextBtn = document.getElementById('islNextBtn');

  if (!modal) return;

  function updateModalContent(index) {
    if (index < 0) index = ISL_DATA.length - 1;
    if (index >= ISL_DATA.length) index = 0;
    currentIslIndex = index;

    const item = ISL_DATA[currentIslIndex];
    document.getElementById('islModalEmoji').textContent = item.emoji;
    document.getElementById('islModalTitle').textContent = item.word;
    document.getElementById('islModalGraphic').textContent = item.graphic;
    document.getElementById('islModalGesture').textContent = item.gestureName;
    document.getElementById('islModalStep1').textContent = item.step1;
    document.getElementById('islModalStep2').textContent = item.step2;
    document.getElementById('islModalMeaning').innerHTML = `<strong>Scientific Meaning:</strong> ${item.meaning}`;
    document.getElementById('islCounter').textContent = `${currentIslIndex + 1} / ${ISL_DATA.length}`;
  }

  function openModal(id) {
    const idx = ISL_DATA.findIndex(item => item.id === id);
    updateModalContent(idx !== -1 ? idx : 0);
    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closeModal() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  islCards.forEach(card => {
    card.addEventListener('click', () => {
      const id = card.getAttribute('data-isl');
      openModal(id);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closeModal);

  if (prevBtn) {
    prevBtn.addEventListener('click', () => {
      updateModalContent(currentIslIndex - 1);
    });
  }

  if (nextBtn) {
    nextBtn.addEventListener('click', () => {
      updateModalContent(currentIslIndex + 1);
    });
  }

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closeModal();
  });

  document.addEventListener('keydown', (e) => {
    if (!modal.classList.contains('active')) return;
    if (e.key === 'Escape') closeModal();
    if (e.key === 'ArrowLeft') updateModalContent(currentIslIndex - 1);
    if (e.key === 'ArrowRight') updateModalContent(currentIslIndex + 1);
  });
}

/* =====================================================
   6. CHAPTER PREVIEWS (Coming Soon Units)
   ===================================================== */
const CHAPTER_PREVIEWS = {
  ch2: {
    title: 'Chapter 2: Food and Health',
    emoji: '🍎',
    desc: 'Coming soon to the platform! This chapter explores how nutrition, hygiene, and exercise keep our bodies disease-free and energetic.',
    topics: [
      '🍎 Carbohydrates, Fats & Proteins for Energy and Growth',
      '🥗 Vitamins & Minerals — Protective Nutrients',
      '🥛 Water & Roughage for Healthy Digestion',
      '🦠 Deficiency Diseases: Night Blindness, Scurvy, Rickets & Anemia',
      '🧼 Cleanliness, Hygiene & Communicable Disease Prevention'
    ]
  },
  ch3: {
    title: 'Chapter 3: Life of Animals',
    emoji: '🦁',
    desc: 'Coming soon! Learn about animal habitats, breathing mechanisms, feeding adaptations, and long-distance migration.',
    topics: [
      '🌍 Terrestrial, Aquatic, Amphibious & Arboreal Habitats',
      '🫁 Breathing in Animals: Gills, Spiracles, Moist Skin & Lungs',
      '🦷 Herbivores, Carnivores, Omnivores & Rodents',
      '🦅 Bird Wings, Insect Legs & Fish Fins for Movement',
      '❄️ Migration of Monarch Butterflies & Arctic Terns'
    ]
  },
  ch4: {
    title: 'Chapter 4: Skeletal & Muscular System',
    emoji: '🦴',
    desc: 'Coming soon! Discover the 206 bones in our human framework, joints that allow us to bend, and muscles that give us strength.',
    topics: [
      '💀 Skull, Backbone (Spine), Ribcage & Limbs',
      '🦴 Bone Marrow & Red Blood Cell Production',
      '🔄 Moveable Joints: Ball & Socket, Hinge, Pivot, Gliding',
      '💪 Voluntary vs Involuntary Muscles (Heart Muscle)',
      '🧘 Correct Posture & Bone Health'
    ]
  },
  ch5: {
    title: 'Chapter 5: Nervous System & Sense Organs',
    emoji: '🧠',
    desc: 'Coming soon! The master control center of our body: Brain, Spinal Cord, Nerves, and our 5 vital sense organs.',
    topics: [
      '🧠 Cerebrum (Thinking), Cerebellum (Balance), Medulla (Vitals)',
      '⚡ Sensory, Motor, and Mixed Nerves',
      '🔥 Reflex Actions and the Spinal Cord',
      '👁️ Eyes, Ears, Nose, Tongue & Skin Care',
      '🤟 Communication & Visual Perception for Deaf Individuals'
    ]
  }
};

function initChapterPreviewModal() {
  const modal = document.getElementById('chapterModal');
  const closeBtn = document.getElementById('closeChModal');
  const confirmBtn = document.getElementById('closeChModalBtn');
  const triggerLinks = document.querySelectorAll('.chapter-preview-link, .chapter-preview-card');

  if (!modal) return;

  function openPreview(chId) {
    const data = CHAPTER_PREVIEWS[chId];
    if (!data) return;

    document.getElementById('chModalEmoji').textContent = data.emoji;
    document.getElementById('chModalTitle').textContent = data.title;
    document.getElementById('chModalDesc').textContent = data.desc;

    const topicsList = document.getElementById('chModalTopics');
    topicsList.innerHTML = '';
    data.topics.forEach(t => {
      const li = document.createElement('li');
      li.textContent = t;
      topicsList.appendChild(li);
    });

    modal.classList.add('active');
    document.body.style.overflow = 'hidden';
  }

  function closePreview() {
    modal.classList.remove('active');
    document.body.style.overflow = '';
  }

  triggerLinks.forEach(trigger => {
    trigger.addEventListener('click', (e) => {
      e.preventDefault();
      const chId = trigger.getAttribute('data-chapter');
      openPreview(chId);
    });
  });

  if (closeBtn) closeBtn.addEventListener('click', closePreview);
  if (confirmBtn) confirmBtn.addEventListener('click', closePreview);

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePreview();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closePreview();
  });
}

/* =====================================================
   7. SEED DISPERSAL MATCHING ACTIVITY (Touch + Drag & Drop)
   ===================================================== */
function initMatchingGame() {
  const seedBank = document.getElementById('seedBank');
  const draggables = document.querySelectorAll('.drag-item');
  const dropZones = document.querySelectorAll('.drop-zone');
  const scoreEl = document.getElementById('matchScoreCount');
  const celebration = document.getElementById('matchCelebration');
  const resetBtn = document.getElementById('resetMatchBtn');

  if (!seedBank || dropZones.length === 0) return;

  let selectedSeed = null;
  let draggedItem = null;
  let matchedCount = 0;
  const totalMatches = 6;

  const zoneLimits = {
    wind: 2,
    water: 2,
    animal: 1,
    burst: 1
  };

  const zoneCurrentCounts = {
    wind: 0,
    water: 0,
    animal: 0,
    burst: 0
  };

  function updateZoneCountDisplay(zoneKey) {
    const countEl = document.getElementById(`count-${zoneKey}`);
    if (countEl) {
      countEl.textContent = `${zoneCurrentCounts[zoneKey]}/${zoneLimits[zoneKey]}`;
    }
  }

  // --- MATCH HANDLER ---
  function executeMatch(seedEl, zoneEl) {
    if (!seedEl || !zoneEl) return;

    const expectedMethod = zoneEl.getAttribute('data-accept');
    const seedMethod = seedEl.getAttribute('data-match');

    if (expectedMethod === seedMethod) {
      // Correct match!
      const itemsContainer = zoneEl.querySelector('.drop-zone__items');
      if (itemsContainer) itemsContainer.appendChild(seedEl);
      else zoneEl.appendChild(seedEl);

      seedEl.classList.remove('selected');
      seedEl.setAttribute('draggable', 'false');
      seedEl.style.cursor = 'default';
      seedEl.style.border = '2px solid var(--color-primary)';
      seedEl.style.background = '#eafaf1';

      zoneCurrentCounts[expectedMethod]++;
      updateZoneCountDisplay(expectedMethod);

      if (zoneCurrentCounts[expectedMethod] >= zoneLimits[expectedMethod]) {
        zoneEl.classList.add('filled');
      }

      // Success animation
      seedEl.style.transform = 'scale(1.15)';
      setTimeout(() => seedEl.style.transform = 'scale(1)', 200);

      matchedCount++;
      if (scoreEl) scoreEl.textContent = matchedCount;

      selectedSeed = null;
      dropZones.forEach(z => z.classList.remove('highlight-target'));

      // Check win condition
      if (matchedCount === totalMatches) {
        if (celebration) celebration.style.display = 'block';
        triggerConfetti();
      }
    } else {
      // Incorrect match animation
      seedEl.style.transform = 'translateX(-12px)';
      seedEl.style.borderColor = 'var(--color-accent-red)';
      setTimeout(() => {
        seedEl.style.transform = 'translateX(12px)';
        setTimeout(() => {
          seedEl.style.transform = 'translateX(0)';
          seedEl.style.borderColor = '';
        }, 120);
      }, 120);
    }
  }

  // --- TAP / CLICK TO MATCH ---
  draggables.forEach(seed => {
    seed.addEventListener('click', () => {
      // If already matched, ignore
      if (seed.getAttribute('draggable') === 'false') return;

      if (selectedSeed === seed) {
        // Deselect
        seed.classList.remove('selected');
        selectedSeed = null;
        dropZones.forEach(z => z.classList.remove('highlight-target'));
      } else {
        // Select this seed
        draggables.forEach(s => s.classList.remove('selected'));
        seed.classList.add('selected');
        selectedSeed = seed;
        dropZones.forEach(z => z.classList.add('highlight-target'));
      }
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('click', () => {
      if (selectedSeed) {
        executeMatch(selectedSeed, zone);
      }
    });
  });

  // --- DESKTOP DRAG & DROP ---
  draggables.forEach(draggable => {
    draggable.addEventListener('dragstart', () => {
      draggedItem = draggable;
      setTimeout(() => draggable.style.opacity = '0.5', 0);
    });

    draggable.addEventListener('dragend', () => {
      setTimeout(() => {
        draggable.style.opacity = '1';
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
        executeMatch(draggedItem, zone);
      }
    });
  });

  // --- RESET GAME ---
  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      matchedCount = 0;
      selectedSeed = null;
      draggedItem = null;
      if (scoreEl) scoreEl.textContent = '0';
      if (celebration) celebration.style.display = 'none';

      Object.keys(zoneCurrentCounts).forEach(k => {
        zoneCurrentCounts[k] = 0;
        updateZoneCountDisplay(k);
      });

      dropZones.forEach(z => {
        z.classList.remove('filled', 'drag-over', 'highlight-target');
        const container = z.querySelector('.drop-zone__items');
        if (container) container.innerHTML = '';
      });

      draggables.forEach(seed => {
        seed.classList.remove('selected');
        seed.setAttribute('draggable', 'true');
        seed.style.cursor = 'pointer';
        seed.style.border = '';
        seed.style.background = '';
        seed.style.transform = '';
        seedBank.appendChild(seed);
      });
    });
  }
}

/* =====================================================
   8. INTERACTIVE VOCABULARY FLASHCARDS
   ===================================================== */
function initInteractiveFlashcards() {
  const cards = document.querySelectorAll('.vocab-card');

  cards.forEach(card => {
    // Add visual tap hint badge if missing
    if (!card.querySelector('.vocab-card__badge')) {
      const badge = document.createElement('span');
      badge.className = 'vocab-card__badge';
      badge.textContent = '💡 Tap to focus';
      card.appendChild(badge);
    }

    card.addEventListener('click', () => {
      cards.forEach(c => {
        if (c !== card) c.style.borderColor = 'transparent';
      });

      const isFocused = card.style.borderColor === 'var(--color-primary)';
      if (isFocused) {
        card.style.borderColor = 'transparent';
        card.style.transform = 'scale(1)';
      } else {
        card.style.borderColor = 'var(--color-primary)';
        card.style.transform = 'scale(1.03)';
      }
    });
  });
}

/* =====================================================
   9. QUIZ LOGIC WITH VISUAL EXPLANATIONS & PERSISTENCE
   ===================================================== */
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

      siblings.forEach(sib => sib.classList.remove('selected'));
      option.classList.add('selected');
      userAnswers[qId] = option;
    });
  });

  // Check answers
  if (checkBtn) {
    checkBtn.addEventListener('click', () => {
      if (Object.keys(userAnswers).length < totalQuestions) {
        alert('Please answer all 7 questions before checking! 😊');
        return;
      }

      checkBtn.disabled = true;
      let correctCount = 0;

      Object.keys(userAnswers).forEach(qId => {
        const selectedOption = userAnswers[qId];
        const isCorrect = selectedOption.getAttribute('data-correct') === 'true';
        const feedbackEl = document.getElementById(`${qId}-feedback`);
        const explanationEl = document.getElementById(`${qId}-expl`);

        if (isCorrect) {
          selectedOption.classList.add('correct');
          correctCount++;
          if (feedbackEl) {
            feedbackEl.textContent = '✅ Correct! Great job!';
            feedbackEl.className = 'quiz-feedback show correct';
          }
        } else {
          selectedOption.classList.add('incorrect');
          const correctOption = document.querySelector(`.quiz-option[data-q="${qId}"][data-correct="true"]`);
          if (correctOption) correctOption.classList.add('correct');

          if (feedbackEl) {
            feedbackEl.textContent = '❌ Oops! See the correct answer above.';
            feedbackEl.className = 'quiz-feedback show incorrect';
          }
        }

        // Show visual educational explanation
        if (explanationEl) {
          explanationEl.classList.add('show');
        }
      });

      // Show score
      checkBtn.style.display = 'none';
      scoreContainer.classList.add('show');
      scoreNum.textContent = `${correctCount} / ${totalQuestions}`;

      const percentage = correctCount / totalQuestions;
      if (percentage === 1) scoreStars.textContent = '🌟🌟🌟';
      else if (percentage >= 0.7) scoreStars.textContent = '⭐⭐';
      else if (percentage >= 0.4) scoreStars.textContent = '⭐';
      else scoreStars.textContent = '👍';

      // Save progress to LocalStorage
      localStorage.setItem('lwe_quiz_score', correctCount);
      if (percentage >= 0.7) {
        localStorage.setItem('lwe_ch1_completed', 'true');
        applyCompletionBadge();
        triggerConfetti();
      }
    });
  }

  // Retry quiz
  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      userAnswers = {};
      checkBtn.disabled = false;
      checkBtn.style.display = 'inline-flex';
      scoreContainer.classList.remove('show');

      options.forEach(opt => {
        opt.classList.remove('selected', 'correct', 'incorrect');
      });

      document.querySelectorAll('.quiz-feedback').forEach(el => {
        el.classList.remove('show', 'correct', 'incorrect');
      });

      document.querySelectorAll('.quiz-explanation').forEach(el => {
        el.classList.remove('show');
      });

      const quizSection = document.getElementById('section-quiz');
      if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

function applyCompletionBadge() {
  const progressFill = document.querySelector('#unit-card-1 .progress-bar__fill');
  if (progressFill) progressFill.style.width = '100%';

  const navProgress = document.querySelector('#nav-ch1 .sidebar__progress');
  if (navProgress) {
    navProgress.classList.add('completed');
    navProgress.textContent = '✓';
    navProgress.style.color = 'var(--color-primary)';
    navProgress.style.fontWeight = '900';
  }
}

function restoreSavedProgress() {
  const isCompleted = localStorage.getItem('lwe_ch1_completed');
  if (isCompleted === 'true') {
    applyCompletionBadge();
  }
}

/* =====================================================
   10. CONFETTI CELEBRATION EFFECT
   ===================================================== */
function triggerConfetti() {
  const container = document.getElementById('confettiContainer');
  if (!container) return;

  container.innerHTML = '';
  const colors = ['#2ecc71', '#3498db', '#f1c40f', '#e74c3c', '#9b59b6', '#e67e22', '#1abc9c'];
  const count = 55;

  for (let i = 0; i < count; i++) {
    const piece = document.createElement('div');
    piece.className = 'confetti-piece';
    piece.style.left = `${Math.random() * 100}vw`;
    piece.style.backgroundColor = colors[Math.floor(Math.random() * colors.length)];
    piece.style.animationDuration = `${2 + Math.random() * 2}s`;
    piece.style.animationDelay = `${Math.random() * 0.5}s`;
    piece.style.transform = `rotate(${Math.random() * 360}deg)`;
    container.appendChild(piece);
  }

  setTimeout(() => {
    container.innerHTML = '';
  }, 4000);
}
