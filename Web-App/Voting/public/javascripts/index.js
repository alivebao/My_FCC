$().ready(function(){	
	$('#login-btn').click(function(){
		var link = "https://api.weibo.com/oauth2/authorize?client_id=468240043&redirect_uri=http://127.0.0.1:3000";
		location.href = link;
	});
});