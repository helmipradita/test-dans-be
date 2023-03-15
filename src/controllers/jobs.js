const { response } = require(`../middleware/common`);
const {
  selectAllJobs,
  countAll,
  insertJobs,
  selectDetailJobs,
  updateJobs,
  deleteJobs,
} = require(`../models/jobs`);
const { v4: uuidv4 } = require('uuid');
const cloudinary = require('../config/photo');

const jobsControllers = {
  getAllJobs: async (req, res, next) => {
    try {
      const page = parseInt(req.query.page) || 1;
      const limit = parseInt(req.query.limit) || 4;
      const sortBy = req.query.sortBy || 'updated_at';
      const sortOrder = req.query.sortOrder || 'DESC';
      const description = req.query.description || '';
      const location = req.query.location || '';
      const offset = (page - 1) * limit;

      const result = await selectAllJobs({
        description,
        location,
        sortBy,
        sortOrder,
        limit,
        offset,
      });

      const {
        rows: [count],
      } = await countAll();
      const totalData = parseInt(count.total);
      const totalPage = Math.ceil(totalData / limit);
      const pagination = {
        currentPage: page,
        limit,
        totalData,
        totalPage,
      };

      response(res, 200, true, result.rows, 'get jobs success', pagination);
    } catch (error) {
      console.log(error);
      response(res, 404, false, null, ' get jobs failed');
    }
  },
  add: async (req, res, next) => {
    try {
      const {
        type,
        url,
        company,
        company_url,
        location,
        title,
        description,
        how_to_apply,
      } = req.body;

      const dataJobs = {
        id: uuidv4(),
        type,
        url,
        company,
        company_url,
        location,
        title,
        description,
        how_to_apply,
      };

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: 'test-dans',
        });

        dataJobs.company_logo = image.url;
      } else {
        return response(res, 404, false, [], 'insert jobs failed, photo empty');
      }

      await insertJobs(dataJobs);
      response(res, 200, true, dataJobs, 'insert jobs success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'insert jobs failed');
    }
  },
  detailById: async (req, res, next) => {
    try {
      const { id } = req.params;

      const {
        rows: [jobs],
      } = await selectDetailJobs(id);

      if (!jobs) {
        return response(res, 404, false, [], 'jobs not found');
      }

      response(res, 200, true, jobs, 'get data jobs success');
    } catch (error) {
      response(res, 404, false, null, ' get data jobs failed');
    }
  },
  edit: async (req, res, next) => {
    try {
      const {
        type,
        url,
        company,
        company_url,
        location,
        title,
        description,
        how_to_apply,
      } = req.body;
      const id = req.params.id;

      const {
        rows: [jobs],
      } = await selectDetailJobs(id);

      if (!jobs) {
        return response(res, 404, false, [], 'jobs not found');
      }

      const dataJobs = {
        id,
        type,
        url,
        company,
        company_url,
        location,
        title,
        description,
        how_to_apply,
      };

      if (req.file) {
        const image = await cloudinary.uploader.upload(req.file.path, {
          folder: 'test-dans',
        });

        dataJobs.photo = image.url;
      } else {
        dataJobs.photo = jobs.photo;
      }

      await updateJobs(dataJobs);
      response(res, 200, true, dataJobs, 'Edit jobs success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'Edit jobs failed');
    }
  },
  delete: async (req, res, next) => {
    try {
      const { id } = req.params;

      deleteJobs(id);
      response(res, 200, true, deleteJobs, 'delete jobs success');
    } catch (error) {
      console.log(error);
      response(res, 404, false, 'delete jobs failed');
    }
  },
};

exports.jobsControllers = jobsControllers;
