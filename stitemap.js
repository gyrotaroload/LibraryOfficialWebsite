const regex = /\<loc\>(.+)\<\/loc\>/gm;
const regex2 = /\<priority\>(.+)\<\/priority\>/gm;
var op = "";
var ps = [];
const str = `<?xml version="1.0" encoding="UTF-8"?>
<urlset
      xmlns="http://www.sitemaps.org/schemas/sitemap/0.9"
      xmlns:xsi="http://www.w3.org/2001/XMLSchema-instance"
      xsi:schemaLocation="http://www.sitemaps.org/schemas/sitemap/0.9
            http://www.sitemaps.org/schemas/sitemap/0.9/sitemap.xsd">
<!-- created with Free Online Sitemap Generator www.xml-sitemaps.com -->


<url>
  <loc>https://library-official-website.herokuapp.com/</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>1.00</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/inner?id=\$(__</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/inner?id=61cdf503b346ec72f289aa09&amp;pid=61cdf3d7f75eb35714a35b45&amp;ic=l</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/inner?id=61cdf035f75eb35714a35b30&amp;pid=61cdf00bf75eb35714a35b2c&amp;ic=l</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/inner?id=61cdd3d52245725619503d1d&amp;pid=61cdd3a92245725619503d19&amp;ic=l</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/?page=0</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/?page=1</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/?page=2</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/users/login</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.80</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/?page=3</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/?page=4</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.64</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/?page=5</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.51</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/?page=6</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.51</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/?page=7</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.41</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/inner?id=undefined&amp;pid=61cce38d2f81b86f4f8381c6&amp;ic=l</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.33</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/inner?id=undefined&amp;pid=61cce2e1b19a78ec95b0229c&amp;ic=l</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.33</priority>
</url>
<url>
  <loc>https://library-official-website.herokuapp.com/inner?id=61cdd3d52245725619503d1d&amp;pid=61cce2861052c1467ce136e5&amp;ic=l</loc>
  <lastmod>2022-02-08T00:04:52+00:00</lastmod>
  <priority>0.33</priority>
</url>


</urlset>`;
let m;
var i = 0;
while ((m = regex.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m.index === regex.lastIndex) {
        regex.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m.forEach((match, groupIndex) => {
        console.log(`Found match, group ${groupIndex}: ${match}`);
        if (groupIndex === 1) {
            op += `smStream.write({ url: '${match.replace('https://library-official-website.herokuapp.com', '')}',  changefreq: 'monthly', priority: @${i}@ });`
        }
    });
    i++;
}
let m2;
var i2 = 0;
while ((m2 = regex2.exec(str)) !== null) {
    // This is necessary to avoid infinite loops with zero-width matches
    if (m2.index === regex2.lastIndex) {
        regex2.lastIndex++;
    }

    // The result can be accessed through the `m`-variable.
    m2.forEach((match2, groupIndex2) => {
        console.log(`Found match, group ${groupIndex2}: ${match2}`);
        if (groupIndex2 === 1) {
            var re = new RegExp(`@${i2}@`, "gm");

            var subst = match2;

            // The substituted value will be contained in the result variable
            op = op.replace(re, subst);

            console.log('Substitution result: ', op);
        }
    });
    i2++;
}
console.log(op);
