import Ember from 'ember';
import { Projection, Adapter } from 'ember-flexberry-data';
import config from '../config/environment';

export default Adapter.Odata.extend(Projection.AdapterMixin, {
  host: config.APP.backendUrls.api,

  ajax(url, type, options) {
    options.xhrFields = { withCredentials: true };
    return this._super(url, type, options);
  },

  handleResponse(status, headers, payload) {
    let appController = Ember.getOwner(this).lookup('controller:application');
    if (status === 401 ||
      status === 403 ||
      (status === 500 &&
        payload.error.message === 'User with login "" is not found in Flexberry Security. Check the IDataService instance, that is used for SecurityManager.')
      ) {
      appController.transitionToRoute('login');
      return true;
    } else {
      return this._super.apply(this, arguments);
    }
  }
});
