/**
 * Created by ference on 2016/12/13.
 */

var path = require('path');
var fs = require('fs');
var deepReaddirSync = require('deep-readdir').deepReaddirSync;

var exp = module.exports;


function conf(files){
    return function(app){
        for(let f of files){
            let filter = require(f);
            if(filter.disabled) continue;
            app.filter(filter());
        }
    };
}

/**
 * 所有的filter
 * @param {Application} app
 */
exp.loadFilters = function(app) {
    let svDir = path.join(__dirname, "../servers");
    let tmp = fs.readdirSync(svDir); //读出所有的server
    for(let d of tmp){
        let dir = svDir + "/" + d + "/filter";
        if(fs.existsSync(dir)){
            let files = deepReaddirSync(dir);
            app.configure('production|development', d, conf(files));
        }
    }
};