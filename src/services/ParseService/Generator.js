class Generator {
  /** Class can generate units, see settings inside */
  constructor() {
    this.settings = {
      defenition: true,
      load: false,
      angle: false,
      moment: false,
      distload: true,
      joint: false,
      material: false,
      dif_material: false,
      fixed_size: true
    };
  }

  generate(count_of_units, section) {
    let units = []; // result

    // Create a vector with coordinates
    const COORDINATES = createCoord(...arguments);

    // Create defenition units
    if (this.settings.defenition) {
      createDefenition(units, COORDINATES);
    }

    // Create loads
    if (this.settings.load) {
      createLoad(units, COORDINATES, this.settings.angle);
    }

    // Create moments
    if (this.settings.moment) {
      createMoment(units, COORDINATES);
    }

    // Create distributed load
    if (this.settings.distload) {
      createDistload(units, COORDINATES);
    }

    // Create empty units
    if (this.settings.fixed_size) {
      createEmpty(units, COORDINATES);
    }

    console.log(COORDINATES);
    console.log(JSON.stringify(units));
    return units;
  }
}

function createCoord(count_of_units, section) {
  const [A, B] = section;
  const H = Math.abs(B - A) / (count_of_units - 1);
  const result = [];
  for (let i = 0; i < count_of_units; i++) {
    result.push(A + H * i);
  }
  return result;
}

function createDefenition(units, coords) {
  const N = coords.length - 1;
  if (randint(0, 1)) {
    // Fixed
    if (randint(0, 1)) {
      // At start
      units.push(create([coords[0]], 3, [3]));
    } else {
      // In the end
      units.push(create([coords[N]], 3, [3]));
    }
  } else {
    // Swivel
    let shift = randint(0, ((N - 1) / 2) >> 0);
    units.push(create([coords[0 + shift]], 3, [2]));
    units.push(create([coords[N - shift]], 3, [1]));
  }
}

function createLoad(units, coords, isAngle) {
  for (let i = 0; i < coords.length; i++) {
    let angle = isAngle ? randint(0, 360) : 90;
    units.push(create([coords[i]], 1, [randint(-3, 3) * 50, angle]));
  }
}

function createMoment(units, coords) {
  for (let i = 0; i < coords.length; i++) {
    units.push(create([coords[i]], 2, [randint(-3, 3) * 50]));
  }
}

function createDistload(units, coords) {
  units.push(
    create([coords[0], coords[coords.length - 1]], 4, [
      randint(-3, 3) * 50,
      randint(-3, 3) * 50
    ])
  );
}

function createEmpty(units, coords) {
  const N = coords.length - 1;
  sortUnits(units);
  // In the end
  if (units[units.length - 1].x[0] != coords[N]) {
    units.push(create([coords[N]], 1, [0, 0]));
  }
  // At start
  if (units[0].x[0] != coords[0]) {
    units.push(create([coords[0]], 1, [0, 0]));
  }
}

function create(x, type, value) {
  return { x, type, value };
}

function randint(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

function sortUnits(units) {
  units.sort(function(a, b) {
    if (a.x[0] < b.x[0]) {
      return -1;
    }
    if (a.x[0] > b.x[0]) {
      return 1;
    }
    return 0;
  });
}

export default Generator;
