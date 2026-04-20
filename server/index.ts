import app from './app.js';
import { connectMongo } from './mongo.js';

const PORT = process.env.PORT || 4011;

await connectMongo();

app.listen(PORT, () => {
  console.log(`🚀 Server ready at: http://localhost:${PORT}`);
});
