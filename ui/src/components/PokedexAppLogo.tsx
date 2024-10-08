import { Link } from "react-router-dom";

export const PokedexAppLogo = () => {
  return (
    <Link to="/">
      <img alt="Pokédex App" src="/pokedexAppLogo.png" width={150} />
    </Link>
  );
};
