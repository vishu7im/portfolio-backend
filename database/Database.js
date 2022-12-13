import mongoose from "mongoose";

// project schema
const project = new mongoose.Schema({
  name: String,
  skill: String,
  git: String,
  demo: String,
  img: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

// skills schemma
const skills = new mongoose.Schema({
  name: String,
  skill: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

//  experience schema
const experience = new mongoose.Schema({
  name: String,
  about: String,
  start: String,
  end: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

// profile schema
const profile = new mongoose.Schema({
  img: String,
  cv: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});
const login = new mongoose.Schema({
  email: String,
  pwd: String,
  date: {
    type: Date,
    default: Date.now(),
  },
});

// modals or collection

const Project = new mongoose.model("project", project);
const Skills = new mongoose.model("skills", skills);
const Profile = new mongoose.model("profile", profile);
const Experience = new mongoose.model("experience", experience);
const Login = new mongoose.model("login", login);

export { Experience, Profile, Skills, Project, Login };
