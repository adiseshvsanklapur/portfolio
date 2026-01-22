import AdiFooter from "./AdiFooter";
// eslint-disable-next-line
import App from "./App.css";

const goalCards = [
  {
    title: "Educational Goals",
    image: "/berk.png",
    body: "My dream ever since middle school has been to get into the University of California, Berkeley MET Program, a highly selective program with a less than 2% acceptance rate for a bachelor's degree. I would also love to get into a University of California school such as UCLA or UC San Diego or and study EECS or some form of Data Science. After receiving a bachelors degree, I would like to attend a more prestigious program for a master's degree, such as Stanford's NLP program.",
  },
  {
    title: "Career Goals",
    image: "/apple.png",
    body: "After completing my education at university, I would initially like to start working for one of the tech giants, such as Apple's Siri Team. Siri's voice interpretation software is created using a form of NLP. Once I gain a certain level of understanding with production code, I would like to create a startup that does some sort of research regarding Data Science. If that does not work out, I would return to working at a company like Apple or Meta, where I will gain more experience, with which I would become an open source committer for many projects.",
  },
  {
    title: "Engineering Future",
    image: "/arduino.png",
    body: "With the decent amount of experience I have acquired, I have gotten a brief understanding of most of the engineering fields, and of all them, Electrical Engineering, Electronics Engineering, and Computer Science are the most appealing to me. Regardless of the university I go to, I would really like to pursue a career and major in either one of the aforementioned fields because engineering can help build the future, and I would love to be a part of that innovative process.",
  },
];

function Goals() {
  return (
    <>
      <section className="section">
        <div className="container">
          <div className="section-head">
            <a className="text-link" href="/">
              ← Home
            </a>
            <h1>Goals</h1>
            <p className="section-subtitle">
              Personal direction and long-term focus across education and
              engineering.
            </p>
          </div>
          <div className="grid-3 reveal-stagger">
            {goalCards.map((card) => (
              <div key={card.title} className="card">
                <div className="card-icon">
                  <img src={card.image} alt="" />
                </div>
                <h3 className="card-title">{card.title}</h3>
                <p className="card-body">{card.body}</p>
              </div>
            ))}
          </div>
        </div>
      </section>
      <AdiFooter />
    </>
  );
}

export default Goals;
