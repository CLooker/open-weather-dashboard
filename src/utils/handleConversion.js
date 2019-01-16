const handleConversion = (temp, currentUnits) =>
  currentUnits === 'F' ? (+temp - 32) * (5 / 9) : +temp * (9 / 5) + 32;

export default handleConversion;
