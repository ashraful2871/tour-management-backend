"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.IsActive = exports.Role = void 0;
var Role;
(function (Role) {
    Role["SUPER_ADMIN"] = "SUPER_ADMIN";
    Role["ADMIN"] = "ADMIN";
    Role["USER"] = "USER";
    Role["GUIDE"] = "GUIDE";
})(Role || (exports.Role = Role = {}));
var IsActive;
(function (IsActive) {
    IsActive["Active"] = "ACtIVE";
    IsActive["InActive"] = "InActive";
    IsActive["BLOCKED"] = "BLOCKED";
})(IsActive || (exports.IsActive = IsActive = {}));
