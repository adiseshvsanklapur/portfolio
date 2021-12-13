import {
  Grommet,
  Heading,
  Box,
  Card,
  CardHeader,
  CardBody,
  CardFooter,
  Button,
} from "grommet";
// eslint-disable-next-line
import App from "./App.css";
import { Camera, SettingsOption, Car, Folder, Location } from "grommet-icons";
import AdiFooter from "./AdiFooter";
import Navbar from "./components/Navbar";

function Projects() {
  return (
    <div>
      <Grommet className="grommet">
        <Navbar />
        <Box background="white" align="center">
          <Heading
            margin={{ top: "50px", bottom: "none" }}
            alignSelf="center"
            textAlign="center"
            color="black"
          >
            Engineering Projects
          </Heading>
        </Box>
        <Box align="center" alignContent="center" alignSelf="center">
          <Box
            margin={{
              left: "50px",
              right: "50px",
              top: "50px",
              bottom: "none",
            }}
            alignContent="center"
            textAlign="center"
            alignSelf="center"
            align="center"
            gap="large"
            direction="row"
            background="white"
          >
            <Card
              background="url('./compmachine.png')"
              align="center"
              alignContent="center"
              round="medium"
              className="hover"
              margin={{ bottom: "50px" }}
            >
              <CardHeader margin={{ top: "30px" }}>
                <Box align="center">
                  <SettingsOption color="white" size="50px" />
                  <Heading
                    margin={{ top: "10px", bottom: "none" }}
                    color="white"
                    size="40px"
                  >
                    Compound Machine Project
                  </Heading>
                  <Heading margin={{ top: "none" }} color="white" size="30px">
                    Honors Principles of Engineering
                  </Heading>
                </Box>
              </CardHeader>
              <CardBody
                margin={{ left: "50px", right: "50px", bottom: "30px" }}
              >
                <Heading
                  color="dark-4"
                  alignContent="center"
                  textAlign="center"
                  size="20px"
                >
                  Along with 3 other students, I created a mechanical fan that
                  is manually operated. This project was made using numerous
                  different mechanical systems, such as a wheel and axle system,
                  a lever, a pulley system, and many more. Through this project,
                  I was able to get a better understanding of how different
                  mechanical systems come together to form wonderful solutions
                  to real world issues.{" "}
                </Heading>
              </CardBody>
              <CardFooter>
                <Button
                  hoverIndicator
                  weight="bold"
                  primary
                  color="#0091ff"
                  href="https://docs.google.com/document/d/1WkI2-h2adCnuvtF9FWI1AnlmGKMno2V7jsyhmA5DGq4/edit?usp=sharing"
                  target="_blank"
                  className="hover"
                  label="View Full Report"
                  margin={{ bottom: "30px" }}
                />
              </CardFooter>
            </Card>
            <Card
              align="center"
              alignContent="center"
              round="medium"
              className="hover"
              margin={{ bottom: "50px" }}
              background="url('./solarcar.png')"
            >
              <CardHeader margin={{ top: "30px" }}>
                <Box align="center">
                  <Car color="white" size="50px" />
                  <Heading
                    margin={{ top: "10px", bottom: "none" }}
                    color="white"
                    size="40px"
                  >
                    Solar & Hydrogen Car
                  </Heading>
                  <Heading margin={{ top: "none" }} color="white" size="30px">
                    Honors Principles of Engineering
                  </Heading>
                </Box>
              </CardHeader>
              <CardBody
                margin={{ left: "50px", right: "50px", bottom: "30px" }}
              >
                <Heading
                  color="dark-4"
                  alignContent="center"
                  textAlign="center"
                  size="20px"
                >
                  Renewable energy is the future of the world. Many countries
                  have already started switching to more renewable forms of
                  energy. More specifically, solar powered items are gaining
                  more and more popularity. To get a better understanding of how
                  these systems work together, we designed and manufactured a
                  simple solar car that uses solar panels to charge up, and
                  stores the energy in a hydrogen fuel cell.{" "}
                </Heading>
              </CardBody>
              <CardFooter>
                <Button
                  hoverIndicator
                  weight="bold"
                  primary
                  color="#0091ff"
                  href="https://docs.google.com/document/d/19FwVVOZZfbymKQ5GV43_nBFjAgL-wWha9DQ73jqGxq0/edit?usp=sharing"
                  target="_blank"
                  className="hover"
                  label="View Full Report"
                  margin={{ bottom: "30px" }}
                />
              </CardFooter>
            </Card>
          </Box>
        </Box>
        <Box background="black" align="center">
          <Heading
            margin={{ top: "50px", bottom: "none" }}
            alignSelf="center"
            textAlign="center"
            color="white"
          >
            Other Notable Projects
          </Heading>
        </Box>
        <Box
          align="center"
          alignContent="center"
          alignSelf="center"
          background="black"
        >
          <Box
            margin={{
              left: "50px",
              right: "50px",
              top: "50px",
              bottom: "none",
            }}
            alignContent="center"
            textAlign="center"
            alignSelf="center"
            align="center"
            gap="large"
            direction="row"
            background="black"
          >
            <Card
              background="white"
              align="center"
              alignContent="center"
              round="medium"
              className="hover"
              margin={{ bottom: "50px" }}
            >
              <CardHeader margin={{ top: "30px" }}>
                <Location color="black" size="50px" />
                <Heading color="black" size="40px">
                  Carto-Campus
                </Heading>
              </CardHeader>
              <CardBody
                margin={{ left: "50px", right: "50px", bottom: "30px" }}
              >
                <Heading alignContent="center" textAlign="center" size="20px">
                  I am the co-founder and manage most of the operations at
                  Carto-Campus. Carto-Campus is an interactive application that
                  provides students and teachers a platform to navigate from
                  class to class without any difficulties. With schools being
                  augmented, traversing through school campuses has become
                  harder than ever before.{" "}
                </Heading>
              </CardBody>
              <CardFooter>
                <Button
                  hoverIndicator
                  weight="bold"
                  primary
                  color="#0091ff"
                  href="https://carto-campus.vercel.app"
                  target="_blank"
                  className="hover"
                  label="View Site"
                  margin={{ bottom: "30px" }}
                />
              </CardFooter>
            </Card>
            <Card
              background="white"
              align="center"
              alignContent="center"
              round="medium"
              className="hover"
              margin={{ bottom: "50px" }}
            >
              <CardHeader margin={{ top: "30px" }}>
                <Folder color="black" size="50px" />
                <Heading color="black" size="40px">
                  Portfolio
                </Heading>
              </CardHeader>
              <CardBody
                margin={{ left: "50px", right: "50px", bottom: "30px" }}
              >
                <Heading alignContent="center" textAlign="center" size="20px">
                  I used my prior experience with ReactJS and some other React
                  frameworks to design and build this site. For example, most of
                  the components are from Grommet, which is a component library.
                  This site is hosted on Github Pages, which is a hosting
                  service provided by Github. When I find the time, I hope to
                  add more features to the site, such as smooth scroll.{" "}
                </Heading>
              </CardBody>
              <CardFooter>
                <Button
                  hoverIndicator
                  weight="bold"
                  primary
                  color="#0091ff"
                  href="https://github.com/adiseshvsanklapur/portfolio"
                  target="_blank"
                  className="hover"
                  label="View Deployment"
                  margin={{ bottom: "30px" }}
                />
              </CardFooter>
            </Card>
            <Card
              background="white"
              align="center"
              alignContent="center"
              round="medium"
              className="hover"
              margin={{ bottom: "50px" }}
            >
              <CardHeader margin={{ top: "30px" }}>
                <Camera color="black" size="50px" />
                <Heading color="black" size="40px">
                  Photo Editor
                </Heading>
              </CardHeader>
              <CardBody
                margin={{ left: "50px", right: "50px", bottom: "30px" }}
              >
                <Heading alignContent="center" textAlign="center" size="20px">
                  When self-studying for my APCSA exam, I made some projects to
                  enhance my Java knowledge. An example of this is a Photo
                  Editor, application, which has numerous features such as Edge
                  Detection and other a painting tool. I used JFrame, a pretty
                  outdated Java library, so the UI looks a little outdated. I
                  hope to migrate the program to JavaFX in the future.{" "}
                </Heading>
              </CardBody>
              <CardFooter>
                <Button
                  hoverIndicator
                  weight="bold"
                  primary
                  color="#0091ff"
                  href="https://github.com/adiseshvsanklapur/PhotoEditor"
                  target="_blank"
                  className="hover"
                  label="View Project"
                  margin={{ bottom: "30px" }}
                />
              </CardFooter>
            </Card>
          </Box>
        </Box>
        <AdiFooter />
      </Grommet>
    </div>
  );
}

export default Projects;
