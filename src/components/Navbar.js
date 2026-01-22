function Navbar() {
  return (
    <header className="nav">
      <div className="container nav-inner">
        <a className="logo" href="/">
          AVS
        </a>
        <nav className="nav-links">
          <a href="/">Home</a>
          <a href="/about">About</a>
          <a href="/projects">Projects</a>
        </nav>
        <a
          className="btn btn-primary nav-cta"
          href="https://drive.google.com/file/d/1CgGyaktWdks0AhLIrAz8l2sS0c02njjC/view?usp=sharing"
          target="_blank"
          rel="noreferrer"
        >
          Resume
        </a>
      </div>
    </header>
  );
}

export default Navbar;
