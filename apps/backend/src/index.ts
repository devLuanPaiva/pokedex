import express from "express";
import favoritesRoutes from "./routes/favoritesRoutes";

const app = express();
app.use(express.json());

app.use("/api", favoritesRoutes);

const PORT = process.env.PORT ?? 3000;
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
});
