/**
 * Created by suren on 5/23/17.
 */

const path = require('path');
const fs = require('fs');

module.exports = {
    getFiles : (dirname, dirPath) => {
        let normalizedPath = path.join(dirname, dirPath);
        let files = [];
        fs.readdirSync(normalizedPath).forEach(function(file) {
            if(!fs.statSync(path.join(normalizedPath, file)).isDirectory()){
                files.push({
                    name: file.split('.')[0],
                    path: normalizedPath +'/'+ file
                });
            }
        });
        return files;
    }
};

