(function($){
	
/* UI --------------------------------------------
	LIST:
	1. QA
	2. Dossier
	3. Scroll to top
	4. Viewer
	5. Search mobile
	6. Menu mobile
	7. Upload files
	8. News slider
*/ 



/*--------------------------------------------
	QA
---------------------------------------------*/	
$('#accordion').accordion()



/*--------------------------------------------
	Dossier
---------------------------------------------*/	

var tabAbout = $('#tabs.about');
tabAbout.tabs({active:0})

tabAbout.find('.toggle').on('click', function(){
	var item = $(this).parent();
	item.toggleClass('open');
})



/*--------------------------------------------
	Scroll to top
---------------------------------------------*/	

function pageupFnc(){		
	var pageUp = $('<div id="page-up" class="fa fa-angle-up"></div>').wrapInner('<span></span>').appendTo('body');
	$(window).on('scroll', function(){
		var winH = $(window).height()/4;
		
		if ( $(this).scrollTop() > winH ){ pageUp.fadeIn();	} 
		else{ pageUp.fadeOut(); }
	});
	pageUp.on('click', function(){
		$('body,html').animate({scrollTop:0}, 400); 
		return false;
	});
}
pageupFnc();



/*--------------------------------------------
	Viewer
---------------------------------------------*/	

$('#contact_us_btn').on('click', function(e){
	e.preventDefault();
	e.stopPropagation();
	
	$('body').addClass('fixed')
	$(this).addClass('open');
	$('#contact_us_form').addClass('open')
})

$('.viewer_hide, .viewer_wrapper .overlay, .viewer_wrapper input[type="submit"]').on('click', function(e){
	e.stopPropagation();
	
	$('body').removeClass('fixed')
	$('#contact_us_form, #contact_us_btn').removeClass('open')
})



/*--------------------------------------------
	Search mobile
---------------------------------------------*/	

$('#search_mobile').on('click', function(){
	$(this).toggleClass('open')
})

$('#search_close').on('click', function(){
	$('#search_mobile').removeClass('open')
})



/*--------------------------------------------
	Menu mobile
---------------------------------------------*/	

$('#nav_mobile').on('click', function(){
	$(this).toggleClass('open')
})

	
	
/*--------------------------------------------
	Upload files
---------------------------------------------*/		

if( $('body').hasClass('analiz') ){
	Dropzone.options.myAwesomeDropzone = {
		paramName: "file", // The name that will be used to transfer the file
		maxFilesize: 25, // MB
		accept: function(file, done) {
			if (file.name == "test.pdf") {
				done("Naha, you don't.");
			}
			else { done(); }
		},

	};
}


// Uploaded results: upload inputs
var inputs = document.querySelectorAll( '.inputfile' );
Array.prototype.forEach.call( inputs, function( input )
{
	var label	 = input.nextElementSibling,
		labelVal = label.innerHTML;

	input.addEventListener( 'change', function( e )
	{
		var fileName = '';
		if( this.files && this.files.length > 1 )
			fileName = ( this.getAttribute( 'data-multiple-caption' ) || '' ).replace( '{count}', this.files.length );
		else
			fileName = e.target.value.split( '\\' ).pop();

		if( fileName )
			label.querySelector( 'span' ).innerHTML = fileName;
		else
			label.innerHTML = labelVal;
	});
});




/*--------------------------------------------
	News slider
---------------------------------------------*/	

function newsSlider(){
	var container = $('.news_slider');
	var prev = container.find('.left');
	var next = container.find('.right');
	var stripe = container.find('.stripe');
	var imgW = container.find('.stripe img').width();
	var allSlidesL = container.find('.stripe img').length;
	var counterAll = container.find('.counter .all'); 
	var counterCurrent = container.find('.counter .current'); 
	
	var index = container.find('.stripe img').eq(0).index();
	
	counterAll.html(allSlidesL);	
	stripe.width(allSlidesL * imgW);
	
	next.on('click', function(){		
		container.find('.stripe img').eq(index);		
		stripe.animate({'left': -imgW * (index + 1) +'px'});		
		
		if( index == allSlidesL - 1 ){			
			index = -1;
			stripe.animate({'left':0});			
		}		
		
		index++;		
		counterCurrent.html(index + 1);
	})	

	prev.on('click', function(){
		if( index != 0 ){
			container.find('.stripe img').eq(index-1);	
		}		
		
		if( index <= 0 ){
			index = allSlidesL;
		}
		
		stripe.animate({'left': -imgW * (index - 1) +'px'});		
		
		index--;		
		counterCurrent.html(index + 1);
	})
}
newsSlider()



	
	
})(jQuery)
