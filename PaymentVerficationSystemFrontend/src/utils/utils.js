export function reloadPage() {
    setTimeout(() => {
        window.location.reload();
}, 2000);
  }


  // src/utils/toastUtils.js
export const showSuccessToastMessage = (app, message) => {
    app.config.globalProperties.successToastMessage = message;
    app.config.globalProperties.showSuccessToast = true;
  
    setTimeout(() => {
      app.config.globalProperties.showSuccessToast = false;
    }, 1000); // Toast disappears after 1 second
  };
  
  export const showErrorToastMessage = (app, message) => {
    app.config.globalProperties.errorToastMessage = message;
    app.config.globalProperties.showErrorToast = true;
  
    setTimeout(() => {
      app.config.globalProperties.showErrorToast = false;
    }, 1000); // Toast disappears after 1 second
  };
  
  