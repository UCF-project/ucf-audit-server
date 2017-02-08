const execFile = require('child_process').execFile;
const debug = require('debug')('UAT:Server:AuditCli');

const execAudit = (auditor, file) => {
	debug('file', file);
	const cmdParams = [
		// // Testing commands
		// 'docker',
		// 'exec',
		// 'asqatasun-cli',
		`./bin/${auditor}.sh`,
		'-f',
		'/opt/firefox/firefox-bin',
		'-d',
		'99',
		'-r',
		'Rgaa30',
		'-t',
		'Scenario',
		`/tmp/${file.file.filename}`
	];

	debug('Executing: ', cmdParams.join(' '));

	const cmdFile = cmdParams.shift();

	return new Promise((resolve, reject) => {
		execFile(cmdFile, cmdParams, (error, stdout, stderr) => {
			if (error) {
				reject({
					error,
					stdout,
					stderr
				});
			} else {
				resolve(stdout);
			}
		});
	});
}

module.exports = execAudit;
