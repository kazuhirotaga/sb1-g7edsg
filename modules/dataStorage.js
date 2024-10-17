const mongoose = require('mongoose');
const logger = require('./logger');

mongoose.connect('mongodb://localhost/webcrawler', { useNewUrlParser: true, useUnifiedTopology: true });

const PageSchema = new mongoose.Schema({
  url: String,
  title: String,
  content: String,
  createdAt: { type: Date, default: Date.now }
});

const Page = mongoose.model('Page', PageSchema);

async function saveData(data) {
  try {
    const page = new Page(data);
    await page.save();
    logger.info(`Saved data for URL: ${data.url}`);
  } catch (error) {
    logger.error('Failed to save data', error);
    throw error;
  }
}

module.exports = { saveData };