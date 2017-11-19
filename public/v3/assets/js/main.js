(function( $, undefined ) {

  $('#meter').on('pagecreate', function() {
		if (!(!!localStorage.getItem('accessToken')) ) {
			$.mobile.changePage('#login', { transition: 'slideup',
				allowSamePageTransition: true
			});
		}
		$('button#logout').bind('click', (e) => {
			localStorage.setItem('accessToken', '');
			$.mobile.changePage('#login', { transition: 'slideup',
				allowSamePageTransition: true
			});
		});
		const cloudHost = 'https://hashvich.herokuapp.com/';
		const cloudWebSocketPort = '80';
  });

  $('#meter').bind('pagehide', function(e) {
    /*$('a.ui-btn').removeClass('ui-btn-active');
    if ( !!$('#cb2').attr('checked') && !$(this).hasClass('ui-btn-active') ) {
      $(this).addClass('ui-page-active');
    }*/
  });

  $('#login').on('pagecreate', function() {
  	$('button#login-submit').bind('click', (e) => {
  		$('login-rolling').css("display","block");
  		let loginInfo ={
				email: $('#login-email').val(),
				password:$('#login-password').val()
			};
  		console.log('loginInfo -> ',loginInfo);
			$.ajax({
				url: "api/user/login",
				type: 'POST',
				data: JSON.stringify(loginInfo),
				/*dataType: "json",*/
				contentType: "application/json",
				success: (data) => {
					localStorage.setItem('accessToken', data.token);
					localStorage.setItem('email', $('#login-email').val());
					localStorage.setItem('password', $('#login-password').val());
					$('login-rolling').css("display","none");
					$('login-success').css("display","block");
					setTimeout(function(){
						$('login-success').css("display","none");
						$.mobile.changePage('#meter', { transition: 'slideup',
							allowSamePageTransition: true
						});
						}, 500);
				},
				error: (err) => {
					$('login-rolling').css("display","none");
					$('login-failed').css("display","block");
					setTimeout(function(){ $('login-failed').css("display","none"); }, 500);
					console.log('err -> ',err);
				}
			});
			e.preventDefault();
		});

/*url:host,
 type:'get',
 dataType: "xml",
 data:"status",
 success:function(xml){
 document.getElementById('power').innerHTML = $(xml).find("power").text();
 document.getElementById('temp').innerHTML = $(xml).find("temp").text() + " &#8451;";
 document.getElementById('led').innerHTML = $(xml).find("led").html();
 }
      $('a').bind('click', function(e) {
      var trans = $(this).text() || 'none',
          rev = !!$('#cb1').attr('checked');

      $.mobile.changePage('#page1', { transition: trans,
                                      allowSamePageTransition: true,
                                      reverse: rev } );
      $('#p1').text( 'last transition: ' + trans + ' - reverse: ' + rev );
    });*/
  });

/*  $('#login').bind('pagehide', function(e) {
    /!*$('a.ui-btn').removeClass('ui-btn-active');
    if ( !!$('#cb2').attr('checked') && !$(this).hasClass('ui-btn-active') ) {
      $(this).addClass('ui-page-active');
    }*!/
  });*/

  $('#register').on('pagecreate', function() {
/*
      $('a').bind('click', function(e) {
      var trans = $(this).text() || 'none',
          rev = !!$('#cb1').attr('checked');

      $.mobile.changePage('#page1', { transition: trans,
                                      allowSamePageTransition: true,
                                      reverse: rev } );
      $('#p1').text( 'last transition: ' + trans + ' - reverse: ' + rev );
    });*/
  });

  $('#register').bind('pagehide', function(e) {
    /*$('a.ui-btn').removeClass('ui-btn-active');
    if ( !!$('#cb2').attr('checked') && !$(this).hasClass('ui-btn-active') ) {
      $(this).addClass('ui-page-active');
    }*/
  });
})(jQuery);
