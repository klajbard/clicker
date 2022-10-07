// TODO: Find a way to implement worker in typescript

const POLL_FREQUENCY = 0.5;
// Store the tab state in a variable to only calculate
// in worker when necessary
let isBlurred = false;
let count,
  dps,
  interval,
  pushIteration = 5,
  saveIteration = 51;
const updateCount = () => {
  count += POLL_FREQUENCY * dps;
};

self.onmessage = ({ data: _data }) => {
  const { event, data } = _data;
  if (event === "blur" && !isBlurred) {
    count = data?.count || 0;
    dps = data?.dps || 0;
    if (dps) {
      clearInterval(interval);
      interval = setInterval(() => {
        updateCount();
        if (!pushIteration) {
          self.postMessage({ event: "push", count });
          pushIteration = 4;
        } else if (!saveIteration) {
          self.postMessage({ event: "save" });
          saveIteration = 51;
        }
        pushIteration--;
        saveIteration--;
      }, POLL_FREQUENCY * 1000);
    }
    isBlurred = true;
  } else if (event === "focus" && isBlurred) {
    clearInterval(interval);
    self.postMessage({ event: "push", count });
    isBlurred = false;
  }
};
