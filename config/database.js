const mongoose = require("mongoose");
const { MONGO_URI } = process.env;

exports.connect = () => {
  mongoose
    .connect(MONGO_URI, {
      useNewUrlParser: true,
      useUnifiedTopology: true,
      useCreateIndex: true,
      useFindAndModify: true,
    })
    .then(() => console.log("database connected Successfully"))
    .catch((err) => {
      console.log("error connecting database : ");
      console.error(err);
      process.exit(1);
    });
};
