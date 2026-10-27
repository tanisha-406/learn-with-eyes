import re
from bs4 import BeautifulSoup

with open('index.html', 'r', encoding='utf-8') as f:
    html = f.read()

soup = BeautifulSoup(html, 'html.parser')

pages = soup.find_all('div', class_='page')
print(f"Total pages: {len(pages)}")

for p in pages:
    pid = p.get('id', 'no-id')
    tabs = [t.get('data-section', t.text.strip()) for t in p.find_all('button', class_='section-tab')]
    sections = [s.get('data-section', s.get('id', '')) for s in p.find_all('div', class_='lesson-section')]
    imgs = [img.get('src') for img in p.find_all('img')]
    videos = p.find_all('iframe') + p.find_all('video')
    video_cards = p.find_all(class_=re.compile(r'video', re.I))
    
    print(f"\nPage: {pid}")
    print(f"  Tabs: {tabs}")
    print(f"  Lesson sections: {sections}")
    print(f"  Images count: {len(imgs)} | Sources: {imgs[:3]}")
    print(f"  Video embeds/cards count: {len(videos)} embeds, {len(video_cards)} video-classed elements")
