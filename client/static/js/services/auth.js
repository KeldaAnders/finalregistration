angular.module('tokenizer')
  .service('AuthService',
    ['$window',
      function($window) {
        const self = this;
        var params;
        self.parseJWT = function(token) {
          const base64URL = token.split('.')[1];
          const base64 = base64URL.replace('-', '+').replace('_', '/');
          return JSON.parse($window.atob(base64));
        };

        self.saveToken = function(token) {
          $window.localStorage.jwtToken = token;
        };

        self.getToken = function() {
          return $window.localStorage.jwtToken;
        };

        self.isAuthed = function() {
          const token = self.getToken();

          if (!token) return false;

           params = self.parseJWT(token);
        
          console.log(params, ' ************** These are the params **************');

          return Math.round(new Date().getTime() / 1000) <= params.exp;
        };
        self.showUser = function(callback) {
    
          callback(params)
        };
        
        self.logout = function() {
          $window.localStorage.removeItem('jwtToken');
        };
      }
    ]
  );
