/**
 * Created by admin on 2017/4/12.
 */


addEvent=function(obj,fn){
    obj.addEventListener('webkitTransitionEnd',fn);
    obj.addEventListener('transitionEnd',fn);
};
tap=function(obj,fn){
    var isMove = false;
    var start = 0 ;
    var end = 0;
    obj.addEventListener('touchstart',function () {
        start = new Date().getTime();
    });
    obj.addEventListener('touchmove',function () {
        isMove =true;
    });
    obj.addEventListener('touchend',function () {
        if(!isMove){
            end = new Date().getTime();
            if(end-start<150){
                fn();
            }
        }
        isMove = false;
        start = 0 ;
        end = 0;
    })
};
window.onload=function(){
	banner();
	function banner(){
        /*
        * 需求分析：
        * 1、自动轮播（定时器 过渡）
        * 2、小圆点随着图片滚动（监听图片的当前索引，设置当前样式）
        * 3、图片能滑动（touch）
        * 4、滑动不超过一定的距离，吸附回去，左右都一样（有过渡效果）
        * 5、滑动超过了一定的距离，滑动到上一张/下一张 （有过渡效果）
        * */

        /*0、获取DOM*/
        /*获取banner*/
        var banner = document.getElementsByClassName('wz_banner')[0];
        var width = banner.offsetWidth;//不带单位
       
        /*获取图片盒子imageBox*/
        var imageBox = banner.children[0];
        /*获取小圆点盒子pointBox*/
        var pointBox = banner.children[1];
        /*获取到所有的小圆点*/
        var points = pointBox.children;
        /*获取文字div*/
       	var poin = document.getElementsByClassName('wz_banner_bg')[0];
        /*需要一个变量记录当前的索引*/
       	var dots = document.getElementById('dot').getElementsByTagName('li');
        var index = 1;
        /*公共的方法*/
        /*点亮小圆点*/
        function light(){
            /*把所有小圆点上的类名都去除*/
           if(index==4){
           	index=1;
           }
            for(var i=0;i<points.length;i++){
                points[i].className = '';
            }
            
            points[index-1].className = 'no';  
            /*把对应索引的小圆点点亮*/
        }   
        /*添加过渡*/
        function addTransiton(){
            imageBox.style.transition = "all 0.6s";
            imageBox.style.webkitTransition = "all 0.6s";        
            poin.style.transition = "all 0.2s";
            poin.style.webkitTransition = "all 0.2s";  	
            poin.style.bottom = "-44px";
            poin.style.background = "rgba(0,0,0,0.6)"
            if(index==1){
            setTimeout(function(){
            poin.children[0].innerHTML="君主刘邦重塑来袭";
            poin.style.bottom = "0px";      
            },200)
            }
            if(index==4){
            setTimeout(function(){
            poin.children[0].innerHTML="君主刘邦重塑来袭";
            poin.style.bottom = "0px";      
            },200)
            }
            
            if(index==2){
            	setTimeout(function(){
            	poin.children[0].innerHTML="看王者如何玩刘邦";
            	poin.style.bottom = "0px";      
            	poin.style.background = "rgba(0,0,0,0.1)"
            	},200)
            }
            if(index==3){
            	setTimeout(function(){
            	poin.children[0].innerHTML="WGC第二周开赛";
            	poin.style.bottom = "0px";      
            	},200)
            	
            }
        }
        /*移出过渡*/
        function removeTransiton(){
            imageBox.style.transition = "";
            imageBox.style.webkitTransition = "";
        }
        /*设置位移*/
        function setTransform(distance){
            imageBox.style.transform = "translateX("+distance+"px)";
            imageBox.style.webkitTransform = "translateX("+distance+"px)";
        }
        /*1、自动轮播（定时器 过渡）*/
        /*定时器*/
        var timer= setInterval(function(){
            index++;
            addTransiton();
            setTransform(-index*width);

        },5000);
        /*添加过渡结束事件*/
        addEvent(imageBox,function(){
            if(index>=4){
                index = 1;
                removeTransiton();
                setTransform(-index*width);
            }else if(index<=1){
                index = 4;
                removeTransiton();
                setTransform(-index*width);
            }
            /*2、小圆点随着图片滚动（监听图片的当前索引，设置当前样式）*/
            light();
        });

        /*  添加过渡结束事件原始版本
        imageBox.addEventListener('transitionEnd',function(){
            if(index>=9){
                index = 1;
                removeTransiton();
                setTransform(-index*width);
            }else if(index<=0){
                index = 8;
                removeTransiton();
                setTransform(-index*width);
            }
            light();
        });
        imageBox.addEventListener('webkitTransitionEnd',function(){
            if(index>=9){
                index = 1;
                removeTransiton();
                setTransform(-index*width);
            }else if(index<=0){
                index = 8;
                removeTransiton();
                setTransform(-index*width);
            }
            light();
        });

        */

        /*3、图片能滑动*/
        var startX = 0;
        var moveX = 0;
        var isMove = false;
        var distance = 0;
        imageBox.addEventListener('touchstart',function(e){
            /*手指放到轮播图上，停止轮播*/
            clearInterval(timer);
            startX = e.touches[0].clientX;
        });
        imageBox.addEventListener('touchmove',function(e){
            isMove = true;
            moveX = e.touches[0].clientX;
            distance = moveX - startX;
            removeTransiton();
            setTransform(-index*width+distance);
        });
        imageBox.addEventListener('touchend',function(e){
            /* 4、滑动不超过一定的距离，吸附回去，左右都一样（有过渡效果）
            * 5、滑动超过了一定的距离，滑动到上一张/下一张 （有过渡效果）*/
            if(isMove){
                if(Math.abs(distance)>width/4){
                        if(distance>0){
                            index--;
                        }else{
                            index++;
                        }
                }
                addTransiton();
                setTransform(-index*width);
            }

            startX = 0;
            moveX = 0;
            isMove = false;
            distance = 0;
            addTransiton();
            clearInterval(timer);/*要用定时器，先清定时器*/
            timer= setInterval(function(){
                index++;
                addTransiton();
                setTransform(-index*width);

            },2000);
        });
    }	

};