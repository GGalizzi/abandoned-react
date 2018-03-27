// @flow
export type Inn = {
  type: "INN",
  cost: number,
};

export type Weaponsmith = {
  type: "WEAPONSMITH",
  cost: number,
};

export type Amenity = Inn | Weaponsmith;
