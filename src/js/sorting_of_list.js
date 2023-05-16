import flatpickr from "flatpickr"
const datePicker = document.getElementById('date')
const options = {
  enableTime: false,
  dateFormat: 'm/d/Y',
  defaultDate: new Date(),
  onClose(selectedDates) {selectedDates[0]
  },
};

flatpickr(datePicker, options)