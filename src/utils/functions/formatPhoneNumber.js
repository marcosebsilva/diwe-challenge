const formatPhoneNumber = (number) => (
  `(${number.toString().slice(0, 2)}) ${number.toString().slice(2, 7)}-${number.toString().slice(7)}`
);
export default formatPhoneNumber;
