import { Button, Anchor, Box, Grommet, Header, Nav } from "grommet";
import { Code } from "grommet-icons";

function Navbar() {
  return (
    <Grommet className="grommet">
      <Header background="white" pad="medium" align="center">
        <Box direction="row" gap="small" align="center">
          <Code size="50px" color="#0091ff" />
          <Anchor
            size="x-large"
            href="/"
            color="black"
            label="AVS"
            className="hover"
          />
        </Box>
        <Nav
          margin={{ right: "none" }}
          direction="row"
          alignContent="center"
          align="center"
          alignSelf="center"
        >
          <Anchor className="hover" color="black" href="/" label="Home" />
          <Anchor className="hover" color="black" href="/about" label="About" />
          <Anchor
            className="hover"
            color="black"
            href="/projects"
            label="Projects"
          />
          <Anchor className="hover" color="black" href="/goals" label="Goals" />
        </Nav>
        <Nav direction="row" align="center">
          <Button
            hoverIndicator
            weight="bold"
            primary
            color="#0091ff"
            href="/resume"
            className="hover"
            label="My Résumé →"
          />
        </Nav>
      </Header>
    </Grommet>
  );
}

export default Navbar;
