var ul = document.querySelectorAll('.hero_list')[0].children[0];
var ul1 = document.querySelectorAll('.hero_nav')[0].children[0].children;
var pageSize =15;
		hero();
		    //我要写一个方法render，作用是发送请求，获得数据，然后渲染成瀑布流
		    function hero() {
		        haorong.ajax({
		            url:"https://huhaorong.github.io/wzry.github.io/json/heroList.json",
		            data:{page:1,pageSize:10},
		            type:"get",
		            dataType:"json",
		            success:function (data) {
		            	var arr = []//战士
		            	var arr1 =[]//法师
		            	var arr2 =[]//坦克
		            	var arr3 =[]//刺客
		            	var arr4 =[]//射手
		            	var arr5 =[]//辅住
		            	for(var i=0;i<data.length;i++){
		            		if(data[i].type =="战士"){
		            			arr.push(data[i])
		            		}
		            		if(data[i].type =="法师"){
		            			arr1.push(data[i])
		            		}
		            		if(data[i].type =="坦克"){
		            			arr2.push(data[i])
		            		}
		            		if(data[i].type =="刺客"){
		            			arr3.push(data[i])
		            		}
		            		if(data[i].type =="射手"){
		            			arr4.push(data[i])
		            		}
		            		if(data[i].type =="辅住"){
		            			arr5.push(data[i])
		            		}
		            	}
		     			var html = template('hero',{result:data});
		     			ul.innerHTML=html;
		     			for(var i=0;i<ul1.length;i++){
							ul1[i].onclick=function(){
								for(var i=0;i<ul1.length;i++){
									ul.innerHTML="";
									ul1[i].className ='';
								}
								this.className = 'hero_current';
								if(ul1[0]==this){				
								var html = template('hero',{result:data});
								ul.innerHTML = html;
								}
								if(ul1[1]==this){				
								var html = template('hero',{result:arr});
								ul.innerHTML = html;
								}
								if(ul1[2]==this){				
								var html = template('hero',{result:arr1});
								ul.innerHTML = html;
								}
								if(ul1[3]==this){				
								var html = template('hero',{result:arr2});
								ul.innerHTML = html;
								}
								if(ul1[4]==this){				
								var html = template('hero',{result:arr3});
								ul.innerHTML = html;
								}
								if(ul1[5]==this){				
								var html = template('hero',{result:arr4});
								ul.innerHTML = html;
								}
								if(ul1[6]==this){				
								var html = template('hero',{result:arr5});
								ul.innerHTML = html;
								}
							}
							
						}
		            },
		            beforeSend:function () {
		                if($btn.hasClass('loading')){
		                    return;
		                }else{
		                    $btn.addClass('loading').html('正在加载中');
		                }
		            }
		        })
		    }