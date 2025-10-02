var slugify = require("slugify");
let a="Some string";
//slug removes spaces, makes it url friendly


console.log(slugify(a)); // Some-string
console.log(slugify("Hello World", "_")); // Hello_world

const b =slugify('some st&&(^^^^&ring', '_'); // some_standand(andring
console.log(b);

const c = slugify("some st&&(^^^^&ring ", {
    lower: true,
    strict: true, 
    locale: "en",
    trim: true,
});
console.log(c);//some-standandandring