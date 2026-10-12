import json
from pathlib import Path
from PIL import Image, ImageOps, ImageDraw

root=Path('tmp/pdfs/harison')
out=Path('public/images/catalog/bicycle')
out.mkdir(parents=True,exist_ok=True)
products=[]
def add(code,name,category,page,box,finish=None,size=None,info=None):
    products.append(dict(code=code,name=name,category=category,page=page,crop=box,finish=finish,size=size,info=info))
black='Black powder coated'
add('HCI-120','Max DX','carrier',2,[58,105,355,441],black,'26-inch wheel')
add('HCI-140','MTB Double Decker','carrier',2,[402,82,750,414],black,'24 / 26-inch wheel')
add('HCI-145','SLR Type','carrier',2,[608,247,752,380],info='SLR type detail shown in the catalogue.')
add('HCI-102','MTB','carrier',2,[797,84,1107,390],'BCP / black','20 / 24 / 26-inch wheel','Also available in heavy duty with sticker.')
add('HCI-122','Queen','carrier',2,[53,535,430,875],black,'26-inch wheel')
add('HCI-106','Gold','carrier',2,[446,525,766,872],black,'26-inch wheel')
add('HCI-148','SLR Japanese Type','carrier',2,[790,516,1117,851],'BCP / black powder coated','16 to 20 inches')
add('HCI-143','Wild Fire','carrier',2,[53,996,327,1345],black,'26-inch wheel')
add('DX-HCI-101','Devil','carrier',2,[397,995,717,1347],black,'24 / 26-inch wheel')
add('HCI-142','Alton','carrier',2,[771,991,1124,1350],black,'26-inch wheel')
add('HCI-154','Viking','carrier',3,[50,148,477,590],'Powder coated','26-inch wheel')
add('HCI-151','Razor Back','carrier',3,[312,552,794,955],info='Frame welded tube carrier.')
add('HCI-113','French','carrier',3,[90,1015,511,1430],'Blue powder coated')
add('HCI-149','Swift','carrier',5,[794,92,983,316],black,'24 / 26-inch wheel','Moveable design.')
add('HCI-137','Lady Neon DX','carrier',5,[1002,80,1233,310],black,'26-inch wheel')
add('HCI-103','LE','carrier',5,[1248,60,1490,309],black,'26-inch wheel')
add('HCI-123','Buzz','carrier',5,[777,379,1003,601],black,'24 / 26 inches')
add('HCI-153','Fusion','carrier',5,[1001,374,1235,597],black,'26-inch wheel')
add('HCI-121','Extreme','carrier',5,[1248,361,1484,585],black,'26-inch wheel')
add('HCI-141','Sundancer','carrier',5,[755,680,1008,898],black,'18 / 20-inch wheel')
add('HCI-108','Kidds','carrier',5,[1008,677,1233,907],black,'16 / 18 / 20-inch wheel')
add('HCI-155','Tubler Type','carrier',5,[1218,657,1480,903],black,'26-inch wheel')
add('HCI-147','Tube Stand Empress','stand',5,[296,195,427,416],black,'26-inch wheel')
add('HCI-133','Tool Box','accessories',4,[822,1004,1004,1098])
add('HCI-131','Bottle Stand','accessories',4,[1090,919,1184,1095])
add('HCI-132','Derailleur Guard','accessories',4,[1280,905,1371,1095])

excluded=['HCI-111','HCI-107','HCI-112','HCI-111A','HCI-150','HCI-144A','HCI-152','HCI-146','HCI-129','HCI-128','HCI-127','HCI-126','HCI-125','HCI-119','HCI-117','HCI-110','HCI-138','HCI-118','HCI-114']
refs={2:(1172,1500),3:(884,1500),4:(1500,1173),5:(1500,986)}
# Remove adjacent printed captions from the crop without changing product pixels.
caption_masks={
    'HCI-145':[[608,352,625,380]],
    'HCI-154':[[370,395,477,501]],
    'HCI-151':[[312,552,384,587],[500,820,794,900]],
    'HCI-113':[[425,1233,511,1334]],
}
pages={}
for page in [2,3,4,5]:
    image=Image.open(root/f'large-{page}.png').convert('RGB')
    if page in [4,5]: image=image.rotate(90,expand=True)
    pages[page]=image
for item in products:
    page=pages[item['page']]
    rw,rh=refs[item['page']]
    box=tuple(round(v*(page.width/rw if i%2==0 else page.height/rh)) for i,v in enumerate(item['crop']))
    photo=page.crop(box)
    masks=caption_masks.get(item['code'],[])
    if masks:
        draw=ImageDraw.Draw(photo)
        for rect in masks:
            local=[round(rect[0]*page.width/rw)-box[0],round(rect[1]*page.height/rh)-box[1],round(rect[2]*page.width/rw)-box[0],round(rect[3]*page.height/rh)-box[1]]
            draw.rectangle(local,fill='white')
        item['captionMasks']=masks
    photo.thumbnail((900,900),Image.Resampling.LANCZOS)
    item['image']='/images/catalog/bicycle/'+item['code'].lower()+'.webp'
    photo.save('public'+item['image'],'WEBP',quality=93)
Path('data/bicycle-catalog.json').write_text(json.dumps(products,indent=2),encoding='utf-8')
Path('data/bicycle-catalog-exclusions.json').write_text(json.dumps({'source':r'C:\Users\vansh\Downloads\HARISON.pdf','excludedCodes':excluded,'categories':['carrier','stand','accessories'],'addedCarriers':['HCI-154','HCI-151']},indent=2),encoding='utf-8')
print(f'Extracted {len(products)} approved product photos; {len(excluded)} X-marked codes excluded.')
