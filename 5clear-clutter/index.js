 import fs from "fs/promises"
 import fsn from "fs"
 import path from "path"
 const basePath = "/Users/shubh/development/nodejs_learning/5clear-clutter"
 let files = await fs.readdir("/Users/shubh/development/nodejs_learning/5clear-clutter")
 console.log(files);

 for (const item of files) {
     let ext = item.split('.').pop(); //extension   
     console.log(ext);
     if (ext == "js" || ext == "mjs" || ext == "json" || ext == "txt" || item.split('.').length == 1) {
         continue; //skip js, mjs, json and txt files
     }  
     if (fsn.existsSync(path.join(basePath, ext))) {
         //if the directory exists, rename the file to that directory
         fs.rename(path.join(basePath, item), path.join(basePath, ext, item))
     } else {
         fs.mkdir(ext)
     }
 }