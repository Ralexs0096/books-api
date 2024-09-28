import { serve } from '@hono/node-server';
import { zValidator } from '@hono/zod-validator';
import { Hono } from 'hono';
import { z } from 'zod';

const app = new Hono();

app.get(
  '/',
  zValidator(
    'query',
    z.object({
      name: z.string()
    })
  ),
  (c) => {
    const { name } = c.req.valid('query');
    return c.json({ message: `hey! ${name}` });
  }
);

const port = 3000;
console.log(`Server is running on port ${port}`);

serve({
  fetch: app.fetch,
  port
});
