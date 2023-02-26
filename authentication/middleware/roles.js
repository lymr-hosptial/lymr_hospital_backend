const accessControl = require('accesscontrol');
const accessControlInstance = new accessControl;

exports.roles = (()=>{
accessControlInstance.grant("clerk")
    .createAny("profile")
    .readOwn("profile")
    .updateOwn("profile")

accessControlInstance.grant("doctor")
    .readOwn("profile")
    .updateAny("profile")

return accessControlInstance;
})();