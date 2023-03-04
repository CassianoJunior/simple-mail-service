import z from 'zod';

const handle = (err: z.ZodError) => {
  const errorMessage = err.issues.map((issue) => {
    return `Field ${issue.path[0]}: ${issue.message}`;
  });

  return errorMessage.join(', ');
};

export { handle };
