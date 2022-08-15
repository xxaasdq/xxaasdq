var ul = document.querySelectorAll('.mc_allB_news')[0].children[0]
var ul1 = document.querySelectorAll('.news_nav')[0].children[0].children;
var pageSize =15;

		render();
		    //我要写一个方法render，作用是发送请求，获得数据，然后渲染成瀑布流
		    function render() {
		        haorong.ajax({
		            url:"https://huhaorong.github.io/wzry.github.io/json/newszx.json",
		            data:{page:1,pageSize:10},
		            type:"get",
		            dataType:"json",
		            success:function (data) {

		            	var arr = [];
		            	var aar2 =[];//最新	
		            	
		            	for(var i=0;i<data.length;i++){	            		
							arr.push(data[i])
		            		arr[i].date1 = arr[i].years+arr[i].month+arr[i].date
		            	}
		          		 function compare(arr){		          		 	
						    return function(a,b){						    	
						        var value1 = a[arr];
						        var value2 = b[arr];
						        return value1 - value2;
						        
		    				}
						}
		          		 
		          		var aar1 = arr.sort(compare('date1'));
						var aar2 =[]
						for(var i =aar1.length-1;i>=0;i--){
							aar2.push(aar1[i])
						}
						var html = template('allB_news',{result:aar2,num:pageSize});
						ul.innerHTML=html;
						screen(aar2);
						var arr1=[]//新闻
						var arr2=[]//公告
						var arr3=[]//活动
						var arr4=[]//赛事	
						for(var i = 0 ;i<aar2.length;i++){
								if(aar2[i].type=="新闻"){
									arr1.push(aar2[i])
								}
				             	if(aar2[i].type=="公告"){     		
									arr2.push(aar2[i])
				             	}
				             	if(aar2[i].type=="活动"){		             	            		
									arr3.push(aar2[i])
				             	}
				             	if(aar2[i].type=="赛事"){
									arr4.push(aar2[i])
				             	}
						}
						for(var i=0;i<ul1.length;i++){
							ul1[i].onclick=function(){
								for(var i=0;i<ul1.length;i++){
									ul.innerHTML="";
									ul1[i].className ='';
								}
								this.className = 'news_nav_bg';
								if(ul1[0]==this){
									page=0
									pageSize=15;
									var html = template('allB_news',{result:aar2,num:pageSize});
									ul.innerHTML = html;
									screen(aar2);
								}
								if(ul1[1]==this){
									page=0
									pageSize=15;
									var html = template('allB_news',{result:arr1,num:pageSize});
									ul.innerHTML = html;
									screen(arr1);
								}
								if(ul1[2]==this){
									page=0
									pageSize=15;
									var html = template('allB_news',{result:arr2,num:pageSize});
									ul.innerHTML = html;
									screen(arr2);
								}
								if(ul1[3]==this){
									page=0
									pageSize=15;
									var html = template('allB_news',{result:arr3,num:pageSize});
									ul.innerHTML = html;
									screen(arr3);
								}
								if(ul1[4]==this){
									page=0
									pageSize=15;
									var html = template('allB_news',{result:arr4,num:pageSize});
									ul.innerHTML = html;
									screen(arr4);
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
								var html = template('allB_news',{result:obj,num:pageSize});
								pageSize += 10;
								if(pageSize>=obj.length){
						        		pageSize=obj.length
						        		$('.btn').html("所有加载已完成")
						        	}
						        ul.innerHTML = html;
					        
					        }
					       
					    });
					}