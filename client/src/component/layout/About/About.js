import React from "react";
import "./About.css";
import { Avatar, Button, Typography } from "@mui/material";
import { GitHub, YouTube } from "@mui/icons-material";
const About = () => {
  const visitInstagram = () => {
    window.location = "https://github.com/sunny06a";
  };
  return (
    <div className="aboutSection">
      <div></div>
      <div className="aboutSectionGradient"></div>
      <div className="aboutSectionContainer">
        <Typography component="h1">About Us</Typography>

        <div>
          <div>
            <Avatar
              style={{ width: "10vmax", height: "10vmax", margin: "2vmax 0" }}
              src="https://github.com/sunny06a/Cartify-frontend/blob/master/src/images/Photo-1.jpg"
              alt="Founder"
            />
            <Typography>Sunny Tomar</Typography>
            <Button onClick={visitInstagram} color="primary">
              Visit Github
            </Button>
            <span>
              This is a sample wesbite made by sunny tomar. Only with the
              purpose to learn mern stack
            </span>
          </div>
          <div className="aboutSectionContainer2">
            <Typography component="h2">Our Brands</Typography>
            <a
              href="https://www.youtube.com/"
              target="blank"
            >
              <YouTube className="youtubeSvgIcon" />
            </a>

            <a href="https://github.com/sunny06a" target="blank">
              <GitHub className="githubSvgIcon" />
            </a>
          </div>
        </div>
      </div>
    </div>
  );
};

export default About;
