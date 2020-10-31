"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var oidc_client_1 = require("oidc-client");
function makeUserManager(config, umClass) {
    var UMClass = umClass || oidc_client_1.UserManager;
    return new UMClass(config);
}
exports.default = makeUserManager;
//# sourceMappingURL=index.js.map