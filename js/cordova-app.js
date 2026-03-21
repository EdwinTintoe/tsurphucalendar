var cordovaApp = {
  f7: null,

  // Prevents back button tap from exiting the app on Android.
  // Closes any open modals/panels first, then navigates back if history exists.
  handleAndroidBackButton: function () {
    var f7 = cordovaApp.f7;
    const $ = f7.$;

    document.addEventListener('backbutton', function (e) {
      if ($('.actions-modal.modal-in').length) {
        f7.actions.close('.actions-modal.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.dialog.modal-in').length) {
        f7.dialog.close('.dialog.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.sheet-modal.modal-in').length) {
        f7.sheet.close('.sheet-modal.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.popover.modal-in').length) {
        f7.popover.close('.popover.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.popup.modal-in').length) {
        if ($('.popup.modal-in>.view').length) {
          const currentView = f7.views.get('.popup.modal-in>.view');
          if (currentView && currentView.router && currentView.router.history.length > 1) {
            currentView.router.back();
            e.preventDefault();
            return false;
          }
        }
        f7.popup.close('.popup.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.login-screen.modal-in').length) {
        f7.loginScreen.close('.login-screen.modal-in');
        e.preventDefault();
        return false;
      }
      if ($('.page-current .searchbar-enabled').length) {
        f7.searchbar.disable('.page-current .searchbar-enabled');
        e.preventDefault();
        return false;
      }
      if ($('.page-current .card-expandable.card-opened').length) {
        f7.card.close('.page-current .card-expandable.card-opened');
        e.preventDefault();
        return false;
      }
      const currentView = f7.views.current;
      if (currentView && currentView.router && currentView.router.history.length > 1) {
        currentView.router.back();
        e.preventDefault();
        return false;
      }
      if ($('.panel.panel-in').length) {
        f7.panel.close('.panel.panel-in');
        e.preventDefault();
        return false;
      }
    }, false);
  },

  init: function (f7) {
    cordovaApp.f7 = f7;

    document.addEventListener('deviceready', () => {
      cordovaApp.handleAndroidBackButton()

      // Status bar
      setTimeout(() => {
        if (window.StatusBar) StatusBar.styleLightContent()
      }, 300)

      document.addEventListener('resume', () => {
        if (window.StatusBar) StatusBar.styleLightContent()
      })
    })
  },
}