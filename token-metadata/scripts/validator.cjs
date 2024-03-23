const path = require('path');

const programsDir = path.join(__dirname, '..', 'programs');

function getProgram(programBinary) {
  return path.join(programsDir, programBinary);
}

module.exports = {
  validator: {
    commitment: 'processed',
    programs: [
      {
        label: 'Token Metadata',
        programId: 'metaqbxxUerdq28cj1RbAWkYQm3ybzjb6a8bt518x1s',
        deployPath: getProgram('mpl_token_metadata.so'),
      },
    ],
  },
};
