var ul = document.querySelectorAll('.wz_strategy')[0].children[0];
var ul1 = document.querySelectorAll('.strategy_nav')[0].children[0].children;
var page = 0;
var pageSize = 10;
strategy();
function strategy() {
       haorong.ajax({
            url:"https://huhaorong.github.io/wzry.github.io/json/strategy.json",
            data:{},
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
						var html = template('wz_strategy',{result:aar2,num:pageSize});
						ul.innerHTML = html;
		            	pageSize += 10;
		         		screen(aar2)
//		            	ul.innerHTML = html;
						for(var i=0;i<ul1.length;i++){
						ul1[i].onclick=function(){
							for(var i=0;i<ul1.length;i++){
								ul.innerHTML="";
								ul1[i].className ='';
							}
						this.className = 'strategy_nav_bg';
						if(ul1[0]==this){
							page=0
							pageSize=10;
							var html = template('wz_strategy',{result:aar2,num:pageSize});
							ul.innerHTML = html;
							screen(aar2);
						}
						if(ul1[1]==this){
							page=0
							pageSize=10;
							var arr3 =[]
							for(var i=0;i<aar2.length;i++){
						
			            		if(aar2[i].type =="新手"){
			            			arr3.push(aar2[i]);
			            			
			            		}
		            		}

							var html = template('wz_strategy',{result:arr3,num:pageSize});
							ul.innerHTML = html;
							screen(arr3);
						}
						if(ul1[2]==this){
							page=0
							pageSize=10;
							var arr4 =[]
							for(var i=0;i<aar2.length;i++){
			            		if(aar2[i].type =="英雄"){
			            			arr4.push(aar2[i]);	
			            		}
		            		}
							var html = template('wz_strategy',{result:arr4,num:pageSize});
							ul.innerHTML = html;

							screen(arr4);
						}
						if(ul1[3]==this){
							page=0
							pageSize=10;
							var arr5 =[]
							for(var i=0;i<aar2.length;i++){
			            		if(aar2[i].type =="官方"){
			            			arr5.push(aar2[i]);	
			            		}
		            		}
							var html = template('wz_strategy',{result:arr5,num:pageSize});
							ul.innerHTML = html;
							screen(arr5);
						}
						if(ul1[4]==this){
							page=0
							pageSize=10;
							var arr6 =[]
							for(var i=0;i<aar2.length;i++){
			            		if(aar2[i].type =="同人"){
			            			arr6.push(aar2[i]);	
			            		}
		            		}
							var html = template('wz_strategy',{result:arr6,num:pageSize});
							ul.innerHTML = html;
							
							screen(arr6);
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
								var html = template('wz_strategy',{result:obj,num:pageSize});
								pageSize += 10;
								if(pageSize>=obj.length){
						        		pageSize=obj.length
						        		$('.btn').html("所有加载已完成")
						        	}
						        ul.innerHTML = html;
					        
					        }
					       
					    });
					}