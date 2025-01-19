// app/services/model-notifier.js
import Service from '@ember/service';
import { tracked } from '@glimmer/tracking';

export default class ModelNotifierService extends Service {
    @tracked modelID = "";
    @tracked modelType = "";
    @tracked dataSet;
}