import Customer from './customer';
import Vehicle from './vehicle';
import AddressHelper from './address';
import BookingHelper from './bookingHelper';

let customer = new Customer();
let vehicle = new Vehicle(); 
let addressHelper = new AddressHelper();
let booking = new BookingHelper();
export {
  addressHelper,
  booking,
  customer,
  vehicle,
}