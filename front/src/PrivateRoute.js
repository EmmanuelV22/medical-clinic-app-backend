// PrivateRoute.js
import React from "react";
import { Route, Navigate } from "react-router-dom";
import jwt from "jsonwebtoken";
import Cookies from "js-cookie";

const PrivateRoute = ({ element, ...rest }) => {
  // Vérifiez si le token d'authentification est présent et valide
  const isAuthenticated = checkAuthentication(); // Vous devez implémenter cette fonction

  return isAuthenticated ? (
    <Route {...rest} element={element} />
  ) : (
    // Redirigez l'utilisateur vers la page de connexion s'il n'est pas authentifié
    <Navigate to="/login" replace />
  );
};

const checkAuthentication = () => {
  // Récupérez le token d'authentification depuis les cookies
  const token = Cookies.get("jwt");

  if (token) {
    try {
      // Utilisez la bibliothèque jsonwebtoken pour vérifier la validité du token
      const decodedToken = jwt.verify(token, "jwt");
      // Ajoutez ici d'autres vérifications si nécessaire

      return true; // Le token est valide
    } catch (error) {
      console.log("No estás autorizado a visitar esta página sin Token", error);
      return false;
    }
  }

  return false; // Le token n'est pas présent ou invalide
};

export default PrivateRoute;
