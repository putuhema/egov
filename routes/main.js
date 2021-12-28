const router = require("express").Router();

const mainController = require("../controller/main");

router.get("/", mainController.getIndex);
router.get("/input", mainController.getForm);
router.get("/download", mainController.getDownload);
router.get("/download-file", mainController.getDownloadFile);

router.post("/skj", mainController.postSKJ);
router.post("/sktm", mainController.postSKTM);
router.post("/skd", mainController.postSKD);

module.exports = router;
