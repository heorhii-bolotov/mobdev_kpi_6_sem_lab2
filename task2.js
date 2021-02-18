const clamp = (val, min, max) => val > max ? max : val < min ? min : val

const log = (...args) => console.log(...args)

const Direction = {
    lat: 'n',
    lng: 'w',
    properties: {
        n: {deg: 0, min: 0, sec: 0},
        w: {deg: 0, min: 0, sec: 0}
    }
}

class CoordinateHB {

    constructor(direction, deg = 0, min = 0, sec = 0) {

        // Clamp to min, max values depending on direction mode
        switch (direction) {
            case Direction.lat:
                deg = clamp(deg, -90, 90)
                break
            case Direction.lng:
                deg = clamp(deg, -180, 180)
                break
        }
        min = clamp(min, 0, 59)
        sec = clamp(sec, 0, 59)

        this.direction = direction
        this.coords = Object.assign({}, Direction.properties[direction])
        Object.assign(this.coords, {deg, min, sec})
    }

    meanCoord(coord) {
        /**
         * Takes CoordinateHB and calculates mean of 'this' and 'coord' parameters
         */
        if (coord.direction !== this.direction) return null
        const c1 = Object.assign({}, this.coords)
        const c2 = Object.assign({}, coord.coords)
        return new CoordinateHB(
            this.direction,
            (c1.deg - c2.deg) / 2,
            (c1.min - c2.min) / 2,
            (c1.sec - c2.sec) / 2
        )
    }
}

CoordinateHB.prototype.toString = function toString(hms = true) {
    const c = Object.assign({}, this.coords)
    if ( hms ) return `${c.deg}°${c.min}'${c.sec}"${this.direction}`

    let dd = c.deg + c.min / 60 + c.sec / (60 * 60)
    if (c.direction === Direction.lng) dd *= -1
    return `${dd.toFixed(7)}°${this.direction}`
}

const [lat, lng] = [Direction.lat, Direction.lng]
let coordinate1 = new CoordinateHB(lat)
let coordinate2 = new CoordinateHB(lat, 10, 10, 10)

log('', coordinate1, '\n', coordinate2) // debug
log('', coordinate1.toString(), '\n', coordinate2.toString()) // debug
log('', coordinate1.toString(false), '\n', coordinate2.toString(false)) // debug

let coordinate3 = coordinate2.meanCoord(coordinate1)
log('', coordinate1, '\n', coordinate2, '\n', coordinate3) // debug
log('', coordinate1.toString(), '\n', coordinate2.toString(), '\n', coordinate3.toString()) // debug
log('', coordinate1.toString(false), '\n', coordinate2.toString(false), '\n', coordinate3.toString(false)) // debug


/*
Template of enum in javascript
var SizeEnum = {
  SMALL: 1,
  MEDIUM: 2,
  LARGE: 3,
  properties: {
    1: {name: "small", value: 1, code: "S"},
    2: {name: "medium", value: 2, code: "M"},
    3: {name: "large", value: 3, code: "L"}
  }
};

Then we could access the enum properties like this:

var mySize = SizeEnum.MEDIUM;
var myCode = SizeEnum.properties[mySize].code; // myCode == "M"
 */
