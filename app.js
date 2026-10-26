/**
 * Visual Learning Platform - Interactive Logic
 * Class 5 Science (EVS) for Deaf Students — Anushruti Academy for the Deaf (IIT Roorkee)
 * Curriculum: Innovators' Science 5 (EduRise India) — Complete 14 Chapters & Model Papers
 */

document.addEventListener('DOMContentLoaded', () => {
  initThemeAndAccessibility();
  initNavigation();
  initTabs();
  initScrollEffects();
  initISLModalSystem();
  initChapterPreviewModal();
  initMatchingGame();
  initCh2MatchingGame();
  initCh7MatchingGame();
  initInteractiveFlashcards();
  initQuiz();
  initCh2Quiz();
  initCh7Quiz();
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
   2. NAVIGATION, SIDEBAR & CURRICULUM FILTERS
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
  window.navigateTo = (pageId) => {
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

      // Trigger animation on visible cards
      targetPage.querySelectorAll('.fade-in').forEach(el => {
        el.classList.add('visible');
      });
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
      window.navigateTo(pageId);
    });
  });

  unitCards.forEach(card => {
    card.addEventListener('click', () => {
      const pageId = card.getAttribute('data-page');
      window.navigateTo(pageId);
    });
  });

  if (headerLogo) {
    headerLogo.addEventListener('click', () => {
      window.navigateTo('home');
    });
  }

  // Curriculum Filter Chips
  const filterChips = document.querySelectorAll('#curriculumFilters .filter-chip');
  const unitBlocks = document.querySelectorAll('.unit-section-block');

  filterChips.forEach(chip => {
    chip.addEventListener('click', () => {
      filterChips.forEach(c => c.classList.remove('active'));
      chip.classList.add('active');

      const filter = chip.getAttribute('data-filter');
      unitBlocks.forEach(block => {
        if (filter === 'all' || block.getAttribute('data-unit') === filter) {
          block.style.display = 'block';
        } else {
          block.style.display = 'none';
        }
      });
    });
  });
}

/* =====================================================
   3. SECTION TABS (Scoped to each chapter)
   ===================================================== */
