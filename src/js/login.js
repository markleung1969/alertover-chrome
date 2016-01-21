var $ = window.$;

$('#loginForm').on('submit', function(e){
    e.preventDefault()
    $.ajax({
        url : 'http://test.api.alertover.com/api/v1/login',
        method : 'post',
        contentType : 'application/json',
        dataType : 'json',
        data : JSON.stringify({
            email : $('#emailInput').val(),
            password : $('#passwordInput').val()
        }),
        success : function(da){
            if(da.code === 0){
                localStorage.setItem('aosession', da['data']['session']);
                localStorage.setItem('pushtoken', da['data']['pushtoken']);
                localStorage.setItem('uid', da['data']['uid']);
                localStorage.setItem('alias', da['data']['user_id']);
                localStorage.setItem('tags', da['data']['group_ids']);

                // 启动bgPage
                var bg = chrome.extension.getBackgroundPage();
                bg.bgScript.init();
                window.location = '/html/popup.html'; 
            }
            else {
                alert(da['msg']);
            }
        }
    });
});
