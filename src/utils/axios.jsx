import axios from "axios";

const instance = axios.create({
  baseURL: "https://api.themoviedb.org/3",
  headers: {
    accept: "application/json",
    Authorization:
      "Bearer eyJhbGciOiJIUzI1NiJ9.eyJhdWQiOiI2OTU1NTFmZWViYzA3NjJmOTMyMzU5NjliMzBkNDBjMCIsIm5iZiI6MTcyNTc3OTU4NC4yOTg2MSwic3ViIjoiNjZiZWVkZWJiMzVlOTFlMTU3MDVlNmE1Iiwic2NvcGVzIjpbImFwaV9yZWFkIl0sInZlcnNpb24iOjF9.f6V3RgcY-gClvzi7moXPMBcVz-OhQiFg8X0fPeO0w2Y",
  },
});

export default instance;
