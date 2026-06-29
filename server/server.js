require('dotenv').config();
const app = require('./app');
const seedDatabase = require('./utils/seed');

const PORT = process.env.PORT || 5000;

app.listen(PORT, async () => {
  console.log(`Server running on port ${PORT}`);
  await seedDatabase();
});
