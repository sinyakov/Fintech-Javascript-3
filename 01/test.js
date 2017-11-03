const expect = require('expect.js');
const { getMinMax, rle, printNumbers, fibonacciSimple, fibonacciWithCache } = require('./tasks');

describe('Lesson 1', () => {
  describe('task 1 getMinMax', () => {
    it('should normally get numeric values from string', () => {
      expect(getMinMax('1 и 6.45, -2, но 8, а затем 15, то есть 2.7 и -1028')).to.eql({
        max: 15,
        min: -1028
      });

      expect(getMinMax('100 и 500 -3; 178 или неточное число 1.3232')).to.eql({
        max: 500,
        min: -3
      });
    });
  });

  describe('task 2 fibonacciSimple', () => {
    it('should compute fibonacci number', () => {
      expect(fibonacciSimple(1)).to.be(1);
      expect(fibonacciSimple(6)).to.be(8);
      expect(fibonacciSimple(10)).to.be(55);
    });
  });

  describe('task 3 fibonacciWithCache', () => {
    it('should compute fibonacci number with cache', () => {
      expect(fibonacciWithCache(1)).to.be(1);
      expect(fibonacciWithCache(6)).to.be(8);
      expect(fibonacciWithCache(10)).to.be(55);
    });
  });

  describe('task 4 rle', () => {
    it('should convert the string correctly', () => {
      expect(rle('BCCDDDEEEE')).to.eql('BC2D3E4');
      expect(rle('AAAB')).to.eql('A3B');
      expect(rle('LLLKKFJJJJJJJJJDDDDDSSKQQQNNAAAAAGG')).to.eql('L3K2FJ9D5S2KQ3N2A5G2');
    });
  });

  describe('task 5 printNumbers', () => {
    it('should print numbers as expected', () => {
      expect(printNumbers(11, 3)).to.eql(' 0  4  8\n 1  5  9\n 2  6 10\n 3  7 11');
      expect(printNumbers(5, 3)).to.eql(' 0  2  4\n 1  3  5');
      expect(printNumbers(1, 4)).to.eql(' 0  1');
    });
  });
});
