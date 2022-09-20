$(function () {
  const getUserInfo = () => {
    $.ajax({
      type: 'GET',
      url: '/my/userinfo',
      // headers 就是请求头配置对象
      // headers: {
      //   Authorization: localStorage.getItem('token') || ''
      // },
      success(res) {
        // 
        if (res.status !== 0) {
          return layui.layer.msg('获取用户信息失败')         
        }
         // 调用 renderAvatar 渲染用户的头像
         renderAvatar(res.data)
      },
      // 无论成功还是失败，最终都会调用 complete 回调函数
      // complete(res) { 
      //   console.log(res)
      //   // 在 complete 回调函数中，可以使用 res.responseJSON 拿到服务器相应回来的数据
      //   if (res.responseJSON.status === 1 && res.responseJSON.message === '身份认证失败！') {
      //     // 强制清空 token
      //     localStorage.removeItem('token')
      //     // 强制跳转到登录页面
      //     location.href = 'login.html'
      //    }

      // }
    })
   
  }

  getUserInfo()

  const renderAvatar = user => {
    // 获取用户的名称
    let name = user.nickname || user.username
    // 设置欢迎的文本
    $('#welcome').html('欢迎&nbsp;&nbsp;' + name)
    // 渲染用户的头像
    if (user.user_pic !== null) {
      // 渲染图片头像
      $('.layui-nav-img').attr('src', user.user_pic).show()
      $('.text-avatar').hide()
    } else {
      // 渲染文本头像
      $('.layui-nav-img').hide()
      let first = name[0].toUpperCase()
      $('.text-avatar').html(first).show()
    }
  }

  let layer = layui.layer
  $('#btnLongout').on('click', function () {
    // 提示用户是否确认退出登录
    layer.confirm('确认退出登录?', {icon: 3, title:'提示'}, function(index){
      //清空本地存储
      localStorage.removeItem('token')
      // 重新跳转到登录页面
      location.href = 'login.html'
      
      // 关闭 confirm 询问框
      layer.close(index);
    })
   })
  
})


  
  
  