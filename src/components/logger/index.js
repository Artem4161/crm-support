/* eslint-disable no-console */

const chalk = require('chalk');

class LoggerComponent {
  constructor() {
    this.LOG_TYPES = {
      INFO: 1,
      ERROR: 2,
      SERVER: 3,
      MONGODB: 4,
    };
    this.ACTIVE_LOGGER_TYPES = [
      this.LOG_TYPES.INFO,
      this.LOG_TYPES.ERROR,
      this.LOG_TYPES.SERVER,
      this.LOG_TYPES.MONGODB,
    ];
  }

  logTime() {
    const nowDate = new Date();
    return `${nowDate.toLocaleDateString()} ${nowDate.toLocaleTimeString([], {
      hour12: false,
    })}:${nowDate.getMilliseconds()}`;
  }

  info(...args) {
    if (this.ACTIVE_LOGGER_TYPES.includes(this.LOG_TYPES.INFO)) {
      console.log(
        `${this.logTime()} ${process.pid} ${chalk.bold.green('[INFO]')}`,
        ...args,
      );
    }
  }

  error(...args) {
    if (this.ACTIVE_LOGGER_TYPES.includes(this.LOG_TYPES.ERROR)) {
      console.log(
        `${this.logTime()} ${process.pid} ${chalk.bold.red('[ERROR]')}`,
        ...args,
      );
    }
  }

  server(...args) {
    if (this.ACTIVE_LOGGER_TYPES.includes(this.LOG_TYPES.SERVER)) {
      console.log(
        `${this.logTime()} ${process.pid} ${chalk.bold.blue('[SERVER]')}`,
        ...args,
      );
    }
  }

  mongodb(...args) {
    if (this.ACTIVE_LOGGER_TYPES.includes(this.LOG_TYPES.MONGODB)) {
      console.log(
        `${this.logTime()} ${process.pid} ${chalk.bold.yellow('[MONGODB]')}`,
        ...args,
      );
    }
  }
}

module.exports = new LoggerComponent();
