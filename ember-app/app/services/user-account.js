
import Ember from 'ember';

export default Ember.Service.extend({
  enabled: true,
  /**
    Is user authenticated?

    @method login
    @return {Boolean} Returns user authenticated status.
  */
  isUserAuthenticated: function() {
    if (this.get("enabled"))
      return Ember.getOwner(this).lookup("adapter:application").callAction("IsUserAuthenticated", {}, null, {
          withCredentials: !0
      }).then(function(e) {
          return e.value
      })
  },

  login: function(e, t) {
    if (this.get("enabled")) {
        var r = {
            login: e,
            password: t
        };
        return Ember.getOwner(this).lookup("adapter:application").callAction("Login", r, null, {
            withCredentials: true
        }).then(function(e) {
            return e.value
        })
    }
  },

  logout: function() {
    if (this.get("enabled"))
        return Ember.getOwner(this).lookup("adapter:application").callFunction("Logout", {}, null, {
            withCredentials: !0
        }).then(function(e) {
            return e.value
        })
  }
})