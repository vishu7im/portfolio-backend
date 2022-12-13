import Express from "express";

import {
  setproject,
  getproject,
  deleteproject,
  putproject,
  setexperience,
  getexperience,
  updateexperience,
  deleteexperience,
  setskills,
  getskills,
  putskills,
  deleteskills,
  setprofile,
  getprofile,
  login,
  change,
} from "../controllers/controller.js";

const router = Express.Router();
//project requests
router.post("/project", setproject);
router.get("/project", getproject);
router.post("/projects", putproject);
router.delete("/project/:id", deleteproject);

router.post("/experience", setexperience);
router.post("/experiences", updateexperience);
router.get("/experience", getexperience);
router.delete("/experience/:id", deleteexperience);

//skill requests
router.post("/skills", setskills);
router.get("/skills", getskills);
router.post("/skill", putskills);
router.delete("/skills/:id", deleteskills);

router.post("/profile", setprofile);
router.get("/profile", getprofile);

//login route
router.post("/login", login);
router.post("/change", change);

export default router;
