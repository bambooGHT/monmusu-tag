type UpdateSpineMonitor = {
  (resourceId: number, callback: () => void): void;
  reset: () => void;
};

const originalFetch = window.fetch;
window.fetch = function (...args) {
  const fetchResult = originalFetch.apply(this, args);

  fetchResult.then(async (response) => {
    if (spineMonitor.resourceId && (<string>args[0]).includes(spineMonitor.resourceId)) {
      await response.clone().blob();
      spineMonitor.callback();
    }
  }).catch((error) => {
    throw error;
  });

  return fetchResult;
};

const spineMonitor = {
  resourceId: "",
  callback: () => { },
};

const updateSpineMonitor: UpdateSpineMonitor = (resourceId: number, callback: () => void) => {
  spineMonitor.resourceId = String(resourceId);
  spineMonitor.callback = callback;
};

updateSpineMonitor.reset = () => {
  Object.assign(spineMonitor, {
    resourceId: "",
    callback: () => { },
  },);
};

export default updateSpineMonitor;