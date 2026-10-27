import re

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

pages = re.findall(r'id=["\']page-[^"\']+["\']', content)
print("Pages found in index.html:")
for p in pages:
    print(" ", p)

unit_cards = re.findall(r'class="unit-card"[^>]*data-page="([^"]+)"', content)
print("\nUnit cards data-page found:")
for u in unit_cards:
    print(" ", u)

sidebar_links = re.findall(r'class="sidebar__link[^"]*"[^>]*data-page="([^"]+)"', content)
print("\nSidebar links data-page found:")
for s in sidebar_links:
    print(" ", s)
