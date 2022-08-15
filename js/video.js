//591:官方
//616：娱乐
//818：解说
//619:英雄
//751：赛事
var ul = document.querySelectorAll('.wz_voide')[0].children[0];
var ul1 = document.querySelectorAll('.video_nav')[0].children[0].children;

var pageSize = 10;
video();
function video() {
       haorong.ajax({
            url:"https://huhaorong.github.io/wzry.github.io/json/video.json",
            data:{},
		         	type:"get",
		            dataType:"json",
		             success:function (data) {
		             	var arr =[]
		             	var arr1 =[]//616：娱乐
		             	var arr2 =[]//591:英雄
		             	var arr3 =[]//819：解说
		             	var arr4 =[]//619:官方
		             	var arr5 =[]//751：赛事

		             	for(var i=0;i<data.length;i++){	            		
							arr.push(data[i])
		            		arr[i].month = (arr[i].sIdxTime).substring(5,10);
		            	}
		             		for(var i=0;i<arr.length;i++){	
		             			if(arr[i].iType=="616"){
									arr1.push(arr[i])
								}
				             	if(arr[i].iType=="591"){     		
									arr2.push(arr[i])
				             	}
				             	if(arr[i].iType=="819"){		             	            		
									arr3.push(arr[i])
				             	}
				             	if(arr[i].iType=="619"){
									arr4.push(arr[i])
				             	}
				             	if(arr[i].iType=="751"){			             		        		
									arr5.push(arr[i])				  
				             	}
				            }
		             		var html = template('wz_video',{result:arr5,num:pageSize});
							ul.innerHTML=html;
							screen(arr5)
						for(var i=0;i<ul1.length;i++){
							ul1[i].onclick=function(){
								for(var i=0;i<ul1.length;i++){
									ul.innerHTML="";
									ul1[i].className ='';
								}
								this.className = 'video_nav_bg';
								if(ul1[0]==this){
									page=0
									pageSize=10;
									var html = template('wz_video',{result:arr5,num:pageSize});
									ul.innerHTML = html;
									screen(arr5);
								}
								if(ul1[1]==this){
									page=0
									pageSize=10;
									var html = template('wz_video',{result:arr2,num:pageSize});
									ul.innerHTML = html;
									screen(arr2);
								}
								if(ul1[2]==this){
									page=0
									pageSize=10;
									var html = template('wz_video',{result:arr3,num:pageSize});
									ul.innerHTML = html;
									screen(arr3);
								}
								if(ul1[3]==this){
									page=0
									pageSize=10;
									var html = template('wz_video',{result:arr1,num:pageSize});
									ul.innerHTML = html;
									screen(arr1);
								}
								if(ul1[4]==this){
									page=0
									pageSize=10;
									var html = template('wz_video',{result:arr4,num:pageSize});
									ul.innerHTML = html;
									screen(arr4	);
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
       			
	};
	
	function screen(obj){
						$(window).off('scroll');
					    $(window).on('scroll',function () {
					        var itemsHeight = $('.wrap').height();
					        var offsetTop = $('.wrap').offset().top;
					        var screenHeight = window.innerHeight;
					        var scrollTop = $(window).scrollTop();
					        var height = itemsHeight+offsetTop - scrollTop-screenHeight;				       
					        if(height<150&&(!$('.btn').hasClass('loading'))&&pageSize<=obj.length){					       	
						        ul.innerHTML="";
								var html = template('wz_video',{result:obj,num:pageSize});
								pageSize += 10;
								if(pageSize>=obj.length){
						        		pageSize=obj.length
						        		
						        		$('.btn').html("所有加载已完成")
						        	}
						        ul.innerHTML = html;
					        
					        }
					       
					    });
					}