angular.module('tokenizer')
  .factory('authInterceptor',
    ["AuthService",
      function(auth) {
        return {
          request(config) {
            const token = auth.getToken();

            if (token) {
              config.headers.Authorization = `Bearer ${token}`;
            }

            return config;
          },

          requestError(config) {
            return config;
          },

          response(res) {
            if (res.data.token) {
              auth.saveToken(res.data.token);
            }

            return res;
          },

          responseError(res) {
            return res;
          }
        }
      }
    ]
  );
