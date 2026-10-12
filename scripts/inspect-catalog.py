import json
from pathlib import Path
import pdfplumber
out=Path('tmp/pdfs/harison')
out.mkdir(parents=True,exist_ok=True)
with pdfplumber.open(r'C:\Users\vansh\Downloads\HARISON.pdf') as pdf:
    pages=[]
    for i,page in enumerate(pdf.pages):
        pages.append({'page':i+1,'width':page.width,'height':page.height,'text':page.extract_text() or '', 'words':page.extract_words(),'images':len(page.images), 'annotations':page.annots})
    (out/'inspection.json').write_text(json.dumps(pages,indent=2,default=str),encoding='utf-8')
    for page in pages:
        print(f"PAGE {page['page']} {page['width']}x{page['height']} images={page['images']} annotations={len(page['annotations'] or [])}\n{page['text']}\n")
