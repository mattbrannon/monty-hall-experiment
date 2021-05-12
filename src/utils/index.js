export const random = (n) => Math.floor(Math.random() * (n + 1));

export const createDoors = () => {
  const doors = new Array(3).fill('goat');
  const i = random(doors.length - 1);
  doors[i] = 'car';
  return doors;
};

export const getFirstGoat = (doors) => doors.indexOf('goat');
export const getLastGoat = (doors) => doors.lastIndexOf('goat');

export const randomHostChoice = (doors) => {
  const choices = [getFirstGoat, getLastGoat];
  const callback = choices[random(1)];
  return callback(doors);
};

export const getOnlyGoat = (doors, choice) => {
  for (var i = 0; i < doors.length; i++) {
    if (doors[i] === 'goat' && i !== choice) {
      return i;
    }
  }
  throw new Error('goat not found');
};

export const getHostChoice = (doors, playerChoice) => {
  if (doors[playerChoice] === 'goat') {
    // console.log('getOnlyGoat');
    return getOnlyGoat(doors, playerChoice);
  } else {
    // console.log('randomHostChoice');
    return randomHostChoice(doors);
  }
};

export const getFinalDoor = (doors, playerChoice, hostChoice) => {
  for (var i = 0; i < doors.length; i++) {
    if (i !== playerChoice && i !== hostChoice) {
      return i;
    }
  }
  throw new Error('door not found');
};
