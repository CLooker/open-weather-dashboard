const handleConversion = (temp, currentUnits) =>
  currentUnits === 'F'
    ? (Number(temp) - 32) * (5 / 9)
    : Number(temp) * (9 / 5) + 32;

export default handleConversion;
