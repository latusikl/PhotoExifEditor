import express from "express"
import cors from "cors"
import ExifController from "./controller/exif-controller.js"

const app = express();
const port = process.env.PORT || 3000;
const jsonSizeLimit = process.env.SIZE_LIMIT || "5mb"

app.use(express.json({limit: jsonSizeLimit}));
app.use(cors());

app.use('/exif', ExifController() );



app.get('/health', (req, res) => {
  return res.status(200).json({
    listening: server.listening
  });
});

app.all('*', (req,res) => res.sendStatus(400))

const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});


process.on('SIGTERM', () => {
  console.debug("Terminating signal received. Stopping server gracefully.");
  server.close(() => {
    console.debug("Server stopped.")
  })
})
