import  {Router} from "express";
import { getApp, postApp, putApp, deleteApp } from "../controller/app.js";

export const router = Router();

router.get('/taskmanager', getApp);

router.post('/taskmanager', postApp);

router.put('/taskmanager/:id', putApp);

router.delete('/taskmanager/:id', deleteApp);

