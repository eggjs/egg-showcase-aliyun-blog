(function() {
  // init
  var articleEditor = editormd('article-editormd', {
    width  : '90%',
    height : 720,
    markdown : $('#article-editormd > textarea').text(),
    path: 'public/js/lib/',
    codeFold : true,
    searchReplace : true,
    saveHTMLToTextarea : true,    // 保存 HTML 到 Textarea
    //watch : false,
    htmlDecode : 'style,script,iframe|on*',            // 开启 HTML 标签解析，为了安全性，默认不开启
    emoji : true,
    taskList : true,
    tocm            : true,         // Using [TOCM]
    tex : true,                     // 开启科学公式 TeX 语言支持，默认关闭
    flowChart : true,
    sequenceDiagram : true,         // 同上
    imageUpload : true,
    imageFormats : ['jpg', 'jpeg', 'gif', 'png', 'bmp', 'webp'],
    imageUploadURL : '/upload?_csrf=' + $('.article-form [name=_csrf]').val(),
  });

})();