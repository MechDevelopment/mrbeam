class Generator {
  /** Class can generate units, see settings inside */
  constructor() {
    this.settings = {
      load: false,
      angle: false,
      moment: false,
      distload: false,
      material: false,
      one_load: false,
      one_moment: false,
      one_distload: false,
      one_material: false,
      defenition: false,
      one_joint: false,
      fixed_size: false
    };
    this.setSettings('default');
  }

  /** Set auto settings by key
   *  @param {String} key - 'default', 'ones', 'all'
   */
  setSettings(key = "default") {
    this.settings = {};
    switch (key) {
      case "default":
        this.settings = {
          one_load: true,
          one_material: true,
          defenition: true,
          fixed_size: true
        };
        break;
      case "ones":
        this.settings = {
          one_load: true,
          one_moment: true,
          one_distload: true,
          one_material: true,
          defenition: true,
        };
        break;
      case "all":
        this.settings = {
          load: true,
          angle: true,
          moment: true,
          distload: true,
          material: true,
          one_load: true,
          one_material: true,
          defenition: true,
        };
        break;

      default:
        this.settings = {
          one_load: true,
          one_material: true,
          defenition: true,
          fixed_size: true
        };
        break;
    }
  }

  generate(count_of_units, section) {
    let units = []; // result

    // Create a vector with coordinates
    const COORDINATES = createCoord(...arguments);

    // Create loads
    if (this.settings.load) {
      createLoad(units, COORDINATES, this.settings.angle);
    }

    // Create moments
    if (this.settings.moment) {
      createMoment(units, COORDINATES);
    }

    // Create distributed loads
    if (this.settings.distload) {
      createDistload(units, COORDINATES);
    }

    // Create materials
    if (this.settings.material) {
      createMaterial(units, COORDINATES);
    }

    /***************************************************/

    // Create one load
    if (this.settings.one_load) {
      createOneLoad(units, COORDINATES, this.settings.angle);
    }

    // Create one moment
    if (this.settings.one_moment) {
      createOneMoment(units, COORDINATES);
    }

    // Create one distributed load
    if (this.settings.one_distload) {
      createOneDistload(units, COORDINATES);
    }

    // Create one material
    if (this.settings.one_material) {
      createOneMaterial(units, COORDINATES);
    }

    /***************************************************/

    // Create defenition units
    if (this.settings.defenition) {
      createDefenition(units, COORDINATES, this.settings.one_joint);
    }

    // Create empty units
    if (this.settings.fixed_size) {
      createEmpty(units, COORDINATES);
    }

    sortUnits(units);
    createId(units);

    console.log(JSON.stringify(units));
    return units;
  }
}

/** Vector with coordinates */
function createCoord(count_of_units, section) {
  const [A, B] = section;
  const H = Math.abs(B - A) / (count_of_units - 1);
  const result = [];
  for (let i = 0; i < count_of_units; i++) {
    result.push(A + H * i);
  }
  return result;
}

/** Set load in all nodes */
function createLoad(units, coords, isAngle) {
  for (let i = 0; i < coords.length; i++) {
    let angle = isAngle ? randint(0, 360) : 90;
    units.push(create([coords[i]], 1, [randint(-3, 3) * 50, angle]));
  }
}

/** Set moment in all nodes */
function createMoment(units, coords) {
  for (let i = 0; i < coords.length; i++) {
    units.push(create([coords[i]], 2, [randint(-3, 3) * 50]));
  }
}

/** Set several distloads */
function createDistload(units, coords) {
  const COUNT = randint(2, 4);
  const H = Math.abs(coords[coords.length - 1] - coords[0]) / COUNT;
  for (let i = 0; i < COUNT; i++) {
    units.push(
      create([(coords[0] + i * H) >> 0, (coords[0] + (i + 1) * H) >> 0], 4, [
        randint(-3, 3) * 50,
        randint(-3, 3) * 50
      ])
    );
  }
}

/** Set several materials */
function createMaterial(units, coords) {
  const COUNT = randint(2, 4);
  const H = Math.abs(coords[coords.length - 1] - coords[0]) / COUNT;
  for (let i = 0; i < COUNT; i++) {
    units.push(
      create([(coords[0] + i * H) >> 0, (coords[0] + (i + 1) * H) >> 0], 5, [
        randint(6, 12) * 1e6,
        randint(1000, 9999) / 10000,
        randint(1000, 9999) / 1000
      ])
    );
  }
}

/***************************************************/

/** Set load in all nodes */
function createOneLoad(units, coords, isAngle) {
  const COUNT = randint(1, 2);
  for (let i = 0; i < COUNT; i++) {
    let r = randint(0, coords.length - 1);
    let angle = isAngle ? randint(0, 360) : 90;
    units.push(create([coords[r]], 1, [randint(-3, 3) * 50, angle]));
  }
}

/** Set moment in all nodes */
function createOneMoment(units, coords) {
  const COUNT = randint(1, 2);
  for (let i = 0; i < COUNT; i++) {
    let r = randint(0, coords.length - 1);
    units.push(create([coords[r]], 2, [randint(-3, 3) * 50]));
  }
}

/** Set one distload */
function createOneDistload(units, coords) {
  units.push(
    create([coords[0], coords[coords.length - 1]], 4, [
      randint(-3, 3) * 50,
      randint(-3, 3) * 50
    ])
  );
}

/** Set one material */
function createOneMaterial(units, coords) {
  units.push(
    create([coords[0], coords[coords.length - 1]], 5, [12e6, 0.04909, 0.7854])
  );
}

/***************************************************/

/** Set defenitions */
function createDefenition(units, coords, isJoint) {
  const N = coords.length - 1;
  if (isJoint) {
    let shift = randint(0, ((N - 1) / 2) >> 0);
    if (randint(0, 1)) {
      // Fixed
      // At start
      units.push(create([coords[0]], 3, [3]));
      units.push(create([coords[0 + 1]], 3, [4]));
      units.push(create([coords[N - shift]], 3, [1]));
    } else {
      // Swivel
      units.push(create([coords[0]], 3, [2]));
      units.push(create([coords[0 + 1]], 3, [4]));
      units.push(create([coords[N - shift]], 3, [1]));
    }
  } else {
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
}

/** Create fixed_size  */
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

/** Add id for units */
function createId(units) {
  for (let i = 0; i < units.length; i++) {
    units[i].id = i;
  }
}

/** Create one Unit */
function create(x, type, value) {
  return { x, type, value };
}

/** Random intedger from min to max */
function randint(min, max) {
  let rand = min - 0.5 + Math.random() * (max - min + 1);
  return Math.round(rand);
}

/** Sort units by x[0] */
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
