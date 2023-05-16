import flatpickr from "flatpickr"
import "flatpickr/dist/flatpickr.min.css";
import "flatpickr/dist/themes/dark.css";
const datePicker = document.getElementById('date')
const options = {
  enableTime: false,
  dateFormat: 'm/d/Y',
  defaultDate: new Date(),
  onClose(selectedDates) {selectedDates[0]
  },
};

flatpickr(datePicker, options)