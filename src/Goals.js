import { Grommet, Heading, Box, Image } from "grommet";
import AdiFooter from "./AdiFooter";
import Navbar from "./components/Navbar";
// eslint-disable-next-line
import App from "./App.css";

function Goals() {
  return (
    <div>
      <Grommet className="grommet">
        <Navbar />
        <Box pad="none" align="center">
          <Box align="center" pad="medium" background="white">
            <Image
              margin={{ bottom: "none" }}
              height="100px"
              src="./berk.png"
            />
            <Heading color="black" margin={{ bottom: "none", top: "10px" }}>
              Educational Goals
            </Heading>
            <Heading
              margin={{ top: "10px" }}
              size="25px"
              textAlign="center"
              color="dark-2"
            >
              My dream ever since middle school has been to get into the
              University of California, Berkeley MET Program, a highly selective
              program with a less than 2% acceptance rate for a bachelor's
              degree. More realistically, however, I would love to get into a
              University of California school such as UCLA or UC San Diego or
              maybe even UIUC and study EECS or some form of Data Science. After
              receiving a bachelors degree, I would like to attend a more
              prestigious program for a master's degree, such as Stanford's NLP
              program.
            </Heading>
          </Box>
          <Box align="center" pad="medium">
            <Image
              height="100px"
              margin={{ bottom: "none" }}
              src="./apple.png"
            />
            <Heading margin={{ bottom: "none" }}>Career Goals</Heading>
            <Heading
              margin={{ top: "10px" }}
              size="25px"
              textAlign="center"
              color="dark-2"
            >
              After completing my education at university, I would initially
              like to start working for one of the tech giants, such as Apple's
              Siri Team. Siri's voice interpretation software is created using a
              form of NLP. Once I gain a certain level of understanding with
              production code, I would like to create a startup that does some
              sort of research regarding Data Science. If that does not work
              out, I would return to working at a company like Apple or Meta,
              where I will gain more experience, with which I would become an
              open source committer for many projects.
            </Heading>
          </Box>
          <Box align="center" pad="medium">
            <Image
              height="100px"
              margin={{ bottom: "none" }}
              src="./arduino.png"
            />
            <Heading
              textAlign="center"
              margin={{ bottom: "none", top: "none" }}
            >
              Engineering Future
            </Heading>
            <Heading
              color="dark-2"
              textAlign="center"
              margin={{ top: "10px" }}
              size="25px"
            >
              With the decent amount of experience I have acquired, I have
              gotten a brief understanding of most of the engineering fields,
              and of all them, Electrical Engineering, Electronics Engineering,
              and Computer Science are the most appealing to me. Regardless of
              the university I go to, I would really like to pursue a career and
              major in either one of the aforementioned fields because
              engineering can help build the future, and I would love to be a
              part of that innovative process.
            </Heading>
          </Box>
        </Box>
      </Grommet>
      <AdiFooter />
    </div>
  );
}

export default Goals;
