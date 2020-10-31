"use strict";
var __extends = (this && this.__extends) || (function () {
    var extendStatics = function (d, b) {
        extendStatics = Object.setPrototypeOf ||
            ({ __proto__: [] } instanceof Array && function (d, b) { d.__proto__ = b; }) ||
            function (d, b) { for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p]; };
        return extendStatics(d, b);
    };
    return function (d, b) {
        extendStatics(d, b);
        function __() { this.constructor = d; }
        d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
    };
})();
Object.defineProperty(exports, "__esModule", { value: true });
var React = require("react");
var Callback = (function (_super) {
    __extends(Callback, _super);
    function Callback() {
        return _super !== null && _super.apply(this, arguments) || this;
    }
    Callback.prototype.componentDidMount = function () {
        var _a = this.props, onSuccess = _a.onSuccess, onError = _a.onError, userManager = _a.userManager;
        var um = userManager;
        um.signinRedirectCallback()
            .then(function (user) {
            if (onSuccess) {
                onSuccess(user);
            }
        })
            .catch(function (err) {
            if (onError) {
                onError(err);
            }
        });
    };
    Callback.prototype.render = function () {
        return this.props.children || null;
    };
    return Callback;
}(React.Component));
exports.default = Callback;
//# sourceMappingURL=index.js.map