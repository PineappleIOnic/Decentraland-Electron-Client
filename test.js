const client = require('discord-rich-presence')('618606658331082783');

timethen = Date.now()

client.updatePresence({
  state: 'Currently Surfing the decentralised network',
  details: 'In Decentraland',
  startTimestamp: timethen,
  largeImageKey: 'logo',
  smallImageKey: 'snek_small',
  instance: true,
});