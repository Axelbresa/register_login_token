import path from 'path';
import createLogs from '../helpers/createLogs.js';

const handleErrors = (err, req, res, next) => {
  const date = new Date();
  const timestamp = `${date.toLocaleDateString()} ${date.toLocaleTimeString()}`;
  createLogs(`${timestamp}-${err.stack}\n`, process.cwd(), 'errors');
  const errorMessage = JSON.parse(err.message);
  res.status(errorMessage.status).send(errorMessage.Error);
};

export default handleErrors;
