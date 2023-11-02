import { Anchor, Box, Grommet, Text, Footer } from "grommet";

import { Mail, Github, Linkedin, Code, Phone } from "grommet-icons";

const Media = () => (
  <Box direction="row" gap="xxsmall" justify="center">
    <Anchor
      a11yTitle="Check me out on Github"
      href="https://github.com/adiseshvsanklapur"
      className="hover"
      target="_blank"
      icon={<Github color="black" />}
    />
    <Anchor
      a11yTitle="Check me out on Linkedin"
      href="https://www.linkedin.com/in/adisesh-venkatesh-sanklapur-75405a21b/"
      className="hover"
      target="_blank"
      icon={<Linkedin color="black" />}
    />
    <Anchor
      a11yTitle="Email me"
      href="mailto:adivsanklapur@gmail.com"
      className="hover"
      target="_blank"
      icon={<Mail color="black" />}
    />
    <Anchor
      a11yTitle="Email me"
      href="tel:9254759477"
      className="hover"
      target="_blank"
      icon={<Phone color="black" />}
    />
  </Box>
);

function AdiFooter() {
  return (
    <Grommet className="grommet">
      <Footer background="white" pad="small">
        <Box align="center" direction="row" gap="xsmall">
          <Code />
          <Text alignSelf="center" size="small" color="black">
            Adi Venkatesh Sanklapur
          </Text>
        </Box>
        <Media />
        <Text textAlign="center" size="small">
          UCD Class of 2027
        </Text>
      </Footer>
    </Grommet>
  );
}

export default AdiFooter;
