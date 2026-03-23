function formatTime(date = new Date()) {
  return date.toLocaleString('zh-CN');
}
function getTimestamp() {
  return Date.now();
}

module.exports = { formatTime, getTimestamp };