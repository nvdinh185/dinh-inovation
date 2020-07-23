const router = require('express').Router();

const ldapHandler = require('../../handlers/admin/ldap-handler');

const postHandler = require('../../utils/post-handler');

router.post('/login'
    , postHandler.jsonProcess
    , ldapHandler.login
)

module.exports = router;