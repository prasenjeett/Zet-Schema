import { z } from 'zetschema';

// Define a schema
const UserSchema = z.object({
  id: z.string(),
  name: z.string().min(2).max(50),
  email: z.string().email(),
  age: z.number().min(0).max(120),
  address: z.object({
    street: z.string(),
    city: z.string(),
    country: z.string()
  }).optional()
});

// Infer the type
type User = z.infer<typeof UserSchema>;

// Validate data
try {
  const user = UserSchema.parse({
    id: "123",
    name: "John Doe",
    email: "john@example.com",
    age: 30
  });
  console.log("Valid user:", user);
} catch (error) {
  if (error instanceof z.ZetError) {
    console.log("Validation errors:", error.format());
  }
}