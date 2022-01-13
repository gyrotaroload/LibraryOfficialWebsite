var sharp =require('sharp');
sharp('wtf.svg')
  .toFile('output.png', function(err) {
    // output.jpg is a 300 pixels wide and 200 pixels high image
    // containing a scaled and cropped version of input.jpg
    console.log(err);
  });