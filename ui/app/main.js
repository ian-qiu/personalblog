import './style/index.scss';

window.store={}

var dev='http://localhost:9000/';
var url,
    random=Math.random()*1000000000;

url=dev+'app.js?'+random
addScript(url,function(){
    console.info('lazy js success')
})
function addScript (url,successFun) {
    var aScript= document.createElement("script");
    var body = document.getElementsByTagName('body')[0];
    aScript.type = "text/javascript";
    aScript.src=url;
    aScript.async=false;
    aScript.setAttribute('charset', 'utf-8');
    if(successFun && typeof successFun == 'function'){
        aScript.onload=aScript.onreadystatechange=successFun;//ie只支持onreadystatechange
    }
    body.appendChild(aScript);
}