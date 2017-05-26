function strToBuff(str) {
  return Buffer.from(str, 'utf8')
}

module.exports = {
  strToBuff
}