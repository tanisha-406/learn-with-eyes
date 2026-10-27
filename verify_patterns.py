import sys
import re

sys.stdout.reconfigure(encoding='utf-8', errors='replace')

with open('index.html', 'r', encoding='utf-8') as f:
    content = f.read()

for ch in [3, 4, 5, 6, 8, 9, 10, 11, 12, 13, 14]:
    # Check tab pattern
    tab_pat = f'data-section="ch{ch}-lesson"[^>]*>.*?<span>Visual Lesson</span>\\s*</button>'
    m_tab = re.search(tab_pat, content, re.DOTALL)
    
    # Check lesson end pattern before isl
    sec_pat = f'data-section="ch{ch}-isl"'
    m_sec = re.search(sec_pat, content)
    
    print(f"Ch {ch}: Tab match: {bool(m_tab)}, ISL section match: {bool(m_sec)}")
