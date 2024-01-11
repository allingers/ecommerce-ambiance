import classes from '../styles/Home.module.css';

const Home: React.FC = () => {
  return (
    <div className={classes.heroSection}>
      <img  className={classes.heroSectionImg} src="images/winter-hero.png" alt="Hero Image" />
    </div>
  );
};

export default Home;
