import Md5 from 'md5'

export function setSign(config, timestamp){

    var str = ""
    if(config.method == "get" && config.params){
        var keys = Object.keys(config.params).sort();
        for (var i = 0; i < keys.length; i++) {
            str += config.params[keys[i]];
        }
    }
    
    return Md5(str + Md5(timestamp.toString().substring(0, 8)) + timestamp)
}