import React, { useEffect } from 'react';

const HomePage = () => {
  useEffect(() => {
    console.log("ok");
    // Code d'initialisation à exécuter une fois que l'utilisateur atterrit sur le site
  }, []);

  return (
    <div>
      {/* Le contenu de votre page d'accueil */}
    </div>
  );
};

export default HomePage;
