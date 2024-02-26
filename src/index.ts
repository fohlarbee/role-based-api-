// const express = require('express');
import express from 'express';
import * as dotenv from 'dotenv'
import env from './lib/env';
import '@/db/index'
import authRouter from './routes/auth';


dotenv.config();

const app = express();

app.use(express.json())
app.use("/auth", authRouter)


app.get("/", (req, res) => {
    res.send("<h2>Hello TS Node Dev</h2>");
})

app.listen(env.PORT, () => {
    console.log("App is Listening on Port " + process.env.PORT);
})