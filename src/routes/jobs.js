const express = require(`express`);
const router = express.Router();
const { jobsControllers } = require(`../controllers/jobs`);
const upload = require('../middleware/upload');
const { protect } = require('../middleware/auth');

router.post('/', upload.single('company_logo'), protect, jobsControllers.add);
router.get('/', protect, jobsControllers.getAllJobs);
router.get('/:id', protect, jobsControllers.detailById);
router.put(
  '/:id',
  protect,
  upload.single('company_logo'),
  jobsControllers.edit
);
router.delete('/:id', protect, jobsControllers.delete);

module.exports = router;
