'use strict';

const moment = require('moment');
const marked = require('marked');

exports.index = function* () {
  const pageNum = +this.query.pageNum || 1;
  const pageSize = +this.query.pageSize || 10;

  const result = yield {
    articles: this.service.article.list(pageNum, pageSize),
    count: this.service.article.count(),
    site: this.service.site.getSite(),
  };

  yield this.render('index.html', Object.assign({
    pageNum,
    pageSize,
  }, result));

};

// 新增一个文章
exports.add = function* () {
  const title = this.request.body.title;
  const content = this.request.body.content;
  const sub_title = this.request.body.sub_title;
  yield this.service.article.insert(title, content, sub_title);

  this.redirect('manager');

};

// 新增一个文章
exports.update = function* () {
  const id = this.request.body.id;
  const title = this.request.body.title;
  const content = this.request.body.content;
  const sub_title = this.request.body.sub_title;

  yield this.service.article.update({
    id,
    title,
    content,
    sub_title,
  });

  this.redirect(`/article?id=${id}`);

};

// 删除一个文章
exports.deleteArticle = function* () {
  const id = +this.request.body.id;

  const success = yield this.service.article.deleteArticle(id);

  if (success) {
    this.body = true;
  } else {
    this.body = false;
  }
};

exports.upload = function* () {
  const stream = yield this.getFileStream();
  const object = yield this.oss.put(moment(Date.now()).format('YYYY-MM-DD') + '/' + stream.filename, stream);
  if (object) {
    this.body = {
      success: 1,           // 0 表示上传失败，1 表示上传成功
      message: '上传成功',
      url: object.url,        // 上传成功时才返回
    };
  } else {
    this.body = {
      success: 0,           // 0 表示上传失败，1 表示上传成功
      message: '上传失败',
    };
  }

};

exports.find = function* () {
  const id = +this.query.id;
  const article = yield this.service.article.find(id);

  article.fromNow = moment(article.modified_time).fromNow();
  article.html = marked(article.content);

  yield this.render('post.html', article);

};