function initTabs() {
  const pages = document.querySelectorAll('.page');

  pages.forEach(page => {
    const tabs = page.querySelectorAll('.section-tab');
    const sections = page.querySelectorAll('.lesson-section');

    tabs.forEach(tab => {
      tab.addEventListener('click', () => {
        tabs.forEach(t => t.classList.remove('active'));
        sections.forEach(s => s.classList.remove('active'));

        tab.classList.add('active');

        const sectionId = tab.getAttribute('data-section');
        const targetSection = page.querySelector(`.lesson-section[data-section="${sectionId}"]`) ||
                              document.getElementById(`section-${sectionId}`);
        if (targetSection) {
          targetSection.classList.add('active');

          const animatedElements = targetSection.querySelectorAll('.fade-in');
          animatedElements.forEach(el => {
            el.classList.remove('visible');
            setTimeout(() => el.classList.add('visible'), 50);
          });
        }
      });
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
      if (rect.top <= windowHeight * 0.9) {
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
  // Chapter 1: Growing Plants
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
    meaning: 'Essential liquid needed by seeds to germinate, plants to make food, and humans to survive.'
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
  },

  // Chapter 2: Food and Health
  {
    id: 'food',
    word: 'Food / Eat',
    emoji: '🍲',
    graphic: '🥣🥄',
    gestureName: 'Fingertips to Mouth',
    step1: 'Bring all four fingers and thumb together in a flattened "O" handshape.',
    step2: 'Tap the fingertips gently towards your lips twice.',
    meaning: 'Nutritious substance that provides energy, growth, and repairs body tissues.'
  },
  {
    id: 'milk',
    word: 'Milk',
    emoji: '🥛',
    graphic: '🥛🐮',
    gestureName: 'Milking Hand Squeeze',
    step1: 'Hold one hand in front of you, opening and closing your fist rhythmically.',
    step2: 'Mimics the gentle milking gesture, representing calcium-rich milk for strong bones.',
    meaning: 'Complete liquid food packed with calcium and Vitamin D to build healthy teeth and bones.'
  },
  {
    id: 'apple',
    word: 'Fruit / Apple',
    emoji: '🍎',
    graphic: '🍎🍏',
    gestureName: 'Knuckle Twist at Cheek',
    step1: 'Place the knuckle of your bent index finger on your cheek.',
    step2: 'Twist your hand forward and back with a bright, cheerful expression.',
    meaning: 'Protective food rich in Vitamin A, C, minerals, and roughage that keeps doctors away.'
  },
  {
    id: 'vegetable',
    word: 'Vegetables',
    emoji: '🥕',
    graphic: '🥦🥕',
    gestureName: 'V-Hand Twist at Chin',
    step1: 'Form a "V" shape with your index and middle fingers.',
    step2: 'Touch your chin with the tips of the "V" and twist gently side to side.',
    meaning: 'Plant parts (roots, stems, leaves) providing roughage, iron, and disease protection.'
  },
  {
    id: 'doctor',
    word: 'Doctor / Nurse',
    emoji: '👩‍⚕️',
    graphic: '🩺🏥',
    gestureName: 'Wrist Pulse Check',
    step1: 'Extend your left arm with palm facing upward.',
    step2: 'Tap your right index and middle fingers onto your left wrist as if checking a pulse.',
    meaning: 'Healthcare specialist who diagnoses illnesses, provides vaccines, and treats deficiencies.'
  },
  {
    id: 'clean',
    word: 'Clean / Soap / Hygiene',
    emoji: '🧼',
    graphic: '🫧🧼',
    gestureName: 'Palms Rubbing Clean',
    step1: 'Rub your right palm across the surface of your flat left palm from heel to fingertips.',
    step2: 'Simulate scrubbing hands cleanly with soap and water to wash away germs.',
    meaning: 'Practicing cleanliness to stop the spread of communicable bacteria and viruses.'
  },

  // Chapter 7: Force, Energy & Simple Machines
  {
    id: 'push',
    word: 'Push',
    emoji: '👐',
    graphic: '🚪➡️',
    gestureName: 'Forward Flat Palms',
    step1: 'Hold both open hands in front of your chest with palms facing outward.',
    step2: 'Firmly shove hands forward away from your chest with physical emphasis.',
    meaning: 'An applied force directed away from the body that causes an object to move forward.'
  },
  {
    id: 'pull',
    word: 'Pull',
    emoji: '✊',
    graphic: '🧳⬅️',
    gestureName: 'Grasping Fist Inward',
    step1: 'Reach both open hands forward as if gripping a heavy rope.',
    step2: 'Close fingers into tight fists and pull them firmly back toward your chest.',
    meaning: 'An applied force directed towards the body that moves an object closer.'
  },
  {
    id: 'magnet',
    word: 'Magnet',
    emoji: '🧲',
    graphic: '🧲📎',
    gestureName: 'Snapping Claws Gesture',
    step1: 'Hold two curved hands apart with fingers pointing towards each other.',
    step2: 'Snap them quickly together as if attracted by an invisible magnetic force.',
    meaning: 'An object producing a magnetic field that attracts iron, nickel, and cobalt objects.'
  },
  {
    id: 'gravity',
    word: 'Gravity',
    emoji: '🌍',
    graphic: '🍎⬇️',
    gestureName: 'Falling Object Downward',
    step1: 'Hold an open flat hand high up at eye level.',
    step2: 'Drop hand swiftly straight down towards the ground to show Earth\'s downward pull.',
    meaning: 'The natural force exerted by Earth that pulls all unsupported objects downwards.'
  },
  {
    id: 'work',
    word: 'Work',
    emoji: '🔨',
    graphic: '📦➡️',
    gestureName: 'Hammering Wrist Tap',
    step1: 'Make both hands into fists.',
    step2: 'Tap the heel of your right fist onto the back of your left wrist twice.',
    meaning: 'Done ONLY when an applied force causes displacement of an object in its direction.'
  },
  {
    id: 'machine',
    word: 'Machine / Tool',
    emoji: '⚙️',
    graphic: '⚙️🔩',
    gestureName: 'Interlocking Gears',
    step1: 'Bend fingers of both hands into curved claws, palms facing you.',
    step2: 'Interlock fingers like cogwheel gear teeth and rotate wrists up and down.',
    meaning: 'Any device (lever, pulley, ramp) that makes work easier, faster, and safer.'
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
   6. CHAPTER PREVIEWS & CURRICULUM CATALOG (1-14 + Tests)
   ===================================================== */
const CHAPTER_PREVIEWS = {
  ch1: {
    title: 'Chapter 1: Growing Plants (Page 5)',
    emoji: '🌿',
    unit: 'Unit I — Living Things and Their Needs',
    desc: 'Interactive visual module ready! Learn how seeds germinate, disperse, and grow through vegetative reproduction and agriculture.',
    hasActiveModule: true,
    pageId: 'ch1',
    topics: [
      '🌰 Reproduction by Seeds & Germination Stages',
      '🌾 Monocot (1 cotyledon) vs Dicot (2 cotyledons) Seeds',
      '💨 Seed Dispersal by Wind, Water, Animals, and Bursting Pods',
      '🪴 Vegetative Reproduction from Stems, Roots, and Leaves',
      '🚜 Agriculture Stages: Ploughing, Sowing, Manuring, Irrigation, Harvesting'
    ]
  },
  ch2: {
    title: 'Chapter 2: Food and Health (Page 14)',
    emoji: '🍎',
    unit: 'Unit I — Living Things and Their Needs',
    desc: 'Interactive visual module ready! Explores nutrients, balanced diet, deficiency diseases, and hygiene habits.',
    hasActiveModule: true,
    pageId: 'ch2',
    topics: [
      '🍞 Carbohydrates & Fats — Energy-giving nutrients',
      '🥚 Proteins — Body-building nutrients for growth and repair',
      '🥕 Vitamins & Minerals — Protective nutrients guarding against illness',
      '⚠️ Deficiency Diseases: Night Blindness, Scurvy, Rickets, Goitre & Anaemia',
      '🧼 Cleanliness, Personal Hygiene, and Communicable Disease Prevention'
    ]
  },
  ch3: {
    title: 'Chapter 3: Life of Animals (Page 23)',
    emoji: '🦁',
    unit: 'Unit I — Living Things and Their Needs',
    desc: 'From textbook page 23: Habitats, breathing mechanisms across animal groups, feeding adaptations, and seasonal migration.',
    topics: [
      '🌍 Habitats: Terrestrial, Aquatic, Amphibious, and Arboreal',
      '🫁 Breathing in Animals: Gills (Fish), Spiracles (Insects), Moist Skin (Earthworm), Lungs (Mammals)',
      '🦷 Feeding Habits: Herbivores, Carnivores, Omnivores, and Rodents',
      '🦅 Movement: Wings of birds, fins of fish, legs of mammals and insects',
      '❄️ Migration in Animals: Monarch Butterfly, Arctic Tern, and Siberian Crane'
    ]
  },
  ch4: {
    title: 'Chapter 4: The Skeletal and Muscular System (Page 31)',
    emoji: '🦴',
    unit: 'Unit I — Living Things and Their Needs',
    desc: 'From textbook page 31: The human skeleton framework with 206 bones, moveable joints, and muscular system.',
    topics: [
      '💀 Human Skeleton: Skull (protects brain), Backbone (33 vertebrae), Ribcage (12 pairs)',
      '🦴 Forelimbs and Hindlimbs with Bone Marrow producing blood cells',
      '🔄 Moveable Joints: Ball & Socket (shoulder/hip), Hinge (elbow/knee), Pivot (neck), Gliding (wrist/ankle)',
      '💪 Voluntary vs Involuntary Muscles (Cardiac muscles of the heart)',
      '🧘 Importance of Correct Posture, Exercise, and Calcium for Bone Health'
    ]
  },
  ch5: {
    title: 'Chapter 5: Nervous System (Page 40)',
    emoji: '🧠',
    unit: 'Unit I — Living Things and Their Needs',
    desc: 'From textbook page 40: The master control system of our human body: Brain, Spinal Cord, Nerves, and Sense Organs.',
    topics: [
      '🧠 Brain Parts: Cerebrum (thinking & memory), Cerebellum (balance), Medulla (heartbeat & breathing)',
      '⚡ Spinal Cord: Thick nerve cord controlling automatic Reflex Actions',
      '🔌 Nerves: Sensory nerves (sense to brain), Motor nerves (brain to muscles), Mixed nerves',
      '👁️ 5 Sense Organs: Eyes, Ears, Nose, Tongue, and Skin care',
      '🤟 Visual Observation, Deaf Pedagogy, and Sign Language Integration'
    ]
  },
  ch6: {
    title: 'Chapter 6: Solids, Liquids and Gases (Page 46)',
    emoji: '🧪',
    unit: 'Unit II — Materials and Energy',
    desc: 'From textbook page 46: The molecular structure of matter, states of matter, solutions, and physical vs chemical changes.',
    topics: [
      '⚛️ Atoms and Molecules: Building blocks of all matter',
      '🧊 Solids: Tightly packed molecules with fixed shape and volume',
      '🥛 Liquids: Loosely packed molecules with fixed volume but no fixed shape',
      '💨 Gases: Molecules far apart moving freely with no fixed shape or volume',
      '🧪 Solutions: Solute (sugar) + Solvent (water) = Solution; Soluble vs Insoluble substances'
    ]
  },
  ch7: {
    title: 'Chapter 7: Force, Energy & Simple Machines (Page 52)',
    emoji: '⚡',
    unit: 'Unit II — Materials and Energy',
    desc: 'Interactive visual module ready! Features forces (elastic & buoyant forces from p. 54), work definition, forms of energy, and 6 simple machines.',
    hasActiveModule: true,
    pageId: 'ch7',
    topics: [
      '👐 Force: Push or pull that moves, stops, accelerates, slows, turns, or deforms objects',
      '🧲 Types of Force: Muscular, Magnetic, Gravity, Friction, Elastic (p. 54), Buoyant (p. 54)',
      '📐 Scientific Work: Work is done ONLY when applied force moves an object',
      '☀️ Forms of Energy (p. 54-55): Heat, Light, Electrical, Kinetic, Potential, Wind',
      '⚙️ 6 Simple Machines: Lever, Pulley, Wheel & Axle, Inclined Plane, Wedge, Screw'
    ]
  },
  ch8: {
    title: 'Chapter 8: Air and Water (Page 61)',
    emoji: '💨',
    unit: 'Unit II — Materials and Energy',
    desc: 'From textbook page 61: Atmosphere layers, properties of air, water cycle, and scientific water purification methods.',
    topics: [
      '☁️ Layers of Atmosphere: Troposphere, Stratosphere (Ozone), Mesosphere, Thermosphere, Exosphere',
      '🎈 Properties of Air: Air occupies space, has mass, and exerts pressure',
      '💧 Impurities in Water: Soluble vs Insoluble impurities',
      '🧪 Purifying Insoluble Impurities: Sedimentation, Decantation, Filtration',
      '🧼 Purifying Soluble Impurities: Evaporation, Distillation, and Chlorination'
    ]
  },
  ch9: {
    title: 'Chapter 9: Soil Erosion and Conservation (Page 71)',
    emoji: '🌍',
    unit: 'Unit III — Earth and Environment',
    desc: 'From textbook page 71: How soil is formed from rocks, factors causing soil erosion, and techniques for soil conservation.',
    topics: [
      '🪨 Soil Formation: Weathering of rocks by sun heat, rain, wind, and plant roots',
      '🌱 Soil Profile: Topsoil (rich in humus), Subsoil, and Bedrock layers',
      '💨 Soil Erosion Causes: Running rainwater, strong winds, deforestation, and overgrazing',
      '🛡️ Soil Conservation: Afforestation (planting trees), Terrace Farming on hill slopes',
      '🧱 Embankments and Bunds along riverbanks to prevent soil washout'
    ]
  },
  ch10: {
    title: 'Chapter 10: Rocks and Minerals (Page 77)',
    emoji: '💎',
    unit: 'Unit III — Earth and Environment',
    desc: 'From textbook page 77: Types of rocks, valuable minerals, petroleum formation, and conserving natural resources.',
    topics: [
      '🌋 Igneous Rocks: Granite, Basalt, Pumice, and Obsidian formed from cooling lava',
      '🌊 Sedimentary Rocks: Sandstone, Limestone, Shale, Conglomerate with embedded fossils',
      '💎 Metamorphic Rocks: Marble (from limestone), Slate (from shale), Gneiss, Quartzite',
      '⛏️ Metallic vs Non-metallic Minerals, Ores, and Gemstones',
      '⛽ Fossil Fuels: Coal and Petroleum refining; need for conservation'
    ]
  },
  ch11: {
    title: 'Chapter 11: The Earth and The Solar System (Page 87)',
    emoji: '🪐',
    unit: 'Unit III — Earth and Environment',
    desc: 'From textbook page 87: The sun, 8 orbiting planets, moon phases, solar and lunar eclipses, and artificial satellites.',
    topics: [
      '☀️ The Sun: Central glowing ball of hydrogen and helium gases',
      '🪐 8 Planets: Mercury, Venus, Earth, Mars, Jupiter, Saturn, Uranus, Neptune',
      '🌕 Earth\'s Natural Satellite: Moon surface (craters, no atmosphere) and Moon Phases',
      '🌑 Solar Eclipse (Moon between Sun & Earth) and Lunar Eclipse (Earth between Sun & Moon)',
      '🛰️ Artificial Satellites: Weather forecasting, telecommunication, and GPS navigation'
    ]
  },
  ch12: {
    title: 'Chapter 12: Natural Disasters (Page 97)',
    emoji: '🌋',
    unit: 'Unit III — Earth and Environment',
    desc: 'From textbook page 97: Natural calamities, their causes, destructive impacts, and essential survival safety precautions.',
    topics: [
      '⚡ Earthquakes: Focus, Epicentre, Richter Scale, Seismograph, and "Drop, Cover, Hold" drill',
      '🌋 Volcanoes: Active, Dormant, and Extinct volcanoes with magma chambers and craters',
      '🌊 Tsunamis: Giant ocean seismic sea waves caused by undersea earthquakes',
      '🌧️ Floods: Heavy monsoon rainfall, overflowing rivers, and waterborne disease outbreaks',
      '☀️ Droughts: Extended absence of rainfall, drying wells, famine, and rainwater harvesting'
    ]
  },
  ch13: {
    title: 'Chapter 13: Our Environment (Page 105)',
    emoji: '🌲',
    unit: 'Unit III — Earth and Environment',
    desc: 'From textbook page 105: Interdependence of plants and animals, environmental pollution, greenhouse effect, and 3Rs.',
    topics: [
      '🍃 Biotic (Living) and Abiotic (Non-living) components of Environment',
      '🌾 Food Chains and Food Webs: Producers, Herbivores, Carnivores, and Decomposers',
      '🏭 4 Major Pollutions: Air, Water, Soil, and Noise Pollution causes & remedies',
      '♻️ Waste Management: Biodegradable vs Non-biodegradable wastes',
      '🌱 The 3Rs Principle: Reduce consumption, Reuse materials, and Recycle paper/plastic'
    ]
  },
  ch14: {
    title: 'Chapter 14: Safety Rules and First Aid (Page 113)',
    emoji: '🩹',
    unit: 'Unit IV — Safety & Assessments',
    desc: 'From textbook page 113: Safety rules at home, school, and roads; immediate first aid for cuts, burns, fractures, and bites.',
    topics: [
      '🚦 Road Safety: Zebra crossings, traffic lights, and pedestrian rules',
      '🔥 Fire Safety: Fire triangle (heat, fuel, oxygen), fire extinguishers, and stop-drop-roll',
      '🩹 First Aid for Cuts and Wounds: Antiseptic wash, sterile gauze, and bandages',
      '🧊 First Aid for Burns: Cold running water, ice pack, and burn ointment (no oily pastes)',
      '🦴 Sprains & Fractures: Slings, wooden splints, and immobilisation; Snake & Dog bite care'
    ]
  },
  test1: {
    title: 'Model Test Paper 1 (Page 119)',
    emoji: '📝',
    unit: 'Unit IV — Safety & Assessments',
    desc: 'From textbook page 119: Comprehensive mid-term assessment covering Chapters 1 to 7 with multiple choice and OMR bubble format.',
    topics: [
      '🌿 Unit I Revision: Seed germination, dispersal, nutrients, skeleton, brain',
      '⚡ Unit II Revision: States of matter, types of forces, work, simple machines',
      '🔘 Darkening correct circles on standard OMR Sheet',
      '✍️ Fill in the blanks, True/False, and Short visual answer questions',
      '🎯 Ideal for classroom term assessments at Anushruti Academy'
    ]
  },
  test2: {
    title: 'Model Test Paper 2 (Page 120)',
    emoji: '📊',
    unit: 'Unit IV — Safety & Assessments',
    desc: 'From textbook page 120: Final comprehensive revision paper covering Chapters 8 to 14 with full OMR evaluation.',
    topics: [
      '💨 Unit II & III: Atmosphere, soil erosion, rocks, minerals, solar system',
      '🌋 Disaster management, environment preservation, and safety rules',
      '🔘 Complete 5-question OMR Sheet practice (Page 120 of book)',
      '📝 Scientific short answer explanations and reasoning practice',
      '🎓 Prepares deaf learners with visual multiple-choice confidence'
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

    if (data.hasActiveModule) {
      confirmBtn.textContent = 'Launch Interactive Module 🚀';
      confirmBtn.onclick = () => {
        closePreview();
        window.navigateTo(data.pageId);
      };
    } else {
      confirmBtn.textContent = 'Got it! 👍';
      confirmBtn.onclick = closePreview;
    }

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

  modal.addEventListener('click', (e) => {
    if (e.target === modal) closePreview();
  });

  document.addEventListener('keydown', (e) => {
    if (e.key === 'Escape' && modal.classList.contains('active')) closePreview();
  });
}

/* =====================================================
   7. CHAPTER 1: SEED DISPERSAL MATCHING ACTIVITY
   ===================================================== */
function initMatchingGame() {
  const seedBank = document.getElementById('seedBank');
  const dropZones = document.querySelectorAll('#matchGame .drop-zone');
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

  function executeMatch(seedEl, zoneEl) {
    if (!seedEl || !zoneEl) return;

    const expectedMethod = zoneEl.getAttribute('data-accept');
    const seedMethod = seedEl.getAttribute('data-match');

    if (expectedMethod === seedMethod) {
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

      seedEl.style.transform = 'scale(1.15)';
      setTimeout(() => seedEl.style.transform = 'scale(1)', 200);

      matchedCount++;
      if (scoreEl) scoreEl.textContent = matchedCount;

      if (matchedCount === totalMatches) {
        if (celebration) celebration.style.display = 'block';
        triggerConfetti();
      }
    } else {
      seedEl.style.animation = 'shake 0.4s ease';
      setTimeout(() => seedEl.style.animation = '', 400);
    }
  }

  document.querySelectorAll('#seedBank .drag-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.parentElement !== seedBank) return;
      if (selectedSeed === item) {
        item.classList.remove('selected');
        selectedSeed = null;
      } else {
        if (selectedSeed) selectedSeed.classList.remove('selected');
        selectedSeed = item;
        item.classList.add('selected');
      }
    });

    item.addEventListener('dragstart', (e) => {
      draggedItem = item;
      e.dataTransfer.setData('text/plain', item.id);
      setTimeout(() => item.classList.add('dragging'), 0);
    });

    item.addEventListener('dragend', () => {
      item.classList.remove('dragging');
      draggedItem = null;
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('click', () => {
      if (!selectedSeed) return;
      const zoneKey = zone.getAttribute('data-accept');
      if (zoneCurrentCounts[zoneKey] < zoneLimits[zoneKey]) {
        executeMatch(selectedSeed, zone);
        selectedSeed = null;
      }
    });

    zone.addEventListener('dragover', (e) => {
      e.preventDefault();
      const zoneKey = zone.getAttribute('data-accept');
      if (zoneCurrentCounts[zoneKey] < zoneLimits[zoneKey]) {
        zone.classList.add('drag-over');
      }
    });

    zone.addEventListener('dragleave', () => {
      zone.classList.remove('drag-over');
    });

    zone.addEventListener('drop', (e) => {
      e.preventDefault();
      zone.classList.remove('drag-over');
      if (draggedItem) {
        const zoneKey = zone.getAttribute('data-accept');
        if (zoneCurrentCounts[zoneKey] < zoneLimits[zoneKey]) {
          executeMatch(draggedItem, zone);
        }
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      dropZones.forEach(zone => {
        zone.classList.remove('filled', 'drag-over');
        const items = zone.querySelectorAll('.drag-item');
        items.forEach(item => {
          item.setAttribute('draggable', 'true');
          item.style.cursor = 'grab';
          item.style.border = '';
          item.style.background = '';
          item.classList.remove('selected');
          seedBank.appendChild(item);
        });
      });

      for (let k in zoneCurrentCounts) {
        zoneCurrentCounts[k] = 0;
        updateZoneCountDisplay(k);
      }

      matchedCount = 0;
      if (scoreEl) scoreEl.textContent = '0';
      if (celebration) celebration.style.display = 'none';
      selectedSeed = null;
    });
  }
}

/* =====================================================
   8. CHAPTER 2: NUTRIENTS & DEFICIENCY MATCHING GAME
   ===================================================== */
function initCh2MatchingGame() {
  const bank = document.getElementById('ch2Bank');
  const dropZones = document.querySelectorAll('#ch2MatchGame .drop-zone');
  const scoreEl = document.getElementById('ch2MatchScoreCount');
  const celebration = document.getElementById('ch2MatchCelebration');
  const resetBtn = document.getElementById('resetCh2MatchBtn');

  if (!bank || dropZones.length === 0) return;

  let selectedNutrient = null;
  let matchedCount = 0;
  const totalMatches = 4;

  function executeCh2Match(itemEl, zoneEl) {
    if (!itemEl || !zoneEl) return;

    const acceptKey = zoneEl.getAttribute('data-ch2-accept');
    const matchKey = itemEl.getAttribute('data-ch2-match');

    if (acceptKey === matchKey) {
      const itemsContainer = zoneEl.querySelector('.drop-zone__items');
      if (itemsContainer) itemsContainer.appendChild(itemEl);
      else zoneEl.appendChild(itemEl);

      itemEl.classList.remove('selected');
      itemEl.style.cursor = 'default';
      itemEl.style.border = '2px solid var(--color-primary)';
      itemEl.style.background = '#eafaf1';

      zoneEl.classList.add('filled');
      const countEl = document.getElementById(`count-${acceptKey}`);
      if (countEl) countEl.textContent = '1/1';

      matchedCount++;
      if (scoreEl) scoreEl.textContent = matchedCount;

      if (matchedCount === totalMatches) {
        if (celebration) celebration.style.display = 'block';
        triggerConfetti();
      }
    } else {
      itemEl.style.animation = 'shake 0.4s ease';
      setTimeout(() => itemEl.style.animation = '', 400);
    }
  }

  document.querySelectorAll('#ch2Bank .drag-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.parentElement !== bank) return;
      if (selectedNutrient === item) {
        item.classList.remove('selected');
        selectedNutrient = null;
      } else {
        if (selectedNutrient) selectedNutrient.classList.remove('selected');
        selectedNutrient = item;
        item.classList.add('selected');
      }
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('click', () => {
      if (!selectedNutrient) return;
      if (!zone.classList.contains('filled')) {
        executeCh2Match(selectedNutrient, zone);
        selectedNutrient = null;
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      dropZones.forEach(zone => {
        zone.classList.remove('filled');
        const items = zone.querySelectorAll('.drag-item');
        items.forEach(item => {
          item.style.cursor = 'pointer';
          item.style.border = '';
          item.style.background = '';
          item.classList.remove('selected');
          bank.appendChild(item);
        });
        const acceptKey = zone.getAttribute('data-ch2-accept');
        const countEl = document.getElementById(`count-${acceptKey}`);
        if (countEl) countEl.textContent = '0/1';
      });

      matchedCount = 0;
      if (scoreEl) scoreEl.textContent = '0';
      if (celebration) celebration.style.display = 'none';
      selectedNutrient = null;
    });
  }
}

/* =====================================================
   9. CHAPTER 7: FORCE & SIMPLE MACHINE MATCHING GAME
   ===================================================== */
function initCh7MatchingGame() {
  const bank = document.getElementById('ch7Bank');
  const dropZones = document.querySelectorAll('#ch7MatchGame .drop-zone');
  const scoreEl = document.getElementById('ch7MatchScoreCount');
  const celebration = document.getElementById('ch7MatchCelebration');
  const resetBtn = document.getElementById('resetCh7MatchBtn');

  if (!bank || dropZones.length === 0) return;

  let selectedTool = null;
  let matchedCount = 0;
  const totalMatches = 4;

  function executeCh7Match(itemEl, zoneEl) {
    if (!itemEl || !zoneEl) return;

    const acceptKey = zoneEl.getAttribute('data-ch7-accept');
    const matchKey = itemEl.getAttribute('data-ch7-match');

    if (acceptKey === matchKey) {
      const itemsContainer = zoneEl.querySelector('.drop-zone__items');
      if (itemsContainer) itemsContainer.appendChild(itemEl);
      else zoneEl.appendChild(itemEl);

      itemEl.classList.remove('selected');
      itemEl.style.cursor = 'default';
      itemEl.style.border = '2px solid var(--color-primary)';
      itemEl.style.background = '#eafaf1';

      zoneEl.classList.add('filled');
      const countEl = document.getElementById(`count-${acceptKey}`);
      if (countEl) countEl.textContent = '1/1';

      matchedCount++;
      if (scoreEl) scoreEl.textContent = matchedCount;

      if (matchedCount === totalMatches) {
        if (celebration) celebration.style.display = 'block';
        triggerConfetti();
      }
    } else {
      itemEl.style.animation = 'shake 0.4s ease';
      setTimeout(() => itemEl.style.animation = '', 400);
    }
  }

  document.querySelectorAll('#ch7Bank .drag-item').forEach(item => {
    item.addEventListener('click', () => {
      if (item.parentElement !== bank) return;
      if (selectedTool === item) {
        item.classList.remove('selected');
        selectedTool = null;
      } else {
        if (selectedTool) selectedTool.classList.remove('selected');
        selectedTool = item;
        item.classList.add('selected');
      }
    });
  });

  dropZones.forEach(zone => {
    zone.addEventListener('click', () => {
      if (!selectedTool) return;
      if (!zone.classList.contains('filled')) {
        executeCh7Match(selectedTool, zone);
        selectedTool = null;
      }
    });
  });

  if (resetBtn) {
    resetBtn.addEventListener('click', () => {
      dropZones.forEach(zone => {
        zone.classList.remove('filled');
        const items = zone.querySelectorAll('.drag-item');
        items.forEach(item => {
          item.style.cursor = 'pointer';
          item.style.border = '';
          item.style.background = '';
          item.classList.remove('selected');
          bank.appendChild(item);
        });
        const acceptKey = zone.getAttribute('data-ch7-accept');
        const countEl = document.getElementById(`count-${acceptKey}`);
        if (countEl) countEl.textContent = '0/1';
      });

      matchedCount = 0;
      if (scoreEl) scoreEl.textContent = '0';
      if (celebration) celebration.style.display = 'none';
      selectedTool = null;
    });
  }
}

/* =====================================================
   10. INTERACTIVE FLASHCARDS (Hover & Tap)
   ===================================================== */
function initInteractiveFlashcards() {
  const cards = document.querySelectorAll('.vocab-card');
  cards.forEach(card => {
    card.addEventListener('click', () => {
      card.style.transform = 'scale(0.96)';
      setTimeout(() => {
        card.style.transform = '';
      }, 150);
    });
  });
}

/* =====================================================
   11. CHAPTER 1 QUIZ LOGIC
   ===================================================== */
function initQuiz() {
  const options = document.querySelectorAll('.quiz-option[data-q]');
  const checkBtn = document.getElementById('checkQuizBtn');
  const retryBtn = document.getElementById('retryQuizBtn');
  const scoreContainer = document.getElementById('quizScore');
  const scoreNum = document.getElementById('quizScoreNum');
  const scoreStars = document.getElementById('quizStars');

  if (!checkBtn) return;

  let userAnswers = {};
  const totalQuestions = 7;

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if (checkBtn.disabled) return;
      const qId = opt.getAttribute('data-q');
      const siblings = document.querySelectorAll(`.quiz-option[data-q="${qId}"]`);
      siblings.forEach(s => s.classList.remove('selected'));
      opt.classList.add('selected');
      userAnswers[qId] = opt.id;
    });
  });

  checkBtn.addEventListener('click', () => {
    if (Object.keys(userAnswers).length < totalQuestions) {
      alert(`Please answer all ${totalQuestions} questions before checking! 📝`);
      return;
    }

    checkBtn.disabled = true;
    let correctCount = 0;

    for (let q = 1; q <= totalQuestions; q++) {
      const qId = `q${q}`;
      const selectedId = userAnswers[qId];
      const selectedOption = document.getElementById(selectedId);
      const feedbackEl = document.getElementById(`${qId}-feedback`);
      const explanationEl = document.getElementById(`${qId}-expl`);
      const isCorrect = selectedOption && selectedOption.getAttribute('data-correct') === 'true';

      if (isCorrect) {
        selectedOption.classList.add('correct');
        correctCount++;
        if (feedbackEl) {
          feedbackEl.textContent = '✅ Correct! Great job!';
          feedbackEl.className = 'quiz-feedback show correct';
        }
      } else {
        if (selectedOption) selectedOption.classList.add('incorrect');
        const correctOption = document.querySelector(`.quiz-option[data-q="${qId}"][data-correct="true"]`);
        if (correctOption) correctOption.classList.add('correct');

        if (feedbackEl) {
          feedbackEl.textContent = '❌ Oops! See the correct answer above.';
          feedbackEl.className = 'quiz-feedback show incorrect';
        }
      }

      if (explanationEl) explanationEl.classList.add('show');
    }

    checkBtn.style.display = 'none';
    if (scoreContainer) scoreContainer.classList.add('show');
    if (scoreNum) scoreNum.textContent = `${correctCount} / ${totalQuestions}`;

    const percentage = correctCount / totalQuestions;
    if (scoreStars) {
      if (percentage === 1) scoreStars.textContent = '🌟🌟🌟';
      else if (percentage >= 0.7) scoreStars.textContent = '⭐⭐';
      else if (percentage >= 0.4) scoreStars.textContent = '⭐';
      else scoreStars.textContent = '👍';
    }

    localStorage.setItem('lwe_quiz_score', correctCount);
    if (percentage >= 0.7) {
      localStorage.setItem('lwe_ch1_completed', 'true');
      applyCompletionBadge('ch1');
      triggerConfetti();
    }
  });

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      userAnswers = {};
      checkBtn.disabled = false;
      checkBtn.style.display = 'inline-flex';
      if (scoreContainer) scoreContainer.classList.remove('show');

      options.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
      document.querySelectorAll('#section-quiz .quiz-feedback').forEach(el => el.classList.remove('show', 'correct', 'incorrect'));
      document.querySelectorAll('#section-quiz .quiz-explanation').forEach(el => el.classList.remove('show'));

      const quizSection = document.getElementById('section-quiz');
      if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* =====================================================
   12. CHAPTER 2 QUIZ LOGIC
   ===================================================== */
function initCh2Quiz() {
  const options = document.querySelectorAll('.quiz-option[data-ch2-correct]');
  const checkBtn = document.getElementById('checkCh2QuizBtn');
  const retryBtn = document.getElementById('retryCh2QuizBtn');
  const scoreContainer = document.getElementById('ch2QuizScore');
  const scoreNum = document.getElementById('ch2QuizScoreNum');
  const scoreStars = document.getElementById('ch2QuizStars');

  if (!checkBtn) return;

  let userAnswers = {};
  const totalQuestions = 3;

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if (checkBtn.disabled) return;
      const qBlock = opt.closest('.quiz-question');
      if (!qBlock) return;
      const qId = qBlock.id;
      qBlock.querySelectorAll('.quiz-option').forEach(s => s.classList.remove('selected'));
      opt.classList.add('selected');
      userAnswers[qId] = opt;
    });
  });

  checkBtn.addEventListener('click', () => {
    if (Object.keys(userAnswers).length < totalQuestions) {
      alert(`Please answer all ${totalQuestions} questions before checking! 🍎`);
      return;
    }

    checkBtn.disabled = true;
    let correctCount = 0;

    for (let q = 1; q <= totalQuestions; q++) {
      const qId = `ch2-q${q}`;
      const selectedOption = userAnswers[qId];
      const feedbackEl = document.getElementById(`${qId}-feedback`);
      const explanationEl = document.getElementById(`${qId}-expl`);
      const isCorrect = selectedOption && selectedOption.getAttribute('data-ch2-correct') === 'true';

      if (isCorrect) {
        selectedOption.classList.add('correct');
        correctCount++;
        if (feedbackEl) {
          feedbackEl.textContent = '✅ Correct! Nutritious choice!';
          feedbackEl.className = 'quiz-feedback show correct';
        }
      } else {
        if (selectedOption) selectedOption.classList.add('incorrect');
        const correctOption = document.querySelector(`#${qId} .quiz-option[data-ch2-correct="true"]`);
        if (correctOption) correctOption.classList.add('correct');

        if (feedbackEl) {
          feedbackEl.textContent = '❌ See the healthy correct answer above!';
          feedbackEl.className = 'quiz-feedback show incorrect';
        }
      }

      if (explanationEl) explanationEl.classList.add('show');
    }

    checkBtn.style.display = 'none';
    if (scoreContainer) scoreContainer.classList.add('show');
    if (scoreNum) scoreNum.textContent = `${correctCount} / ${totalQuestions}`;

    const percentage = correctCount / totalQuestions;
    if (scoreStars) {
      if (percentage === 1) scoreStars.textContent = '🌟🌟🌟';
      else if (percentage >= 0.7) scoreStars.textContent = '⭐⭐';
      else scoreStars.textContent = '⭐';
    }

    localStorage.setItem('lwe_ch2_completed', 'true');
    applyCompletionBadge('ch2');
    triggerConfetti();
  });

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      userAnswers = {};
      checkBtn.disabled = false;
      checkBtn.style.display = 'inline-flex';
      if (scoreContainer) scoreContainer.classList.remove('show');

      options.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
      document.querySelectorAll('#section-ch2-quiz .quiz-feedback').forEach(el => el.classList.remove('show', 'correct', 'incorrect'));
      document.querySelectorAll('#section-ch2-quiz .quiz-explanation').forEach(el => el.classList.remove('show'));

      const quizSection = document.getElementById('section-ch2-quiz');
      if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* =====================================================
   13. CHAPTER 7 QUIZ LOGIC
   ===================================================== */
function initCh7Quiz() {
  const options = document.querySelectorAll('.quiz-option[data-ch7-correct]');
  const checkBtn = document.getElementById('checkCh7QuizBtn');
  const retryBtn = document.getElementById('retryCh7QuizBtn');
  const scoreContainer = document.getElementById('ch7QuizScore');
  const scoreNum = document.getElementById('ch7QuizScoreNum');
  const scoreStars = document.getElementById('ch7QuizStars');

  if (!checkBtn) return;

  let userAnswers = {};
  const totalQuestions = 3;

  options.forEach(opt => {
    opt.addEventListener('click', () => {
      if (checkBtn.disabled) return;
      const qBlock = opt.closest('.quiz-question');
      if (!qBlock) return;
      const qId = qBlock.id;
      qBlock.querySelectorAll('.quiz-option').forEach(s => s.classList.remove('selected'));
      opt.classList.add('selected');
      userAnswers[qId] = opt;
    });
  });

  checkBtn.addEventListener('click', () => {
    if (Object.keys(userAnswers).length < totalQuestions) {
      alert(`Please answer all ${totalQuestions} questions before checking! ⚡`);
      return;
    }

    checkBtn.disabled = true;
    let correctCount = 0;

    for (let q = 1; q <= totalQuestions; q++) {
      const qId = `ch7-q${q}`;
      const selectedOption = userAnswers[qId];
      const feedbackEl = document.getElementById(`${qId}-feedback`);
      const explanationEl = document.getElementById(`${qId}-expl`);
      const isCorrect = selectedOption && selectedOption.getAttribute('data-ch7-correct') === 'true';

      if (isCorrect) {
        selectedOption.classList.add('correct');
        correctCount++;
        if (feedbackEl) {
          feedbackEl.textContent = '✅ Powerful answer! Exactly right!';
          feedbackEl.className = 'quiz-feedback show correct';
        }
      } else {
        if (selectedOption) selectedOption.classList.add('incorrect');
        const correctOption = document.querySelector(`#${qId} .quiz-option[data-ch7-correct="true"]`);
        if (correctOption) correctOption.classList.add('correct');

        if (feedbackEl) {
          feedbackEl.textContent = '❌ See the scientific explanation above!';
          feedbackEl.className = 'quiz-feedback show incorrect';
        }
      }

      if (explanationEl) explanationEl.classList.add('show');
    }

    checkBtn.style.display = 'none';
    if (scoreContainer) scoreContainer.classList.add('show');
    if (scoreNum) scoreNum.textContent = `${correctCount} / ${totalQuestions}`;

    const percentage = correctCount / totalQuestions;
    if (scoreStars) {
      if (percentage === 1) scoreStars.textContent = '🌟🌟🌟';
      else if (percentage >= 0.7) scoreStars.textContent = '⭐⭐';
      else scoreStars.textContent = '⭐';
    }

    localStorage.setItem('lwe_ch7_completed', 'true');
    applyCompletionBadge('ch7');
    triggerConfetti();
  });

  if (retryBtn) {
    retryBtn.addEventListener('click', () => {
      userAnswers = {};
      checkBtn.disabled = false;
      checkBtn.style.display = 'inline-flex';
      if (scoreContainer) scoreContainer.classList.remove('show');

      options.forEach(opt => opt.classList.remove('selected', 'correct', 'incorrect'));
      document.querySelectorAll('#section-ch7-quiz .quiz-feedback').forEach(el => el.classList.remove('show', 'correct', 'incorrect'));
      document.querySelectorAll('#section-ch7-quiz .quiz-explanation').forEach(el => el.classList.remove('show'));

      const quizSection = document.getElementById('section-ch7-quiz');
      if (quizSection) quizSection.scrollIntoView({ behavior: 'smooth' });
    });
  }
}

/* =====================================================
   14. COMPLETION BADGES & SAVED PROGRESS
   ===================================================== */
function applyCompletionBadge(chKey) {
  const num = chKey === 'ch1' ? '1' : chKey === 'ch2' ? '2' : '7';
  const progressFill = document.querySelector(`#unit-card-${num} .progress-bar__fill`);
  if (progressFill) progressFill.style.width = '100%';

  const navProgress = document.querySelector(`#nav-${chKey} .sidebar__progress`);
  if (navProgress) {
    navProgress.classList.add('completed');
    navProgress.textContent = '✓';
    navProgress.style.color = 'var(--color-primary)';
    navProgress.style.fontWeight = '900';
  }
}

function restoreSavedProgress() {
  if (localStorage.getItem('lwe_ch1_completed') === 'true') {
    applyCompletionBadge('ch1');
  }
  if (localStorage.getItem('lwe_ch2_completed') === 'true') {
    applyCompletionBadge('ch2');
  }
  if (localStorage.getItem('lwe_ch7_completed') === 'true') {
    applyCompletionBadge('ch7');
  }
}

/* =====================================================
   15. CONFETTI CELEBRATION EFFECT
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
