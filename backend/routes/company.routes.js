import express from "express";
import { registerCompany, getCompanyById, getCompany, updateCompany } from "../controllers/company.controllers.js";
import { isAuthenticated } from "../middlewares/isAuthenticated.js";

const router = express.Router();

router.route("/register").post(isAuthenticated, registerCompany);

router.route("/getCompany").get(isAuthenticated, getCompany);

router.route("/getCompany/:id").get(isAuthenticated, getCompanyById);

router.route("/updateCompany/:id").put(isAuthenticated, updateCompany);


export default router;