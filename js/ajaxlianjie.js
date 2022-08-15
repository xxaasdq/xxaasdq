
var haorong = {};

haorong.ajax=function (obj) {
    //第一步获取你的参数
    var url = obj.url;
    var type = obj.type;
    var dataType = obj.dataType;
    var data = obj.data;
    //把data的格式变成a=1&b=2这种格式
    var str = "";
    for(var index in data){
        str+=index+"="+data[index]+"&";
    }
    str = str.slice(0,-1);
    //同源
    if(dataType=="json"){
        var xhr = new XMLHttpRequest();
        if(type=="get"){
            xhr.open('get',url+"?"+str);
            xhr.send(null);
        }else if(type=="post"){
            xhr.open('post',url);
            xhr.setRequestHeader('Content-type','application/x-www-form-urlencoded');
            xhr.send(str);
        }
        xhr.onreadystatechange=function () {
            if(xhr.status==200&&xhr.readyState==4){
                obj.success(JSON.parse(xhr.responseText));
                
            }
        }
        
    }
    //跨域
    else if(dataType=="jsonp"){
        /*首先要有一个函数，这个fn接受一个参数，我们可以在函数中使用这个参数:
                我要先想一个绝对不会重名的函数名
         var cbname = "zhaoming"+new  Date().getTime()+Math.random().toString().slice(2);
       */
        var cbname = "haorong"+new  Date().getTime()+Math.random().toString().slice(2);
        window[cbname]=function (data) {
              obj.success(JSON.parse(data));
            document.body.removeChild(script);
        };
         /*最后要有一个可跨域标签，比如script的src链接一个外部文件，该文件返回一个函数调用，并传入实参*/
        var script =document.createElement('script');
        if(obj.callback){
            script.src = url+"?"+str+"&"+obj.callback+"="+cbname;
        }else{
            script.src = url+"?"+str+"&"+"callback="+cbname;
        }
        document.body.appendChild(script);
    }
};


