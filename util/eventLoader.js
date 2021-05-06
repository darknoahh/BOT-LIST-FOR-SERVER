const reqEvent = (event) => require(`../events/${event}`);
module.exports = dark => {
  dark.on('ready', () => reqEvent('ready')(dark));
  dark.on('message', reqEvent('message'));
};
