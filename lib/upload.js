const multer = require('multer');

const uploadDir = '/tmp/';

const storage = multer.diskStorage({
	destination: (req, file, cb) => {
		cb(null, uploadDir);
	},
	filename: (req, file, cb) => {
		cb(null, file.originalname);
	}
});

const upload = multer({limits: {fileSize: 10 * 1024 * 1024}, storage}).single('file');

module.exports = {
	uploadFile: (req, res) => {
		return new Promise(resolve => {
			upload(req, res, err => {
				if (err) {
					// An error occurred when uploading
					throw err;
				}

				// Everything went fine
				const file = Object.assign({}, req.file);
				delete file.destination;
				delete file.path;
				resolve({
					file
				});
			});
		});
	}
};
