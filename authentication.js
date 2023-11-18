let jwt = require('jsonwebtoken');
const sanitize = require('mongo-sanitize');
const response = require('./security/response.security');

let checkToken = (req, res, next) => {
  let token = req.headers['x-access-token'] || req.headers['authorization'];
  let appId = req.headers['app-id'];


  if (token) {
    try {
      Object.keys(req.body).map((data) => {
        req.body[data] = sanitize(req.body[data]);
        if (typeof req.query[data] == typeof "str") {
          req.body[data] = req.body[data].toString().replace(/\$/g, "");
          req.body[data] = req.body[data].toString().replace(/==/g, "");
          req.body[data] = req.body[data].toString().replace(/'/g, "");
        }
      });
      Object.keys(req.query).map((data) => {
        req.query[data] = sanitize(req.query[data]);
        if (typeof req.query[data] == typeof "str") {
          req.query[data] = req.query[data].toString().replace(/\$/g, "");
          req.query[data] = req.query[data].toString().replace(/==/g, "");
          req.query[data] = req.query[data].toString().replace(/'/g, "");
        }
      });
      Object.keys(req.params).map((data) => {
        req.params[data] = sanitize(req.params[data]);
        if (typeof req.params[data] == typeof "str") {
          req.params[data] = req.params[data].toString().replace(/\$/g, "");
          req.params[data] = req.params[data].toString().replace(/==/g, "");
          req.params[data] = req.params[data].toString().replace(/'/g, "");
        }
      });
    } catch (error) {
      console.log(error);
    }
    if (appId) {
      if ((appId == process.env.APP_ID)) {
        if (token.startsWith('Bearer ')) {
          token = token.slice(7, token.length);
        }
        jwt.verify(token, process.env.JWT_SECRET_KEY, (err, decoded) => {
          if (err) {
            return response.sendResp(req, res, {
              status: "error",
              message: "Invalid Token",
              responseCode: 501,
              data: null
            });
          } else {
            req.headers.adminId = decoded.adminId;
            req.headers.sessionId = decoded.sessionId;
            next();
            // studentModel.findOne({ _id: decoded.studentId, sessionId: decoded.sessionId }).then((student) => {
            //   if (student) {
            //     next();
            //   } else {
            //     return response.sendResp(req, res, {
            //       status: "error",
            //       message: "You login from another device",
            //       responseCode: 501,
            //       data: null
            //     });
            //   }
            // }).catch((err) => {
            //   return response.sendResp(req, res, {
            //     status: "error",
            //     message: "You login from another device",
            //     responseCode: 501,
            //     data: null
            //   });
            // });
          }
        });
      } else {
        return response.sendResp(req, res, {
          status: "error",
          message: "Invalid App Id",
          responseCode: 501,
          data: null
        });
      }

    } else {
      return response.sendResp(req, res, {
        status: "error",
        message: "App Id Not Provide",
        responseCode: 501,
        data: null
      });
    }
  } else {
    return response.sendResp(req, res, {
      status: "error",
      message: "Token Not Provide",
      responseCode: 501,
      data: null
    });
  }
};

let checkAppId = (req, res, next) => {
  let appId = req.headers['app-id'];
  let origin = req.headers['origin'];
  try {
    Object.keys(req.body).map((data) => {
      req.body[data] = sanitize(req.body[data]);
      if (typeof req.query[data] == typeof "str") {
        req.body[data] = req.body[data].toString().replace(/\$/g, "");
        req.body[data] = req.body[data].toString().replace(/==/g, "");
        req.body[data] = req.body[data].toString().replace(/'/g, "");
      }
    });
    Object.keys(req.query).map((data) => {
      req.query[data] = sanitize(req.query[data]);
      if (typeof req.query[data] == typeof "str") {
        req.query[data] = req.query[data].toString().replace(/\$/g, "");
        req.query[data] = req.query[data].toString().replace(/==/g, "");
        req.query[data] = req.query[data].toString().replace(/'/g, "");
      }
    });
    Object.keys(req.params).map((data) => {
      req.params[data] = sanitize(req.params[data]);
      if (typeof req.params[data] == typeof "str") {
        req.params[data] = req.params[data].toString().replace(/\$/g, "");
        req.params[data] = req.params[data].toString().replace(/==/g, "");
        req.params[data] = req.params[data].toString().replace(/'/g, "");
      }
    });
  } catch (error) {
    console.log(error);
  }
  if (appId) {
    if ((appId == process.env.APP_ID)) {
      next();
    } else {
      return response.sendResp(req, res, {
        status: "error",
        message: "Invalid App Id",
        responseCode: 501,
        data: null
      });
    }

  } else {
    return response.sendResp(req, res, {
      status: "error",
      message: "App Id Not Provide",
      responseCode: 501,
      data: null
    });
  }
}

let checkSecretKey = (req, res, next) => {
  let app_id = req.headers['app-id'];
  let origin = req.headers['origin'];
  try {
    Object.keys(req.body).map((data) => {
      req.body[data] = sanitize(req.body[data]);
      if (typeof req.query[data] == typeof "str") {
        req.body[data] = req.body[data].toString().replace(/\$/g, "");
        req.body[data] = req.body[data].toString().replace(/==/g, "");
        req.body[data] = req.body[data].toString().replace(/'/g, "");
      }
    });
    Object.keys(req.query).map((data) => {
      req.query[data] = sanitize(req.query[data]);
      if (typeof req.query[data] == typeof "str") {
        req.query[data] = req.query[data].toString().replace(/\$/g, "");
        req.query[data] = req.query[data].toString().replace(/==/g, "");
        req.query[data] = req.query[data].toString().replace(/'/g, "");
      }
    });
    Object.keys(req.params).map((data) => {
      req.params[data] = sanitize(req.params[data]);
      if (typeof req.params[data] == typeof "str") {
        req.params[data] = req.params[data].toString().replace(/\$/g, "");
        req.params[data] = req.params[data].toString().replace(/==/g, "");
        req.params[data] = req.params[data].toString().replace(/'/g, "");
      }
    });
  } catch (error) {
    console.log(error);
  }
  if (app_id) {
    if ((app_id == process.env.SECRET_KEY)) {
      next();
    } else {
      return response.sendResp(req, res, {
        status: "error",
        message: "Invalid App ID",
        responseCode: 501,
        data: null
      });
    }

  } else {
    return response.sendResp(req, res, {
      status: "error",
      message: "App ID Not Provide",
      responseCode: 501,
      data: null
    });
  }
}

module.exports = {
  checkToken: checkToken,
  checkAppId: checkAppId,
  checkSecretKey: checkSecretKey
}