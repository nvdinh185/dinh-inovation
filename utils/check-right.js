const db = require('../db/sqlite3/db-pool-granted');

const checkRight = async (req, res, next) => {

  try {
    // Get api
    let apiFuncs = await db.getRst(`select * from function_apis where api_function = '${req.url}' and method = '${req.method}'`);
    // console.log("***>", apiFuncs);
    // nếu không cần phân quyền cho chức năng này thì trả về true
    // console.log("TEST 1", apiFuncs);
    if (
      !apiFuncs ||
      (apiFuncs && !apiFuncs.has_granted) ||
      (apiFuncs && !apiFuncs.id)
    ) {
      next();
      return;
    }

    // đây là id cần phải phân quyền thực hiện
    let fId = apiFuncs.id;
    // console.log("req.user.username", req.user.username);
    // lấy quyền được cấp cho user
    let userGranted = await db.getRst(`select function_groups, function_apis from function_granted where username = '${req.user.username}'`);
    // nếu user chưa được cấp quyền thì trả về false
    // console.log("TEST 2", userGranted);
    if (!userGranted) {// Nếu tạo mới user thì cho qua
      next();
      return;
    }

    if (
      !userGranted ||
      (userGranted && !userGranted.function_groups && !userGranted.function_apis) ||
      (userGranted && userGranted.function_groups && !JSON.parse(userGranted.function_groups).length && userGranted.function_apis && !JSON.parse(userGranted.function_apis).length)
    ) {
      // res.status(401).json({
      //   message: 'Bạn không được cấp quyền thực hiện chức năng này-Granted'
      // });
      // return;
      throw "Bạn không được cấp quyền thực hiện chức năng này-Granted";
    }

    // nếu chức năng đã được phân quyền thì trả về true
    // console.log("function_apis, fId: ", JSON.parse(userGranted.function_apis), fId);
    if (
      userGranted.function_apis && JSON.parse(userGranted.function_apis).includes(parseInt(fId))
    ) {
      next();
      return;
    }

    // nếu được phân quyền trong nhóm thì kiểm tra quyền trong nhóm
    if (userGranted.function_groups && JSON.parse(userGranted.function_groups).length) {
      let jsonWhere = userGranted.function_groups.replace('[', '(').replace(']', ')');
      // console.log(jsonWhere);
      let arr = await db.getRsts(`select function_apis from function_groups where id in ${jsonWhere}`);
      let arrJson =
        JSON.parse(JSON.stringify(arr, (key, value) => {
          if (key === "function_apis" && value) return JSON.parse(value);
          return value;
        }));
      let apis = arrJson.map(o => o["function_apis"]);
      let apisOfGroup = [].concat.apply([], apis);
      // console.log("GroupId - fid", apisOfGroup, fId);
      if (
        apisOfGroup && apisOfGroup.includes(parseInt(fId))
      ) {
        next();
        return;
      }
    }
  } catch (e) {
    console.log(`Lỗi kiểm tra quyền: `, e);
    res.status(401).json({
      message: `Lỗi kiểm tra quyền: ${e}`
    });
    return;
  }
  res.status(401).json({
    message: 'Bạn không được cấp quyền thực hiện chức năng này-ALL'
  });
  return;

}

module.exports = checkRight;