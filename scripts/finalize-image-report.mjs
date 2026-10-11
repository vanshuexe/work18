import fs from 'node:fs/promises';
import path from 'node:path';
const manifest=JSON.parse(await fs.readFile('output/image-recreation/inventory.json','utf8'));
const results=JSON.parse(await fs.readFile('output/image-recreation/generated.json','utf8'));
const firstPrompts={
 0:'Recreate the exact outlined gold italic underlined text "1986", clean edges, on transparent background. Preserve appearance and wide aspect ratio.',
 1:'Recreate this factory aerial photo collage as a new sharp photorealistic architectural collage with the same layout, industrial buildings, landscaping and angles. Preserve arrangement and transparent surrounding space.',
 2:'Recreate the reference bicycle accessories category image: mountain bicycle with accessory detail, same hexagonal crop against white. New sharp photorealistic image, keep bicycle subject, composition and crop.',
 31:'Recreate this award trophy photograph faithfully, same black rectangular frame and gold star trophy with plaque. Preserve visible plaque wording as accurately as possible; do not invent additional award claims. Sharper photo, same portrait composition.',
 32:'Recreate this award plaque photograph faithfully, same black rectangular frame and gold star with engraved plate. Preserve visible plaque wording as accurately as possible; do not invent new award claims. Same portrait composition.',
 33:'Recreate this group award presentation photograph with the same number of adult men, positions, clothing, trophy and industrial background, sharper natural documentary photograph, no extra subjects.',
 37:'Recreate this darkened bicycle outdoor lifestyle photograph faithfully as a fresh high quality photograph, preserve composition, dark exposure and bicycle subject.',
 38:'Recreate this bicycle rear luggage carrier category image as a fresh high quality photograph with the same black rack mounted above the rear bicycle wheel, same hexagonal crop and white surround.'
};
for(const result of results){
 const item=manifest.find(i=>i.id===result.id);
 if(firstPrompts[result.id])result.prompt=`Use case: precise-object-edit. Asset type: recreated website image. Input image 1 is the reference to recreate from scratch with new pixels. ${firstPrompts[result.id]} Match original aspect ratio ${item.width}:${item.height}. Do not add new text or watermarks. Preserve existing brand identity, meaningful content, object geometry and composition.`;
 if(result.prompt.startsWith('Recreate the reference product model'))result.prompt=`Use case: product-mockup. Asset type: recreated manufacturer product catalogue photograph. Recreate the supplied product reference from scratch with fresh pixels, polished crisp studio detail and realistic finish. Preserve the exact product model: same geometry, number of metal tubes, wires, brackets, mounting holes, springs, platforms, supports and rubber pieces, in the same positions and connections. Keep the same viewing angle, colors and material finish. Keep the entire product inside the frame with the reference margins. Match the original ${item.width}:${item.height} aspect ratio and original background/alpha. Preserve meaningful existing product markings. Do not invent new product parts, labels or text, and do not add a new watermark. One product image only, no montage.`;
 if(result.id===210)result.prompt='Use case: photorealistic-natural. Recreate this reference as a fresh high quality website hero photograph. Keep the same subject and composition: low viewpoint looking up at blue sky, leafy branch hanging from upper left, lush green grass along bottom, cropped black mountain bicycle front wheel and handlebars on far right, wide uncluttered sky across left and center for existing website overlay. Natural afternoon sunlight, crisp realistic photography, landscape 1600x836 aspect ratio. No text, logos or watermark. Generate a new original photograph rather than retaining the source pixels.';
 if(result.id===39)result.prompt='Recreate this reference as a new high quality product category photograph with the same red scooter, black center stand on ground, hexagonal crop and white surrounding background. Preserve the composition and vehicle geometry. Square 450x450 composition. No extra text or watermark.';
 result.method=result.path.endsWith('.svg')?'native SVG typography/icon':'built-in image_gen';
 result.final_path=path.resolve('public'+item.target);
 await fs.writeFile(`output/image-recreation/results/${result.id}.json`,JSON.stringify(result,null,2));
}
await fs.writeFile('output/image-recreation/generated.json',JSON.stringify(results,null,2));
console.log('Final prompts and workspace paths recorded for',results.length,'assets.');
