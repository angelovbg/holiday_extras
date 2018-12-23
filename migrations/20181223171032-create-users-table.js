'use strict';

var dbm;
var type;
var seed;

/**
  * We receive the dbmigrate dependency from dbmigrate initially.
  * This enables us to not have to rely on NODE_PATH.
  */
exports.setup = function(options, seedLink) {
  dbm = options.dbmigrate;
  type = dbm.dataType;
  seed = seedLink;
};

exports.up = function(db, callback) {
    const query = '' +
        'CREATE TABLE users (id SERIAL NOT NULL, email VARCHAR(255) NOT NULL, given_name VARCHAR(255) NOT NULL, family_name VARCHAR(255) NOT NULL, ' +
        'created_at TIMESTAMP(0) WITHOUT TIME ZONE DEFAULT NOW(), PRIMARY KEY(id));' +
        'ALTER TABLE users ADD UNIQUE (email);';

    return db.runSql(query, callback);
};

exports.down = function(db) {
  return null;
};

exports._meta = {
  "version": 1
};
