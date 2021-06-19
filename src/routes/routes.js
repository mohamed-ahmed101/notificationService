let { messageTemplate, request } = require('../controller');
module.exports = [
  /// messageTemplate ///
  {
    method: "post",
    route: "/addTempalte",
    controller: messageTemplate,
    action: "save"
  },
  {
    method: "get",
    route: "/getTempaltes",
    controller: messageTemplate,
    action: "all"
  },
  {
    method: "post",
    route: "/getTempalteById",
    controller: messageTemplate,
    action: "one"
  },
  /// request ///
  {
    method: "post",
    route: "/addRequest",
    controller: request,
    action: "save"
  },
  {
    method: "get",
    route: "/getRequests",
    controller: request,
    action: "all"
  },
  {
    method: "post",
    route: "/getRequestById",
    controller: request,
    action: "one"
  },

];
