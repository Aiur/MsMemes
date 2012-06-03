var azure = require('azure');

// client is a table service
function setupTables(client) {
  console.log('setting up tables');
  
  client.createTableIfNotExists('test1', function(error) {
    if (error) throw error;
  });
}

// client is a blob service
function setupBlobStore(client) {

}

exports.setup = function(tableService, blobService) {
  setupTables(tableService);
  setupBlobStore(blobService);
};
