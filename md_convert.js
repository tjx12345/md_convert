var fs = require('fs');
var md = require('markdown-it')();
var path = require('path');
var fsEx = require('fs-extra');
var replaceall = require('replaceall');


//2:获取到所有.md结尾的文件 (提前加一级目录)
var param = process.argv.slice(2);
var filePath = path.join(__dirname, param[0]);
//1:递归遍历文件夹
getFiles(filePath);

function getFiles(filePath) {

    fs.readdir(filePath, function(err, files) {

        files.forEach(function(fileName) {
            var tmp = path.join(filePath, fileName);
            var fState = fs.statSync(tmp);

            if (fState.isDirectory()) {
                 getFiles(tmp);
            } else {

                if (path.extname(tmp) == '.md') {

                    fs.readFile(tmp, 'utf8', function(err, data) {
                        var htmlStr = md.render(data);
                        htmlStr = '  <meta charset="UTF-8"> \r\n' + replaceall('.md','.html',htmlStr);
                        var newPath = tmp.replace(param[0],param[1]).replace('.md','.html');
                        fsEx.outputFile(newPath,htmlStr,function(err){
                          if(err){
                            console.log(err.stack);
                          }
                        });
                    });
                    //3: 转换成html格式
                    //4: 转换按对应位置及名称
                }
            }
        });

    });

}
