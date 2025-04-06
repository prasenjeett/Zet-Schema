import { z } from '../index';

describe('ZetSchema', () => {
  describe('string()', () => {
    it('should validate strings', () => {
      const schema = z.string();
      expect(schema.parse('hello')).toBe('hello');
      expect(() => schema.parse(123)).toThrow();
    });

    it('should validate email', () => {
      const schema = z.string().email();
      expect(schema.parse('test@example.com')).toBe('test@example.com');
      expect(() => schema.parse('invalid-email')).toThrow();
    });
  });

  describe('object()', () => {
    it('should validate objects', () => {
      const schema = z.object({
        name: z.string(),
        age: z.number()
      });

      expect(schema.parse({ name: 'John', age: 30 }))
        .toEqual({ name: 'John', age: 30 });
      
      expect(() => schema.parse({ name: 'John' })).toThrow();
    });
  });
});