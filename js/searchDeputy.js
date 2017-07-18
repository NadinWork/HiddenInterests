
(function(){
	
	/* MAP */
	
	function showMapRegionHover(){
		var container = $('#hover_info_container');
		
		if( container.length ){
			$('.reg.hasHover').mouseover(function(){
				var x = ($(this)[0].getBBox().x).toFixed(0);				
				var y = ($(this)[0].getBBox().y + 75).toFixed(0);
				
				// comment:
				// paste ajax-data instead of hardcode
				// ajax-request...
				var block = $('<div class="hover_info"><span class="title">Львів</span><span class="institution"><span>'+ 3 +'</span> установи</span></div>');
			
				container.html(block)
				container.css({'left':x+'px', 'top':y+'px'})
			})
			
			$('.reg.hasHover').mouseout(function(){
				container.html('')
			})		
		}		
	}
	showMapRegionHover()
	
	
	/* click on Ukraine region */
	$(document).on('click','#ukraineMap .reg',function(){
		var inputId = $(this).attr('inputid');		

		$('#ukraineMap').hide();
		sessionStorage.setItem('inputId_1', inputId);		
		step(2, '', 'Оберіть Установу');
		requestDepartment(inputId);
		eachRegion(inputId);
	})
	
	
	
	

	/* ACTION BLOCK */
	
	var container = $('.deputy_search');
	var bgWrapper = container.find('.outer_wrapper');
	var actionContainer = container.find('.action_container');
	var actionBlock = container.find('.action');
	var locationBlock = container.find('.location');
	var title = actionBlock.find('h3');
	var form = actionBlock.find('form');
	var bg = actionContainer.find('div[data-class="bg"]');
		
	
	function requestRegion(){
		// ajax-request...
		
		form.html('<div>'+
					'<div><input type="radio" value="6" name="option_6" id="option_6" /><label for="option_6">Центральні<br> органи влади</label></div>'+
					'<div><input type="radio" value="1" name="option_1" id="option_1" /><label for="option_1">Київ</label></div>'+
					'<div><input type="radio" value="3" name="option_3" id="option_3" /><label for="option_3">Харків</label></div>'+
					'<div><input type="radio" value="4" name="option_4" id="option_4" /><label for="option_4">Запоріжжя</label></div>'+
					'<div><input type="radio" value="5" name="option_5" id="option_5" /><label for="option_5">Дніпро</label></div>'+
					'<div><input type="radio" value="2" name="option_2" id="option_2" /><label for="option_2">Львів</label></div>'+
				'</div>'+
				'<div>'+
					'<div><input type="radio" value="7" name="option_7" id="option_7" /><label for="option_7">Маріуполь</label></div>'+
					'<div><input type="radio" value="8" name="option_8" id="option_8" /><label for="option_8">Вінниця</label></div>'+
					'<div><input type="radio" value="9" name="option_9" id="option_9" /><label for="option_9">Херсон</label></div>'+
					'<div><input type="radio" value="10" name="option_10" id="option_10" /><label for="option_10">Полтава</label></div>'+
					'<div><input type="radio" value="11" name="option_11" id="option_11" /><label for="option_11">Чернігів</label></div>'+
				'</div>');
	}		
	
	
	function requestDepartment(_inputId){			
		var inputId = _inputId;
		
		// $.ajax({
			// url: "js/json/departments.json",
			// data: id,
			// type: "GET",
			// dataType: "jsonp",
			// contentType:'text/javascript; charset=UTF-8',
			// crossDomain:true
		// })
		// .done(function(response){ 
			
			var responce = {"totalCount":6,"items":[{"cityId":2,"cityName":"Львів","cityDepartments":[{"total":3,"items":[{"id":1,"name":"Львівська міська адміністрація"},{"id":2,"name":"Департамент-адміністрація міського голови"},{"id":3,"name":"Департамент житлового господарства та інфраструктури"}]}]},{"cityId":1,"cityName":"Kиїв","cityDepartments":[{"total":1,"items":[{"id":1,"name":"Kиївська міська адміністрація"}, {"id":2,"name":"Kиївський суд"}]}]}]};
			var department = responce;
		
			var i, k;
			var departmentItemsL = department.items.length;
			for(i=0; i < departmentItemsL; i++){
				var cityId = department.items[i].cityId;
				var cityDepartments = department.items[i].cityDepartments;
				var cityDepartmentsL = cityDepartments[0].items.length;
		
				if( cityId != '' && cityId == inputId ){
					var html = [];
					for(k=0; k < cityDepartmentsL; k++ ){
						var name = department.items[i].cityDepartments[0].items[k].name;
						var depId = department.items[i].cityDepartments[0].items[k].id;

						html.push('<div><input type="radio" value="'+depId+'" name="option_'+depId+'" id="option_'+depId+'" /><label for="option_'+depId+'">'+name+'</label></div>');
						
						form.html(html).wrapInner('<div/>')
					}
					
					return
				}
				else {
					form.html('<div class="nothing_found">Нічого не знайдено</div>')
				}
			}
		//});

	}		
	
	function requestDepartmentLocal(_inputId){
		// ajax-request...
		
		form.html('<div>'+
					'<div><input type="radio" value="1" name="option_1" id="option_1" /><label for="option_1">Верховна рада</label></div>'
				);
	}		
	
	function requestDeputy(){			
		// ajax-request...
		
		form.html('<div class="scr">'+
					'<div><a href="dossier.html">01. <b>Синютка</b> Олег Михайлович</a></div>'+
					'<div><a href="dossier.html">02. <b>Баран</b> Василий Степанович</a></div>'+
					'<div><a href="dossier.html">03. <b>Билас</b> Всеволод Емельянович</a></div>'+
					'<div><a href="dossier.html">04. <b>Задорожный</b> Михаил Леонович</a></div>'+
					'<div><a href="dossier.html">05. <b>Гичка</b> Михаил Михайлович</a></div>'+
					'<div><a href="dossier.html">06. <b>Домчак</b> Олег Иванович</a></div>'+
					'<div><a href="dossier.html">07. <b>Дейнека</b> Анатолий Михайлович</a></div>'+
					'<div><a href="dossier.html">08. <b>Дзюдзь</b> Михаил Семенович</a></div>'+
					'<div><a href="dossier.html">09. <b>Синютка</b> Олег Михайлович</a></div>'+
					'<div><a href="dossier.html">10. <b>Баран</b> Василий Степанович</a></div>'+
					'<div><a href="dossier.html">11. <b>Билас</b> Всеволод Емельянович</a></div>'+
					'<div><a href="dossier.html">12. <b>Задорожный</b> Михаил Леонович</a></div>'+
					'<div><a href="dossier.html">13. <b>Гичка</b> Михаил Михайлович</a></div>'+
					'<div><a href="dossier.html">14. <b>Домчак</b> Олег Иванович</a></div>'+
					'<div><a href="dossier.html">15. <b>Дейнека</b> Анатолий Михайлович</a></div>'+
					'<div><a href="dossier.html">16. <b>Дзюдзь</b> Михаил Семенович</a></div>'+						
				'</div>');
		$('<div class="list_search"><form action="" method=""><button class="do_search"></button><input type="search" placeholder="введіть ім\'я особи..."/></form></div>').insertBefore(form);

		// form.html('<select class="select2list">'+
					// '<option value="1">01. <b>Синютка</b> Олег Михайлович</option>'+
					// '<option value="2">02. <b>Баран</b> Василий Степанович</option>'+
					// '<option value="3">03. <b>Билас</b> Всеволод Емельянович</option>'+
					// '<option value="4">04. <b>Гичка</b> Михаил Михайлович</option>'+
					// '<option value="5">05. <b>Домчак</b> Олег Иванович</option>'+
					// '<option value="6">06. <b>Дзюдзь</b> Михаил Семенович</option>'+
					// '<option value="7">07. <b>Синютка</b> Олег Михайлович</option>'+
				// '</select>')
		
		// $(".select2list").select2();			

	}
	
	function scroll(){
		actionContainer.find('.list .scr').perfectScrollbar();			
	}
	
	
	function step(_step, _url, _title){
		actionContainer.attr({'data-step': _step});
		
		if( _step >= 3 ){
			title.html('<span>Крок '+(_step - 1)+'.</span>'+_title+'');
		}			
		else{
			title.html('<span>Крок '+_step+'.</span>'+_title+'');
		}
	}		
	
	function back(_step, _url, _title, _fn){		
		actionContainer.attr({'data-step': _step});

		if( _step >= 3 ){
			title.html('<span>Крок '+(_step - 1)+'.</span>'+_title+'');
		}			
		else{
			title.html('<span>Крок '+_step+'.</span>'+_title+'');
		}
	}


	function eachRegion(_inputId){
		var region = $('#region');
		
		// ajax svg-file ...
		// (to make possibility for hover and other interactivity)		
		region.html('<img src="images/regions/region_'+_inputId+'.svg">');
	
		bg.removeClass()
		bg.addClass('region_'+_inputId)
	}
	
	function eachDepartmentBg(_inputId){
		bg.removeClass()
		bg.addClass('department_'+_inputId)
	}
	
	
	function addDepartmentLocalContent(_inputId){
		var sign = $('#sign .content');
		sign.html('<div class="table"><div><p class="top">Львівська міська адміністрація</p><p class="bottom"><b>115</b> депутатів</p></div></div>')
	}
	

	
	// step 2
	$('.deputy_search').on('change', '.action_container[data-step="1"] input[type="radio"]', function(){
		var inputId = $(this).val();
		
		sessionStorage.setItem('inputId_1', inputId);
		
		step(2, '', 'Оберіть Установу');
		requestDepartment(inputId);

		eachRegion(inputId);
	})		
	$('.deputy_search').on('click', '.action_container[data-step="2"] .deputy_search_back', function(){
		back(1, '', 'Оберіть ваше місто<br>або центральні органи влади');
		requestRegion();

		$('#ukraineMap').show();
	})
	

	// step 3
	$('.deputy_search').on('change', '.action_container[data-step="2"] input[type="radio"]', function(){
		var inputId = $(this).val();
		
		sessionStorage.setItem('inputId_2', inputId);

		step(3, '', 'Оберіть Установу');
		requestDepartmentLocal(inputId);
		
		eachDepartmentBg(inputId)
	})		
	$('.deputy_search').on('click', '.action_container[data-step="3"] .deputy_search_back', function(){
		var inputId = sessionStorage.getItem('inputId_1');		
		
		back(2, '', 'Оберіть Установу');
		requestDepartment(inputId);		
	})
	
	
	// step 4
	$('.deputy_search').on('change', '.action_container[data-step="3"] input[type="radio"]', function(){
		var inputId = $(this).val();

		step(4, '', 'Оберіть депутата');
		requestDeputy(inputId);
		addDepartmentLocalContent(inputId)
		
		scroll();
	})		
	$('.deputy_search').on('click', '.action_container[data-step="4"] .deputy_search_back', function(){
		var inputId = sessionStorage.getItem('inputId_2');			
		
		back(3, '', 'Оберіть Установу');
		requestDepartmentLocal(inputId);	
	})

	
})(jQuery)	
	