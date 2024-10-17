const cron = require('node-cron');
const { spawn } = require('child_process');
const { getUrls } = require('./modules/urlFetcher');
const { saveData } = require('./modules/dataStorage');
const { notify } = require('./modules/notifier');
const logger = require('./modules/logger');

// クローリングのメイン処理
async function crawl() {
  try {
    const urls = await getUrls();
    for (const url of urls) {
      const pythonProcess = spawn('python', ['crawler.py', url]);
      
      pythonProcess.stdout.on('data', (data) => {
        const parsedData = JSON.parse(data);
        saveData(parsedData);
      });

      pythonProcess.stderr.on('data', (data) => {
        logger.error(`Python Error: ${data}`);
      });

      pythonProcess.on('close', (code) => {
        logger.info(`Python process exited with code ${code}`);
      });
    }
    notify('Crawling completed successfully');
  } catch (error) {
    logger.error('Crawling failed', error);
    notify('Crawling failed', error.message);
  }
}

// クローリングのスケジューリング（毎日午前3時に実行）
cron.schedule('0 3 * * *', () => {
  logger.info('Starting scheduled crawl');
  crawl();
});

// 初回実行
crawl();