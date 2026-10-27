from bs4 import BeautifulSoup

with open('index.html', 'r', encoding='utf-8') as f:
    soup = BeautifulSoup(f, 'html.parser')

chapters = [f"ch{i}" for i in range(3, 15)]

for ch in chapters:
    page = soup.find('div', id=f"page-{ch}")
    if not page:
        print(f"Missing page-{ch}")
        continue
    hero = page.find('div', class_='chapter-hero')
    tabs = page.find('div', class_='section-tabs')
    tab_list = [b.get('data-section') for b in tabs.find_all('button')] if tabs else []
    sections = [s.get('data-section') for s in page.find_all('div', class_='lesson-section')]
    print(f"{ch}: Hero: {bool(hero)}, Tabs: {tab_list}, Sections: {sections}")
