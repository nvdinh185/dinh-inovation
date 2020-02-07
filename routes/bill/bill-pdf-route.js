/**
 * Bảng route này chỉ phục vụ một chức năng là phát hành thông báo cước pdf
 * Trường hợp pdf đã phát hành thì chỉ view ra mà thôi
 * Trường hợp người dùng gõ thông tin phát hành không đúng thì trả về thông báo:
 * Xin lỗi thông tin của quý khách không đúng, xin vui lòng kiểm tra lại hoặc liên hệ 18001090 để được hướng dẫn
 * 
 * Trường hợp thông tin phát hành (lần đầu) mà tổng tot_charge <> với tổng thì cũng sẽ không phát hành
 * 
 */
const router = require('express').Router();

const billPdfHandler = require('../../handlers/bill/ebill-pdf-handler')

// middlewares
// Công cụ xác thực số thuê bao hợp lệ và tháng hợp lệ
// yyyymm/9x345678x
const {
    checkParamsReportIsdn
} = require('../../app/middlewares')


//----- dưới đây là hàm duy nhất cho khách hàng tra cứu hóa đơn của mình ----//
// hàm chính thức phục vụ khách hàng để tra cứu file pdf từ link được gửi qua sms
// dạng https://c3.mobifone.vn/ebill/mf3/<yyyymm>/<isdn>/<shortkey>

router.get('/:month/:isdn/:shortkey'
    , checkParamsReportIsdn         // Hàm kiểm tra tính hợp lệ của yyyymm và isdn
    , billPdfHandler.getEBill       // Hàm trả về file pdf
)

module.exports = router;
