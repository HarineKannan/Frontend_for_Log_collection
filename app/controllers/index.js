import Controller from '@ember/controller';
import { action } from '@ember/object';

export default class IndexController extends Controller {
  showTimestamp = false;
  showEventType = false;
  showSourceIpHostname = false;
  showDestinationIpHostname = false;
  showEventId = false;
  username='';
  logType='';


  @action
  selectLogType(logType) {
    console.log("Selected Log Type:", logType);
  }

  @action
  async fetchLogs() {
    try {
      const payload = {
        username: this.username, 
        neededLog: this.selectedLogType, 
        fieldsNeeded: [
          this.showTimestamp && 'timegenerated',
          this.showEventCode && 'eventcode',
          this.showSourcename && 'sourcename',
          this.showMessage && 'message'
        ].filter(Boolean)
      };
  
      const response = await fetch('http://localhost:8080/api/log-details/change', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });
  
      if (response.ok) {
        console.log('Logs fetched successfully');
      } else {
        console.error('Failed to fetch logs:', response.statusText);
      }
    } catch (error) {
      console.error('Error fetching logs:', error);
    }
  }
  

  @action
  async saveLogs() {
    try {
      const payload = {
        username: this.username, 
        neededLog: this.selectedLogType, 
        fieldsNeeded: [
          this.showTimestamp && 'timestamp',
          this.showEventCode && 'eventcode',
          this.showSourcename && 'sourcename',
          this.showMessage && 'message'
        ].filter(Boolean)
      };
console.log(payload);
      const response = await fetch('http://localhost:8080/api/log-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json'
        },
        body: JSON.stringify(payload)
      });

      if (response.ok) {
        console.log('Logs saved successfully');
      } else {
        console.error('Failed to save logs:', response.statusText);
      }
    } catch (error) {
      console.error('Error saving logs:', error);
    }
  }
    }



