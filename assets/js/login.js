$(function () {

  // 点击去注册的链接
  $('#link-reg').on('click', function () {
    $('.login-box').hide()
    $('.reg-box').show()
  })

  // 点击去登录的链接
  $('#link-login').on('click', function () {
    $('.reg-box').hide()
    $('.login-box').show()
  })

  // 从 layui 中获取 form 对象
  let form = layui.form
  let layer = layui.layer
  // 通过 form.verify() 函数自定义校验规则
  form.verify({
    //  自定义了一个 pwd 校验规则
    pwd: [
      /^[\S]{6,12}$/
      , '密码必须6到12位,且不能出现空格'
    ],
    // 校验两次密码是否一致的规则
    repwd: function (value) {
      let pwd = $('.reg-box [name = password]').val()
      if (pwd !== value) {
        return '两次密码不一致！'
      }
    }
  })

  // 监听注册的提交事件
  $('#form_reg').on('submit', function (e) {
    e.preventDefault()
    let data = {
      username: $('#form_reg [name = username]').val(),
      password: $('#form_reg [name = password]').val()
    }
    $.ajax({
      type: 'POST',
      url: '/api/reguser',
      data,
      success(res) {
        if (res.status !== 0) {
          return layer.msg(res.message)
        }
        layer.msg('注册成功,请登录')
        // 自动点击
        $('#link-login').click()
      }
    })
  })

  // 监听登录表单的提交事件
  $('#form_login').submit(function (e) {
    e.preventDefault()
    $.ajax({
      type: 'POST',
      url: '/api/login',
      data: $(this).serialize(),
      success(res) { 
        if (res.status !== 0) { 
          return layer.msg('登录失败')
        }
        layer.msg('登录成功')
        console.log(res)
        // 将登陆成功得到的 token 字符串，保存到 localStorage 中
        localStorage.setItem('token',res.token)
        // console.log(res)
        // 跳转到后台主页
        // location.href = 'index.html'
      }
    })
   })
})