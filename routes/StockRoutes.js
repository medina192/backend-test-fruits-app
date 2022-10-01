const { Router } = require('express');

const {
    SaveDataForMigration,
    GetDataForMigration
} = require('../controllers/StockController');



const router = Router();

router.get("/migrate-stock-from-local", SaveDataForMigration);

router.get("/migrate-stock-to-cloud", GetDataForMigration);

module.exports = router;