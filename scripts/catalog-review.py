from pathlib import Path
from PIL import Image
root=Path('tmp/pdfs/harison')
for page in [4,5]:
    source=root/f'page-{page}.png'
    image=Image.open(source).rotate(90,expand=True)
    image.save(root/f'upright-{page}.png')
