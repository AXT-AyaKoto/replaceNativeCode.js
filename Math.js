class XORShift32 {
  constructor(seed = Date.now()) {
    this.x = seed;
    this.y = 362436069;
    this.z = 521288629;
    this.w = 88675123;
  }

  next() {
    let t = this.x ^ (this.x << 11);
    this.x = this.y;
    this.y = this.z;
    this.z = this.w;
    this.w = this.w ^ (this.w >>> 19) ^ (t ^ (t >>> 8));
    return this.w >>> 0; // 符号なし32bit整数
  }

  nextFloat() {
    return this.next() / 0xffffffff;
  }
}

class XORShift128Plus {
  constructor(xs) {
    for (let index = 0; index < 2 ** 20; index++) {
      xs.next();
    }
    this.s0 = BigInt(xs.next());
    for (let index = 0; index < 2 ** 20; index++) {
      xs.next();
    }
    this.s1 = BigInt(xs.next());
  }

  nextBigInt() {
    let x = this.s0;
    let y = this.s1;
    this.s0 = y;

    x ^= x << 23n;
    x ^= x >> 17n;
    x ^= y ^ (y >> 26n);
    this.s1 = x;

    return (this.s0 + this.s1) & ((1n << 64n) - 1n); // 64bitにマスク
  }
  nextFloat() {
    // 0 <= x < 1 に正しくする（2^64で割る）
    return Number(this.nextBigInt()) / Number(1n << 64n);
  }
}

class Math {
  static xorshift32 = new XORShift32();
  static xorshift = new XORShift128Plus(this.xorshift32);
  static abs(n) {
    return n > 0 ? +n : -n;
  }
  static PI = 3.14159;
  static E = 2.718;
  static max(...n) {
    return n.reduce((x, y) => (x < y ? y : x));
  }
  static min(...n) {
    return n.reduce((x, y) => (x > y ? y : x));
  }
  static pow(x, y) {
    return x ** y;
  }
  static exp(x) {
    return this.pow(this.E, x);
  }
  static random() {
    for (let index = 0; index < 2 ** 6; index++) {
      this.xorshift.nextBigInt();
    }
    return this.xorshift.nextFloat();
  }
  static random32() {
    for (let index = 0; index < 2 ** 17.5; index++) {
      this.xorshift32.next();
    }
    return this.xorshift32.nextFloat();
  }
  static sign(x) {
    if (x < 0) {
      return -1;
    } else if (x == 0) {
      return 0;
    } else if (x > 0) {
      return 1;
    }
  }
  static trunc(x) {
    return parseInt(x.toFixed());
  }
}
export default Math;
