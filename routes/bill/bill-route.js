const router = require('express').Router();


router.get('/:month/:isdn/:shortkey'
    , (req, res) => res.status(200).send(JSON.stringify({ params: req.params, message: "trả về test thử ddos" }, null, 2))
)


module.exports = router;
