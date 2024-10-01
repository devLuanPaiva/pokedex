import express from "express";
import cors from "cors";  
import favoritesRoutes from "./routes/favoritesRoutes";

const app = express();

app.use(cors()); 

app.use(express.json());

app.use("/api", favoritesRoutes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
