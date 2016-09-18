'use strict';

module.exports = app => {
  app.role.use('admin', function() {
    const login = this.session.login;
    if (login) {
      return true;
    }
    return false;
  });
};

