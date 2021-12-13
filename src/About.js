import { Grommet, Box, Heading, Card, CardBody, CardHeader } from "grommet";
import {
  Java,
  Html5,
  Css3,
  Reactjs,
  Swift,
  Code,
  Music,
  Technology,
  Github,
  Add,
  SettingsOption,
} from "grommet-icons";
import React from "react";
// eslint-disable-next-line
import App from "./App.css";
import AdiFooter from "./AdiFooter";
import Navbar from "./components/Navbar";

function About() {
  return (
    <div>
      <Grommet className="grommet">
        <Navbar />
        <Box align="center" background="white" height="500px">
          <Box align="center">
            <Heading
              margin={{ top: "100px", bottom: "none" }}
              alignSelf="center"
              textAlign="center"
              color="black"
            >
              About Me
            </Heading>
            <Heading
              pad="small"
              size="small"
              alignSelf="center"
              textAlign="center"
              color="#4f4f4f"
            >
              I am currently a Junior at Foothill High School who is passionate
              and excited about Engineering. I hope to pursue a career either in
              Electrical Engineering or Computer Science.
            </Heading>
          </Box>
        </Box>
        <Box background="black" align="center">
          <Heading
            margin={{ top: "100px", bottom: "25px" }}
            alignSelf="center"
            textAlign="center"
            color="white"
          >
            Skills
          </Heading>
        </Box>
        <Box align="center" background="black">
          <Box direction="row" background="black" align="center" pad="small">
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Css3 size="50px" />
              <Heading size="20px">CSS 3</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Html5 size="50px" />
              <Heading size="20px">HTML 5</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Java size="50px" />
              <Heading size="20px">Java</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Reactjs size="50px" />
              <Heading size="20px">ReactJS</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Code size="50px" />
              <Heading size="20px">Python</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Swift size="50px" />
              <Heading size="20px">Swift</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Github size="50px" />
              <Heading size="20px">Git</Heading>
            </Box>
            <Box className="hover" pad="small" align="center">
              <Technology size="50px" />
              <Heading size="20px">Hardware</Heading>
            </Box>
          </Box>
        </Box>
        <Box
          pad="large"
          alignContent="center"
          textAlign="center"
          alignSelf="center"
          align="center"
          gap="large"
          direction="row"
          background="black"
        ></Box>
        <Box background="#2e2e2e" align="center">
          <Heading
            margin={{ top: "50px", bottom: "none" }}
            alignSelf="center"
            textAlign="center"
            color="white"
          >
            Hobbies
          </Heading>
        </Box>
        <Box
          pad="large"
          alignContent="center"
          textAlign="center"
          alignSelf="center"
          align="center"
          gap="large"
          direction="row"
          background="#2e2e2e"
        >
          <Card
            background="light-1"
            align="center"
            alignContent="center"
            round="medium"
            className="hover"
            margin={{ bottom: "50px" }}
          >
            <CardHeader margin={{ top: "30px" }}>
              <Code color="black" size="50px" />
              <Heading color="black" size="40px">
                Coding
              </Heading>
            </CardHeader>
            <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
              <Heading alignContent="center" textAlign="center" size="20px">
                I have always been passionate about coding. More specifically, I
                am very interested in Data Structures, Algorithms, and Backend
                Architectures. However, for fun, I like to do some frontend
                projects too (like this one!). I was first exposed to it in
                middle school by my dad, and I've been in love with it ever
                since.{" "}
              </Heading>
            </CardBody>
          </Card>
          <Card
            background="light-1"
            align="center"
            alignContent="center"
            round="medium"
            className="hover"
            margin={{ bottom: "50px" }}
          >
            <CardHeader margin={{ top: "30px" }}>
              <Music color="black" size="50px" />
              <Heading color="black" size="40px">
                Piano
              </Heading>
            </CardHeader>
            <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
              <Heading alignContent="center" textAlign="center" size="20px">
                I have been playing the piano for as long as I can remember. I
                completed the final level of the Certificate of Merit Level 10
                (final level) a couple of years ago. I don't participate in as
                many competitions as I'd like to, but I still continue to play
                for fun. Personally, I enjoy playing pieces by Chopin and
                Rachmaninoff.{" "}
              </Heading>
            </CardBody>
          </Card>
          <Card
            background="light-1"
            align="center"
            alignContent="center"
            round="medium"
            className="hover"
            margin={{ bottom: "50px" }}
          >
            <CardHeader margin={{ top: "30px" }}>
              <Technology color="black" size="50px" />
              <Heading color="black" size="40px">
                Arduino
              </Heading>
            </CardHeader>
            <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
              <Heading alignContent="center" textAlign="center" size="20px">
                Ever since 7th grade, I've enjoyed making robots of all sorts
                using Arduinos and the components that go along with them. Using
                Arduino, I've created solutions to simple real world problems,
                such as an alarm that activates a car to wake me up. The car
                rolls on my bed, and it's irritating movements are very
                successful at waking me up.{" "}
              </Heading>
            </CardBody>
          </Card>
        </Box>
        <Box background="white" align="center">
          <Heading
            margin={{ top: "50px", bottom: "50px" }}
            alignSelf="center"
            textAlign="center"
            color="black"
          >
            Relevant Coursework
          </Heading>
        </Box>
        <Box align="center" background="white">
          <Box direction="row" background="white" align="center" pad="small">
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Reactjs size="50px" />
              <Heading size="20px">Physics</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Code size="50px" />
              <Heading size="20px">Computer Science (UC Berkeley)</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <SettingsOption size="50px" />
              <Heading size="20px">Honors Principles of Engineering</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="hover"
              pad="small"
              align="center"
            >
              <Add size="50px" />
              <Heading size="20px">AP Calculus AB</Heading>
            </Box>
          </Box>
        </Box>
        <AdiFooter />
      </Grommet>
    </div>
  );
}

export default About;
