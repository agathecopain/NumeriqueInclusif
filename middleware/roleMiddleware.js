// roleMiddleware.js

// Fonction qui retourne un middleware basé sur les rôles autorisés
export function authorizeRoles(...allowedRoles) {
    return (req, res, next) => {
      if (!req.user) return res.status(401).json({ message: 'Utilisateur non authentifié' });
  
      // Vérifie si le rôle de l'utilisateur est dans la liste autorisée
      if (!allowedRoles.includes(req.user.role)) {
        return res.status(403).json({ message: 'Accès refusé' });
      }
  
      next(); // OK, l'utilisateur a le rôle requis
    };
  }
  