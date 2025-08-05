# Visualiser les photos de rues de Panoramax

[Panoramax](https://panoramax.fr/) est le géocommun des photos des territoires 📸🗺️

Cette extension permet de facilement visualiser les photos de Panoramax sur une carte MViewer :

- Affichage sur la carte des photos à proximité
- Visualisation des photos classiques ou 360° dans une boîte redimensionnable
- Filtrage des photos par date, type (360° ou classique) et score de qualité

## Configuration du fichier XML

Pour intégrer cette extension à votre **application**, ajoutez simplement le code ci-dessous :

``` xml
<extensions>
    <extension type="component" id="panoramax" path="demo/addons"/>
</extensions>
```

Une fois la configuration effectuée, un nouveau bouton **Panoramax** apparaît dans la barre d'outils se situant à droite de l'application.

## Utilisation

1. Cliquez sur le bouton **Panoramax** dans la barre d'outil. Les photos disponibles s'affichent en orange sur la carte.
2. Cliquez sur n'importe laquelle des photos, la visionneuse s'ouvre en bas à gauche de l'écran.
3. Dans la légende, retrouvez les filtres interactifs pour facilement trouver les photos qui vous intéressent.
