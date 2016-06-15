function initMenu(){
	var parentCode = $("#parentCode").val();
	if(parentCode == null || parentCode == "" || parentCode == undefined){
		return;
	}
	var data = {"parentCode":parentCode,"type":"1","isGetChild":true};
	doGetAjax($("#basePath").val()+"/user/roleMenu/list", data, doSuccessMenuBack);
}

function doSuccessMenuBack(res) {
	if (res.success == true) {
		// 菜单节点清空
		$('.left-menu').eq(0).empty();
		// 遍历菜单
		$.each(res.data, function(i, item) {
			// 根据父节点获取一级菜单
			if(item.parentCode == $("#parentCode").val()){
				$('.left-menu').eq(0).append("<dd><div class=\"title\"><span><img src=\""+$("#basePath").val()+"/resources/security/images/leftico01.png\" /></span>"+item.name+"</div><ul id=\""+item.code+"\" class=\"menuson\"></ul>")
	        	// 二级菜单
				$.each(res.data, function(j, nextItem) {
					if(item.code == nextItem.parentCode){
		            	$("#"+item.code).append("<li id=\""+nextItem.code+"\"><cite></cite><a id=\"child_menu_"+i+"\" href=\""+$("#basePath").val()+nextItem.url + "\" target=\"rightFrame\">"+nextItem.name+"</a><i></i></li>");
		            }
		        });
			}
        });
		
		//导航切换
		$(".menuson li").click(function(){
			$(".menuson li.active").removeClass("active")
			$(this).addClass("active");
		});
		$('.title').click(function(){
			var $ul = $(this).next('ul');
			$('dd').find('ul').slideUp();
			if($ul.is(':visible')){
				$(this).next('ul').slideUp();
			}else{
				$(this).next('ul').slideDown();
			}
		});
		if (sessionStorage.getItem('activeMenu')) {
			var activeMenu = sessionStorage.getItem('activeMenu');
			$("#child_menu_0[href*='"+activeMenu+"']")[0].click();
			sessionStorage.setItem('activeMenu', '');
		} else {
			//获取第一个菜单链接，显示左边属性
			$("#child_menu_0")[0].click();
		}
		
	}else{
		dealErrorMsg(res.msg);
	}
}