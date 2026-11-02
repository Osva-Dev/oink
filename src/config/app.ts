import express from "express";
import { errorMiddleware } from "../middlewares/error.middleware.js";
import { notFoundMiddleware } from "../middlewares/not-found.middleware.js";

export function createApp() {
  const app = express();

  app.use(express.json());
  
  app.use(notFoundMiddleware);
  app.use(errorMiddleware);
  
  

  app.get("/health", (_req, res) => {
    res.json({ status: "ok" });
  });

  app.use(
    (
      err: Error,
      _req: express.Request,
      res: express.Response,
      _next: express.NextFunction,
    ) => {
      console.error(err);
      res.status(500).json({ message: "Internal server error" });
    },
  );

  return app;
}