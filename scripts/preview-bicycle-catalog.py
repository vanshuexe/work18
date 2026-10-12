import json
from PIL import Image,ImageOps,ImageDraw
from pathlib import Path
products=json.loads(Path('data/bicycle-catalog.json').read_text())
for start in range(0,len(products),12):
    group=products[start:start+12]
    sheet=Image.new('RGB',(1200,900),'#edf3f7')
    draw=ImageDraw.Draw(sheet)
    for i,p in enumerate(group):
        x=(i%4)*300;y=(i//4)*300
        image=ImageOps.contain(Image.open('public'+p['image']).convert('RGB'),(280,250))
        sheet.paste(image,(x+(300-image.width)//2,y+5+(250-image.height)//2))
        draw.text((x+12,y+266),p['code']+' '+p['name'],fill='#143d61')
    sheet.save(f'tmp/pdfs/harison/crops-{start//12}.jpg')
