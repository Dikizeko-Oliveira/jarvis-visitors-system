import fastify from "fastify";
import cors from "@fastify/cors";
import { ZodError } from "zod";
// import "module-alias/register";

import { env } from "./env";
import { roomsRoutes } from "./http/controllers/rooms/routes";
import { visitorsRoutes } from "./http/controllers/visitors/routes";
import { sessionsRoutes } from "./http/controllers/sessions/routes";
import { logsRoutes } from "./http/controllers/logs/routes";
import { overviewRoutes } from "./http/controllers/overview/routes";
import { onHoldRoutes } from "./http/controllers/on-hold/routes";

export const app = fastify();

const allowedDomains = ["http://localhost:3000"];

app.register(cors, {
  origin: function (origin, callback) {
    // bypass the requests with no origin (like curl requests, mobile apps, etc )
    if (!origin) return callback(null, true);
    if (allowedDomains.indexOf(origin) === -1) {
      const msg = `This site ${origin} does not have an access. Only specific domains are allowed to access it.`;
      return callback(new Error(msg), false);
    }
    return callback(null, true);
  },
});

app.register(roomsRoutes);
app.register(visitorsRoutes);
app.register(sessionsRoutes);
app.register(logsRoutes);
app.register(overviewRoutes);
app.register(onHoldRoutes);

app.setErrorHandler((error, _, reply) => {
  if (error instanceof ZodError) {
    return reply
      .status(400)
      .send({ message: "Validation error.", issues: error.format() });
  }

  if (env.NODE_ENV !== "production") {
    console.error(error);
  }

  return reply.status(500).send({ message: "Internal server error." });
});
