const carrier = {
  name: 'carrier',
  length: 4,
  placed: undefined,
};

const cruiser = {
  length: 3,
  placed: undefined,
};

const submarine = {
  name: 'submarine',
  length: 2,
  placed: undefined,
};

export default function createAvailableShips() {
  return [
    { id: 1, ...carrier },
    { id: 2, name: 'cruiser - 1', ...cruiser },
    { id: 3, name: 'cruiser - 2', ...cruiser },
    { id: 4, name: 'cruiser - 3', ...cruiser },
    { id: 5, ...submarine },
  ];
}
