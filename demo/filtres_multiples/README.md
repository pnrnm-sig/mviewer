# Configuration

Exemple pour la couche **monlayer**

### Configuration customlayer

 * dans un dossier dédié, copie des fichiers .js et .html
 * renommage de ces deux fichiers du nom de la couche (monlayer.js, monlayer.html)
 * modification du fichier monlayer.js (personnalisation des 2 premières lignes = nom de la couche)

```js
mviewer.customControls.monlayer = (function () {
  /*
   * Private
   */
  const _idlayer = "monlayer";
```

### Paramètres xml de couche pour activer ce customcontrol

Les filtres sont créés dans un élément dédié  **ccfilter** avec pour chaque filtre 3 propriétés obligatoire et une optionnelle :
 * label : nom affiché dans la légende pour ce filtre
 * field : nom du champ filtré
 * values : liste des valeurs séparées par une virgule sans espace
 * multiselection : précise s'il est possible d'effectuer un choix multiple pour ce filtre. Optionnel

Deux autres paramètres permettent de configurer le composant **ccfilters**
 * logicaloperator : Opérateur logique permettant de lier les filtres entre eux (Seul **and** est actuellement supporté)
 * nofilterlabel : Texte à afficher pour les filtres qui permettent une sélection unique. La sélection de cette valeur annule le filtre courant.

Dans le config.xml

```xml
<layer id="monlayer"
    customcontrol="true"
    customcontrolpath="customcontrols/mondossier"
    <ccfilters logicaloperator="and" nofilterlabel="Toutes les valeurs">
        <filter label="Réseau" field="reseau_lib" values="Education nationale,Agricole"/>
        <filter label="Secteur" field="secteur_li" values="Public,Privé sous contrat avec l'éducation nationale"/>
        <filter label="Type" field="type_etabl" values="CFA,LGT,LPO,LP,MFR,LPA,LEGTA-LPA,LG,LPM,LP/LPO,LEGTA" multiselection="true"/>
    </ccfilters>
</layer>

```