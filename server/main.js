import { Meteor } from 'meteor/meteor';
import log4js from 'log4js';
import mysql from 'mysql';

DB = mysql.createConnection(Meteor.settings.mysql);

Logger = log4js.getLogger();

Meteor.startup(() => {
  Logger.info('Meteor server started.');

  DB.connect((err) => {
    if (err) {
      Logger.error('Failed to connect MySQL server.');
    } else {
      Logger.info('Connected to MySQL server.');
    }
  });
});
