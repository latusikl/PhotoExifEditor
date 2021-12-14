import express from "express"
import cors from "cors"
import ExifController from "./controller/exif-controller.js"

const app = express();
const port = process.env.PORT || 3000;
const jsonSizeLimit = process.env.SIZE_LIMIT || "15mb"

app.use(express.json({limit: jsonSizeLimit}));
app.use(cors());

app.use('/exif', ExifController() );
app.all('*', (req,res) => res.sendStatus(400))


app.get('/health', (req, res) => {
  res.status(200).json({
    listening: server.listening
  });
});

const server = app.listen(port, () => {
  console.log(`Server started on port: ${port}`);
});


process.on('SIGTERM', () => {
  console.debug("Terminating signal received. Stopping server gracefully.");
  server.close(() => {
    console.debug("Server stopped.")
  })
})
