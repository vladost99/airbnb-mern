const express = require("express");
const app = express();
const port = process.env.PORT || 4000;
const cors = require("cors");
const connectionToDB = require("./configs/database.config");
const errorMiddleware = require("./middleware/error.middleware");
require("dotenv").config();

const bootstrap = async () => {
  const globalPrefix = "/api";

  await connectionToDB();

  app.use(
    cors({
      origin: true,
      credentials: true,
    })
  );

  app.use("/uploads", express.static(`${__dirname}/uploads`));
  app.use(express.json());
  app.use(`${globalPrefix}/user`, require("./routes/user.routes"));
  app.use(`${globalPrefix}/places`, require("./routes/places.routes"));
  app.use(`${globalPrefix}/bookings`, require("./routes/booking.routes"));

  app.use(errorMiddleware);

  app.listen(port, () => {
    console.log(`Server is running on ${port}`);
  });
};

bootstrap();
