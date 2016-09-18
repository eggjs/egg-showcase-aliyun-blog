(function() {
  // ajax 发请求需要带上ctoken
  $('#delete-article').on('click', function () {
    $.ajax({
      url: '/article',
      type: 'delete',
      data: {
        id: $(this).data('articleid'),
        ctoken: $.cookie('ctoken'),
      },
      success: function(status) {
        if (status) {
          alert('删除成功');
          location.reload();
        } else {
          alert('删除失败');
        }

      },
      error: function() {
        alert('请求失败');
      },
    })
  })
})();