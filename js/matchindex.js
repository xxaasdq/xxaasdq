var ul = document.querySelectorAll('.mc_allB_news')[0].children[1]
//			console.log(ul)
		render();
		    //我要写一个方法render，作用是发送请求，获得数据，然后渲染成瀑布流
		    function render() {
		        haorong.ajax({
		            url:"https://huhaorong.github.io/wzry.github.io/json/newszx.json",
		            data:{page:1,pageSize:10},
		            type:"get",
		            dataType:"json",
		            success:function (data) {
		            	var page = 0;
		            	var pageSize = 10;
		            	var arr = [];
					    $(window).on('scroll',function () {
					
					    	
					        var itemsHeight = $('.wrap').height();
					        var offsetTop = $('.wrap').offset().top;
					        var screenHeight = window.innerHeight;
					        var scrollTop = $(window).scrollTop();
					        var height = itemsHeight+offsetTop - scrollTop-screenHeight;
					        if(height<150&&(!$('.btn').hasClass('loading'))&&pageSize<data.length){
					        	ul.innerHTML="";
					        	if(pageSize>=arr.length){
					        		pageSize=arr.length
					        		$('.btn').html("所有加载已完成")
					        	}
					        	for(var i=page;i<pageSize;i++){	
				            		if(data[i].type =="赛事"){
				            			arr.push(data[i]);
				          
				            		}
				            	}
					        	
					        	var html = template('allB_news',{result:arr,num:pageSize,b:page});
								pageSize +=10;
								
//					           	console.log(document.querySelectorAll('.mc_allB_news'))
					       		ul.innerHTML = html;
					        
					        }
					       
					    })
					  	
		            	for(var i=0;i<data.length;i++){	            		

		            		if(data[i].type =="赛事"){
		            			arr.push(data[i]);
		            		
           	
		            		}
		            	}
		            	
		            	var html = template('allB_news',{result:arr,num:pageSize,b:page});
		            	pageSize += 10;
		            	console.log(ul);
		            	ul.innerHTML = html;
						
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
		 	