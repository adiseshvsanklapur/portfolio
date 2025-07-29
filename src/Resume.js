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
            href="https://drive.google.com/file/d/1CE3J1I9bvya25D6Zb_V_kOuBSvjavlUF/view?usp=sharing"
            target="_blank"
          />
          <Image src="./adi-resume.png" />
        </Box>
      </Grommet>
      <AdiFooter />
    </div>
  );
}

export default Resume;
