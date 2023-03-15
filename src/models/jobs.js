const Pool = require(`../config/db`);

const selectAllJobs = ({
  limit,
  offset,
  sortBy,
  sortOrder,
  description,
  location,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        jobs.id, jobs.type, jobs.url, jobs.company, jobs.company_url, 
        jobs.location, jobs.title, jobs.description, jobs.how_to_apply, jobs.company_logo,
        to_char( jobs.created_at, 'day, DD Month YYYY' ) AS created_at, 
        to_char( jobs.updated_at, 'day, DD Month YYYY' ) AS updated_at
      FROM jobs AS jobs
      WHERE jobs.description 
      ILIKE '%${description}%' 
      OR
      jobs.location 
      ILIKE '%${location}%' ORDER BY ${sortBy} ${sortOrder} 
      LIMIT ${limit} OFFSET ${offset}`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const countAll = () => {
  return Pool.query('SELECT COUNT(*) AS total FROM jobs');
};

const insertJobs = (data) => {
  const {
    id,
    type,
    url,
    company,
    company_url,
    location,
    title,
    description,
    how_to_apply,
    company_logo,
  } = data;
  return new Promise((resolve, reject) =>
    Pool.query(
      `INSERT INTO jobs
        (id, type, url, company, company_url, location, title, description,
          how_to_apply, company_logo,  created_at, updated_at) 
      VALUES('${id}', '${type}', '${url}', '${company}', '${company_url}', '${location}', '${title}', '${description}', 
        '${how_to_apply}', '${company_logo}', NOW(), NOW())`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const selectDetailJobs = (id) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `SELECT 
        jobs.id, jobs.type, jobs.url, jobs.company, jobs.company_url, 
        jobs.location, jobs.title, jobs.description, jobs.how_to_apply, jobs.company_logo,
        to_char( jobs.created_at, 'day, DD Month YYYY' ) AS created_at, 
        to_char( jobs.updated_at, 'day, DD Month YYYY' ) AS updated_at
      FROM jobs AS jobs
      WHERE jobs.id='${id}'`,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const updateJobs = ({
  id,
  type,
  url,
  company,
  company_url,
  location,
  title,
  description,
  how_to_apply,
  company_logo,
}) => {
  return new Promise((resolve, reject) =>
    Pool.query(
      `UPDATE jobs 
        SET type ='${type}', url ='${url}', company ='${company}', company_url ='${company_url}', 
        location ='${location}', title ='${title}', description ='${description}', 
        how_to_apply ='${how_to_apply}', company_logo ='${company_logo}', updated_at =NOW()
      WHERE id='${id}' `,
      (err, result) => {
        if (!err) {
          resolve(result);
        } else {
          reject(err);
        }
      }
    )
  );
};

const deleteJobs = (id) => Pool.query(`DELETE FROM jobs WHERE id ='${id}'`);

module.exports = {
  selectAllJobs,
  countAll,
  insertJobs,
  selectDetailJobs,
  updateJobs,
  deleteJobs,
};
