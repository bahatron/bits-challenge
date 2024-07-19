import { RequestHandler } from "express";

export const PingRoute: RequestHandler = async (req, res) => {
    return res.json("pong");
};
