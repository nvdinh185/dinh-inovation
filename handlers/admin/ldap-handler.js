/**
 * Class Ldap kết nối ldap server, xác thực và trả về token
 * User test thử 
 * var email = 'm-bill.c3@mobifone.vn'  hoặc nhập m-bill3 không có @mobifone.vn
 * var password = 'Abcxyz@12345'
 */
const arrObj = require('../../utils/array-object');
const secUtil = require('../../utils/secret-util');
const { jwtToken, pareJwtToken } = require('../../utils/jwt-token');

// sử dụng thành phần này để bind và unbind ldap
const ldap = require('ldapjs');
const ldapServerUrl = 'ldap://10.3.12.57:389';
const domainNameEmail = '@mobifone.vn';

// cơ sở dữ liệu sqlite phân quyền user được cấp phép vào không
// const db = require('../../db/sqlite3/db-pool-admin');

//cơ sở dũ liệu kế nối theo pool
// oracle
// const db = require('../../db/oracle/db-pool');

// đây là hàm thực tế xác thực ldap mobifone
const loginLdapMobifone = (usernameOremail, password) => new Promise((rs, rj) => {

    var client = ldap.createClient({
        url: ldapServerUrl
    });

    let email = usernameOremail.indexOf('@') > 0 ? usernameOremail : usernameOremail += domainNameEmail

    // thực hiện kiểm tra ldap trong 2 giây
    setTimeout(() => {
        // thực hiện bind -- nếu thành công thì login thành công
        try {
            // nếu ko thành công thì login fail
            client.bind(email, password, function (err) {
                if (err) {
                    console.log('Bind failed with error: ', err.lde_message);
                    rj(new Error('Email or password invalid!'))
                } else {
                    // console.log('Bind ok with ', usernameOremail);
                    rs({
                        usernameOremail
                    })
                }

                // trả lại phiên kết nối cổng ldap
                client.unbind(function (err) {
                    if (err) {
                        console.log('UnBind failed with error: ', err.lde_message);
                        return;
                    }
                    // console.log('UnBind finish!');
                })

            })
        } catch (e) {
            console.log('Can not ping to LDAP server', e);
            rj(new Error('Can not ping to LDAP server'))
        }

    }, 2000);

})


// Đây là hàm giả lập login email ldap thành công
const fakeLoginLdap = (email, password) => new Promise((rs, rj) => {
    setTimeout(() => {
        if (email === 'abc' && password == 'xyz') {
            rs({
                email
            })
        } else {
            rj(new Error('Email or password invalid!'))
        }
    }, 2000);
})


class LDAPHandler {

    /**
     * Hàm login trả về trạng thái xác thực ldap thành công
     * đọc csdl 
     * @param {*} req 
     * @param {*} res 
     * @param {*} next 
     */
    async  login(req, res, next) {
        // thay dữ liệu đã parse body thành json bằng công cụ ở utils by cuongdq
        const { username, password } = req.json_data   // req.body

        // cắt lấy user không thôi, không cho nhập @ vào username
        const nameMatch = username.match(/^([^@]*)@/);
        let shortName = nameMatch ? nameMatch[1] : username;

        // fakeLoginLdap(username, password)
        loginLdapMobifone(username, password)
            .then(user => {
                res.status(200).send({
                    status: 200,
                    message: 'success',
                    username: shortName.toLowerCase(),
                    token: jwtToken({
                        username: shortName.toLowerCase()
                    })
                })
            })
            .catch(err => {
                res.status(401).send({
                    status: 401,
                    message: err.message || 'Invalid credential'
                })
            })
    }


}

module.exports = new LDAPHandler();