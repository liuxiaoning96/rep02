$(function () {
    // 点击“去注册账号”的链接
    $('#link_reg').on('click', function () {
        $('.login-box').hide()
        $('.reg-box').show()
    })

    // 点击“去登录”的链接
    $('#link_login').on('click', function () {
        $('.login-box').show()
        $('.reg-box').hide()
    })
})

//监听注册表单的提交事件
$('#form_reg').on('submit', function (e) {
    e.preventDefault()
    var data = {
        //c3选择器#类名的name属性
        username: $('#form_reg [name=username]').val(),
        password: $('form_reg [name=password]').val()
    }
    $.post('http://ajax.frontend.itheima.net/api/reguser', data, function (res) {
        if (res.status !== 0) {
            return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录!')
        //模拟人的点击行为
        $('#link_login').click()
    })
})


//监听登录表单的提交事件
$('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
        url: 'http://ajax.frontend.itheima.net/api/login',
        method: 'POST',
        //快速获取全部表单的值 serialize()
        data: $(this).serialize(),
        success: function (res) {
            if (res.status !== 0) {
                return layer.msg('登录失败!')
            }
            layer.msg('登录成功')
            localStorage.setItem('token', res.token)
            location.href = '/index.html'
        }
    })
})