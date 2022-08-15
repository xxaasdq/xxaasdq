var ul = document.querySelectorAll('.wz_news')[0].children[1];
render();
strategy();
video();
    function render() {
       haorong.ajax({
            url:"https://huhaorong.github.io/wzry.github.io/json/newszx.json",
            data:{pass:1,pageSize:10},
            type:"get",
            dataType:"json",
            success:function (data) {

            	var arr =[]//公告
            	var arr1 =[]//赛事
            	var arr2 =[]//新闻
            	var arr3 =[]//活动
               	for(var i=0;i<data.length;i++){	            		
		        	if(data[i].type =="公告"){
		            	arr.push(data[i]);	        	
		            }
		        	if(data[i].type =="赛事"){
		            	arr1.push(data[i]);	 
		            	
		            }
		        	if(data[i].type =="新闻"){
		            	arr2.push(data[i]);	        	
		            }
		        	if(data[i].type =="活动"){
		            	arr3.push(data[i]);           	         	
		           } 
		        }
               
            	var html = template('allB_news',{arr:arr,arr1:arr1,arr2:arr2,arr3:arr3});
            	ul.innerHTML = html
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
var ul1 = document.querySelectorAll('.wz_strategy')[0].children[1];
function strategy() {
       haorong.ajax({
            url:"https://huhaorong.github.io/wzry.github.io/json/strategy.json",
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
						var html = template('wz_strategy',{result:aar2});
						ul1.innerHTML = html;
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
var ul2 = document.querySelectorAll('.wz_voide')[0].children[1];
	function video() {
       haorong.ajax({
            url:"https://huhaorong.github.io/wzry.github.io/json/video.json",
            data:{},
		         	type:"get",
		            dataType:"json",
		             success:function (data) {
		             	var arr =[]       
		             	var arr5 = []
		             	var pageSize = 6;
		             	for(var i=0;i<data.length;i++){	            		
							arr.push(data[i])
		            		arr[i].month = (arr[i].sIdxTime).substring(5,10);
		            	}    
		            	for(var i=0;i<arr.length;i++){			             	
				             	if(arr[i].iType=="751"){			             		        		
									arr5.push(arr[i])				  
				             	}
				            }
		             		var html = template('wz_video',{result:arr5,num:pageSize});
							ul2.innerHTML=html;
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