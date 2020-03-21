/**
 * Giao tiếp khai báo cập nhập cơ sở dữ liệu chat bot này
 */

 /*
-- Câu lệnh ghép để soạn thảo
select  a.id as intent_id,
a.name as intent_name,
b.id as req_id,
b.request,
c.id as res_id,
c.response 
from intents as a, requests as b, responses as c
where a.id = b.intent_id
and a.id = c.intent_id
order by intent_id, req_id, res_id

*/