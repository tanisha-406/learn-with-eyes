# 🌱 Learn with Eyes — Visual Learning Platform for Deaf Students

> **Empowering Deaf and Hard-of-Hearing Children Through Visual Education**  
> Developed for **Anushruti Academy for the Deaf (IIT Roorkee)** • Class 5 EVS / Science Curriculum

---

## 📖 About the Project

**Anushruti Academy for the Deaf (AAD)**, situated within the campus of the **Indian Institute of Technology (IIT) Roorkee**, provides specialized education and vocational training to children with severe-to-profound hearing impairment.

Standard textbooks and digital educational platforms heavily rely on auditory lectures and dense blocks of text, creating significant learning barriers for deaf learners. **Learn with Eyes** is a dedicated, visual-first digital learning platform engineered specifically around deaf pedagogy:
- **Zero Auditory Dependence**: All conceptual explanations are communicated through diagrams, animations, color coding, and visual analogies.
- **Indian Sign Language (ISL) Vocabulary**: Interactive sign language cards with step-by-step gesture guides and handshape breakdowns.
- **Interactive Tactile Activities**: Hands-on matching games designed for both desktop mice and classroom touch tablets (iPads, Android tablets).
- **Positive Gamified Feedback**: Visual stars, celebratory confetti, and clear instant visual reinforcement.

---

## 🌿 Current Unit: Unit I — Living Things (Chapter 1: Growing Plants)

Based on the Class 5 Science curriculum (`unit 1.pdf`), this interactive module covers:
1. **Why Plants Are Important**: Oxygen, food, timber, fibres, and medicine.
2. **Reproduction by Seeds**: Germination stages, seed coat, embryo, and cotyledons.
3. **Monocot vs. Dicot Seeds**: Single vs. double cotyledons with clear visual comparisons (maize, rice vs. beans, peas).
4. **Seed Dispersal Mechanisms**:
   - 🌬️ **Wind Dispersal** (Dandelion, Maple, Drumstick)
   - 🌊 **Water Dispersal** (Coconut, Lotus)
   - 🐦 **Animal Dispersal** (Mango, Xanthium cocklebur)
   - 💥 **Bursting / Explosive Mechanism** (Peas, Balsam, Okra)
5. **Vegetative Reproduction**: Growing from stems (rose, potato eyes), roots (sweet potato, carrot), and leaves (*Bryophyllum*).
6. **Non-Flowering Plants**: Spore reproduction in ferns, moss, and fungi.
7. **Agriculture & Crop Seasons**:
   - ☀️ **Kharif Crops** (Summer: rice, jowar, bajra, maize)
   - ❄️ **Rabi Crops** (Winter: wheat, gram, mustard, peas)
   - 🚜 Agricultural stages: Ploughing → Sowing → Manuring → Irrigation → Harvesting

---

## 🚀 Key Features & Architectural Improvements

| Feature | Description |
| :--- | :--- |
| **🤟 Accessible ISL Modal System** | Replaced plain browser alerts with interactive modal dialogs featuring animated handshape guides, step-by-step gesture steps, and scientific definitions. |
| **🎮 Dual-Mode Matching Game** | Works with **both** desktop HTML5 Drag-and-Drop AND **Touch/Click-to-Match** for touchscreens. Includes real-time score tracking (`0/6`), reset button, and confetti fanfare upon completion. |
| **💡 Visual Quiz with Explanations** | 7-question interactive assessment with instant visual feedback, comprehensive "Why" explanations for each answer, star rating (🌟🌟🌟), and retry functionality. |
| **🌙 Dark & High-Contrast Modes** | Full theme switcher (Light / Dark / High-Contrast) designed to minimize visual fatigue for low-vision and deaf learners. |
| **🔤 Dynamic Text Scaling** | One-click font sizing (`Normal` → `Large` → `Extra Large`) for accessibility across varying screen distances. |
| **💾 Progress Persistence** | Uses `localStorage` to preserve quiz completions, star rewards, theme preferences, and font scaling across browser restarts. |
| **📱 Responsive Design** | Seamless experience across mobile smartphones, school tablets, Chromebooks, and interactive whiteboards. |
| **⚡ 100% Offline Capable** | Built with pure HTML5, CSS3, and Vanilla JavaScript with no heavy npm dependencies, ensuring instant offline classroom usability. |

---

## 📁 Repository Structure

```
├── index.html          # Main accessible visual learning web application
├── styles.css          # Design system, CSS tokens, dark/contrast modes, responsive layout
├── app.js              # Interactive logic (ISL modal, touch matching, quiz, accessibility)
├── images/             # Visual illustrations and educational diagrams
│   ├── plant_hero.png
│   ├── seed_germination.png
│   ├── seed_dispersal.png
│   ├── dicot_monocot.png
│   ├── vegetative_reproduction.png
│   └── agriculture_stages.png
├── unit1_pages/        # Scanned reference pages from textbook
├── unit 1.pdf          # Full Class 5 textbook unit
└── README.md           # Project documentation and guide
```

---

## 🛠️ How to Run Locally

You don't need any complex build steps or dependencies:

### Method 1: Direct Browser
Simply double-click `index.html` or open it directly in any modern browser (Chrome, Edge, Firefox, Safari).

### Method 2: Local HTTP Server (Recommended)
Using Python:
```bash
python -m http.server 3000
```
Then open: [http://localhost:3000](http://localhost:3000)

---

## 🗺️ Future Roadmap

- [ ] **Chapter 2 (Food & Health)**: Interactive balanced-diet plate builder and vitamin deficiency visual charts.
- [ ] **Chapter 3 (Life of Animals)**: Animal habitat mapping and breathing mechanism animations.
- [ ] **Chapter 4 (Skeletal & Muscular System)**: 3D rotatable skeleton and interactive joint simulator.
- [ ] **ISL Video Repository**: Embedded recorded sign demonstrations by certified ISL instructors from IIT Roorkee.

---

## 🤝 Contributing

Contributions to enhance accessibility, add Indian Sign Language assets, or expand textbook chapters are warmly welcomed!
1. Fork the repository
2. Create your feature branch (`git checkout -b feature/NewChapter`)
3. Commit your changes (`git commit -m 'Add interactive food pyramid for Chapter 2'`)
4. Push to the branch (`git push origin feature/NewChapter`)
5. Open a Pull Request

---

*Dedicated with gratitude to the students and educators at Anushruti Academy for the Deaf, IIT Roorkee.*
