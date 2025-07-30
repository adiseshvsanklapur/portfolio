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
            className="specialhover"
          />
        </Box>
        <Nav
          margin={{ right: "none" }}
          direction="row"
          alignContent="center"
          align="center"
          alignSelf="center"
        >
          <Anchor
            className="specialhover"
            color="black"
            href="/"
            label="Home"
          />
          <Anchor
            className="specialhover"
            color="black"
            href="/about"
            label="About"
          />
          <Anchor
            className="specialhover"
            color="black"
            href="/projects"
            label="Projects"
          />
        </Nav>
        <Nav direction="row" align="center">
          <Button
            hoverIndicator
            weight="bold"
            primary
            color="#0091ff"
            href="https://drive.google.com/file/d/1B1-rMCsYGMuIr1r6UtT8foYvhQaZYEcY/view?usp=sharing"
            className="hover"
            label="My Résumé →"
          />
        </Nav>
      </Header>
    </Grommet>
  );
}

export default Navbar;
