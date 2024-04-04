// app/controllers/fetch-logs.js

import Controller from '@ember/controller';
import { action } from '@ember/object';
import fetch from 'fetch';

export default class FetchLogsController extends Controller {
  @action
  async fetchLogs() {
    try {
      const response = await fetch('/api/fetchLogs', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify({
          includeTimestamp: this.showTimestamp,
          includeEventCode: this.showEventCode,
          includeSourcename: this.showSourcename,
          includeMessage: this.showMessage
        })
      });

      console.log('Response:', response);
    } catch (error) {
      console.error('Error:', error);
    }
  }
}
