import { Grommet, Box, Image, Button } from "grommet";
import AdiFooter from "./AdiFooter";
import Navbar from "./components/Navbar";
// eslint-disable-next-line
import App from "./App.css";

function Resume() {
  return (
    <div>
      <Navbar />
      <Grommet className="grommet">
        <Box pad="xlarge">
          <Button
            primary
            alignSelf="center"
            label="View Printable Version"
            color="#0091ff"
            margin={{ bottom: "50px" }}
            className="hover"
            href="https://drive.google.com/file/d/1rWiRazqYpMvUfZ4a_Gr_XZX2Ur8RSbc-/view?usp=sharing"
            target="_blank"
          />
          <Image src="./resume.png" />
        </Box>
      </Grommet>
      <AdiFooter />
    </div>
  );
}

export default Resume;
