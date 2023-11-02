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
  Analytics,
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
              Hi! I'm Adisesh (I go by Adi), and I'm a passionate first-year
              student at the University of California, Davis. With a major in
              Data Science, coupled with skills in Computer Science and
              Engineering, I strive to explore the endless possibilities in
              these fields. I'm based in the Bay Area and I'm looking for
              internship opportunities surrounding these fields.
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
              className="specialhover"
              pad="small"
              align="center"
            >
              <Css3 size="50px" />
              <Heading size="20px">CSS 3</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Html5 size="50px" />
              <Heading size="20px">HTML 5</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Java size="50px" />
              <Heading size="20px">Java</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Reactjs size="50px" />
              <Heading size="20px">ReactJS</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Code size="50px" />
              <Heading size="20px">Python</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Swift size="50px" />
              <Heading size="20px">Swift</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Analytics size="50px" />
              <Heading size="20px">R</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Github size="50px" />
              <Heading size="20px">Git</Heading>
            </Box>
            <Box className="specialhover" pad="small" align="center">
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
              <Music color="black" size="50px" />
              <Heading color="black" size="40px">
                Piano
              </Heading>
            </CardHeader>
            <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
              <Heading alignContent="center" textAlign="center" size="20px">
                I have been playing the piano for as long as I can remember. I
                completed the final level of the Certificate of Merit (Level 10)
                when I was 15; furthermore, I've participated and won at
                competitions such as USOMC, Northern California Young Talents,
                and Berkeley Piano Club's annual piano competition. Personally,
                I enjoy playing pieces by Chopin and Rachmaninoff.{" "}
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
              <Code color="black" size="50px" />
              <Heading color="black" size="40px">
                Coding
              </Heading>
            </CardHeader>
            <CardBody margin={{ left: "50px", right: "50px", bottom: "30px" }}>
              <Heading alignContent="center" textAlign="center" size="20px">
                My passion for coding has been a constant driving force since I
                was 11. My primary areas of interest encompass Data Structures,
                Algorithms, and Backend Architectures. Additionally, I find
                enjoyment in frontend projects as well (such as this portfolio!)
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
                The handshake between hardware and software has always
                fascinated me, and I chose to enable myself with some Arduino
                skills to help apply my coding knoweldge while also solving
                simple real world problems. One of my favorite projects was an
                alarm that activates a car to wake me up. The car rolls on my
                bed, and it's irritating movements are very successful at waking
                me up.{" "}
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
              className="specialhover"
              pad="small"
              align="center"
            >
              <Reactjs size="50px" />
              <Heading size="20px">Physics</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Code size="50px" />
              <Heading size="20px">CS at UC Berkeley ATDP</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <SettingsOption size="50px" />
              <Heading size="20px">Hon. Principles of Engineering</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <SettingsOption size="50px" />
              <Heading size="20px">Hon. Aerospace Engineering</Heading>
            </Box>
            <Box
              margin={{ right: "50px" }}
              className="specialhover"
              pad="small"
              align="center"
            >
              <Add size="50px" />
              <Heading size="20px">Calculus (MAT 21B)</Heading>
            </Box>
          </Box>
        </Box>
        <AdiFooter />
      </Grommet>
    </div>
  );
}

export default About;
