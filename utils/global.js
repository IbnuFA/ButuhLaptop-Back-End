export const OrderStatus = {
  ORDER_PLACED: 0, //customer -> admin
  ORDER_ACCEPTED: 1, //admin verify -> customer
  ORDER_NEEDS_PAYMENT: 2,
  ORDER_PAYED: 3, //need admin payment verif
  ORDER_ON_PROCESS: 4, //need fill shipping info while admin preparing the package
  ORDER_SENT: 5,
  ORDER_DONE: 6, //package already recieved
  ORDER_CANCELLED: 9,
  PAYMENT_EXPIRED: 10,
};
