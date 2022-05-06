import nodemailer from "nodemailer";
import express from "express";
import { prisma } from "./prisma";
import { SubmitFeedbackUseCase } from "./use-cases/submit-feedback-use-case";
import { PrismaFeedbacksRepository } from "./repositories/prisma/prisma-feedbacks-repository";

export const routes = express.Router();

const transport = nodemailer.createTransport({
  host: "smtp.mailtrap.io",
  port: 2525,
  auth: {
    user: "65867025bba5cd",
    pass: "8aa878bc09f3c1",
  },
});

routes.post("/feedbacks", async (req, res) => {
  const { type, comment, screenshot } = req.body;

  const prismaFeedbacksRepository = new PrismaFeedbacksRepository();
  const submitFeedbackUseCase = new SubmitFeedbackUseCase(
    prismaFeedbacksRepository
  );

  await submitFeedbackUseCase.execute({ type, comment, screenshot });

  /*  await transport.sendMail({
    from: "Equipe Feedget <oi@feedget.com>",
    to: "Willian Amaro Gomes <wamarotest@gmail.com>",
    subject: "Novo feedback",
    html: [
      `<div style="font-family:sans-serif; font-size:: 16px; color:#111;">`,
      `<p>tipo do feedback: ${type}</p>`,
      `<p>Comentário: ${comment}<p>`,
      `</div>`,
    ].join("\n"),
  }); */
  return res.status(201).send();
});
