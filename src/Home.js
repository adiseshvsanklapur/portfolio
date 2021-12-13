import { Grommet, Box, Heading, Button, Image } from "grommet";
import Navbar from "./components/Navbar";
import AdiFooter from "./AdiFooter";
// eslint-disable-next-line
import App from "./App.css";

function Home() {
  return (
    <div>
      <Grommet className="grommet">
        <Navbar />
        <Box background="black" align="center">
          <Image
            margin={{ top: "100px" }}
            height="200px"
            src="./adiportfolio.png"
            className="hover"
          />
          <Heading
            margin={{ top: "30px", bottom: "none" }}
            alignSelf="center"
            textAlign="center"
            color="white"
          >
            Adisesh Venkatesh Sanklapur
          </Heading>
          <Heading
            size="small"
            margin={{ top: "none", bottom: "50px" }}
            alignSelf="center"
            textAlign="center"
            color="gray"
          >
            Junior At Foothill High School
          </Heading>
          <Box direction="row" align="center">
            <Button
              className="hover"
              height="100px"
              href="/about"
              margin={{ bottom: "150px" }}
              primary
              alignSelf="center"
              textAlign="center"
              label="About Me"
              color="#0091ff"
              hoverIndicator
            />
            <Button
              className="hover"
              height="100px"
              href="/projects"
              margin={{ left: "20px", bottom: "150px" }}
              secondary
              hoverIndicator
              alignSelf="center"
              textAlign="center"
              label="My Work"
              color="#0091ff"
            />
          </Box>
        </Box>
        <AdiFooter />
      </Grommet>
    </div>
  );
}

export default Home;
