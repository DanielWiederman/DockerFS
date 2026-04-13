import app from './app.js';

const PORT = process.env.PORT || 4011;

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
