// booking.schema.ts
import * as yup from 'yup';
import { BookingFormData } from '@interface/booking.interface';

export const bookingSchema = () => {
  // Get today's date at midnight for consistent date comparison
  const today = new Date();
  today.setHours(0, 0, 0, 0);
  
  const schema = yup.object({
    name: yup.string()
      .required('Name is required'),
    
    numberOfRoom: yup.number()
      .typeError('Number of rooms must be a number')  // Handle string to number conversion errors
      .min(1, 'Number of rooms must be at least 1')
      .required('Number of rooms is required'),
    
    rooms: yup.array()
      .of(yup.string().required('Room selection is required'))
      .min(1, 'At least one room must be selected')
      .required('Rooms are required'),
    
    // Important: Since we're using string inputs, we parse them to dates for validation
    checkInDate: yup.string()
      .required('Check-in date is required')
      .test('is-valid-date', 'Invalid date format', (value) => {
        if (!value) return false;
        return !isNaN(Date.parse(value));
      })
      .test('is-future-date', 'Check-in date cannot be in the past', (value) => {
        if (!value) return false;
        const date = new Date(value);
        date.setHours(0, 0, 0, 0);
        return date >= today;
      }),
    
    checkOutDate: yup.string()
      .required('Check-out date is required')
      .test('is-valid-date', 'Invalid date format', (value) => {
        if (!value) return false;
        return !isNaN(Date.parse(value));
      })
      .test('is-after-check-in', 'Check-out date cannot be before check-in date', function(value) {
        if (!value) return false;
        
        // Get the check-in date from the form context
        const checkInDate = this.parent.checkInDate;
        if (!checkInDate) return true; // Skip validation if check-in date is missing
        
        const checkIn = new Date(checkInDate);
        const checkOut = new Date(value);
        
        // Set to midnight for comparing just the dates
        checkIn.setHours(0, 0, 0, 0);
        checkOut.setHours(0, 0, 0, 0);
        
        return checkOut >= checkIn;
      }),
  }) as yup.ObjectSchema<BookingFormData>;
  
  return schema;
}
