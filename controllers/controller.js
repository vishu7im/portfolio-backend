import {
  Experience,
  Profile,
  Skills,
  Project,
  Login,
} from "../database/Database.js";

import jwt from "jsonwebtoken";

import pwdhash from "password-hash";
//project set
export const setproject = async (req, res) => {
  const { name, skill, git, demo, img } = req.body;
  const result = new Project({ name, skill, git, demo, img });

  try {
    const data = await result.save();
    res.status(202);
    res.send("connact");
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};
//project delete
export const deleteproject = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Project.deleteOne({ _id: id });
    res.status(202);
  } catch (error) {
    res.status(402);
    console.log(error.message);
  }
};

// update the project
export const putproject = async (req, res) => {
  const { name, skill, git, demo, id } = req.body;
  //  console.log(name, skill, git, demo, id);
  try {
    const data = await Project.findByIdAndUpdate(id, {
      name,
      skill,
      git,
      demo,
    });
    res.status(200).json("connect ");
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};

//project get
export const getproject = async (req, res) => {
  try {
    const result = await Project.find();
    res.send(result);
    res.status(200);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};

// experience set
export const setexperience = async (req, res) => {
  const { name, about, start, end } = req.body;

  const result = new Experience({ name, about, start, end });

  try {
    const data = result.save();
    res.status(200);
  } catch (error) {
    console.log(error.message);
    res.status(404);
  }
};

//exprience get
export const getexperience = async (req, res) => {
  try {
    const result = await Experience.find();
    res.send(result);
    res.status(200);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};
export const deleteexperience = async (req, res) => {
  const { id } = req.params;

  try {
    const data = await Experience.deleteOne({ _id: id });
    res.status(202);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};
//exprience update
export const updateexperience = async (req, res) => {
  const { name, about, start, end, id } = req.body;
  try {
    const data = await Experience.findByIdAndUpdate(
      id,
      {
        name,
        about,
        start,
        end,
      },
      res.status(200)
    );
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};

//skills set
export const setskills = async (req, res) => {
  const { name, skill } = req.body;

  const result = new Skills({ name, skill });

  try {
    const data = result.save();
    res.status(200);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};

// skills get
export const getskills = async (req, res) => {
  try {
    const result = await Skills.find();
    res.send(result);
    res.status(200);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};
//skill delete
export const deleteskills = async (req, res) => {
  const id = req.params.id;
  try {
    const data = await Skills.deleteOne({ _id: id });
    res.status(202);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};
//skill update
export const putskills = async (req, res) => {
  const { name, skill, id } = req.body;

  try {
    const data = await Skills.findByIdAndUpdate(id, {
      name,
      skill,
    });
    res.status(202);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};

//profile set

export const setprofile = async (req, res) => {
  const { cv, img, id } = req.body;
  try {
    const data = await Profile.findByIdAndUpdate(id, {
      cv,
      img,
    });
    res.status(202);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};

//profile get
export const getprofile = async (req, res) => {
  try {
    const result = await Profile.find();
    res.send(result);
    res.status(200);
  } catch (error) {
    res.status(401);
    console.log(error.message);
  }
};

export const login = async (req, res) => {
  const { email, pwd } = req.body;
  try {
    const result = await Login.find({ email: email });

    const hash = pwdhash.verify(pwd, result[0].pwd);

    if (email === result[0].email && hash === true) {
      const token = jwt.sign(
        { email: result[0].email, pwd: result[0].pwd },
        "vishalmunday2582"
      );
      res.status(202).json({
        token: token,
        status: " login",
        user: true,
      });
    } else {
      res
        .status(401)
        .json({ token: null, status: " invalid detail", user: false });
    }
  } catch (error) {
    res
      .status(401)
      .json({ token: null, status: " invalid detail", user: false });
  }
};

export const change = async (req, res) => {
  const { opwd, pwd, rpwd, user } = req.body;
  const token = jwt.decode(user);

  try {
    const data = await Login.find({ email: token.email });
    const hashpwd = pwdhash.verify(opwd, data[0].pwd);
    if (pwd === rpwd && hashpwd === true) {
      const hash = pwdhash.generate(pwd);
      try {
        const password = await Login.findByIdAndUpdate(data[0]._id, {
          pwd: hash,
        });

        res.status(202).json("password changed");
      } catch (error) {
        res.status(401).json("invalid detail");
      }
    } else {
      res.status(401).json("invalid detail");
    }
  } catch (error) {
    res.status(401).json("invalid detail");
  }
};
