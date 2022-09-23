$(function () {

  let layer = layui.layer
  let form = layui.form
  function initArtCateList() {
    $.ajax({
      method: 'GET',
      url: '/my/article/cates',
      success(res) { 
        // console.log(res)
        let htmlStr = template('tpl-table', res)
        $('tbody').html(htmlStr)
      }
    })
  }
  
  initArtCateList()

  //为添加类别按钮绑定点击事件
  let indexAdd = null
  $('#btnAddCate').on('click', function () {
    indexAdd = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '添加文章类别',
      content: $('#dialog-add').html()
    })
  })
  

  // 通过委托的形式，为 form-add 添加 submit 事件
  $('body').on('submit', '#form-add',function (e) {
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/addcates',
      data: $(this).serialize(),
      success(res) {
        if (res.status !== 0) {
          layer.msg('新增分类失败！')
        }
        
        layer.msg('新增分类成功！')
        initArtCateList()
        // 根据索引，关闭对应的弹出层
        layer.close(indexAdd)
       }
    })
    
  })
  

  // 通过 事件委托 的形式，为 btn-edit 按钮绑定点击事件
  let indexEdit = null
  $('tbody').on('click', '.btn-edit', function () {
    indexEdit = layer.open({
      type: 1,
      area: ['500px', '250px'],
      title: '修改文章类别',
      content: $('#dialog-edit').html()
    })

    let id = $(this).attr('data-id')
    // 发起请求获取对应分类的数据
    $.ajax({
      method: 'GET',
      url: `/my/article/cates/${id}`,
      success(res) {
        // console.log(res)
        form.val('form-edit',res.data)
       }
    })
  })
  
  // 更新文章分类的数据
  // 通过 事件委托 的方式，给修改按钮绑定点击事件
  $('body').on('submit', '#form-edit', function (e) { 
    e.preventDefault()
    $.ajax({
      method: 'POST',
      url: '/my/article/updatecate',
      data: $(this).serialize(),
      success(res) { 
        if (res.status !== 0) { 
          return layer.msg('更新分类数据失败！')
        }
        layer.msg('更新分类数据成功！')
        layer.close(indexEdit)
        initArtCateList()
      }
    })
  })


  // 删除文章分类
  // 通过 事件委托 的形式，给删除按钮绑定点击事件
  $('tbody').on('click', '.btn-delete', function () {
    let id = $(this).attr('data-id')
    // 提示用户是否要删除
    layer.confirm('确认删除?', {icon: 3, title:'提示'}, function(index){
      //do something
      $.ajax({
        method: 'GET',
        url: `/my/article/deletecate/${id}`,
        success(res) { 
          if (res.status !== 0) { 
            return layer.msg('删除分类失败！')
          }
          layer.msg('删除分类成功！')
          layer.close(index)
          initArtCateList()
        }
      })
      
    })
   })

 })