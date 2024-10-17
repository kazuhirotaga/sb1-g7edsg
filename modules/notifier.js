const logger = require('./logger');

function notify(message, details = '') {
  // ここでは単純にログ出力していますが、実際にはメールやSlack通知を実装します
  logger.info(`Notification: ${message}`, { details });
}

module.exports = { notify };