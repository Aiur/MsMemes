/*
 * All the routes
 */
var azure = require('azure');

function Routes(tableService, blobService, uuid) {
  this.tableService = tableService;
  this.blobService = blobService;
  this.uuid = uuid;
}

exports.Routes = Routes

Routes.prototype = {
  index: function(req, res){
    res.render('index', { title: 'Express' })
  },
  
  test: function(req, res) { 
    res.render('index', { title: 'Testasd' })
  },
  
  test2: function(req, res) {
    res.write('table service is ' + this.tableService);
    res.end();
  },

  debugAdd: function(req, res) {
  res.write('uuid is ' + this.uuid());
    var item = {
      name: 'test1',
      date: 'lol',
      RowKey: this.uuid(),
      PartitionKey: 'partition1',
    };
    
    this.tableService.insertEntity('test1', item, function(){ });
    res.write('Added new element');
    res.end();
  },
  debugList: function(req, res) {
    var client = this.tableService;
    var query = azure.TableQuery
                .select()
                .from('test1');
    client.queryEntities(query, function(resp, entities) {
      res.render('debugList', { title: 'Elements', resp: resp, entities: entities })
    });
  },
};
