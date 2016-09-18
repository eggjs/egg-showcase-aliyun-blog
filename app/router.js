'use strict';

module.exports = app => {
  const admin = app.role.can('admin');
  const install = app.controller.site.isInstall;

  app.get('/', install, app.controller.article.index);

  app.get('/article', install, app.controller.article.find);
  app.post('/article', admin, app.controller.article.add);
  app.put('/article', admin, app.controller.article.update);
  app.delete('/article', admin, app.controller.article.deleteArticle);

  app.post('/upload', app.controller.article.upload);

  app.get('/manager', install, admin, app.controller.admin.manager);
  app.get('/editor', install, admin, app.controller.admin.editor);
  app.post('/login', app.controller.admin.login);

  app.get('/login', install, app.controller.site.login);
  app.get('/logout', app.controller.site.logout);
  app.get('/install', app.controller.site.startInstall);
  app.post('/install', app.controller.site.install);
  app.get('/about', install, app.controller.site.about);
  app.get('/contact', install, app.controller.site.contact);
  app.get('/500', app.controller.site.error);

  app.get('/*', app.controller.site.notFound);
};
